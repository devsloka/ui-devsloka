"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const count = items.length;
  const current = Math.min(Math.max(index ?? uncontrolledIndex, 0), count - 1);

  if (count === 0) return null;

  const goTo = (next: number) => {
    const target = loop
      ? (next + count) % count
      : Math.min(Math.max(next, 0), count - 1);
    if (target === current) return;
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: "easeOut" }}
            className="space-y-3"
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
                "h-2 rounded-full bg-muted-foreground/30 outline-none transition-all hover:bg-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
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
