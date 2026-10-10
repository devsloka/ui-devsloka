"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type ConfettiBackgroundProps = React.ComponentProps<"div"> & {
  /** Piece colors. Any CSS colors, including theme vars. Defaults to the chart tokens. */
  colors?: string[];
  /** Multiplier for the number of pieces (capped by area). */
  density?: number;
  /** Fall speed multiplier. */
  speed?: number;
};

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];
const MAX_PIECES = 180;

/** Confetti pieces that tumble and flutter down endlessly. */
export function ConfettiBackground({
  colors = DEFAULT_COLORS,
  density = 1,
  speed = 1,
  className,
  ...props
}: ConfettiBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Stable dependency for inline arrays.
  const colorKey = colors.join("\n");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const sourceColors = colorKey ? colorKey.split("\n") : [];
    const fills: string[] = [];

    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    let count = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pSize = new Float32Array(0);
    let pFall = new Float32Array(0);
    let pAngle = new Float32Array(0);
    let pSpin = new Float32Array(0);
    let pFlip = new Float32Array(0);
    let pFlipSpeed = new Float32Array(0);
    let pSway = new Float32Array(0);

    const resolveColors = () => {
      fills.length = 0;
      for (const value of sourceColors) {
        canvas.style.color = value;
        fills.push(getComputedStyle(canvas).color);
      }
      canvas.style.color = "";
    };

    const init = () => {
      count = Math.min(
        MAX_PIECES,
        Math.round(((width * height) / 7000) * density)
      );
      px = new Float32Array(count);
      py = new Float32Array(count);
      pSize = new Float32Array(count);
      pFall = new Float32Array(count);
      pAngle = new Float32Array(count);
      pSpin = new Float32Array(count);
      pFlip = new Float32Array(count);
      pFlipSpeed = new Float32Array(count);
      pSway = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        px[i] = Math.random() * width;
        py[i] = Math.random() * height;
        pSize[i] = 5 + Math.random() * 7;
        pFall[i] = 40 + Math.random() * 70;
        pAngle[i] = Math.random() * Math.PI * 2;
        pSpin[i] = (Math.random() - 0.5) * 6;
        pFlip[i] = Math.random() * Math.PI * 2;
        pFlipSpeed[i] = 2 + Math.random() * 4;
        pSway[i] = Math.random() * Math.PI * 2;
      }
    };

    const step = (dt: number) => {
      for (let i = 0; i < count; i++) {
        py[i] += pFall[i] * speed * dt;
        pSway[i] += dt * 1.5;
        px[i] += Math.sin(pSway[i]) * 25 * dt;
        pAngle[i] += pSpin[i] * dt;
        pFlip[i] += pFlipSpeed[i] * dt;
        if (py[i] > height + pSize[i]) {
          py[i] = -pSize[i];
          px[i] = Math.random() * width;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const colorCount = fills.length;
      if (!colorCount) return;
      ctx.globalAlpha = 0.9;
      // One path per color: piece i uses color i % colorCount.
      for (let c = 0; c < colorCount; c++) {
        ctx.fillStyle = fills[c];
        ctx.beginPath();
        for (let i = c; i < count; i += colorCount) {
          // Rotated rectangle, squashed horizontally by the flip to fake a 3D tumble.
          const hw = (pSize[i] / 2) * Math.abs(Math.cos(pFlip[i]));
          const hh = pSize[i] * 0.3;
          const cos = Math.cos(pAngle[i]);
          const sin = Math.sin(pAngle[i]);
          const x = px[i];
          const y = py[i];
          ctx.moveTo(x - hw * cos + hh * sin, y - hw * sin - hh * cos);
          ctx.lineTo(x + hw * cos + hh * sin, y + hw * sin - hh * cos);
          ctx.lineTo(x + hw * cos - hh * sin, y + hw * sin + hh * cos);
          ctx.lineTo(x - hw * cos - hh * sin, y - hw * sin + hh * cos);
          ctx.closePath();
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = root.clientWidth;
      height = root.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!width || !height) return;
      init();
      draw();
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reducedMotion || raf || !visible || !width || !height) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resolveColors();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(root);

    const themeObserver = new MutationObserver(() => {
      resolveColors();
      if (!raf && width && height) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [colorKey, density, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="confetti-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
