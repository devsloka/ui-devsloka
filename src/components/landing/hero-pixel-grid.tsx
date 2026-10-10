"use client";

import { useEffect, useRef } from "react";

// Same cell rhythm as the footer pixel field, so the page opens and closes on one motif.
const CELL = 14;
const GAP = 4;
const PITCH = CELL + GAP;
const BLUE = "10, 110, 255";
// Grey reads stronger on white, so the idle grid is quieter in light mode.
const BASE_COLOR = { dark: "rgba(128, 128, 128, 0.055)", light: "rgba(128, 128, 128, 0.03)" };
const TWINKLE_LIFE = 2400;
const TWINKLES_PER_SECOND = 9;
// The cursor paints cells as it moves; each one lingers briefly, then fades out.
const TRAIL_LIFE = 900;
const TRAIL_RADIUS = 26;
const TRAIL_ALPHA = 0.6;

type Twinkle = { column: number; row: number; born: number; strength: number };
type TrailCell = { born: number; strength: number };

export function HeroPixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement?.parentElement;
    if (!canvas || !ctx || !host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const baseLayer = document.createElement("canvas");
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let dpr = 1;
    let frameId = 0;
    let lastSpawn = 0;
    let twinkles: Twinkle[] = [];
    let trail = new Map<number, TrailCell>();
    let lastPointer: { x: number; y: number } | null = null;

    const cellX = (column: number) => offsetX + column * PITCH;
    const cellY = (row: number) => row * PITCH;

    // The idle grid never changes, so draw it once per resize and blit it.
    const drawBaseLayer = () => {
      baseLayer.width = canvas.width;
      baseLayer.height = canvas.height;
      const baseCtx = baseLayer.getContext("2d");
      if (!baseCtx) return;
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isDark = document.documentElement.classList.contains("dark");
      baseCtx.fillStyle = isDark ? BASE_COLOR.dark : BASE_COLOR.light;
      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          baseCtx.fillRect(cellX(column), cellY(row), CELL, CELL);
        }
      }
    };

    const fillCell = (column: number, row: number, alpha: number) => {
      ctx.fillStyle = `rgba(${BLUE}, ${alpha})`;
      ctx.fillRect(cellX(column), cellY(row), CELL, CELL);
    };

    const render = (now: number) => {
      // Before the first layout the canvas can be 0×0, and drawImage throws on it.
      if (!canvas.width || !canvas.height) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseLayer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Twinkles fade in and out along a sine curve, then retire.
      twinkles = twinkles.filter((twinkle) => now - twinkle.born < TWINKLE_LIFE);
      for (const twinkle of twinkles) {
        const progress = (now - twinkle.born) / TWINKLE_LIFE;
        fillCell(
          twinkle.column,
          twinkle.row,
          Math.sin(progress * Math.PI) * twinkle.strength
        );
      }

      for (const [key, cell] of trail) {
        const age = now - cell.born;
        if (age >= TRAIL_LIFE) {
          trail.delete(key);
          continue;
        }
        const fade = 1 - age / TRAIL_LIFE;
        fillCell(key % columns, Math.floor(key / columns), fade * fade * cell.strength * TRAIL_ALPHA);
      }
    };

    // Light up the cells around one point; revisiting a cell restarts its fade.
    const paint = (x: number, y: number, now: number) => {
      const minColumn = Math.max(0, Math.floor((x - TRAIL_RADIUS - offsetX) / PITCH));
      const maxColumn = Math.min(columns - 1, Math.ceil((x + TRAIL_RADIUS - offsetX) / PITCH));
      const minRow = Math.max(0, Math.floor((y - TRAIL_RADIUS) / PITCH));
      const maxRow = Math.min(rows - 1, Math.ceil((y + TRAIL_RADIUS) / PITCH));

      for (let column = minColumn; column <= maxColumn; column++) {
        for (let row = minRow; row <= maxRow; row++) {
          const dx = cellX(column) + CELL / 2 - x;
          const dy = cellY(row) + CELL / 2 - y;
          const strength = 1 - Math.hypot(dx, dy) / TRAIL_RADIUS;
          if (strength <= 0) continue;
          const key = row * columns + column;
          const existing = trail.get(key);
          trail.set(key, {
            born: now,
            strength: Math.max(strength, existing ? existing.strength : 0),
          });
        }
      }
    };

    const spawn = (now: number) => {
      const due = Math.floor(((now - lastSpawn) / 1000) * TWINKLES_PER_SECOND);
      if (due < 1) return;
      lastSpawn = now;
      for (let i = 0; i < due; i++) {
        twinkles.push({
          column: Math.floor(Math.random() * columns),
          row: Math.floor(Math.random() * rows),
          born: now,
          strength: 0.25 + Math.random() * 0.45,
        });
      }
    };

    const loop = (now: number) => {
      spawn(now);
      render(now);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frameId && !reduceMotion) {
        lastSpawn = performance.now();
        frameId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      columns = Math.floor((width + GAP) / PITCH);
      rows = Math.floor((height + GAP) / PITCH);
      offsetX = Math.floor((width - (columns * PITCH - GAP)) / 2);
      // Trail keys encode the column count, so they're stale after a resize.
      trail = new Map();
      drawBaseLayer();
      render(performance.now());
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const next = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const now = performance.now();
      // Fast moves skip whole cells between events, so fill in the path between them.
      const from = lastPointer ?? next;
      const steps = Math.max(1, Math.ceil(Math.hypot(next.x - from.x, next.y - from.y) / (PITCH / 2)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        paint(from.x + (next.x - from.x) * t, from.y + (next.y - from.y) * t, now);
      }
      lastPointer = next;
    };
    const handlePointerLeave = () => {
      lastPointer = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    // next-themes toggles the class on <html>; repaint the idle grid to match.
    const themeObserver = new MutationObserver(() => {
      drawBaseLayer();
      render(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_38%,#000_30%,transparent_100%)]"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
