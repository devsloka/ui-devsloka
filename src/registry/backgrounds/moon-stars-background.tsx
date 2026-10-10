"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type MoonStarsBackgroundProps = React.ComponentProps<"div"> & {
  /** Multiplier for the number of stars (capped by area). */
  density?: number;
  /** Show an occasional shooting star. */
  shootingStars?: boolean;
};

const MAX_STARS = 320;
const STAR_TINTS = ["255,255,255", "190,215,255", "255,235,190"];
const STAR_TINT_SHARE = [0.8, 0.1, 0.1];
const TRAIL_LENGTH = 120;
const SHOOTING_POOL = 2;
/** Crater layout relative to the moon radius (x, y, radius). */
const CRATERS = [
  [-0.2, -0.3, 0.15],
  [0.3, 0.2, 0.1],
  [-0.1, 0.4, 0.12],
  [0.4, -0.4, 0.08],
  [-0.4, 0.1, 0.1],
  [0.1, -0.1, 0.2],
  [-0.3, -0.4, 0.07],
  [0.2, 0.3, 0.09],
] as const;

function createGlowSprite(rgb: string) {
  const size = 32;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (sctx) {
    const half = size / 2;
    const gradient = sctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, `rgba(${rgb},1)`);
    gradient.addColorStop(0.2, `rgba(${rgb},0.85)`);
    gradient.addColorStop(0.35, `rgba(${rgb},0.2)`);
    gradient.addColorStop(1, `rgba(${rgb},0)`);
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

/** Pre-renders the moon (glow, body, craters) into a sprite `radius * 6` wide. */
function renderMoon(sprite: HTMLCanvasElement, radius: number, dpr: number) {
  const size = Math.ceil(radius * 6);
  sprite.width = Math.ceil(size * dpr);
  sprite.height = Math.ceil(size * dpr);
  const mctx = sprite.getContext("2d");
  if (!mctx) return;
  mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const c = size / 2;

  const glow = mctx.createRadialGradient(c, c, radius * 0.9, c, c, radius * 3);
  glow.addColorStop(0, "rgba(255,255,230,0.3)");
  glow.addColorStop(1, "rgba(255,255,230,0)");
  mctx.fillStyle = glow;
  mctx.fillRect(0, 0, size, size);

  const body = mctx.createRadialGradient(
    c - radius * 0.3,
    c - radius * 0.3,
    0,
    c,
    c,
    radius
  );
  body.addColorStop(0, "rgb(255,255,232)");
  body.addColorStop(0.7, "rgb(250,248,212)");
  body.addColorStop(1, "rgb(236,234,190)");
  mctx.fillStyle = body;
  mctx.beginPath();
  mctx.arc(c, c, radius, 0, Math.PI * 2);
  mctx.fill();

  mctx.lineWidth = 1;
  mctx.strokeStyle = "rgba(255,255,255,0.3)";
  for (const [x, y, r] of CRATERS) {
    const px = c + x * radius;
    const py = c + y * radius;
    const pr = r * radius;
    const crater = mctx.createRadialGradient(px, py, 0, px, py, pr);
    crater.addColorStop(0, "rgba(205,205,185,1)");
    crater.addColorStop(1, "rgba(228,228,205,0.8)");
    mctx.fillStyle = crater;
    mctx.beginPath();
    mctx.arc(px, py, pr, 0, Math.PI * 2);
    mctx.fill();
    mctx.stroke();
  }
}

/** Night sky with a glowing moon, twinkling stars and the odd shooting star. Dark by design; override the base with `from-*`/`via-*`/`to-*` classes. */
export function MoonStarsBackground({
  density = 1,
  shootingStars = true,
  className,
  ...props
}: MoonStarsBackgroundProps) {
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
    const sprites = STAR_TINTS.map(createGlowSprite);
    const moon = document.createElement("canvas");
    const trail = ctx.createLinearGradient(0, 0, -TRAIL_LENGTH, 0);
    trail.addColorStop(0, "rgba(255,255,255,0.9)");
    trail.addColorStop(1, "rgba(255,255,255,0)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let moonRadius = 0;
    let time = 0;
    let nextShootingStar = 3;
    let raf = 0;
    let last = 0;
    let visible = true;

    let starCount = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let sSize = new Float32Array(0);
    let sPhase = new Float32Array(0);
    let sTwinkle = new Float32Array(0);
    let sTint = new Uint8Array(0);

    // Shooting star pool: position, velocity, age and lifetime.
    const shX = new Float32Array(SHOOTING_POOL);
    const shY = new Float32Array(SHOOTING_POOL);
    const shVx = new Float32Array(SHOOTING_POOL);
    const shVy = new Float32Array(SHOOTING_POOL);
    const shAge = new Float32Array(SHOOTING_POOL);
    const shLife = new Float32Array(SHOOTING_POOL);

    const init = () => {
      starCount = Math.min(
        MAX_STARS,
        Math.round(((width * height) / 2800) * density)
      );
      sx = new Float32Array(starCount);
      sy = new Float32Array(starCount);
      sSize = new Float32Array(starCount);
      sPhase = new Float32Array(starCount);
      sTwinkle = new Float32Array(starCount);
      sTint = new Uint8Array(starCount);
      let tint = 0;
      let tintEnd = Math.round(starCount * STAR_TINT_SHARE[0]);
      for (let i = 0; i < starCount; i++) {
        while (i >= tintEnd && tint < STAR_TINTS.length - 1) {
          tint++;
          tintEnd += Math.round(starCount * STAR_TINT_SHARE[tint]);
        }
        sx[i] = Math.random() * width;
        sy[i] = Math.random() * height * 0.85;
        sSize[i] = 0.5 + Math.random() * 1.5;
        sPhase[i] = Math.random() * Math.PI * 2;
        sTwinkle[i] = 0.6 + Math.random() * 2.4;
        sTint[i] = tint;
      }

      moonRadius = Math.max(20, Math.min(80, Math.min(width, height) * 0.1));
      renderMoon(moon, moonRadius, dpr);
      shLife.fill(0);
    };

    const spawnShootingStar = () => {
      for (let i = 0; i < SHOOTING_POOL; i++) {
        if (shLife[i] > 0) continue;
        const angle = Math.PI / 6 + Math.random() * (Math.PI / 6);
        const direction = Math.random() < 0.5 ? 1 : -1;
        const velocity = 500 + Math.random() * 400;
        shX[i] = Math.random() * width;
        shY[i] = Math.random() * height * 0.4;
        shVx[i] = Math.cos(angle) * velocity * direction;
        shVy[i] = Math.sin(angle) * velocity;
        shAge[i] = 0;
        shLife[i] = 0.8 + Math.random() * 0.6;
        return;
      }
    };

    const step = (dt: number) => {
      time += dt;
      if (!shootingStars) return;
      if (time >= nextShootingStar) {
        spawnShootingStar();
        nextShootingStar = time + 3 + Math.random() * 6;
      }
      for (let i = 0; i < SHOOTING_POOL; i++) {
        if (shLife[i] <= 0) continue;
        shAge[i] += dt;
        shX[i] += shVx[i] * dt;
        shY[i] += shVy[i] * dt;
        if (shAge[i] >= shLife[i]) shLife[i] = 0;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < starCount; i++) {
        const twinkle = Math.sin(time * sTwinkle[i] + sPhase[i]) * 0.5 + 0.5;
        const radius = sSize[i] * 4 * (0.6 + twinkle * 0.4);
        ctx.globalAlpha = 0.35 + twinkle * 0.65;
        ctx.drawImage(
          sprites[sTint[i]],
          sx[i] - radius,
          sy[i] - radius,
          radius * 2,
          radius * 2
        );
      }

      const moonSize = moonRadius * 6;
      ctx.globalAlpha = 0.92 + Math.sin(time * 0.4) * 0.08;
      ctx.drawImage(
        moon,
        width * 0.8 - moonSize / 2,
        height * 0.3 - moonSize / 2,
        moonSize,
        moonSize
      );

      ctx.strokeStyle = trail;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (let i = 0; i < SHOOTING_POOL; i++) {
        if (shLife[i] <= 0) continue;
        const progress = shAge[i] / shLife[i];
        const angle = Math.atan2(shVy[i], shVx[i]);
        const cos = Math.cos(angle) * dpr;
        const sin = Math.sin(angle) * dpr;
        ctx.globalAlpha = Math.sin(progress * Math.PI);
        ctx.setTransform(cos, sin, -sin, cos, shX[i] * dpr, shY[i] * dpr);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-TRAIL_LENGTH * Math.min(1, progress * 3), 0);
        ctx.stroke();
        ctx.drawImage(sprites[0], -8, -8, 16, 16);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [density, shootingStars]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="moon-stars-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-linear-to-b from-[oklch(0.19_0.04_245)] via-[oklch(0.27_0.07_250)] to-[oklch(0.19_0.04_245)]",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
