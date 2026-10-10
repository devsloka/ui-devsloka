"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type GalaxyBackgroundProps = React.ComponentProps<"div"> & {
  /** Multiplier for the number of stars and dust particles (capped by area). */
  density?: number;
  /** Animation speed multiplier. */
  speed?: number;
};

const MAX_STARS = 450;
const MAX_DUST = 1400;
const FAR_Z = 1000;
/** Star tints (r, g, b). Stars are generated in tint order so sprites stay grouped. */
const STAR_TINTS = ["255,255,255", "200,220,255", "255,220,175", "255,190,170"];
const STAR_TINT_SHARE = [0.6, 0.2, 0.1, 0.1];
/** Dust buckets: inner warm core, then two cool arm colors. */
const DUST_COLORS = ["hsl(48 85% 72%)", "hsl(228 80% 74%)", "hsl(268 70% 74%)"];
const SPIRAL_ARMS = 3;

function createGlowSprite(rgb: string) {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (sctx) {
    const half = size / 2;
    const gradient = sctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, `rgba(${rgb},1)`);
    gradient.addColorStop(0.15, `rgba(${rgb},0.9)`);
    gradient.addColorStop(0.3, `rgba(${rgb},0.25)`);
    gradient.addColorStop(1, `rgba(${rgb},0)`);
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

/** Deep-space layer: stars flying toward the viewer, a rotating spiral of dust and a soft nebula. Dark by design; override the base with a `bg-*` class. */
export function GalaxyBackground({
  density = 1,
  speed = 1,
  className,
  ...props
}: GalaxyBackgroundProps) {
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
    const nebula = document.createElement("canvas");

    let width = 0;
    let height = 0;
    let focal = 1;
    let time = 0;
    let rotation = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    // Star state (world space, projected each frame).
    let starCount = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let sz = new Float32Array(0);
    let sSize = new Float32Array(0);
    let sPhase = new Float32Array(0);
    let sTwinkle = new Float32Array(0);
    let sTint = new Uint8Array(0);

    // Dust state (polar, around the galaxy center). Generated grouped by color bucket.
    let dustCount = 0;
    let dDist = new Float32Array(0);
    let dAngle = new Float32Array(0);
    let dOffset = new Float32Array(0);
    let dSize = new Float32Array(0);
    const dustBucketEnd = [0, 0, 0];

    const placeStar = (i: number, z: number) => {
      // Spread so the star lands inside the viewport when it is at the far plane.
      const spread = FAR_Z / focal;
      sx[i] = (Math.random() - 0.5) * width * 1.2 * spread;
      sy[i] = (Math.random() - 0.5) * height * 1.2 * spread;
      sz[i] = z;
    };

    const init = () => {
      const area = width * height;
      focal = Math.max(width, height) * 0.5;

      starCount = Math.min(MAX_STARS, Math.round((area / 2600) * density));
      sx = new Float32Array(starCount);
      sy = new Float32Array(starCount);
      sz = new Float32Array(starCount);
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
        placeStar(i, 1 + Math.random() * (FAR_Z - 1));
        sSize[i] = 0.5 + Math.random() * 1.5;
        sPhase[i] = Math.random() * Math.PI * 2;
        sTwinkle[i] = 0.6 + Math.random() * 3;
        sTint[i] = tint;
      }

      dustCount = Math.min(MAX_DUST, Math.round((area / 700) * density));
      dDist = new Float32Array(dustCount);
      dAngle = new Float32Array(dustCount);
      dOffset = new Float32Array(dustCount);
      dSize = new Float32Array(dustCount);
      dustBucketEnd[0] = Math.round(dustCount * 0.3);
      dustBucketEnd[1] = Math.round(dustCount * 0.65);
      dustBucketEnd[2] = dustCount;
      for (let i = 0; i < dustCount; i++) {
        // Distance in "galaxy units" (0..300); inner bucket stays near the core.
        const inner = i < dustBucketEnd[0];
        dDist[i] = inner ? 10 + Math.random() * 90 : 90 + Math.random() * 210;
        const arm = Math.floor(Math.random() * SPIRAL_ARMS);
        const jitter = (Math.random() - 0.5) * Math.random() * 1.6;
        dAngle[i] = (arm / SPIRAL_ARMS) * Math.PI * 2 + jitter;
        dOffset[i] = (Math.random() - 0.5) * (inner ? 30 : 50);
        dSize[i] = 0.5 + Math.random() * 1.5;
      }

      renderNebula();
    };

    const renderNebula = () => {
      // Half resolution is plenty for soft, blurred clouds.
      nebula.width = Math.max(1, Math.round(width / 2));
      nebula.height = Math.max(1, Math.round(height / 2));
      const nctx = nebula.getContext("2d");
      if (!nctx) return;
      const cx = nebula.width / 2;
      const cy = nebula.height / 2;
      const r = Math.min(nebula.width, nebula.height);
      const cloud = (
        x: number,
        y: number,
        radius: number,
        rgb: string,
        alpha: number
      ) => {
        const g = nctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${rgb},${alpha})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        nctx.fillStyle = g;
        nctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      };
      nctx.clearRect(0, 0, nebula.width, nebula.height);
      cloud(cx - r * 0.25, cy + r * 0.12, r * 0.7, "110,40,160", 0.22);
      cloud(cx + r * 0.3, cy - r * 0.2, r * 0.6, "30,90,170", 0.2);
      cloud(cx + r * 0.1, cy + r * 0.3, r * 0.5, "150,40,100", 0.16);
      cloud(cx, cy, r * 0.3, "255,240,200", 0.28);
    };

    const step = (dt: number) => {
      time += dt;
      rotation += 0.05 * speed * dt;
      const dz = 30 * speed * dt;
      const marginX = width / 2 + 40;
      const marginY = height / 2 + 40;
      for (let i = 0; i < starCount; i++) {
        sz[i] -= dz;
        if (sz[i] <= 1) {
          placeStar(i, FAR_Z);
          continue;
        }
        const px = (sx[i] / sz[i]) * focal;
        const py = (sy[i] / sz[i]) * focal;
        if (px < -marginX || px > marginX || py < -marginY || py > marginY) {
          placeStar(i, FAR_Z);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      ctx.globalAlpha = 0.85 + Math.sin(time * 0.3) * 0.15;
      ctx.drawImage(nebula, 0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < starCount; i++) {
        const z = sz[i];
        const depth = 1 - z / FAR_Z;
        const px = (sx[i] / z) * focal + cx;
        const py = (sy[i] / z) * focal + cy;
        const radius = Math.max(1.5, sSize[i] * (0.4 + depth * 1.6) * 4);
        const twinkle = Math.sin(time * sTwinkle[i] + sPhase[i]) * 0.5 + 0.5;
        ctx.globalAlpha = (0.45 + twinkle * 0.55) * Math.min(1, depth * 4);
        ctx.drawImage(
          sprites[sTint[i]],
          px - radius,
          py - radius,
          radius * 2,
          radius * 2
        );
      }

      // Dust: one path + one fill per color bucket.
      const scale = Math.min(width, height) / 640;
      ctx.globalAlpha = 0.7;
      let start = 0;
      for (let b = 0; b < DUST_COLORS.length; b++) {
        const end = dustBucketEnd[b];
        ctx.fillStyle = DUST_COLORS[b];
        ctx.beginPath();
        for (let i = start; i < end; i++) {
          const d = dDist[i];
          const a = dAngle[i] + rotation + d * 0.022;
          const s = dSize[i];
          const x = cx + Math.cos(a) * d * scale;
          const y = cy + (Math.sin(a) * d * 0.6 + dOffset[i]) * scale;
          ctx.rect(x - s / 2, y - s / 2, s, s);
        }
        ctx.fill();
        start = end;
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
  }, [density, speed]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-slot="galaxy-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.13_0.035_275)]",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
