"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

const EFFECTS = {
  flip: {
    initial: { y: "40%", opacity: 0, rotateX: 90 },
    animate: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.4, ease: EASE_OUT } },
    exit: { y: "-40%", opacity: 0, rotateX: -90, transition: { duration: 0.3, ease: EASE_OUT } },
  },
  fade: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.04, transition: { duration: 0.3, ease: "easeIn" } },
  },
  slide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  },
  scale: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE_BACK } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
  },
  rotate: {
    initial: { rotate: -90, opacity: 0, scale: 0.6 },
    animate: { rotate: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_BACK } },
    exit: { rotate: 90, opacity: 0, scale: 0.6, transition: { duration: 0.3, ease: "easeIn" } },
  },
  bounce: {
    initial: { y: "-60%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
    exit: { y: "60%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  },
  morph: {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.6, ease: EASE_OUT } },
    exit: { opacity: 0, clipPath: "inset(100% 0 0 0)", transition: { duration: 0.4, ease: EASE_OUT } },
  },
  blur: {
    initial: { filter: "blur(12px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
    exit: { filter: "blur(12px)", opacity: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  },
} satisfies Record<string, Variants>;

const NO_MOTION: Variants = { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

const ALIGN = {
  start: "justify-items-start",
  center: "justify-items-center",
  end: "justify-items-end",
} as const;

export type TextEffectName = keyof typeof EFFECTS;
export const TEXT_EFFECTS = Object.keys(EFFECTS) as TextEffectName[];

export type TextEffectProps = Omit<React.ComponentProps<"span">, "children"> & {
  words: string[];
  effect?: TextEffectName;
  /** Milliseconds each word stays on screen. */
  interval?: number;
  /** Horizontal alignment of shorter words inside the widest word's box. */
  align?: keyof typeof ALIGN;
};

/** Cycles through words in place. The box is sized to the longest word, so nothing around it shifts. */
export function TextEffect({
  words,
  effect = "flip",
  interval = 3000,
  align = "start",
  className,
  ...props
}: TextEffectProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = words.length;

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  if (count === 0) return null;
  const word = words[index % count];

  return (
    <span
      data-slot="text-effect"
      className={cn("inline-grid align-bottom [perspective:600px]", ALIGN[align], className)}
      {...props}
    >
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every word occupies the same cell, reserving the widest one's width and height. */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible [grid-area:1/1] whitespace-nowrap">
          {w}
        </span>
      ))}
      <span aria-hidden className="relative overflow-hidden [grid-area:1/1] whitespace-nowrap">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`${index}-${word}`}
            variants={reduceMotion ? NO_MOTION : EFFECTS[effect]}
            initial="initial"
            animate="animate"
            exit="exit"
            className="inline-block"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
