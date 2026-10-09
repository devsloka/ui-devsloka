"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type CirclesBackgroundProps = React.ComponentProps<"div"> & {
  /** Circle color. Defaults to the current text color (set it with a `text-*` class). */
  color?: string;
  /** Multiplier for the number of circles (capped by area). */
  density?: number;
  /** Grow circles near the pointer while it is over the parent element. */
  interactive?: boolean;
  /** Drift and pulse speed multiplier. */
  speed?: number;
};

const MAX_CIRCLES = 90;
const POINTER_RADIUS = 150;

/** Softly pulsing circles drifting in small orbits; they swell near the pointer. */
export function CirclesBackground({
  color,
  density = 1,
  interactive = true,
  speed = 1,
  className,
  ...props
}: CirclesBackgroundProps) {
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
    let fill = "";
    let time = 0;
    let pointerX = -1e4;
    let pointerY = -1e4;
    let raf = 0;
    let last = 0;
    let visible = true;

    let count = 0;
    let cx = new Float32Array(0);
    let cy = new Float32Array(0);
    let cBase = new Float32Array(0);
    let cGrow = new Float32Array(0);
    let cPhase = new Float32Array(0);
    let cPulse = new Float32Array(0);
    let cOrbit = new Float32Array(0);
    let cOrbitSpeed = new Float32Array(0);

    const resolveColor = () => {
      canvas.style.color = color ?? "";
      fill = getComputedStyle(canvas).color;
    };

    const init = () => {
      count = Math.min(
        MAX_CIRCLES,
        Math.max(6, Math.round(((width * height) / 16000) * density))
      );
      cx = new Float32Array(count);
      cy = new Float32Array(count);
      cBase = new Float32Array(count);
      cGrow = new Float32Array(count).fill(1);
      cPhase = new Float32Array(count);
      cPulse = new Float32Array(count);
      cOrbit = new Float32Array(count);
      cOrbitSpeed = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        cx[i] = Math.random() * width;
        cy[i] = Math.random() * height;
        cBase[i] = 4 + Math.random() * 10;
        cPhase[i] = Math.random() * Math.PI * 2;
        cPulse[i] = 0.8 + Math.random() * 1.2;
        cOrbit[i] = Math.random() * Math.PI * 2;
        cOrbitSpeed[i] = (0.25 + Math.random() * 0.35) * (i % 2 ? 1 : -1);
      }
    };

    const step = (dt: number) => {
      time += dt * speed;
      const ease = 1 - Math.exp(-6 * dt);
      for (let i = 0; i < count; i++) {
        cOrbit[i] += cOrbitSpeed[i] * speed * dt;
        cx[i] += Math.cos(cOrbit[i]) * 12 * speed * dt;
        cy[i] += Math.sin(cOrbit[i]) * 12 * speed * dt;

        const r = cBase[i];
        if (cx[i] > width + r) cx[i] = -r;
        else if (cx[i] < -r) cx[i] = width + r;
        if (cy[i] > height + r) cy[i] = -r;
        else if (cy[i] < -r) cy[i] = height + r;

        const dx = pointerX - cx[i];
        const dy = pointerY - cy[i];
        const target = dx * dx + dy * dy < POINTER_RADIUS * POINTER_RADIUS ? 2.5 : 1;
        cGrow[i] += (target - cGrow[i]) * ease;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const pulse = 1 + Math.sin(time * cPulse[i] + cPhase[i]) * 0.3;
        const r = cBase[i] * pulse * cGrow[i];
        ctx.moveTo(cx[i] + r, cy[i]);
        ctx.arc(cx[i], cy[i], r, 0, Math.PI * 2);
      }
      ctx.fillStyle = fill;
      ctx.strokeStyle = fill;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.08;
      ctx.fill();
      ctx.globalAlpha = 0.22;
      ctx.stroke();
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
    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointerX = -1e4;
      pointerY = -1e4;
    };
    const listen = interactive && !reducedMotion && parent;
    if (listen) {
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      if (listen) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [color, density, interactive, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="circles-background"
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
