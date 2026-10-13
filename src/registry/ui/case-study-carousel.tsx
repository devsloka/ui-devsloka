"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CaseStudy = {
  /** Small mark above the title, e.g. a client logo or a category. */
  brand: React.ReactNode;
  title: string;
  description: React.ReactNode;
  href: string;
  image: { src: string; alt: string };
  stats: { value: string; label: string }[];
};

export type CaseStudyCarouselProps = Omit<React.ComponentProps<"section">, "title"> & {
  items: CaseStudy[];
  eyebrow?: React.ReactNode;
  /** Number shown before the eyebrow, e.g. "06". */
  index?: string;
  title?: React.ReactNode;
  cta?: { label: string; href: string };
  readMoreLabel?: string;
  /** Any CSS color for the active dot and focus rings. */
  accent?: string;
};

const SLIDE = { type: "spring", duration: 0.6, bounce: 0.15 } as const;
// A swipe counts once it's far enough, or quick enough.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

export function CaseStudyCarousel({
  items,
  eyebrow = "Case Studies",
  index,
  title = "What We've Built",
  cta,
  readMoreLabel = "Read More",
  accent = "#0A6EFF",
  className,
  style,
  ...props
}: CaseStudyCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = items.length;
  const go = (step: number) => setActive((current) => (current + step + count) % count);

  // Shortest signed distance from the active card, wrapping around the ends.
  const offsetOf = (i: number) => {
    let offset = (i - active) % count;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  return (
    <section
      data-slot="case-study-carousel"
      style={{ "--case-accent": accent, ...style } as React.CSSProperties}
      className={cn("@container w-full overflow-hidden rounded-[2.5rem] bg-white px-4 py-14 text-neutral-900 sm:px-8", className)}
      {...props}
    >
      <header className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[0.625rem] font-medium tracking-wide uppercase">
          {index && <span className="text-neutral-400">{index}</span>}
          <span aria-hidden className="size-1.5 rounded-full bg-neutral-900" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] @2xl:text-6xl">{title}</h2>
      </header>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={typeof title === "string" ? title : "Case studies"}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          else if (event.key === "ArrowLeft") go(-1);
        }}
        className="relative mx-auto mt-12 max-w-5xl rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[var(--case-accent)]"
      >
        {/* All cards share one grid cell, so the stage is as tall as the tallest card. */}
        {/* isolate: the cards' z-indexes stay inside this stack, so the arrows always sit above it. */}
        <motion.div onPanEnd={handlePanEnd} className="isolate mx-auto grid w-[86%] touch-pan-y @3xl:w-[76%]">
          {items.map((item, i) => {
            const offset = offsetOf(i);
            return (
              <CardShell
                key={item.title}
                offset={offset}
                reduceMotion={!!reduceMotion}
                onSelect={() => go(offset)}
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-neutral-900 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 420px, 80vw" className="object-cover" draggable={false} />
                </div>
                <div className="flex flex-col px-4 pb-5 @2xl:py-6 @2xl:pr-6 @2xl:pl-0">
                  <div className="text-sm font-semibold tracking-wide">{item.brand}</div>
                  <h3 className="mt-6 text-2xl leading-tight font-medium tracking-tight text-balance">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="group mt-5 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--case-accent)]"
                  >
                    {readMoreLabel}
                    <span className="flex size-5 items-center justify-center rounded-full bg-neutral-300 text-white transition-[background-color,transform] duration-200 group-hover:translate-x-0.5 group-hover:bg-neutral-900">
                      <ArrowRight aria-hidden className="size-3" />
                    </span>
                  </Link>
                  <dl className="mt-auto grid grid-cols-3 gap-4 pt-8">
                    {item.stats.map((stat) => (
                      // Number shown above its label; top-aligned so numbers line up when a label wraps.
                      <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                        <dt className="text-xs text-neutral-500">{stat.label}</dt>
                        <dd className="text-2xl font-medium tracking-tight">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </CardShell>
            );
          })}
        </motion.div>

        <NavButton side="left" label="Previous case study" onClick={() => go(-1)} />
        <NavButton side="right" label="Next case study" onClick={() => go(1)} />
      </div>

      <div className="mt-8 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${item.title}`}
            aria-current={i === active ? "true" : undefined}
            className="group flex h-4 cursor-pointer items-center outline-none"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--case-accent)]",
                i === active
                  ? "w-8 bg-linear-to-r from-[color-mix(in_oklab,var(--case-accent)_45%,white)] via-[var(--case-accent)] to-[color-mix(in_oklab,var(--case-accent)_60%,#a855f7)]"
                  : "w-1.5 bg-neutral-200 group-hover:bg-neutral-300"
              )}
            />
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {`Case study ${active + 1} of ${count}: ${items[active]?.title}`}
      </p>

      {cta && (
        <div className="mt-10 flex justify-center">
          <Link
            href={cta.href}
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgb(0_0_0),0_0_0_3px_color-mix(in_oklab,var(--case-accent)_35%,transparent)] outline-none transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black focus-visible:ring-2 focus-visible:ring-[var(--case-accent)] focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:active:scale-100"
          >
            {cta.label}
          </Link>
        </div>
      )}
    </section>
  );
}

// One animated value drives everything about a card's place in the stack: its slide,
// scale, veil and stacking order. Because z-index comes from the same value, cards swap
// layers exactly as they pass each other, instead of popping at the first frame.
function CardShell({
  offset,
  reduceMotion,
  onSelect,
  children,
}: {
  offset: number;
  reduceMotion: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  const isActive = offset === 0;
  const position = useMotionValue(offset);

  useEffect(() => {
    const from = position.get();
    // A card wrapping around the back would sweep across the front if animated; it's
    // hidden at both ends, so move it instantly instead.
    const wraps = Math.sign(from) !== Math.sign(offset) && from !== 0 && offset !== 0 && Math.max(Math.abs(from), Math.abs(offset)) >= 2;
    if (reduceMotion || wraps) {
      position.jump(offset);
      return;
    }
    const controls = animate(position, offset, SLIDE);
    return () => controls.stop();
  }, [offset, position, reduceMotion]);

  const distance = useTransform(position, (value) => Math.abs(value));
  const transform = useTransform(position, (value) => {
    const d = Math.abs(value);
    // 1 at the centre, 0.84 for neighbours, 0.7 for cards waiting behind.
    const scale = d <= 1 ? 1 - 0.16 * d : Math.max(0.7, 0.84 - 0.14 * (d - 1));
    return `translateX(${value * 22}%) scale(${scale})`;
  });
  // Cards stay opaque (so they never show through each other); only those beyond the
  // neighbours fade out, and neighbours are lightened with a white veil instead.
  const opacity = useTransform(distance, [1, 2], [1, 0]);
  const veil = useTransform(distance, [0, 1], [0, 0.55]);
  const zIndex = useTransform(distance, (d) => Math.round(100 - d * 10));

  return (
    <motion.article
      aria-hidden={!isActive}
      inert={!isActive}
      style={{ transform, opacity, zIndex }}
      onClick={isActive ? undefined : onSelect}
      className={cn(
        "relative grid grid-cols-1 gap-6 rounded-[2rem] bg-neutral-100 p-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] ring-1 ring-black/5 [grid-area:1/1] @2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]",
        !isActive && "cursor-pointer"
      )}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ opacity: veil }}
        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white"
      />
    </motion.article>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-950 text-white shadow-lg ring-4 ring-white/80 outline-none",
        "transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black focus-visible:ring-[var(--case-accent)] active:scale-[0.94] motion-reduce:active:scale-100",
        side === "left" ? "left-0 @3xl:left-[4%]" : "right-0 @3xl:right-[4%]"
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
