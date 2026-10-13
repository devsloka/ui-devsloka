"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { Atom, Braces, Component, Sparkles, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export type MissionStat = {
  /** Copy above the number. */
  text: React.ReactNode;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: React.ReactNode;
};

export type MissionBentoProps = Omit<React.ComponentProps<"section">, "title"> & {
  eyebrow?: React.ReactNode;
  /** The quiet first line of the heading. */
  lead?: React.ReactNode;
  /** The bold second line of the heading. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Small pill above the first stat, e.g. a row of logos and a caption. */
  badge?: React.ReactNode;
  /** Status pill under the second stat. */
  status?: React.ReactNode;
  stats?: [MissionStat, MissionStat];
  highlight?: MissionStat;
  /** Any CSS color for the eyebrow and status accents. */
  accent?: string;
};

const TOOLS = [
  { name: "React", icon: Atom },
  { name: "TypeScript", icon: Braces },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Motion", icon: Sparkles },
  { name: "Radix UI", icon: Component },
];

const DEFAULT_STATS: [MissionStat, MissionStat] = [
  {
    text: "Every component ships fully typed, with props you can read at a glance",
    value: 100,
    suffix: "%",
    label: "TypeScript coverage",
  },
  {
    text: "Animations tuned for the compositor: transform and opacity only",
    value: 60,
    suffix: "fps",
    label: "Target frame rate",
  },
];

const DEFAULT_HIGHLIGHT: MissionStat = {
  text: "Animated components, blocks and backgrounds, ready to drop into any React project",
  value: 90,
  suffix: "+",
  label: (
    <>
      Ready to install
      <br />
      with the shadcn CLI
    </>
  ),
};

// Tiles rise in one after another; reduced motion fades them without moving.
const tileVariants: Variants = {
  hidden: (reduce: boolean) => ({ opacity: 0, transform: reduce ? "none" : "translateY(12px)" }),
  shown: (reduce: boolean) => ({
    opacity: 1,
    transform: reduce ? "none" : "translateY(0px)",
    transition: { duration: 0.5, ease: EASE_OUT },
  }),
};

export function MissionBento({
  eyebrow = "Mission",
  lead = "Our focus is simple",
  title = "Interfaces that move",
  description = "Copy a component, own the source and ship something that feels alive.",
  badge = <ToolStack />,
  status = "Free to use",
  stats = DEFAULT_STATS,
  highlight = DEFAULT_HIGHLIGHT,
  accent = "#0A6EFF",
  className,
  style,
  ...props
}: MissionBentoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = !!useReducedMotion();
  const tile = { variants: tileVariants, custom: reduceMotion };

  return (
    <section
      data-slot="mission-bento"
      style={{ "--mission-accent": accent, ...style } as React.CSSProperties}
      className={cn("@container w-full rounded-[2rem] bg-[#F4F4F3] px-6 py-10 text-neutral-900 sm:px-10 sm:py-12", className)}
      {...props}
    >
      <div ref={ref} className="mx-auto max-w-5xl">
        <span className="inline-flex rounded-full border border-black/5 bg-white px-3 py-1 text-[0.625rem] font-semibold tracking-wider text-[var(--mission-accent)] uppercase shadow-sm">
          {eyebrow}
        </span>

        <div className="mt-6 flex flex-col gap-6 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <h2 className="text-4xl leading-[1.05] font-medium tracking-[-0.04em] @3xl:text-5xl">
            <RevealLine show={inView} reduce={reduceMotion} className="text-neutral-400">
              {lead}
            </RevealLine>
            <RevealLine show={inView} reduce={reduceMotion} delay={0.08}>
              {title}
            </RevealLine>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500">{description}</p>
        </div>

        {/* Container queries: the bento layout follows the component's width. In two columns
            the small pills share a short first row, so they never stretch beside a tall stat. */}
        <motion.div
          initial="hidden"
          animate={inView ? "shown" : "hidden"}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
          className="mt-10 grid grid-cols-1 gap-3 @2xl:grid-cols-2 @4xl:grid-cols-[1fr_1fr_1.25fr] @4xl:grid-rows-[3.75rem_minmax(10rem,1fr)_3.75rem]"
        >
          <motion.div {...tile} className={cn(cardClass, "flex min-h-14 items-center px-4 @2xl:col-start-1 @2xl:row-start-1")}>
            {badge}
          </motion.div>

          <motion.div {...tile} className={cn(cardClass, "flex min-h-52 flex-col p-5 @2xl:col-start-1 @2xl:row-start-2 @4xl:row-span-2 @4xl:min-h-0")}>
            <StatBody stat={stats[0]} show={inView} reduce={reduceMotion} />
          </motion.div>

          <motion.div {...tile} className={cn(cardClass, "flex min-h-52 flex-col p-5 @2xl:col-start-2 @2xl:row-start-2 @4xl:row-span-2 @4xl:row-start-1 @4xl:min-h-0")}>
            <StatBody stat={stats[1]} show={inView} reduce={reduceMotion} />
          </motion.div>

          <motion.div {...tile} className={cn(cardClass, "flex min-h-14 items-center gap-2.5 px-4 text-[0.625rem] font-semibold tracking-wider uppercase @2xl:col-start-2 @2xl:row-start-1 @4xl:row-start-3")}>
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 [animation-duration:2s] motion-reduce:hidden" />
              <span className="relative size-2.5 rounded-full bg-emerald-500" />
            </span>
            {status}
          </motion.div>

          <motion.div
            {...tile}
            className="relative isolate flex min-h-72 flex-col overflow-hidden rounded-2xl bg-[#1C1C1C] p-6 text-white shadow-2xl shadow-black/25 @2xl:col-span-2 @2xl:row-start-3 @4xl:col-span-1 @4xl:col-start-3 @4xl:row-span-3 @4xl:row-start-1 @4xl:min-h-0"
          >
            <TrendArrow show={inView} reduce={reduceMotion} />
            <p className="max-w-xs text-sm leading-relaxed text-white/75">{highlight.text}</p>
            <div className="mt-auto flex items-end justify-between gap-4">
              <p className="text-6xl leading-none font-medium tracking-[-0.05em] @4xl:text-7xl">
                <CountUp stat={highlight} show={inView} reduce={reduceMotion} />
              </p>
              <p className="pb-1 text-[0.625rem] leading-snug font-semibold tracking-wider text-white/70 uppercase">
                {highlight.label}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const cardClass = "rounded-2xl border border-black/5 bg-white/70 shadow-[0_1px_2px_rgb(0_0_0/0.04)]";

// A heading line that rises from behind its own mask.
function RevealLine({
  children,
  show,
  reduce,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  show: boolean;
  reduce: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={false}
        animate={
          reduce || show
            ? { transform: "translateY(0%)", opacity: 1 }
            : { transform: "translateY(105%)", opacity: 0 }
        }
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function StatBody({ stat, show, reduce }: { stat: MissionStat; show: boolean; reduce: boolean }) {
  return (
    <>
      <p className="max-w-[16rem] text-sm leading-relaxed">{stat.text}</p>
      <p className="mt-auto pt-6 text-6xl leading-none font-medium tracking-[-0.05em] @4xl:text-7xl">
        <CountUp stat={stat} show={show} reduce={reduce} />
      </p>
      <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
    </>
  );
}

// Counts from zero once in view, writing to the DOM so it never re-renders React.
// The server renders the final value, so it reads correctly without JavaScript.
function CountUp({ stat, show, reduce }: { stat: MissionStat; show: boolean; reduce: boolean }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const { value, decimals = 0, prefix = "", suffix = "" } = stat;

  useEffect(() => {
    const node = numberRef.current;
    if (!show || reduce || !node) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [show, reduce, value, decimals]);

  return (
    <>
      {prefix}
      <span ref={numberRef} className="tabular-nums">
        {value.toFixed(decimals)}
      </span>
      {suffix && <span className="ml-1 align-baseline text-[0.45em] font-normal text-current/60">{suffix}</span>}
    </>
  );
}

// A rising line with an arrowhead that draws itself in behind the dark tile's content.
function TrendArrow({ show, reduce }: { show: boolean; reduce: boolean }) {
  const drawn = reduce || show;
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 220"
      className="absolute right-0 bottom-10 -z-10 h-[65%] w-auto max-w-[85%] text-white/[0.07]"
      fill="none"
      stroke="currentColor"
      strokeWidth={22}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M10 200 L110 120 L160 160 L290 40"
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.2, ease: EASE_OUT, delay: 0.3 }}
      />
      <motion.path
        d="M225 40 H290 V105"
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : 1.3 }}
      />
    </svg>
  );
}

// Overlapping icons of the stack, popping in one after another.
function ToolStack() {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <motion.ul
        aria-label="Built on"
        className="flex -space-x-2"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
      >
        {TOOLS.map(({ name, icon: Icon }) => (
          <motion.li
            key={name}
            title={name}
            variants={{
              hidden: { opacity: 0, transform: "scale(0.9)" },
              shown: { opacity: 1, transform: "scale(1)", transition: { duration: 0.3, ease: EASE_OUT } },
            }}
            className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white ring-2 ring-white"
          >
            <Icon aria-hidden className="size-3.5" />
            <span className="sr-only">{name}</span>
          </motion.li>
        ))}
      </motion.ul>
      <p className="text-[0.625rem] font-semibold tracking-wider text-neutral-500 uppercase">5 core tools</p>
    </div>
  );
}
