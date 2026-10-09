"use client";

import { useEffect, useRef } from "react";

const CELL = 14;
const GAP = 4;
const ROWS = 12;
const FPS = 12;
const HEIGHT = ROWS * (CELL + GAP) - GAP;

// Deep to light. Lower rows lean light, upper rows lean deep.
const PALETTE = ["#0B3D91", "#0A52C7", "#0A6EFF", "#3D8BFF", "#86B6FF"];
const ACCENT = "#A5B4FC";

// Stable per-cell noise in [0, 1), so cells keep their identity between frames.
const hash = (x: number, y: number, salt = 0) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + salt) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Column height in rows: a few slow sine waves, like a calm equalizer.
const columnLevel = (column: number, time: number) =>
  ROWS *
  clamp(
    0.44 +
      0.18 * Math.sin(column * 0.21 + time * 0.6) +
      0.12 * Math.sin(column * 0.57 - time * 0.9 + 1.3) +
      0.07 * Math.sin(column * 1.31 + time * 1.7),
    0.22,
    1
  );

function drawField(
  ctx: CanvasRenderingContext2D,
  width: number,
  time: number
) {
  ctx.clearRect(0, 0, width, HEIGHT);

  const columns = Math.floor((width + GAP) / (CELL + GAP));
  const offsetX = Math.floor((width - (columns * (CELL + GAP) - GAP)) / 2);
  const flickerStep = Math.floor(time * 0.8);

  for (let column = 0; column < columns; column++) {
    const level = columnLevel(column, time);

    for (let row = 0; row < ROWS; row++) {
      const depth = level - row;
      const isFloater = depth <= -1;
      const presence = isFloater
        ? 0.025
        : depth > 1.5
          ? 0.92
          : 0.45 + depth * 0.3;
      const roll = isFloater
        ? hash(column, row * 31 + flickerStep, 7)
        : hash(column, row);
      if (roll >= presence) continue;

      const heightRatio = row / ROWS;
      const shade = clamp(
        Math.floor((1 - heightRatio) * 4 + (hash(column, row, 3) - 0.5) * 1.6),
        0,
        PALETTE.length - 1
      );
      const isAccent = hash(column, row, 11) < 0.04;
      const isDim = hash(column, row, 19) < 0.16;

      let alpha = isFloater ? 0.35 : 1 - heightRatio * 0.55;
      if (isDim) alpha *= 0.35;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = isAccent ? ACCENT : PALETTE[shade];
      ctx.fillRect(
        offsetX + column * (CELL + GAP),
        HEIGHT - (row + 1) * (CELL + GAP) + GAP,
        CELL,
        CELL
      );
    }
  }
  ctx.globalAlpha = 1;
}

export function FooterPixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let width = 0;
    let frameId = 0;
    let lastFrame = 0;
    let isVisible = false;

    const render = (now: number) => drawField(ctx, width, now / 1000);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(HEIGHT * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      if (now - lastFrame < 1000 / FPS) return;
      lastFrame = now;
      render(now);
    };

    const start = () => {
      if (!reduceMotion && isVisible && !frameId) {
        frameId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Only animate while the footer is on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="block w-full"
      style={{ height: HEIGHT }}
    />
  );
}
