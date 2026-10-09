"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type FirefliesBackgroundProps = React.ComponentProps<"div"> & {
  /** Glow color. Any CSS color, including theme vars like `var(--primary)`. */
  color?: string;
  /** Multiplier for the number of fireflies (capped by area). */
  density?: number;
  /** Drift speed multiplier. */
  speed?: number;
};

const MAX_FIREFLIES = 140;
const SPRITE_SIZE = 64;

/** Glowing particles drifting and pulsing in the dark. Dark by design; override the base with a `bg-*` class. */
export function FirefliesBackground({
  color = "oklch(0.9 0.16 95)",
  density = 1,
  speed = 1,
  className,
  ...props
}: FirefliesBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;

    let width = 0;
    let height = 0;
    let time = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    let count = 0;
    let fx = new Float32Array(0);
    let fy = new Float32Array(0);
    let fAngle = new Float32Array(0);
    let fSpeed = new Float32Array(0);
    let fSize = new Float32Array(0);
    let fPhase = new Float32Array(0);
    let fPulse = new Float32Array(0);

    /** Tints a white radial glow with the resolved color (supports CSS vars). */
    const renderSprite = () => {
      canvas.style.color = color;
      const resolved = getComputedStyle(canvas).color;
      const sctx = sprite.getContext("2d");
      if (!sctx) return;
      const half = SPRITE_SIZE / 2;
      sctx.globalCompositeOperation = "source-over";
      sctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      const glow = sctx.createRadialGradient(half, half, 0, half, half, half);
      glow.addColorStop(0, "rgba(255,255,255,1)");
      glow.addColorStop(0.1, "rgba(255,255,255,0.9)");
      glow.addColorStop(0.25, "rgba(255,255,255,0.35)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = glow;
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      sctx.globalCompositeOperation = "source-in";
      sctx.fillStyle = resolved;
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      // Hot white core.
      sctx.globalCompositeOperation = "lighter";
      const core = sctx.createRadialGradient(half, half, 0, half, half, half * 0.12);
      core.addColorStop(0, "rgba(255,255,255,0.8)");
      core.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = core;
      sctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    };

    const init = () => {
      count = Math.min(
        MAX_FIREFLIES,
        Math.round(((width * height) / 6000) * density)
      );
      fx = new Float32Array(count);
      fy = new Float32Array(count);
      fAngle = new Float32Array(count);
      fSpeed = new Float32Array(count);
      fSize = new Float32Array(count);
      fPhase = new Float32Array(count);
      fPulse = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        fx[i] = Math.random() * width;
        fy[i] = Math.random() * height;
        fAngle[i] = Math.random() * Math.PI * 2;
        fSpeed[i] = 8 + Math.random() * 22;
        fSize[i] = 1 + Math.random() * 2;
        fPhase[i] = Math.random() * Math.PI * 2;
        fPulse[i] = 0.6 + Math.random() * 1.8;
      }
    };

    const step = (dt: number) => {
      time += dt;
      const margin = 40;
      for (let i = 0; i < count; i++) {
        fAngle[i] += (Math.random() - 0.5) * 4 * dt;
        const v = fSpeed[i] * speed * dt;
        fx[i] += Math.cos(fAngle[i]) * v;
        fy[i] += Math.sin(fAngle[i]) * v;
        if (fx[i] < -margin) fx[i] = width + margin;
        else if (fx[i] > width + margin) fx[i] = -margin;
        if (fy[i] < -margin) fy[i] = height + margin;
        else if (fy[i] > height + margin) fy[i] = -margin;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < count; i++) {
        const glow = Math.sin(time * fPulse[i] + fPhase[i]) * 0.5 + 0.5;
        const radius = fSize[i] * 10;
        ctx.globalAlpha = 0.15 + glow * 0.85;
        ctx.drawImage(
          sprite,
          fx[i] - radius,
          fy[i] - radius,
          radius * 2,
          radius * 2
        );
      }
      ctx.globalCompositeOperation = "source-over";
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

    renderSprite();

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

    // Re-tint when the theme changes (matters when `color` is a CSS var).
    const themeObserver = new MutationObserver(() => {
      renderSprite();
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
  }, [color, density, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="fireflies-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.16_0.03_255)]",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
