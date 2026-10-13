"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  location?: string;
  image: { src: string; alt?: string };
};

export type TeamCarouselProps = Omit<React.ComponentProps<"section">, "title"> & {
  members: TeamMember[];
  title?: React.ReactNode;
  /** Pinned above the carousel, e.g. a brand mark and nav links. */
  header?: React.ReactNode;
  /** Pixels per frame of the continuous scroll. */
  speed?: number;
  /** Fade and progressively blur the cards into the edges. */
  edgeBlur?: boolean;
};

// Embla needs enough slides to fill the viewport before it can loop.
const MIN_SLIDES = 12;
const EASE_OUT = "ease-[cubic-bezier(0.23,1,0.32,1)]";
const pad = (n: number) => String(n).padStart(2, "0");

export function TeamCarousel({
  members,
  title = "Our Team",
  header,
  speed = 0.6,
  edgeBlur = true,
  className,
  ...props
}: TeamCarouselProps) {
  const reduceMotion = useReducedMotion();

  // The plugin's own pause/resume would override a user's Pause, so all of that is off
  // and playback is driven by `shouldPlay` below.
  const plugins = useMemo(
    () => [
      AutoScroll({
        speed,
        playOnInit: false,
        stopOnInteraction: true,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    ],
    [speed]
  );
  const [viewportRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    plugins
  );

  const [active, setActive] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [dragging, setDragging] = useState(false);
  // null until the user chooses; reduced motion starts paused, but Play still works.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? !!reduceMotion;
  const shouldPlay = !paused && !hovering && !focusWithin && !dragging;

  useEffect(() => {
    const autoScroll = emblaApi?.plugins().autoScroll;
    if (!autoScroll) return;
    if (shouldPlay) autoScroll.play();
    else autoScroll.stop();
  }, [emblaApi, shouldPlay]);

  // A drag stops the scroll; it resumes once the carousel has settled.
  useEffect(() => {
    if (!emblaApi) return;
    const onDown = () => setDragging(true);
    const onSettle = () => setDragging(false);
    emblaApi.on("pointerDown", onDown).on("settle", onSettle);
    return () => {
      emblaApi.off("pointerDown", onDown).off("settle", onSettle);
    };
  }, [emblaApi]);

  const slides = useMemo(() => {
    const copies = Math.max(1, Math.ceil(MIN_SLIDES / Math.max(members.length, 1)));
    return Array.from({ length: copies }, () => members).flat();
  }, [members]);

  const divisions = useMemo(() => [...new Set(members.map((member) => member.role))], [members]);
  const activeMember = active === null ? null : slides[active];

  return (
    <section
      data-slot="team-carousel"
      aria-roledescription="carousel"
      aria-label={typeof title === "string" ? title : "Team"}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl bg-black py-6 text-white sm:py-8",
        className
      )}
      {...props}
    >
      {header && <div className="px-6 sm:px-8">{header}</div>}

      <div className="relative">
        {/* Vertical padding leaves room for the labels above and below the active card. */}
        <div
          ref={viewportRef}
          className="cursor-grab overflow-hidden py-16 active:cursor-grabbing"
          // Keyboard focus on a card pauses the scroll; scoped here so the Play button doesn't.
          onFocus={() => setFocusWithin(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocusWithin(false);
              setActive(null);
            }
          }}
          onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            setActive(null);
          }}
        >
          <div className="-ml-4 flex touch-pan-y">
            {slides.map((member, index) => {
              const isActive = index === active;
              const number = (index % members.length) + 1;
              return (
                <div key={index} className="relative min-w-0 flex-[0_0_auto] pl-4">
                  <p
                    aria-hidden
                    className={cn(
                      "absolute bottom-full left-4 mb-5 text-[0.6875rem] font-medium tracking-wide whitespace-nowrap uppercase",
                      "transition-[opacity,transform] duration-200",
                      EASE_OUT,
                      isActive ? "opacity-100" : "translate-y-1 opacity-0 motion-reduce:translate-y-0"
                    )}
                  >
                    {pad(number)}. {member.name}
                  </p>

                  <button
                    type="button"
                    aria-label={`${member.name}, ${member.role}${member.location ? `, ${member.location}` : ""}`}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
                    onFocus={() => setActive(index)}
                    // Taps don't hover, so a tap selects the card instead.
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative block aspect-[3/4] w-28 cursor-pointer overflow-hidden bg-neutral-900 outline-none sm:w-36",
                      "transition-[transform,opacity] duration-300",
                      EASE_OUT,
                      "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      isActive && "z-10 scale-110 motion-reduce:scale-100",
                      active !== null && !isActive && "opacity-45"
                    )}
                  >
                    <Image
                      src={member.image.src}
                      alt={member.image.alt ?? ""}
                      fill
                      sizes="(min-width: 640px) 168px, 132px"
                      draggable={false}
                      className={cn(
                        "object-cover transition-[filter] duration-300",
                        isActive ? "grayscale-0" : "grayscale"
                      )}
                    />
                  </button>

                  <p
                    aria-hidden
                    className={cn(
                      "absolute top-full left-4 mt-5 text-[0.6875rem] leading-snug font-medium tracking-wide whitespace-nowrap text-white/70 uppercase",
                      "transition-[opacity,transform] duration-200",
                      EASE_OUT,
                      isActive ? "opacity-100" : "-translate-y-1 opacity-0 motion-reduce:translate-y-0"
                    )}
                  >
                    {member.role}
                    {member.location && (
                      <>
                        <br />
                        {member.location}
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {edgeBlur && (
          <>
            <EdgeBlur side="left" />
            <EdgeBlur side="right" />
          </>
        )}
      </div>

      <div className="mt-auto grid grid-cols-1 items-end gap-6 px-6 sm:grid-cols-3 sm:px-8">
        <h3 className="text-3xl font-light tracking-tight uppercase sm:text-4xl">{title}</h3>
        <div className="flex items-center gap-4 text-[0.6875rem] tracking-wide uppercase sm:justify-center">
          <p>
            We have {divisions.length} division{divisions.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-pressed={paused}
            className="cursor-pointer rounded-sm tracking-wide text-white/50 uppercase underline-offset-4 outline-none transition-colors hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
        <ul aria-label="Divisions" className="text-[0.6875rem] leading-relaxed tracking-wide uppercase sm:justify-self-end">
          {divisions.map((division) => (
            <li
              key={division}
              className={cn(
                "transition-colors duration-200",
                // Highlights the active member's division; all read equally when nothing is active.
                activeMember
                  ? activeMember.role === division
                    ? "text-white"
                    : "text-white/35"
                  : "text-white/60"
              )}
            >
              {division}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Stacked backdrop blurs, each masked a little closer to the edge, so the blur ramps up
// smoothly instead of starting at a hard line. A black fade on top melts cards into the stage.
const BLUR_LAYERS = [
  { blur: 1, from: 0, to: 35 },
  { blur: 2, from: 20, to: 55 },
  { blur: 4, from: 40, to: 75 },
  { blur: 8, from: 60, to: 100 },
];

function EdgeBlur({ side }: { side: "left" | "right" }) {
  // The gradient runs from the inner side of the strip out to the edge.
  const toward = side === "left" ? "to left" : "to right";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 z-20 w-[14%] min-w-16",
        side === "left" ? "left-0" : "right-0"
      )}
    >
      {BLUR_LAYERS.map(({ blur, from, to }) => {
        const mask = `linear-gradient(${toward}, transparent ${from}%, black ${to}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: mask, WebkitMaskImage: mask }}
          />
        );
      })}
      <div className="absolute inset-0" style={{ background: `linear-gradient(${toward}, transparent, black)` }} />
    </div>
  );
}
