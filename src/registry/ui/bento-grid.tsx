"use client";

import { useEffect, useRef, useState } from "react";
import {
  Blocks,
  Check,
  Download,
  FileCode2,
  Folder,
  Layers,
  MousePointerClick,
  Palette,
  Sparkles,
  SquareStack,
  TextCursorInput,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ACCENT = "#0A6EFF";
const INSTALL_COMMAND = "npx shadcn@latest add https://ui.devsloka.in/r/profile-card.json";

const FILES = [
  "text-effect.tsx",
  "profile-card.tsx",
  "receipt-printer.tsx",
  "tabs-switcher.tsx",
  "now-playing-card.tsx",
  "dock-gallery.tsx",
  "team-carousel.tsx",
];

const CATEGORIES = [
  { label: "Interaction Patterns", icon: MousePointerClick },
  { label: "Animated Inputs", icon: TextCursorInput },
  { label: "Cards & Widgets", icon: SquareStack },
  { label: "Motion Effects", icon: Wand2 },
  { label: "Backgrounds", icon: Palette },
  { label: "Page Blocks", icon: Blocks },
  { label: "React Hooks", icon: Layers },
  { label: "Templates", icon: Sparkles },
];

const REGISTRY_FILES = [
  "profile-card.json",
  "receipt-printer.json",
  "arc-scroll-steps.json",
  "availability-card.json",
  "reminders-card.json",
  "morphing-nav.json",
];

const CODE_LINES = [
  'import { ProfileCard } from "@/components/ui/profile-card";',
  "",
  "export function Team() {",
  "  return (",
  "    <ProfileCard",
  '      name="Devsloka"',
  '      handle="@devsloka"',
  "      verified",
  '      accent="#0A6EFF"',
  "    />",
  "  );",
  "}",
];

// Shared keyframes for the looping tracks; React hoists and dedupes the <style>.
const KEYFRAMES = `
@keyframes bento-scroll-x { to { transform: translateX(-50%); } }
@keyframes bento-scroll-y { to { transform: translateY(-50%); } }
@keyframes bento-float { from { transform: translateY(-2px); } to { transform: translateY(4px); } }
`;

// Constant-speed loops: linear, paused while hovered, still under reduced motion.
const loopClass =
  "group-hover/loop:[animation-play-state:paused] motion-reduce:animate-none";
const pressClass =
  "transition-[transform,background-color,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100";

export function BentoGrid({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="bento-grid"
      style={{ "--bento-accent": ACCENT } as React.CSSProperties}
      className={cn("@container w-full bg-[#EEEAE6] px-4 py-12 text-neutral-900 sm:px-8 sm:py-16", className)}
      {...props}
    >
      <style href="bento-grid-keyframes" precedence="default">
        {KEYFRAMES}
      </style>
      {/* Container queries: the layout follows the component's own width, not the window's.
          Bento from 56rem, two columns from 42rem (dense flow fills beside the tall tile), else stacked. */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 @2xl:grid-flow-dense @2xl:grid-cols-2 @4xl:grid-flow-row @4xl:grid-cols-10 @4xl:grid-rows-[17rem_17rem]">
        <ResearchTile />
        <CategoriesTile />
        <InstallTile />
        <WorkflowTile />
        <FilesTile />
      </div>
    </section>
  );
}

function Heading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-serif text-[1.75rem] leading-[1.05] tracking-tight @4xl:text-3xl", className)}>
      {children}
    </h3>
  );
}

// Files flow up past a fixed action chip, as if each one is being added in turn.
function ResearchTile() {
  return (
    <article className="flex flex-col rounded-3xl bg-[#1F1D1B] p-2 text-white @2xl:row-span-2 @4xl:col-span-3">
      <div className="group/loop relative h-64 overflow-hidden rounded-2xl bg-[#EEEAE6] @4xl:h-[52%]">
        {/* The fade sits on the track, so chips melt into the light panel, not the dark tile. */}
        <div className="absolute inset-0 [mask-image:linear-gradient(transparent,black_22%,black_78%,transparent)]">
          {/* Bottom padding equals the gap, so the -50% loop lands exactly on the next copy. */}
          <div className={cn("flex flex-col items-center gap-2.5 pb-2.5 animate-[bento-scroll-y_14s_linear_infinite]", loopClass)}>
            {[...FILES, ...FILES].map((file, i) => (
              <span
                key={i}
                aria-hidden={i >= FILES.length}
                className="w-44 rounded-md border border-black/5 bg-white px-3 py-2 text-center text-xs text-neutral-700 shadow-sm"
              >
                {file}
              </span>
            ))}
          </div>
        </div>
        <span className="absolute top-1/2 left-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[var(--bento-accent)] px-3 py-2.5 text-center text-xs font-medium text-white shadow-lg shadow-[color-mix(in_oklab,var(--bento-accent)_40%,transparent)]">
          Add to project
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-7 pb-5">
        <Heading>
          Proven Components,
          <br />
          Rapid Results
        </Heading>
        <p className="mt-5 mb-6 max-w-xs text-sm leading-relaxed text-white/65">
          Interfaces that move? Solved. Copy production-ready React components, typed, accessible
          and themable, straight into your codebase.
        </p>
        <Link
          href="/components"
          className={cn(
            "mt-auto inline-flex h-9 w-fit items-center rounded-full bg-white px-4 text-sm font-medium text-neutral-900 outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F1D1B]",
            pressClass
          )}
        >
          Learn more
        </Link>
      </div>
    </article>
  );
}

function CategoryCard({ label, icon: Icon }: (typeof CATEGORIES)[number]) {
  return (
    <div className="flex h-24 w-32 shrink-0 flex-col justify-between rounded-xl bg-linear-to-b from-[#F5F2EF] to-white p-3">
      <span className="flex size-7 items-center justify-center rounded-md bg-white shadow-sm">
        <Icon aria-hidden className="size-4" />
      </span>
      <span className="text-xs leading-tight">{label}</span>
    </div>
  );
}

// Two rows of categories drifting in opposite directions.
function CategoriesTile() {
  const rows = [CATEGORIES.slice(0, 4), CATEGORIES.slice(4)];
  return (
    <article
      aria-label="Component categories"
      className="group/loop flex flex-col justify-center gap-3 overflow-hidden rounded-3xl bg-white py-5 @4xl:col-span-3 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
    >
      {rows.map((row, r) => (
        <div
          key={r}
          className={cn(
            "flex w-max gap-3 pr-3 animate-[bento-scroll-x_24s_linear_infinite]",
            r === 1 && "[animation-direction:reverse]",
            loopClass
          )}
        >
          {[...row, ...row, ...row, ...row].map((category, i) => (
            <div key={i} aria-hidden={i >= row.length}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      ))}
    </article>
  );
}

type InstallState = "idle" | "installing" | "done";
const INSTALL_MS = 1600;
const RESET_MS = 2400;

function InstallTile() {
  const [state, setState] = useState<InstallState>("idle");

  // Fill, confirm, then reset so the tile can be replayed.
  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(
      () => setState(state === "installing" ? "done" : "idle"),
      state === "installing" ? INSTALL_MS : RESET_MS
    );
    return () => clearTimeout(timer);
  }, [state]);

  return (
    // minmax(0, 1fr) lets the text column shrink, so the panel never overflows into the frame's padding.
    <article className="grid grid-cols-1 gap-3 rounded-3xl bg-[#1F1D1B] p-2 text-white @lg:grid-cols-[minmax(0,1fr)_14rem] @4xl:grid-cols-[minmax(0,1fr)_10.5rem] @6xl:grid-cols-[minmax(0,1fr)_12rem] @2xl:col-span-2 @4xl:col-span-4">
      <div className="flex min-w-0 flex-col justify-center px-4 pt-5 @lg:pt-0 @6xl:px-5">
        <Heading className="@4xl:text-xl @6xl:text-[1.75rem]">
          Copy-Paste &amp;
          <br />
          Project-Ready
        </Heading>
        <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/65">
          Turn component chaos into a design system you own.
        </p>
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-4 rounded-2xl bg-[#EEEAE6] p-4 text-neutral-900 @6xl:p-5">
        <p className="text-sm leading-snug">
          Every file lands in <span className="font-mono text-xs">components/ui</span>, typed,
          themable and yours to change.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex h-10 items-center justify-between gap-2 rounded-md border border-black/10 bg-white px-3 text-xs">
            <span className="truncate">96 components</span>
            <Download aria-hidden className="size-4 shrink-0" />
          </div>
          <button
            type="button"
            disabled={state !== "idle"}
            onClick={() => setState("installing")}
            className={cn(
              "relative flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[#1F1D1B] text-sm font-medium text-white outline-none hover:bg-black focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] disabled:cursor-default",
              pressClass
            )}
          >
            {/* Progress fill: a linear scale, since it tracks elapsed time. */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 origin-left bg-[var(--bento-accent)]",
                state === "idle" ? "scale-x-0 transition-none" : "scale-x-100 transition-transform ease-linear motion-reduce:transition-none"
              )}
              style={{ transitionDuration: state === "idle" ? "0ms" : `${INSTALL_MS}ms` }}
            />
            <span className="relative inline-flex items-center gap-1.5">
              {state === "done" && <Check aria-hidden className="size-4" />}
              {state === "idle" ? "Install" : state === "installing" ? "Installing…" : "Installed"}
            </span>
          </button>
          <span role="status" className="sr-only">
            {state === "installing" ? "Installing components" : state === "done" ? "Components installed" : ""}
          </span>
        </div>
      </div>
    </article>
  );
}

function WorkflowTile() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  const code = (
    <pre className="font-mono text-[0.6875rem] leading-relaxed whitespace-pre">
      {CODE_LINES.join("\n")}
    </pre>
  );

  return (
    <article className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-white p-6 @lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] @2xl:col-span-2 @4xl:col-span-4">
      <div className="min-w-0">
        <Heading>
          Aligned With
          <br />
          Your Workflow
        </Heading>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
          Hand off a whole component with one command. It arrives as plain source you can read,
          review and refactor.
        </p>
      </div>

      <div className="relative h-48 select-none">
        {/* Soft, out-of-focus code around a crisp centre, where the action lives. */}
        <div aria-hidden className="absolute inset-0 text-neutral-400 blur-[1.5px]">
          {code}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 text-neutral-800 [mask-image:radial-gradient(ellipse_45%_35%_at_50%_55%,black,transparent)]"
        >
          {code}
        </div>

        <div className="absolute top-[38%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 animate-[bento-float_2.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none">
          <span className="rounded-md bg-[var(--bento-accent)] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg">
            {copied ? "Copied to clipboard" : "Copy the install command"}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy install command"
            className={cn(
              "flex cursor-pointer items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 font-mono text-[0.625rem] shadow-sm outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)]",
              pressClass
            )}
          >
            {copied ? <Check aria-hidden className="size-3" /> : <FileCode2 aria-hidden className="size-3" />}
            npx shadcn add
          </button>
          <span role="status" className="sr-only">
            {copied ? "Install command copied" : ""}
          </span>
        </div>
      </div>
    </article>
  );
}

function FilesTile() {
  return (
    <article className="flex flex-col rounded-3xl bg-white p-6 @4xl:col-span-3">
      <p className="text-sm leading-snug">
        Every component ships with keyboard, screen reader and reduced-motion support.
      </p>
      <a
        href="https://www.devsloka.in/contact"
        className={cn(
          "mt-4 flex h-10 items-center justify-center rounded-md bg-[#1F1D1B] text-sm font-medium text-white outline-none hover:bg-black focus-visible:ring-2 focus-visible:ring-[var(--bento-accent)] focus-visible:ring-offset-2",
          pressClass
        )}
      >
        Ask Devsloka
      </a>
      <p className="mt-4 text-xs text-neutral-500">96 Registry Files</p>
      <div className="group/loop relative mt-2 h-32 overflow-hidden @4xl:h-auto @4xl:min-h-0 @4xl:flex-1 [mask-image:linear-gradient(transparent,black_14%,black_55%,transparent)]">
        <ul className={cn("flex flex-col gap-2 pb-2 animate-[bento-scroll-y_16s_linear_infinite]", loopClass)}>
          {[...REGISTRY_FILES, ...REGISTRY_FILES].map((file, i) => (
            <li
              key={i}
              aria-hidden={i >= REGISTRY_FILES.length}
              className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-black/10 px-2.5 text-xs"
            >
              <Folder aria-hidden className="size-4 text-neutral-500" />
              <span className="flex-1 truncate">{file}</span>
              <Download aria-hidden className="size-4 text-neutral-500" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default BentoGrid;
