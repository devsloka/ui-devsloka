"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; radius: number; speed: number };

export type FloatingDotsProps = Omit<React.ComponentProps<"canvas">, "ref" | "children"> & {
  /** Number of dots. @default 50 */
  count?: number;
  /** Any CSS color. Defaults to the canvas' current text color (`currentColor`). */
  color?: string;
  /** Minimum dot radius in CSS pixels. @default 1 */
  minRadius?: number;
  /** Maximum dot radius in CSS pixels. @default 3 */
  maxRadius?: number;
  /** Minimum upward speed in CSS pixels per frame (at 60fps). @default 0.5 */
  minSpeed?: number;
  /** Maximum upward speed in CSS pixels per frame (at 60fps). @default 2 */
  maxSpeed?: number;
};

const TAU = Math.PI * 2;
const FRAME_MS = 1000 / 60;

/**
 * Dots drifting upward on a canvas that fills its positioned parent.
 * Pauses offscreen and draws a single static frame when reduced motion is preferred.
 */
export function FloatingDots({
  count = 50,
  color,
  minRadius = 1,
  maxRadius = 3,
  minSpeed = 0.5,
  maxSpeed = 2,
  className,
  ...props
}: FloatingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef("currentColor");
  const redrawRef = useRef<() => void>(() => {});

  // Resolve the fill color. Without an explicit color, follow the inherited text color,
  // re-reading it when the theme class/attributes on <html> change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      fillRef.current = color ?? getComputedStyle(canvas).color;
      redrawRef.current();
    };
    update();
    if (color) return;

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    return () => observer.disconnect();
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let inView = true;

    const between = (min: number, max: number) => min + Math.random() * (max - min);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fillRef.current;
      ctx.beginPath();
      for (const dot of dots) {
        ctx.moveTo(dot.x + dot.radius, dot.y);
        ctx.arc(dot.x, dot.y, dot.radius, 0, TAU);
      }
      ctx.fill();
    };

    const tick = (time: number) => {
      const step = lastTime ? Math.min((time - lastTime) / FRAME_MS, 3) : 1;
      lastTime = time;
      for (const dot of dots) {
        dot.y -= dot.speed * step;
        if (dot.y < -dot.radius * 2) {
          dot.x = Math.random() * width;
          dot.y = height + dot.radius;
        }
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !inView || reducedMotion.matches || !width || !height) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;
      if (!nextWidth || !nextHeight) return;

      if (dots.length === 0) {
        for (let i = 0; i < count; i++) {
          dots.push({
            x: Math.random() * nextWidth,
            y: Math.random() * nextHeight,
            radius: between(minRadius, maxRadius),
            speed: between(minSpeed, maxSpeed),
          });
        }
      } else if (width && height) {
        const scaleX = nextWidth / width;
        const scaleY = nextHeight / height;
        for (const dot of dots) {
          dot.x *= scaleX;
          dot.y *= scaleY;
        }
      }

      width = nextWidth;
      height = nextHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
      start();
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    redrawRef.current = () => {
      if (!frame) draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      redrawRef.current = () => {};
    };
  }, [count, minRadius, maxRadius, minSpeed, maxSpeed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-slot="floating-dots"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      {...props}
    />
  );
}
