"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const COLORS = {
  space: { lid: "bg-neutral-800", base: "bg-neutral-700" },
  silver: { lid: "bg-neutral-300", base: "bg-neutral-400" },
} as const;

export type LaptopColor = keyof typeof COLORS;

export type AnimatedMacBookProps = React.ComponentProps<"div"> & {
  /** Screen content, e.g. an image or a live UI. Fills a 16:10 screen. */
  children?: React.ReactNode;
  /** Length of the scroll track, any CSS length. */
  scrollHeight?: string;
  /** How far the lid closes by the end of the track, in degrees (90 = fully closed). */
  maxRotation?: number;
  /** Body color preset. */
  color?: LaptopColor;
  /** Classes for the screen area that wraps `children`. */
  screenClassName?: string;
};

/**
 * A laptop mockup pinned to the viewport whose lid closes as you scroll
 * through its track. With reduced motion the lid stays open.
 */
export function AnimatedMacBook({
  children,
  scrollHeight = "200vh",
  maxRotation = 90,
  color = "space",
  className,
  screenClassName,
  style,
  ...props
}: AnimatedMacBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0.1, 0.9], [0, -maxRotation]);
  const dim = useTransform(scrollYProgress, [0.1, 0.9], [0, 0.7]);

  const animated = !reduceMotion;

  return (
    <div
      ref={containerRef}
      data-slot="laptop-closes-on-scroll"
      className={cn("relative w-full", className)}
      style={{ height: scrollHeight, ...style }}
      {...props}
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-x-clip px-4">
        <div className="w-full max-w-4xl perspective-[2000px]">
          <motion.div
            className={cn(
              "relative mx-auto aspect-[16/10] w-[88%] origin-bottom rounded-xl p-[1%] transform-3d",
              COLORS[color].lid
            )}
            style={animated ? { rotateX } : undefined}
          >
            <div className="relative size-full rounded-lg bg-neutral-950 p-[2%]">
              <span
                aria-hidden
                className="absolute top-[0.8%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-neutral-700"
              />
              <div
                data-slot="laptop-screen"
                className={cn(
                  "relative size-full overflow-hidden rounded-sm bg-muted [&>img]:size-full [&>img]:object-cover",
                  screenClassName
                )}
              >
                {children}
                {animated && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-black"
                    style={{ opacity: dim }}
                  />
                )}
              </div>
            </div>
          </motion.div>

          <div
            aria-hidden
            className={cn("relative h-3 rounded-b-xl ring-1 ring-black/10 sm:h-4", COLORS[color].base)}
          >
            <div className="absolute top-0 left-1/2 h-1/3 w-[14%] -translate-x-1/2 rounded-b-md bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
