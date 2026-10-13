"use client";

import { isValidElement, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProfileImage = { src: string; alt: string };
export type ProfileStat = { label: React.ReactNode; value: React.ReactNode };
export type ProfileLink = { href: string; label: React.ReactNode };

export type ProfileCardProps = Omit<React.ComponentProps<"article">, "title"> & {
  name: React.ReactNode;
  handle?: React.ReactNode;
  verified?: boolean;
  /** An image, or any node such as an inline SVG logo. */
  avatar?: ProfileImage | React.ReactNode;
  /** Cover image. Leave it out to use the animated pixel field, tinted by `accent`. */
  cover?: ProfileImage;
  bio?: React.ReactNode;
  stats?: ProfileStat[];
  link?: ProfileLink;
  /** Any CSS color. Tints the cover, badge, follow button and link icon. */
  accent?: string;
  /** Follow state (controlled). */
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowingChange?: (following: boolean) => void;
  /** Set to false to hide the follow button. */
  showFollow?: boolean;
  followLabel?: React.ReactNode;
  followingLabel?: React.ReactNode;
};

const isImage = (value: unknown): value is ProfileImage =>
  typeof value === "object" &&
  value !== null &&
  !isValidElement(value) &&
  "src" in value;

export function ProfileCard({
  name,
  handle,
  verified = false,
  avatar,
  cover,
  bio,
  stats,
  link,
  accent = "#0A6EFF",
  following,
  defaultFollowing = false,
  onFollowingChange,
  showFollow = true,
  followLabel = "Follow",
  followingLabel = "Following",
  className,
  style,
  ...props
}: ProfileCardProps) {
  const nameId = useId();
  const [uncontrolledFollowing, setUncontrolledFollowing] = useState(defaultFollowing);
  const isFollowing = following ?? uncontrolledFollowing;
  const toggleFollowing = () => {
    const next = !isFollowing;
    if (following === undefined) setUncontrolledFollowing(next);
    onFollowingChange?.(next);
  };

  return (
    <article
      data-slot="profile-card"
      aria-labelledby={nameId}
      style={
        {
          "--profile-accent": accent,
          "--profile-cover": `color-mix(in oklab, ${accent} 7%, white)`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "group w-full max-w-sm rounded-[2rem] bg-neutral-900 p-2.5 text-white shadow-2xl shadow-black/25",
        className
      )}
      {...props}
    >
      <div className="relative isolate aspect-[10/11] overflow-hidden rounded-[1.5rem] bg-[var(--profile-cover)]">
        {isImage(cover) ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="384px"
            className="-z-10 object-cover"
          />
        ) : (
          <PixelCover accent={accent} />
        )}
        {/* Calms the bottom of the cover so the name and button keep their contrast. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(to_top,var(--profile-cover)_25%,transparent)]"
        />

        <div className="absolute inset-x-3 bottom-3 flex items-end gap-3.5">
          {avatar != null && (
            <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-neutral-900 shadow-xl shadow-black/30 ring-1 ring-black/5">
              {isImage(avatar) ? (
                <Image src={avatar.src} alt={avatar.alt} fill sizes="88px" className="object-cover" />
              ) : (
                avatar
              )}
            </div>
          )}

          <div className="min-w-0 pb-0.5 text-neutral-900">
            <h3
              id={nameId}
              className="flex items-center gap-1.5 text-2xl leading-tight font-semibold tracking-[-0.03em]"
            >
              <span className="truncate">{name}</span>
              {verified && (
                <BadgeCheck
                  role="img"
                  aria-label="Verified account"
                  className="size-6 shrink-0 fill-[var(--profile-accent)] text-white"
                />
              )}
            </h3>
            {handle && <p className="truncate text-sm text-neutral-900/55">{handle}</p>}

            {showFollow && (
              <button
                type="button"
                aria-pressed={isFollowing}
                onClick={toggleFollowing}
                className={cn(
                  "mt-3 inline-grid h-10 cursor-pointer place-items-center rounded-full px-6 text-[0.9375rem] font-medium outline-none transition-[background-color,color,box-shadow,filter,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--profile-cover)] active:scale-[0.97] motion-reduce:active:scale-100",
                  isFollowing
                    ? "bg-white/80 text-neutral-900 ring-1 ring-neutral-900/15 backdrop-blur hover:bg-white"
                    : "bg-[var(--profile-accent)] text-white shadow-lg shadow-[color-mix(in_oklab,var(--profile-accent)_40%,transparent)] hover:brightness-110"
                )}
              >
                {/* Both labels share one cell, so the button keeps the wider width and never jumps. */}
                <FollowLabel visible={!isFollowing}>{followLabel}</FollowLabel>
                <FollowLabel visible={isFollowing}>
                  <Check aria-hidden className="size-4" />
                  {followingLabel}
                </FollowLabel>
              </button>
            )}
          </div>
        </div>
      </div>

      {(bio || stats?.length || link) && (
        <div className="space-y-4 px-3.5 pt-5 pb-4">
          {bio && <p className="text-[0.9375rem] leading-snug text-white/90 text-pretty">{bio}</p>}

          {stats && stats.length > 0 && (
            <dl className="flex flex-wrap gap-x-7 gap-y-1 text-[0.9375rem]">
              {stats.map((stat, i) => (
                // Value before label visually, but the dt still names the dd for screen readers.
                <div key={i} className="flex flex-row-reverse gap-1">
                  <dt className="text-white/50">{stat.label}</dt>
                  <dd className="font-medium tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-[0.9375rem] outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Link2 aria-hidden className="size-4 -rotate-45 text-[var(--profile-accent)]" />
              {link.label}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function FollowLabel({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <span
      aria-hidden={!visible}
      className={cn(
        "inline-flex items-center gap-1.5 transition-[opacity,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [grid-area:1/1]",
        visible ? "opacity-100" : "opacity-0 blur-[2px] motion-reduce:blur-none"
      )}
    >
      {children}
    </span>
  );
}

const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
const FPS = 30;
const TRAIL_LIFE = 700;
const TRAIL_RADIUS = 16;

// Stable per-cell noise in [0, 1), so cells keep their identity between frames.
const hash = (x: number, y: number, salt = 0) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + salt) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// How far each column hangs down, as a share of the rows: slow sine waves, like
// an upside-down equalizer, so the bottom of the cover stays calm.
const columnLevel = (column: number, time: number) =>
  clamp(
    0.4 +
      0.12 * Math.sin(column * 0.33 + time * 0.6) +
      0.08 * Math.sin(column * 0.87 - time * 0.9 + 1.3) +
      0.05 * Math.sin(column * 1.7 + time * 1.5),
    0.15,
    0.72
  );

// A pixel field in the accent color, with a cursor trail on hover.
function PixelCover({ accent: accentProp }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;
    let accent = "";
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let frameId = 0;
    let lastFrame = 0;
    let isVisible = false;
    let trail = new Map<number, number>();
    let lastPointer: { x: number; y: number } | null = null;

    const draw = (now: number) => {
      const time = now / 1000;
      const flickerStep = Math.floor(time * 0.8);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accent;

      for (let column = 0; column < columns; column++) {
        const level = columnLevel(column, time) * rows;
        for (let row = 0; row < rows; row++) {
          const depth = level - row;
          const isFloater = depth <= -1;
          const presence = isFloater ? 0.03 : depth > 1.5 ? 0.92 : 0.45 + depth * 0.3;
          const roll = isFloater
            ? hash(column, row * 31 + flickerStep, 7)
            : hash(column, row);
          if (roll >= presence) continue;

          const isSpark = hash(column, row, 11) < 0.04;
          let alpha = isFloater
            ? 0.25
            : clamp(1 - (row / rows) * 1.3, 0.12, 1) * (0.45 + 0.55 * hash(column, row, 3));
          if (hash(column, row, 19) < 0.16) alpha *= 0.35;
          ctx.globalAlpha = isSpark ? 1 : alpha;
          ctx.fillRect(offsetX + column * PITCH, row * PITCH, CELL, CELL);
        }
      }

      for (const [key, born] of trail) {
        const age = now - born;
        if (age >= TRAIL_LIFE) {
          trail.delete(key);
          continue;
        }
        const fade = 1 - age / TRAIL_LIFE;
        ctx.globalAlpha = fade * fade * 0.85;
        ctx.fillRect(offsetX + (key % columns) * PITCH, Math.floor(key / columns) * PITCH, CELL, CELL);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      if (now - lastFrame < 1000 / FPS) return;
      lastFrame = now;
      draw(now);
    };
    const start = () => {
      if (!reduceMotion && isVisible && !frameId) frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The canvas sits under text-[var(--profile-accent)], so its color is the accent.
      // Read it here rather than every frame; a new accent re-renders and resizes rarely.
      accent = getComputedStyle(canvas).color;
      columns = Math.floor((width + GAP) / PITCH);
      rows = Math.ceil(height / PITCH);
      offsetX = Math.floor((width - (columns * PITCH - GAP)) / 2);
      // Trail keys encode the column count, so they're stale after a resize.
      trail = new Map();
      draw(performance.now());
    };

    // Light the cells near one point; revisiting a cell restarts its fade.
    const paint = (x: number, y: number, now: number) => {
      const minColumn = Math.max(0, Math.floor((x - TRAIL_RADIUS - offsetX) / PITCH));
      const maxColumn = Math.min(columns - 1, Math.ceil((x + TRAIL_RADIUS - offsetX) / PITCH));
      const minRow = Math.max(0, Math.floor((y - TRAIL_RADIUS) / PITCH));
      const maxRow = Math.min(rows - 1, Math.ceil((y + TRAIL_RADIUS) / PITCH));
      for (let column = minColumn; column <= maxColumn; column++) {
        for (let row = minRow; row <= maxRow; row++) {
          const dx = offsetX + column * PITCH + CELL / 2 - x;
          const dy = row * PITCH + CELL / 2 - y;
          if (Math.hypot(dx, dy) <= TRAIL_RADIUS) trail.set(row * columns + column, now);
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const next = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const now = performance.now();
      // Fast moves skip cells between events, so fill in the path between them.
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

    // Follow the OS setting live: freeze on a still frame when reduced motion turns on.
    const handleMotionChange = () => {
      reduceMotion = motionQuery.matches;
      if (reduceMotion) {
        stop();
        trail = new Map();
        draw(performance.now());
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Only animate while the card is on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
    // Re-run when the accent changes so the cached canvas colour stays current.
  }, [accentProp]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 -z-20 block size-full text-[var(--profile-accent)]"
    />
  );
}
