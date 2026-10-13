"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Slides travel with the navigation direction: 1 = forward, -1 = back.
const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24, filter: "blur(2px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24, filter: "blur(2px)" }),
};
const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export type ContentCarouselItem = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export type ContentCarouselProps = Omit<
  React.ComponentProps<"div">,
  "onChange"
> & {
  items: ContentCarouselItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Wrap from the last item to the first and back. */
  loop?: boolean;
};

export function ContentCarousel({
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  loop = true,
  className,
  ...props
}: ContentCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const [direction, setDirection] = useState(1);
  const count = items.length;
  const current = Math.min(Math.max(index ?? uncontrolledIndex, 0), count - 1);

  if (count === 0) return null;

  const goTo = (next: number) => {
    const target = loop
      ? (next + count) % count
      : Math.min(Math.max(next, 0), count - 1);
    if (target === current) return;
    // Use the requested step, not the wrapped target, so Next from the last item still moves forward.
    setDirection(next > current ? 1 : -1);
    if (index === undefined) setUncontrolledIndex(target);
    onIndexChange?.(target);
  };

  const item = items[current];
  const canGoPrev = loop || current > 0;
  const canGoNext = loop || current < count - 1;

  return (
    <div
      data-slot="content-carousel"
      role="region"
      aria-roledescription="carousel"
      className={cn("flex flex-col items-center gap-8 px-4", className)}
      {...props}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="grid min-h-32 w-full max-w-2xl place-items-center text-center"
      >
        {/* Outgoing and incoming items share one grid cell and overlap, so rapid clicks never queue. */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={reduceMotion ? fadeVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: EASE_OUT }}
            className="space-y-3 [grid-area:1/1]"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {item.title}
            </h2>
            {item.description && (
              <div className="text-base text-muted-foreground sm:text-lg">
                {item.description}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous item"
          disabled={!canGoPrev}
          onClick={() => goTo(current - 1)}
        >
          <ChevronLeft aria-hidden />
        </Button>

        <div className="flex items-center gap-1.5">
          {items.map((dot, i) => (
            <button
              key={dot.id}
              type="button"
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full bg-muted-foreground/30 outline-none transition-[width,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
                i === current ? "w-6 bg-primary hover:bg-primary" : "w-2"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="Next item"
          disabled={!canGoNext}
          onClick={() => goTo(current + 1)}
        >
          <ChevronRight aria-hidden />
        </Button>
      </div>

      <p className="text-sm tabular-nums text-muted-foreground">
        {current + 1} / {count}
      </p>
    </div>
  );
}
