"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type LinesBackgroundProps = Omit<React.ComponentProps<"div">, "children" | "color"> & {
  /** Any CSS color for the lines. Defaults to the current text color (`text-foreground/15`). */
  color?: string;
  /** Horizontal distance between lines in CSS pixels (min 12). @default 30 */
  spacing?: number;
  /** Maximum sideways sway in CSS pixels. @default 24 */
  amplitude?: number;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
};

const SEGMENTS = 10;
const MAX_LINES = 160;

/** Small deterministic PRNG so every mount produces the same set of lines. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Vertical lines swaying like strands, each with its own tempo, filling the parent. */
export function LinesBackground({
  color,
  spacing = 30,
  amplitude = 24,
  speed = 1,
  className,
  style,
  ...props
}: LinesBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const gap = Math.max(12, spacing);
    const rate = speed > 0 ? speed : 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Per-line tempo and phase, generated once for the maximum line count.
    const random = mulberry32(42);
    const tempo = new Float32Array(MAX_LINES);
    const phase = new Float32Array(MAX_LINES);
    for (let i = 0; i < MAX_LINES; i++) {
      tempo[i] = 0.6 + random() * 1.2;
      phase[i] = random() * Math.PI * 2;
    }

    let width = 0;
    let height = 0;
    let lineCount = 0;
    let stroke = "currentColor";
    let time = 0;
    let lastTime = 0;
    let frame = 0;
    let inView = true;

    const offset = (line: number, point: number) =>
      amplitude * Math.sin(time * tempo[line] + phase[line] - point * 0.45);

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      const segment = height / SEGMENTS;
      for (let line = 0; line < lineCount; line++) {
        const baseX = (line + 0.5) * (width / lineCount);
        let prevX = baseX + offset(line, 0);
        let prevY = 0;
        ctx.moveTo(prevX, prevY);
        for (let point = 1; point <= SEGMENTS; point++) {
          const x = baseX + offset(line, point);
          const y = point * segment;
          ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
          prevX = x;
          prevY = y;
        }
        ctx.lineTo(prevX, prevY);
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
      lastTime = now;
      time += dt * rate * 1.2;
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
      width = root.clientWidth;
      height = root.clientHeight;
      if (!width || !height) {
        stop();
        return;
      }
      lineCount = Math.min(MAX_LINES, Math.max(1, Math.floor(width / gap)));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
      start();
    };

    // The stroke follows the computed text color, re-read when the theme on <html> changes.
    const readColor = () => {
      stroke = getComputedStyle(canvas).color;
      if (!frame) draw();
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    readColor();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(root);

    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [color, spacing, amplitude, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="lines-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground/15", className)}
      style={color ? { color, ...style } : style}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
