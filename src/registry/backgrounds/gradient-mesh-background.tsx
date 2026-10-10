"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type GradientMeshBackgroundProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** One moving color point per entry. Any CSS colors, including `var(--token)`. Defaults to the theme chart colors. */
  colors?: string[];
  /** Opacity of each color point, 0–1. @default 0.5 */
  intensity?: number;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
};

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/** Glow sprites are rendered small once and scaled up; a radial falloff stays smooth when scaled. */
const SPRITE_SIZE = 128;

type Point = { sprite: HTMLCanvasElement; fx: number; fy: number; px: number; py: number };

/** Large soft color points drifting on looping paths, blending into a moving mesh gradient. */
export function GradientMeshBackground({
  colors = DEFAULT_COLORS,
  intensity = 0.5,
  speed = 1,
  className,
  ...props
}: GradientMeshBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsKey = colors.join("|");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const palette = colorsKey ? colorsKey.split("|") : [];
    const alpha = Math.max(0, Math.min(1, intensity));
    const rate = (speed > 0 ? speed : 1) * 0.15;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Each point gets its own frequencies and phases so the paths never line up.
    const points: Point[] = palette.map((_, i) => ({
      sprite: document.createElement("canvas"),
      fx: 0.7 + ((i * 0.37) % 0.6),
      fy: 0.5 + ((i * 0.53) % 0.7),
      px: i * 2.1,
      py: i * 1.3 + 0.8,
    }));

    let width = 0;
    let height = 0;
    let time = 0;
    let lastTime = 0;
    let frame = 0;
    let inView = true;

    // Resolve each color (CSS variables included) through the canvas' computed style, then paint its sprite.
    const paintSprites = () => {
      points.forEach((point, i) => {
        canvas.style.color = palette[i];
        const resolved = getComputedStyle(canvas).color;
        const sprite = point.sprite;
        sprite.width = sprite.height = SPRITE_SIZE;
        const sctx = sprite.getContext("2d");
        if (!sctx) return;
        const r = SPRITE_SIZE / 2;
        sctx.globalCompositeOperation = "source-over";
        sctx.fillStyle = resolved;
        sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
        // Keep only the alpha falloff, so the color never fades through black.
        const falloff = sctx.createRadialGradient(r, r, 0, r, r, r);
        falloff.addColorStop(0, "rgba(0,0,0,1)");
        falloff.addColorStop(0.5, "rgba(0,0,0,0.5)");
        falloff.addColorStop(1, "rgba(0,0,0,0)");
        sctx.globalCompositeOperation = "destination-in";
        sctx.fillStyle = falloff;
        sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      });
      canvas.style.color = "";
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = alpha;
      const radius = Math.max(width, height) * 0.55;
      for (const point of points) {
        const x = width * (0.5 + 0.4 * Math.sin(time * point.fx + point.px));
        const y = height * (0.5 + 0.4 * Math.cos(time * point.fy + point.py));
        ctx.drawImage(point.sprite, x - radius, y - radius, radius * 2, radius * 2);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
      lastTime = now;
      time += dt * rate;
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
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
      start();
    };

    const onThemeChange = () => {
      paintSprites();
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

    paintSprites();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(root);

    // Token colors change with the theme class on <html>.
    const themeObserver = new MutationObserver(onThemeChange);
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
  }, [colorsKey, intensity, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="gradient-mesh-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
