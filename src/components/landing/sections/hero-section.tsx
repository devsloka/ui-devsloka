import Link from "next/link";
import { Loader } from "@/registry/ui/loader";
import { TextEffect } from "@/registry/ui/text-effect";
import { cn } from "@/lib/utils";
import { CATALOG_STATS } from "../data/catalog";
import { BLOCKS } from "../data/blocks";
import { HeroPixelGrid } from "../hero-pixel-grid";
import {
  BudgetSliderSpecimen,
  IconRadioSpecimen,
  MorphingNavSpecimen,
} from "../hero-specimens";

const STACK = ["React 19", "Next.js", "Tailwind v4", "Motion", "Radix", "TypeScript"];

export function HeroSection() {
  return (
    <section
      className="relative isolate pt-28 md:pt-36"
      aria-labelledby="hero-title"
    >
      <HeroPixelGrid />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <h1
          id="hero-title"
          className="text-[clamp(3.75rem,12vw,11rem)] leading-[0.88] font-medium tracking-[-0.065em] md:col-span-9"
        >
          <span className="landing-line">
            <span>Interfaces</span>
          </span>
          <span className="landing-line">
            <span className="[animation-delay:90ms]">
              that move<span className="text-[#0A6EFF]">.</span>
            </span>
          </span>
        </h1>

        <dl className="grid grid-cols-2 content-end gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider md:col-span-3 md:grid-cols-1">
          <Stat label="Components" value={CATALOG_STATS.components} />
          <Stat label="Blocks" value={BLOCKS.length} />
          <Stat label="Backgrounds" value={CATALOG_STATS.backgrounds} />
          <Stat label="Hooks" value={CATALOG_STATS.hooks} />
        </dl>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="max-w-xl text-lg text-balance md:col-span-6 md:text-xl">
          Animated React components, blocks and backgrounds you copy into your
          project and own. Built on shadcn conventions, so they drop straight
          into your <span className="font-mono text-base">components/ui</span>.
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

      <div className="mt-16 grid grid-cols-1 border-t border-l border-border bg-background md:grid-cols-12">
        <Specimen
          number="001"
          name="Morphing Nav"
          href="/components/morphing-nav"
          className="md:col-span-7"
        >
          <MorphingNavSpecimen />
        </Specimen>
        <Specimen
          number="002"
          name="Text Effect"
          href="/components/text-effect"
          className="md:col-span-5"
        >
          <div className="text-3xl font-medium tracking-[-0.04em]">
            Ship{" "}
            <TextEffect
              words={["faster", "calmer", "better"]}
              effect="slide"
              interval={2600}
              className="align-bottom text-[#0A6EFF]"
            />
          </div>
        </Specimen>
        <Specimen
          number="003"
          name="Budget Slider"
          href="/components/range-slider-with-histogram"
          className="md:col-span-7"
        >
          <BudgetSliderSpecimen />
        </Specimen>
        <Specimen
          number="004"
          name="Icon Radio"
          href="/components/icon-radio"
          className="md:col-span-3"
        >
          <IconRadioSpecimen />
        </Specimen>
        <Specimen
          number="005"
          name="Loader"
          href="/components/loader"
          className="md:col-span-2"
        >
          <div className="scale-75">
            <Loader />
          </div>
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{String(value).padStart(2, "0")}</dd>
    </div>
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
