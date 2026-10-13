"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ArcStep = { title: React.ReactNode; description?: React.ReactNode };

export type ArcScrollStepsProps = Omit<React.ComponentProps<"div">, "children"> & {
  steps: ArcStep[];
  /** Pinned to the top of the stage, e.g. a logo and a close button. */
  header?: React.ReactNode;
  /** Pinned to the bottom of the stage, e.g. credits and a call to action. */
  footer?: React.ReactNode;
  /** Degrees between neighbouring steps on the arc. */
  spacing?: number;
  /** Any CSS color for the active step's dot. */
  accent?: string;
  /** Accessible name for the scroll area. */
  label?: string;
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function ArcScrollSteps({
  steps,
  header,
  footer,
  spacing = 22,
  accent = "#0A6EFF",
  label = "Steps",
  className,
  style,
  ...props
}: ArcScrollStepsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const count = steps.length;

  // Scroll progress → a continuous step position (0 … count-1). A light spring gives
  // the wheel some weight; reduced motion follows the scroll exactly.
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const rawPosition = useTransform(scrollYProgress, [0, 1], [0, Math.max(count - 1, 0)]);
  const springPosition = useSpring(rawPosition, { stiffness: 260, damping: 34, mass: 0.6 });
  const position = reduceMotion ? rawPosition : springPosition;
  const wheelRotation = useTransform(position, (value) => -value * spacing);
  const wheelTransform = useMotionTemplate`rotate(${wheelRotation}deg)`;

  // Only the rounded step drives React state, so content swaps once per step, not per frame.
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  useMotionValueEvent(rawPosition, "change", (value) => {
    const next = Math.round(value);
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  });

  const goTo = (index: number) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTo({ top: index * scroller.clientHeight, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const step = steps[active];
  const shift = reduceMotion ? 0 : 24;

  return (
    <div
      ref={scrollRef}
      data-slot="arc-scroll-steps"
      role="region"
      aria-label={label}
      tabIndex={0}
      style={
        {
          "--arc-accent": accent,
          // The arc scales with the component; numbers sit just outside it.
          "--arc-radius": "clamp(14rem, 42cqw, 26rem)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "@container relative h-[34rem] w-full snap-y snap-mandatory overflow-y-auto overscroll-auto rounded-xl bg-muted/40 text-foreground outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    >
      {/* Snap point for the first step, kept off the pinned stage: while stuck, the stage's
          own snap position would be ambiguous. */}
      <div aria-hidden className="h-0 snap-start" />
      {/* The stage stays pinned while the spacers below provide one screen of scroll per step. */}
      <div className="sticky top-0 h-full overflow-hidden">
        {header && <div className="absolute inset-x-6 top-5 z-10 sm:inset-x-8">{header}</div>}

        {/* Thin arc, centred off the left edge so only its right side shows. */}
        <div
          aria-hidden
          className="absolute top-1/2 size-[calc(var(--arc-radius)*2)] -translate-y-1/2 rounded-full border border-foreground/15"
          style={{ left: "calc(36% - var(--arc-radius) * 2)" }}
        />

        {/* The wheel: a zero-size point at the arc's centre that the steps orbit. */}
        <motion.div
          className="absolute top-1/2 size-0"
          style={{ left: "calc(36% - var(--arc-radius))", transform: wheelTransform }}
        >
          {steps.map((item, index) => (
            <ArcStepMarker
              key={index}
              index={index}
              position={position}
              spacing={spacing}
              active={index === active}
              onSelect={() => goTo(index)}
              label={item.title}
            />
          ))}
        </motion.div>

        <div aria-live="polite" className="absolute top-1/2 right-6 left-[52%] -translate-y-1/2 sm:right-10">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ opacity: 0, transform: `translateY(${dir * shift}px)`, filter: "blur(4px)" }),
                center: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
                exit: (dir: number) => ({ opacity: 0, transform: `translateY(${dir * -shift}px)`, filter: "blur(4px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <h3 className="text-4xl leading-none font-semibold tracking-[-0.04em] text-balance @2xl:text-6xl">
                {step?.title}
              </h3>
              {step?.description && (
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">{step.description}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {footer && <div className="absolute inset-x-6 bottom-5 z-10 sm:inset-x-8">{footer}</div>}
      </div>

      {Array.from({ length: Math.max(count - 1, 0) }, (_, i) => (
        <div key={i} aria-hidden className="h-full snap-start" />
      ))}
    </div>
  );
}

function ArcStepMarker({
  index,
  position,
  spacing,
  active,
  onSelect,
  label,
}: {
  index: number;
  position: MotionValue<number>;
  spacing: number;
  active: boolean;
  onSelect: () => void;
  label: React.ReactNode;
}) {
  // 0 at the active slot, 1 once a full step away: drives size and emphasis.
  const distance = useTransform(position, (value) => Math.min(Math.abs(value - index), 1));
  const scale = useTransform(distance, [0, 1], [1, 0.62]);
  const opacity = useTransform(distance, [0, 1], [1, 0.28]);
  const numberTransform = useMotionTemplate`translateY(-50%) scale(${scale})`;

  return (
    // Placed on the arc by angle; the number keeps that angle, so it tilts with the curve.
    <div
      className="absolute top-0 left-0"
      style={{ transform: `rotate(${index * spacing}deg) translateX(var(--arc-radius))` }}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200",
          active ? "bg-[var(--arc-accent)]" : "bg-foreground/30"
        )}
      />
      <motion.button
        type="button"
        onClick={onSelect}
        aria-current={active ? "step" : undefined}
        aria-label={typeof label === "string" ? `Step ${index + 1}: ${label}` : `Step ${index + 1}`}
        style={{ opacity, transform: numberTransform }}
        className="absolute top-0 left-5 origin-left cursor-pointer rounded-md px-1 font-mono text-5xl leading-none font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring @2xl:left-7 @2xl:text-6xl"
      >
        {pad(index + 1)}
      </motion.button>
    </div>
  );
}
