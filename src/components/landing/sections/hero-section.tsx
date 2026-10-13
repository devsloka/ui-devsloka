import Link from "next/link";
import { FuzzyMascot } from "@/registry/ui/fuzzy-mascot";
import { TextEffect } from "@/registry/ui/text-effect";
import { cn } from "@/lib/utils";
import { CATALOG_STATS } from "../data/catalog";
import { BLOCKS } from "../data/blocks";
import { HeroPixelGrid } from "../hero-pixel-grid";
import NowPlayingCardDemo from "@/components/devsloka-components/demo/now-playing-card-demo";
import ReceiptPrinterDemo from "@/components/devsloka-components/demo/receipt-printer-demo";
import AvailabilityCardDemo from "@/components/devsloka-components/demo/availability-card-demo";
import ArcScrollStepsDemo from "@/components/devsloka-components/demo/arc-scroll-steps-demo";
import RemindersCardDemo from "@/components/devsloka-components/demo/reminders-card-demo";

// Counted from the catalog, so the claim stays true as the library grows.
const TOTAL_ITEMS =
  CATALOG_STATS.components +
  CATALOG_STATS.backgrounds +
  CATALOG_STATS.hooks +
  BLOCKS.length;

const HERO_WORDS = ["beautiful", "interactive", "awesome", "insane", "crazy"];

const STACK = ["React 19", "Next.js", "Tailwind v4", "Motion", "Radix", "TypeScript"];

export function HeroSection() {
  return (
    <section
      className="relative isolate pt-28 md:pt-36"
      aria-labelledby="hero-title"
    >
      <HeroPixelGrid />
      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1
            id="hero-title"
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] font-medium tracking-[-0.05em]"
          >
            {/* "Build" and the cycling word share one line. */}
            <span className="landing-line whitespace-nowrap">
              <span>
                Build{" "}
                {/* Screen readers get one stable word; the cycling is visual only. */}
                <span className="sr-only">beautiful</span>
                <TextEffect
                  aria-hidden
                  words={HERO_WORDS}
                  effect="blur"
                  interval={2400}
                  className="text-[#0A6EFF]"
                />
              </span>
            </span>
            <span className="landing-line">
              <span className="[animation-delay:180ms]">
                UI with Devsloka<span className="text-[#0A6EFF]">.</span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-foreground/70">
            Devsloka UI is a React component library for landing pages that feel alive.{" "}
            {TOTAL_ITEMS}+ production-ready components, blocks and backgrounds, built with React,
            Tailwind CSS and Motion. Copy, paste, make it yours and ship fast, with the animation and
            styling already done.
          </p>

          <ul aria-label="Library" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider sm:grid-cols-4">
            <Stat label="Components" value={CATALOG_STATS.components} href="/components" />
            <Stat label="Blocks" value={BLOCKS.length} href="/blocks" />
            <Stat label="Backgrounds" value={CATALOG_STATS.backgrounds} href="/components/backgrounds" />
            <Stat label="Hooks" value={CATALOG_STATS.hooks} href="/utilities" />
          </ul>
        </div>

        <LatestPreview className="lg:col-span-6" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="max-w-xl text-base text-balance text-muted-foreground md:col-span-6">
          Built on shadcn conventions, so everything drops straight into your{" "}
          <span className="font-mono text-sm">components/ui</span> and is yours to change.
        </p>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-3 md:col-span-6 md:justify-end">
          <Link
            href="/components"
            className="text-lg font-medium underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
          >
            Browse components →
          </Link>
          <Link
            href="#editions"
            className="text-lg text-muted-foreground underline decoration-1 underline-offset-[6px] transition-colors hover:text-foreground"
          >
            Free &amp; Pro
          </Link>
        </div>
      </div>

      {/* The latest components, live. Each cell links to its page. */}
      <div className="mt-16 grid grid-cols-1 border-t border-l border-border bg-background md:grid-cols-12">
        <Specimen number="001" name="Now Playing Card" href="/components/now-playing-card" className="md:col-span-6 lg:col-span-4">
          <NowPlayingCardDemo />
        </Specimen>
        <Specimen number="002" name="Receipt Printer" href="/components/receipt-printer" className="md:col-span-6 lg:col-span-4">
          <ReceiptPrinterDemo />
        </Specimen>
        <Specimen number="003" name="Reminders Card" href="/components/reminders-card" className="md:col-span-12 lg:col-span-4">
          <RemindersCardDemo />
        </Specimen>
        <Specimen number="004" name="Arc Scroll Steps" href="/components/arc-scroll-steps" className="md:col-span-12 lg:col-span-7">
          <ArcScrollStepsDemo />
        </Specimen>
        <Specimen number="005" name="Availability Card" href="/components/availability-card" className="md:col-span-12 lg:col-span-5">
          <AvailabilityCardDemo />
        </Specimen>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <li>
      <Link
        href={href}
        aria-label={`${value} ${label}`}
        className="group flex items-baseline justify-between gap-4 border-b border-border pb-2 outline-none transition-colors hover:border-[#0A6EFF] focus-visible:border-[#0A6EFF] focus-visible:ring-2 focus-visible:ring-[#0A6EFF] focus-visible:ring-offset-2"
      >
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          {label}
          <span aria-hidden className="ml-1 inline-block opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
            →
          </span>
        </span>
        <span className="transition-colors group-hover:text-[#0A6EFF]">{String(value).padStart(2, "0")}</span>
      </Link>
    </li>
  );
}

type SpecimenProps = {
  number: string;
  name: string;
  href: string;
  className?: string;
  children: React.ReactNode;
};

function Specimen({ number, name, href, className, children }: SpecimenProps) {
  return (
    <figure
      className={cn(
        "flex min-h-72 min-w-0 flex-col border-r border-b border-border",
        className
      )}
    >
      <figcaption className="flex items-center justify-between gap-4 px-4 pt-3 font-mono text-[0.6875rem] uppercase tracking-wider">
        <span>
          <span className="text-muted-foreground">{number}</span> {name}
        </span>
        <Link
          href={href}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Code →
        </Link>
      </figcaption>
      <div className="flex min-w-0 flex-1 items-center justify-center p-6 md:p-8">
        {children}
      </div>
    </figure>
  );
}

// The newest component, live: mascots whose eyes follow the cursor and spin on click.
const LATEST_CAST = [
  { shape: "orb", size: 72, className: "top-[10%] left-[8%]" },
  { shape: "strawberry", size: 84, className: "bottom-[8%] left-[14%]", shading: "plastic" },
  { shape: "mango", size: 80, className: "top-[8%] right-[10%]" },
  { shape: "ghost", size: 80, className: "right-[12%] bottom-[8%]" },
] as const;

function LatestPreview({ className }: { className?: string }) {
  return (
    <figure className={cn("flex flex-col border border-border bg-background", className)}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-wider">
        <span className="flex items-center gap-2">
          <span className="bg-[#0A6EFF] px-1.5 py-px text-[0.625rem] text-white">New</span>
          Fuzzy Mascot
        </span>
        <Link href="/components/fuzzy-mascot" className="text-muted-foreground transition-colors hover:text-foreground">
          Open →
        </Link>
      </figcaption>
      <div className="relative h-[22rem] overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#232326,#111113)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%]">
          <FuzzyMascot shape="devsloka" shading="fabric" size={168} label="Devsloka mascot, click to spin" />
        </div>
        {LATEST_CAST.map((mascot) => (
          <div key={mascot.shape} className={cn("absolute", mascot.className)}>
            <FuzzyMascot
              shape={mascot.shape}
              shading={"shading" in mascot ? mascot.shading : "fabric"}
              size={mascot.size}
            />
          </div>
        ))}
        <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[0.625rem] tracking-wider text-white/40 uppercase">
          Move your cursor · click to spin
        </p>
      </div>
    </figure>
  );
}
