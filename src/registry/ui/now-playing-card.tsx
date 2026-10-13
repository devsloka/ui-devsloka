"use client";

import { isValidElement, useEffect, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

export type NowPlayingImage = { src: string; alt: string };

export type NowPlayingCardProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode;
  artist?: React.ReactNode;
  /** Album art: an image, or any node such as a styled <div> or <svg>. */
  cover: NowPlayingImage | React.ReactNode;
  /** Track length in seconds. */
  duration: number;
  /** Starting position in seconds. */
  defaultElapsed?: number;
  /** Playing (controlled). When playing, the disc spins and the clock ticks. */
  playing?: boolean;
  defaultPlaying?: boolean;
  /** Any CSS color for the progress bar and equalizer. */
  accent?: string;
};

// Seconds per full turn of the disc.
const SPIN_PERIOD = 8;
const MORPH = { type: "spring", duration: 0.5, bounce: 0.15 } as const;
// Opening keeps the art round while it turns upright (a spinning circle hides the turn),
// then squares off. Closing rounds it quickly so it reads as a disc again.
const RADIUS_OPEN = { duration: 0.5, ease: [0.77, 0, 0.175, 1] } as const;
const RADIUS_CLOSE = { duration: 0.3, ease: [0.23, 1, 0.32, 1] } as const;

const isImage = (value: unknown): value is NowPlayingImage =>
  typeof value === "object" && value !== null && !isValidElement(value) && "src" in value;

export function NowPlayingCard({
  title,
  artist,
  cover,
  duration,
  defaultElapsed = 0,
  playing,
  defaultPlaying = true,
  accent = "#0A6EFF",
  className,
  style,
  ...props
}: NowPlayingCardProps) {
  const reduceMotion = useReducedMotion();
  const isPlaying = playing ?? defaultPlaying;
  const elapsed = useElapsed(duration, defaultElapsed, isPlaying);

  // Hover opens the cover for mouse users; a click or tap pins it open or closed.
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hovered || pinned;

  // The disc's angle lives in a motion value so spinning never re-renders React.
  const rotate = useMotionValue(0);
  const discTransform = useMotionTemplate`rotate(${rotate}deg)`;

  useAnimationFrame((_, delta) => {
    if (expanded || !isPlaying || reduceMotion) return;
    rotate.set((rotate.get() + (delta / 1000) * (360 / SPIN_PERIOD)) % 360);
  });

  // Opening settles the art upright along the shorter way round.
  useEffect(() => {
    if (!expanded) return;
    const angle = rotate.get();
    const controls = animate(rotate, angle > 180 ? 360 : 0, reduceMotion ? { duration: 0 } : MORPH);
    return () => controls.stop();
  }, [expanded, reduceMotion, rotate]);

  return (
    <section
      data-slot="now-playing-card"
      aria-label="Now playing"
      style={{ "--now-playing-accent": accent, ...style } as React.CSSProperties}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(
        "relative isolate aspect-square w-full max-w-sm overflow-hidden rounded-[3rem]",
        "bg-linear-to-b from-neutral-100 to-neutral-300 shadow-xl shadow-black/10 ring-1 ring-black/5",
        "dark:from-neutral-800 dark:to-neutral-900 dark:ring-white/10",
        className
      )}
      {...props}
    >
      {/* The art is a full-card square. Collapsed, it shrinks into a circle centred on the
          top edge (a disc peeking in); expanded, it becomes the card. Transform + radius only. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={
          expanded
            ? { transform: "translateY(0%) scale(1)", borderRadius: "0%" }
            : { transform: "translateY(-48%) scale(0.9)", borderRadius: "50%" }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { ...MORPH, borderRadius: expanded ? RADIUS_OPEN : RADIUS_CLOSE }
        }
        className="absolute inset-0 z-10 overflow-hidden shadow-[0_24px_48px_-16px_rgb(0_0_0/0.45)]"
      >
        <motion.div style={{ transform: discTransform }} className="absolute inset-0">
          {isImage(cover) ? (
            <Image src={cover.src} alt="" fill sizes="384px" className="object-cover" />
          ) : (
            cover
          )}
        </motion.div>

        {/* Centre hole of the disc; gone once the art opens up. */}
        <motion.span
          initial={false}
          animate={expanded ? { opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" } : { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-1/2 left-1/2 flex size-[30%] items-center justify-center rounded-full bg-neutral-200/90 ring-4 ring-neutral-400/40 dark:bg-neutral-700/90"
        >
          <span className="size-1/2 rounded-full bg-neutral-100 ring-1 ring-black/10 dark:bg-neutral-800" />
        </motion.span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 px-8 pb-12 text-center">
        <Equalizer playing={isPlaying} />
        {artist && <p className="mt-3 truncate text-lg text-muted-foreground">{artist}</p>}
        <h3 className="max-w-full truncate text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        <div
          role="progressbar"
          aria-label="Playback position"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={elapsed}
          aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`}
          className="mt-1 h-1 w-10 overflow-hidden rounded-full bg-foreground/15"
        >
          <div
            className="h-full origin-left rounded-full bg-[var(--now-playing-accent)] transition-transform duration-1000 ease-linear motion-reduce:transition-none"
            style={{ transform: `scaleX(${elapsed / duration})` }}
          />
        </div>
        <p aria-hidden className="text-lg font-medium text-foreground tabular-nums">
          {formatTime(elapsed)} <span className="text-muted-foreground">/ {formatTime(duration)}</span>
        </p>
      </div>

      {/* A full-card button so tap and keyboard users can open the cover too. */}
      <button
        type="button"
        aria-pressed={pinned}
        aria-label={pinned ? "Hide album cover" : "Show album cover"}
        onClick={() => setPinned((value) => !value)}
        className="absolute inset-0 z-20 cursor-pointer rounded-[3rem] outline-none focus-visible:ring-2 focus-visible:ring-[var(--now-playing-accent)] focus-visible:ring-inset"
      />
    </section>
  );
}

// Four bars bouncing out of phase; frozen when paused or under reduced motion.
function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden className="flex h-5 items-center gap-[3px]">
      {[0.9, 0.55, 1, 0.7].map((height, i) => (
        <span
          key={i}
          className={cn(
            "w-[2px] rounded-full bg-[var(--now-playing-accent)]",
            "animate-[now-playing-bar_900ms_ease-in-out_infinite_alternate] motion-reduce:animate-none",
            !playing && "[animation-play-state:paused]"
          )}
          style={{ height: `${height * 100}%`, animationDelay: `${i * -220}ms` }}
        />
      ))}
      {/* React hoists and dedupes this, so many cards share one rule. */}
      <style href="now-playing-bar" precedence="default">
        {`@keyframes now-playing-bar{from{transform:scaleY(.35)}to{transform:scaleY(1)}}`}
      </style>
    </span>
  );
}

// Ticks once a second while playing and loops at the end of the track.
function useElapsed(duration: number, start: number, playing: boolean) {
  const [elapsed, setElapsed] = useState(() => Math.min(start, duration));
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setElapsed((value) => (value + 1) % (duration + 1)), 1000);
    return () => clearInterval(timer);
  }, [playing, duration]);
  return elapsed;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
