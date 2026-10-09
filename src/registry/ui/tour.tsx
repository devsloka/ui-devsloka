"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TourPlacement = "top" | "bottom" | "left" | "right";

export type TourStep = {
  /** CSS selector of the element to highlight. If nothing matches, the card is centered. */
  target: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  placement?: TourPlacement;
};

export type TourLabels = {
  next: string;
  previous: string;
  finish: string;
  close: string;
  stepOf?: (current: number, total: number) => string;
};

export type TourProps = Omit<
  React.ComponentProps<"div">,
  "title" | "children"
> & {
  steps: TourStep[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  /** Called when the last step's finish button is pressed. */
  onFinish?: () => void;
  labels?: Partial<TourLabels>;
};

const defaultLabels: Required<TourLabels> = {
  next: "Next",
  previous: "Back",
  finish: "Finish",
  close: "Close tour",
  stepOf: (current, total) => `${current} of ${total}`,
};

type Box = { top: number; left: number; width: number; height: number };
type Measurement = {
  target: Box | null;
  card: { width: number; height: number } | null;
  viewport: { width: number; height: number };
  /** True when the update came from scrolling/resizing and should not animate. */
  instant: boolean;
};

const GAP = 12;
const MARGIN = 12;
const SPOTLIGHT_PADDING = 6;
const OPPOSITE: Record<TourPlacement, TourPlacement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const subscribeNoop = () => () => {};
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

function getCardPosition(
  target: Box | null,
  card: { width: number; height: number },
  viewport: { width: number; height: number },
  preferred: TourPlacement,
) {
  if (!target) {
    return {
      x: (viewport.width - card.width) / 2,
      y: (viewport.height - card.height) / 2,
    };
  }

  const fits: Record<TourPlacement, boolean> = {
    top: target.top - GAP - card.height >= MARGIN,
    bottom:
      target.top + target.height + GAP + card.height <=
      viewport.height - MARGIN,
    left: target.left - GAP - card.width >= MARGIN,
    right:
      target.left + target.width + GAP + card.width <= viewport.width - MARGIN,
  };
  const placement =
    fits[preferred] || !fits[OPPOSITE[preferred]]
      ? preferred
      : OPPOSITE[preferred];

  let x: number;
  let y: number;
  if (placement === "top" || placement === "bottom") {
    x = target.left + target.width / 2 - card.width / 2;
    y =
      placement === "top"
        ? target.top - GAP - card.height
        : target.top + target.height + GAP;
  } else {
    y = target.top + target.height / 2 - card.height / 2;
    x =
      placement === "left"
        ? target.left - GAP - card.width
        : target.left + target.width + GAP;
  }

  return {
    x: clamp(x, MARGIN, viewport.width - card.width - MARGIN),
    y: clamp(y, MARGIN, viewport.height - card.height - MARGIN),
  };
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Tour({
  steps,
  open,
  defaultOpen = false,
  onOpenChange,
  step,
  defaultStep = 0,
  onStepChange,
  onFinish,
  labels: labelsProp,
  className,
  onKeyDown,
  ...props
}: TourProps) {
  const labels = { ...defaultLabels, ...labelsProp };
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = useReducedMotion();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  // Restart from the default step every time the tour opens.
  const [wasOpen, setWasOpen] = useState(isOpen);
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (isOpen) setUncontrolledStep(defaultStep);
    else setMeasurement(null);
  }
  const stepIndex = clamp(step ?? uncontrolledStep, 0, steps.length - 1);
  const setStep = (next: number) => {
    if (step === undefined) setUncontrolledStep(next);
    onStepChange?.(next);
  };

  const current = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;
  const visible = isOpen && isClient && !!current;

  // Measure target, card and viewport in a rAF so scroll/resize bursts cause one update per frame.
  const targetSelector = current?.target;
  useEffect(() => {
    if (!visible || !targetSelector) return;

    let frame = 0;
    let instant = false;
    const target = document.querySelector<HTMLElement>(targetSelector);

    const measure = () => {
      frame = 0;
      const rect = target?.getBoundingClientRect();
      const card = cardRef.current;
      setMeasurement((previous) => ({
        target: rect
          ? {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }
          : null,
        card: card
          ? { width: card.offsetWidth, height: card.offsetHeight }
          : null,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        // The first placement after opening snaps into place instead of flying in.
        instant: instant || !previous?.card,
      }));
    };
    const scheduleInstant = () => {
      instant = true;
      if (!frame) frame = requestAnimationFrame(measure);
    };

    if (target) {
      const rect = target.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        target.scrollIntoView({
          block: "center",
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    }
    frame = requestAnimationFrame(measure);

    const observer = new ResizeObserver(scheduleInstant);
    if (target) observer.observe(target);
    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener("resize", scheduleInstant);
    window.addEventListener("scroll", scheduleInstant, {
      capture: true,
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleInstant);
      window.removeEventListener("scroll", scheduleInstant, { capture: true });
    };
  }, [visible, targetSelector, stepIndex, reduceMotion]);

  // Move focus into the card while open and give it back when the tour closes.
  useEffect(() => {
    if (!visible) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    cardRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [visible]);

  // Keep focus inside the card when the focused button disappears or becomes disabled.
  useEffect(() => {
    const card = cardRef.current;
    if (visible && card && !card.contains(document.activeElement)) card.focus();
  }, [visible, stepIndex]);

  if (!visible) return null;

  const goTo = (next: number) => {
    if (next >= 0 && next < steps.length) setStep(next);
  };
  const finish = () => {
    onFinish?.();
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(stepIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(stepIndex - 1);
    } else if (event.key === "Tab") {
      const focusable = getFocusable(event.currentTarget);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (
        event.shiftKey &&
        (active === first || active === event.currentTarget)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const target = measurement?.target ?? null;
  const cardSize = measurement?.card;
  const cardPosition =
    measurement && cardSize
      ? getCardPosition(
          target,
          cardSize,
          measurement.viewport,
          current.placement ?? "bottom",
        )
      : null;
  const transition =
    reduceMotion || measurement?.instant
      ? { duration: 0 }
      : { type: "spring" as const, bounce: 0.1, duration: 0.4 };

  return createPortal(
    <>
      {/* Blocks interaction with the page; keeps focus in the card on click. */}
      <div
        aria-hidden
        className={cn("fixed inset-0 z-50", !target && "bg-black/50")}
        onMouseDown={(event) => event.preventDefault()}
      />
      {target && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-50 rounded-lg shadow-[0_0_0_9999px_rgb(0_0_0/0.5)] ring-2 ring-ring"
          initial={false}
          animate={{
            x: target.left - SPOTLIGHT_PADDING,
            y: target.top - SPOTLIGHT_PADDING,
            width: target.width + SPOTLIGHT_PADDING * 2,
            height: target.height + SPOTLIGHT_PADDING * 2,
          }}
          transition={transition}
        />
      )}
      <motion.div
        className="fixed top-0 left-0 z-50"
        initial={false}
        animate={
          cardPosition
            ? { x: cardPosition.x, y: cardPosition.y, opacity: 1 }
            : { opacity: 0 }
        }
        transition={transition}
      >
        <div
          ref={cardRef}
          data-slot="tour"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={current.description ? descriptionId : undefined}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-80 max-w-[calc(100vw-1.5rem)] rounded-xl border bg-popover p-4 text-popover-foreground shadow-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
          {...props}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-base font-semibold">
              {current.title}
            </h2>
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => setOpen(false)}
              className="-mt-1 -mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          {current.description && (
            <div
              id={descriptionId}
              className="mt-1.5 text-sm text-muted-foreground"
            >
              {current.description}
            </div>
          )}
          <div className="mt-4 flex items-center gap-2">
            <span
              aria-live="polite"
              className="mr-auto text-xs text-muted-foreground tabular-nums"
            >
              {labels.stepOf(stepIndex + 1, steps.length)}
            </span>
            {!isFirst && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => goTo(stepIndex - 1)}
              >
                {labels.previous}
              </Button>
            )}
            <Button
              size="sm"
              onClick={isLast ? finish : () => goTo(stepIndex + 1)}
            >
              {isLast ? labels.finish : labels.next}
            </Button>
          </div>
        </div>
      </motion.div>
    </>,
    document.body,
  );
}
