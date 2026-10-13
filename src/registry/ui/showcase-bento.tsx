"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Atom,
  Box,
  Braces,
  Component,
  Flame,
  Layers,
  Rocket,
  Sparkles,
  Triangle,
  Wind,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#0A6EFF";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

const photo = (id: string) => `https://images.unsplash.com/${id}?q=80&w=200&auto=format&fit=crop`;

const TEAM = [
  { name: "Aarav", src: photo("photo-1500648767791-00dcc994a43e") },
  { name: "Kabir", src: photo("photo-1507003211169-0a1dd7228f2d") },
  { name: "Rohan", src: photo("photo-1506794778202-cad84cf45f1d") },
  { name: "Vihaan", src: photo("photo-1531427186611-ecfd6d936c79") },
];

const FRAMEWORKS = [
  { name: "Next.js", icon: Triangle },
  { name: "Vite", icon: Zap },
  { name: "Remix", icon: Layers },
  { name: "Astro", icon: Rocket },
  { name: "shadcn/ui", icon: Box },
];

const TECHNOLOGIES = [
  { name: "React", icon: Atom },
  { name: "TypeScript", icon: Braces },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Motion", icon: Sparkles },
  { name: "Radix UI", icon: Component },
  { name: "Next.js", icon: Triangle },
  { name: "Firebase", icon: Flame },
];

// Placeholder quotes from fictional companies about their own products.
const TESTIMONIALS = [
  {
    brand: "Lumen",
    quote:
      "Since adding the AI assistant to our store, our support load has dropped by nearly 60%. Customers get instant answers about sizing and shipping.",
    author: "Maya Fernandes",
    role: "Founder, Lumen",
  },
  {
    brand: "Northwind",
    quote:
      "The new onboarding flow cut our time-to-first-value in half. Activation is up and our churn conversations are finally about features, not friction.",
    author: "Dev Malhotra",
    role: "Head of Product, Northwind",
  },
  {
    brand: "Kestrel",
    quote:
      "We rebuilt the dashboard in three weeks. It feels faster, reads clearer and our team actually enjoys shipping updates to it now.",
    author: "Priya Nair",
    role: "CTO, Kestrel",
  },
];

const KEYFRAMES = `
@keyframes showcase-scroll-x { to { transform: translateX(-50%); } }
@keyframes showcase-glow { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
`;

const loopClass = "group-hover/loop:[animation-play-state:paused] motion-reduce:animate-none";

export type ShowcaseBentoProps = Omit<React.ComponentProps<"section">, "title"> & {
  title?: React.ReactNode;
  /** The headline number in the stat tile. */
  stat?: number;
  statSuffix?: string;
  statLabel?: React.ReactNode;
  /** Where "Chat with Devsloka" goes. */
  contactHref?: string;
};

export function ShowcaseBento({
  title = "Built for Teams That Ship",
  stat = 90,
  statSuffix = "+",
  statLabel = "Components shipped",
  contactHref = "https://www.devsloka.in/contact",
  className,
  style,
  ...props
}: ShowcaseBentoProps) {
  return (
    <section
      data-slot="showcase-bento"
      style={{ "--showcase-accent": ACCENT, ...style } as React.CSSProperties}
      className={cn("@container w-full bg-[#F1EFEC] px-4 py-12 text-neutral-900 sm:px-8 sm:py-16", className)}
      {...props}
    >
      <style href="showcase-bento-keyframes" precedence="default">
        {KEYFRAMES}
      </style>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-4xl font-medium tracking-[-0.04em] text-balance @2xl:text-5xl">{title}</h2>
        {/* Container queries: the layout follows the component's width, not the window's. */}
        <div className="grid grid-cols-1 gap-3 @2xl:grid-flow-dense @2xl:grid-cols-2 @4xl:grid-flow-row @4xl:grid-cols-[1fr_1fr_1fr] @4xl:grid-rows-[6.5rem_17rem_6.5rem]">
          <TeamTile contactHref={contactHref} />
          <StatTile value={stat} suffix={statSuffix} label={statLabel} />
          <FrameworksTile />
          <TestimonialTile />
          <TechnologiesTile />
        </div>
      </div>
    </section>
  );
}

const tileClass = "relative overflow-hidden rounded-3xl bg-white";

// ── Team: portraits hop to a free neighbouring cell every couple of seconds. ──

const COLS = 5;
const ROWS = 4;
const START_CELLS = [7, 11, 13, 17];
const HOP_MS = 2200;

function neighbours(cell: number) {
  const row = Math.floor(cell / COLS);
  const col = cell % COLS;
  // Portraits stay in the inner columns; the outer ones fade into the tile's edge.
  return [
    row > 0 && cell - COLS,
    row < ROWS - 1 && cell + COLS,
    col > 1 && cell - 1,
    col < COLS - 2 && cell + 1,
  ].filter((value): value is number => value !== false);
}

function TeamTile({ contactHref }: { contactHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [cells, setCells] = useState(START_CELLS);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(() => {
      setCells((current) => {
        const who = Math.floor(Math.random() * current.length);
        const free = neighbours(current[who]).filter((cell) => !current.includes(cell));
        if (free.length === 0) return current;
        const next = [...current];
        next[who] = free[Math.floor(Math.random() * free.length)];
        return next;
      });
    }, HOP_MS);
    return () => clearInterval(timer);
  }, [inView, reduceMotion]);

  return (
    <article className={cn(tileClass, "flex flex-col p-6 @2xl:row-span-2 @4xl:row-span-3")}>
      <div
        ref={ref}
        aria-hidden
        className="-mx-10 grid flex-1 grid-cols-5 place-content-center gap-3 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_45%,black_45%,transparent)]"
        style={{ gridTemplateRows: `repeat(${ROWS}, auto)` }}
      >
        {Array.from({ length: COLS * ROWS }, (_, cell) => (
          <span
            key={cell}
            className="aspect-square rounded-xl border border-black/5 bg-linear-to-b from-white to-neutral-100/80"
            style={{ gridColumn: (cell % COLS) + 1, gridRow: Math.floor(cell / COLS) + 1 }}
          />
        ))}
        {TEAM.map((member, i) => (
          <motion.span
            key={member.name}
            layout={!reduceMotion}
            transition={{ layout: { duration: 0.6, ease: EASE_IN_OUT } }}
            className="relative z-10 aspect-square overflow-hidden rounded-xl bg-neutral-200 shadow-md ring-4 ring-white"
            style={{ gridColumn: (cells[i] % COLS) + 1, gridRow: Math.floor(cells[i] / COLS) + 1 }}
          >
            <Image src={member.src} alt="" fill sizes="96px" className="object-cover" />
          </motion.span>
        ))}
      </div>

      <p className="mt-6 text-base font-medium">Get to know the makers</p>
      <a
        href={contactHref}
        className="mt-3 inline-flex w-fit items-center gap-2.5 rounded-xl bg-neutral-900 py-1.5 pr-4 pl-1.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] outline-none transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black focus-visible:ring-2 focus-visible:ring-[var(--showcase-accent)] focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:active:scale-100"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--showcase-accent)]">
          <Image src="/favicon-dark.png" alt="" width={16} height={16} />
        </span>
        Chat with Devsloka
      </a>
    </article>
  );
}

// ── Stat: counts up once in view, over a softly glowing grid. ──

const GLOW_CELLS = [
  { cell: 3, delay: 0 },
  { cell: 12, delay: 1.4 },
  { cell: 18, delay: 2.6 },
  { cell: 27, delay: 0.8 },
  { cell: 33, delay: 3.2 },
];

function StatTile({ value, suffix, label }: { value: number; suffix: string; label: React.ReactNode }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numberRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  // Writes straight to the DOM, so counting never re-renders React. The server renders
  // the final value, so it's correct without JavaScript.
  useEffect(() => {
    const node = numberRef.current;
    if (!inView || reduceMotion || !node) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <article className={cn(tileClass, "flex min-h-72 flex-col justify-between p-7 @4xl:row-span-2 @4xl:min-h-0")}>
      <div aria-hidden className="absolute inset-0 grid grid-cols-6 grid-rows-6 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,black,transparent)]">
        {Array.from({ length: 36 }, (_, cell) => {
          const glow = GLOW_CELLS.find((item) => item.cell === cell);
          return (
            <span key={cell} className="relative border-r border-b border-black/[0.04]">
              {glow && (
                <span
                  className="absolute inset-0 bg-[color-mix(in_oklab,var(--showcase-accent)_10%,transparent)] opacity-0 animate-[showcase-glow_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
                  style={{ animationDelay: `${glow.delay}s` }}
                />
              )}
            </span>
          );
        })}
      </div>

      <div className="relative">
        <p className="text-7xl leading-none font-medium tracking-[-0.06em] tabular-nums @4xl:text-8xl">
          <span ref={numberRef}>{value}</span>
          {suffix}
        </p>
        <p className="mt-4 text-base text-neutral-500">{label}</p>
      </div>
      <p className="relative mt-10 max-w-xs text-sm leading-relaxed text-neutral-500">
        Animated, accessible React components you copy into your project and own. No lock-in. Just
        source.
      </p>
    </article>
  );
}

// ── Frameworks: a drifting row of chips. ──

function FrameworksTile() {
  return (
    <article
      aria-label="Works with"
      className={cn(
        tileClass,
        // Full width in the two-column layout, so the testimonial can sit beside the team.
        "group/loop flex min-h-24 items-center @2xl:col-span-2 @4xl:col-span-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      )}
    >
      <ul className={cn("flex w-max gap-3 pr-3 animate-[showcase-scroll-x_22s_linear_infinite]", loopClass)}>
        {[...FRAMEWORKS, ...FRAMEWORKS, ...FRAMEWORKS, ...FRAMEWORKS].map(({ name, icon: Icon }, i) => (
          <li
            key={i}
            aria-hidden={i >= FRAMEWORKS.length}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-white py-1.5 pr-3.5 pl-1.5 text-sm shadow-[0_1px_3px_rgb(0_0_0/0.08),0_0_0_1px_rgb(0_0_0/0.04)]"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              <Icon aria-hidden className="size-3.5" />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ── Testimonial: rotates with a soft blur crossfade; dots pick one directly. ──

const ROTATE_MS = 6000;

function TestimonialTile() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!inView || hovered || reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [index, inView, hovered, reduceMotion]);

  const item = TESTIMONIALS[index];

  return (
    <article
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(tileClass, "flex min-h-72 flex-col p-7 @4xl:min-h-0")}
    >
      {/* Soft lit squares in the corner, echoing the stat tile's grid. */}
      <div aria-hidden className="pointer-events-none absolute -top-6 right-0 grid w-56 grid-cols-3 gap-0 opacity-80 blur-[1px]">
        {[0.5, 0.9, 0.35, 0.25, 1, 0.6, 0.15, 0.4, 0.2].map((strength, i) => (
          <span
            key={i}
            className="aspect-square bg-linear-to-b from-[color-mix(in_oklab,var(--showcase-accent)_14%,white)] to-transparent"
            style={{ opacity: strength }}
          />
        ))}
      </div>

      <div aria-live="polite" className="relative mt-auto grid">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.figure
            key={index}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", transform: "translateY(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", transform: "translateY(-6px)" }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="[grid-area:1/1]"
          >
            <p className="text-2xl font-semibold tracking-tight">{item.brand}</p>
            <blockquote className="mt-4 text-sm leading-relaxed text-neutral-500">&ldquo;{item.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-medium">— {item.author}</span>{" "}
              <span className="text-neutral-500">{item.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="relative mt-5 flex gap-1.5">
        {TESTIMONIALS.map((testimonial, i) => (
          <button
            key={testimonial.brand}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial from ${testimonial.brand}`}
            aria-current={i === index ? "true" : undefined}
            className="group/dot flex h-4 cursor-pointer items-center outline-none"
          >
            <span
              className={cn(
                "block h-1 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-[var(--showcase-accent)]",
                i === index ? "w-5 bg-neutral-900" : "w-1.5 bg-neutral-300 group-hover/dot:bg-neutral-400"
              )}
            />
          </button>
        ))}
      </div>
    </article>
  );
}

// ── Technologies: a drifting row of icon tiles. ──

function TechnologiesTile() {
  return (
    <article className={cn(tileClass, "flex items-center gap-6 py-5 pl-7 @2xl:col-span-2")}>
      <p className="shrink-0 text-base font-medium">Technologies we use</p>
      {/* Vertical padding (offset by a negative margin) keeps the tiles' outline and shadow
          inside the clipping box, so their top edge isn't cut off. */}
      <div className="group/loop -my-3 min-w-0 flex-1 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul aria-label="Technologies" className={cn("flex w-max gap-4 pr-4 animate-[showcase-scroll-x_26s_linear_infinite]", loopClass)}>
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map(({ name, icon: Icon }, i) => (
            <li
              key={i}
              aria-hidden={i >= TECHNOLOGIES.length}
              title={name}
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_3px_rgb(0_0_0/0.08),0_0_0_1px_rgb(0_0_0/0.04)]"
            >
              <Icon aria-hidden className="size-5" />
              <span className="sr-only">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
