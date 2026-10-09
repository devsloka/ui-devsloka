"use client";

import { useMemo, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const CASE_COLORS = {
  midnight: "bg-gradient-to-b from-neutral-700 to-neutral-900",
  silver: "bg-gradient-to-b from-neutral-200 to-neutral-400",
  starlight: "bg-gradient-to-b from-stone-100 to-stone-300",
} as const;

const BAND_COLORS = {
  midnight: "bg-neutral-800",
  silver: "bg-neutral-300",
  starlight: "bg-stone-200",
  primary: "bg-primary",
} as const;

export type SmartwatchColor = keyof typeof CASE_COLORS;
export type SmartwatchBandColor = keyof typeof BAND_COLORS;

// Clock store: ticks every second on the client, `null` on the server so the
// first client render matches the server HTML.
function subscribeToClock(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

function ClockFace() {
  const minute = useSyncExternalStore(subscribeToClock, getMinute, getServerMinute);
  const formatters = useMemo(
    () => ({
      time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }),
      date: new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric" }),
    }),
    []
  );
  const now = minute === null ? null : new Date(minute * 60_000);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-1 bg-black text-white">
      <time
        dateTime={now?.toISOString()}
        className="text-[calc(var(--watch-size)*0.17)] leading-none font-semibold tracking-tight tabular-nums"
      >
        {now ? formatters.time.format(now) : "--:--"}
      </time>
      <span className="text-[calc(var(--watch-size)*0.07)] font-medium text-white/60">
        {now ? formatters.date.format(now) : " "}
      </span>
    </div>
  );
}

export type AnimatedSmartwatchProps = React.ComponentProps<"div"> & {
  /** Screen content. Defaults to a built-in clock face. */
  children?: React.ReactNode;
  /** Length of the scroll track, any CSS length. */
  scrollHeight?: string;
  /** Case color preset. */
  color?: SmartwatchColor;
  /** Band color preset. Defaults to the case color. */
  bandColor?: SmartwatchBandColor;
  /** Width of the watch case in px. */
  size?: number;
};

/**
 * A watch mockup that rotates into a resting pose as it scrolls into view,
 * then stays pinned for the rest of the scroll track.
 */
export function AnimatedSmartwatch({
  children,
  scrollHeight = "150vh",
  color = "midnight",
  bandColor,
  size = 200,
  className,
  style,
  ...props
}: AnimatedSmartwatchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const rotateZ = useTransform(scrollYProgress, [0, 0.8], [-30, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.8], [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.8], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.85, 1]);
  const brightness = useTransform(scrollYProgress, [0, 0.8], [0.6, 1]);
  const screenFilter = useMotionTemplate`brightness(${brightness})`;

  const animated = !reduceMotion;

  return (
    <div
      ref={containerRef}
      data-slot="animated-smartwatch"
      className={cn("relative w-full", className)}
      style={
        {
          height: scrollHeight,
          "--watch-size": `${size}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-x-clip perspective-[1200px]">
        <motion.div
          className="flex flex-col items-center transform-3d"
          style={animated ? { rotateZ, rotateX, rotateY, scale } : undefined}
        >
          <div
            aria-hidden
            className={cn(
              "h-[calc(var(--watch-size)*0.55)] w-[calc(var(--watch-size)*0.7)] rounded-t-[calc(var(--watch-size)*0.12)]",
              BAND_COLORS[bandColor ?? color]
            )}
          />

          <div
            className={cn(
              "relative z-10 -my-[calc(var(--watch-size)*0.04)] aspect-[4/5] w-[var(--watch-size)] rounded-[calc(var(--watch-size)*0.24)] p-[calc(var(--watch-size)*0.045)] ring-1 ring-black/10",
              CASE_COLORS[color]
            )}
          >
            <div
              aria-hidden
              className={cn(
                "absolute top-[28%] -right-[calc(var(--watch-size)*0.035)] h-[20%] w-[calc(var(--watch-size)*0.045)] rounded-r-sm",
                CASE_COLORS[color]
              )}
            />
            <motion.div
              className="relative size-full overflow-hidden rounded-[calc(var(--watch-size)*0.2)] bg-black"
              style={animated ? { filter: screenFilter } : undefined}
            >
              {children ?? <ClockFace />}
            </motion.div>
          </div>

          <div
            aria-hidden
            className={cn(
              "h-[calc(var(--watch-size)*0.55)] w-[calc(var(--watch-size)*0.7)] rounded-b-[calc(var(--watch-size)*0.12)]",
              BAND_COLORS[bandColor ?? color]
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}
