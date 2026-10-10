"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type RippleBackgroundProps = React.ComponentProps<"div"> & {
  /** Ring color. Defaults to the current text color (set it with a `text-*` class). */
  color?: string;
  /** Spawn ripples from pointer movement and clicks on the parent element. */
  interactive?: boolean;
  /** Expansion speed multiplier. */
  speed?: number;
};

const POOL_SIZE = 48;
const MAX_ALPHA = 0.45;

/** Expanding rings that appear on their own and follow the pointer over the parent element. */
export function RippleBackground({
  color,
  interactive = true,
  speed = 1,
  className,
  ...props
}: RippleBackgroundProps) {
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

    let width = 0;
    let height = 0;
    let stroke = "";
    let nextAmbient = 0;
    let time = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    // Fixed ring buffer of ripples; radius < maxRadius means active.
    const rx = new Float32Array(POOL_SIZE);
    const ry = new Float32Array(POOL_SIZE);
    const rRadius = new Float32Array(POOL_SIZE);
    const rMax = new Float32Array(POOL_SIZE);
    const rSpeed = new Float32Array(POOL_SIZE);
    const rWidth = new Float32Array(POOL_SIZE);
    let cursor = 0;

    const resolveColor = () => {
      canvas.style.color = color ?? "";
      stroke = getComputedStyle(canvas).color;
    };

    const spawn = (x: number, y: number, strength: number, radius = 0) => {
      const i = cursor;
      cursor = (cursor + 1) % POOL_SIZE;
      rx[i] = x;
      ry[i] = y;
      rMax[i] = (120 + Math.random() * 160) * strength;
      rRadius[i] = Math.min(radius, rMax[i] - 1);
      rSpeed[i] = 70 + Math.random() * 90;
      rWidth[i] = 1 + Math.random() * 1.5;
    };

    const seedStatic = () => {
      rRadius.fill(0);
      rMax.fill(0);
      const cx = width / 2;
      const cy = height / 2;
      for (let i = 0; i < 5; i++) spawn(cx, cy, 1.6, 30 + i * 45);
    };

    const step = (dt: number) => {
      time += dt;
      if (time >= nextAmbient) {
        spawn(Math.random() * width, Math.random() * height, 1);
        nextAmbient = time + 0.6 + Math.random() * 1.2;
      }
      for (let i = 0; i < POOL_SIZE; i++) {
        if (rRadius[i] < rMax[i]) rRadius[i] += rSpeed[i] * speed * dt;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = stroke;
      for (let i = 0; i < POOL_SIZE; i++) {
        const max = rMax[i];
        const radius = rRadius[i];
        if (radius >= max) continue;
        const progress = radius / max;
        ctx.globalAlpha = MAX_ALPHA * (1 - progress) * (1 - progress);
        ctx.lineWidth = rWidth[i] * (1.5 - progress);
        ctx.beginPath();
        ctx.arc(rx[i], ry[i], radius, 0, Math.PI * 2);
        ctx.stroke();
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
      if (reducedMotion) seedStatic();
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

    resolveColor();

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
      resolveColor();
      if (!raf && width && height) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    const parent = root.parentElement;
    let lastX = -1e4;
    let lastY = -1e4;
    let lastStamp = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (!raf) return;
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const moved = Math.hypot(x - lastX, y - lastY);
      if (moved < 24 || event.timeStamp - lastStamp < 60) return;
      lastX = x;
      lastY = y;
      lastStamp = event.timeStamp;
      spawn(x, y, 0.7);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!raf) return;
      const rect = root.getBoundingClientRect();
      spawn(event.clientX - rect.left, event.clientY - rect.top, 1.6);
    };
    const listen = interactive && !reducedMotion && parent;
    if (listen) {
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerdown", onPointerDown);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      if (listen) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerdown", onPointerDown);
      }
    };
  }, [color, interactive, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="ripple-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
