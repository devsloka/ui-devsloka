import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { EDITIONS, type EditionPlan } from "../data/editions";
import { SectionHeading } from "../section-heading";

export function EditionsSection() {
  return (
    <section id="editions" className="mt-40 scroll-mt-24">
      <SectionHeading
        title="Free to build with. Pro when you need more."
        description="Every component, block, background and hook is free and MIT licensed. Pro, launching soon, is a one-time purchase with more advanced components and new ones every month."
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {EDITIONS.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}

const KEYFRAMES = `
@keyframes pricing-drift-a { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-18%, 14%) scale(1.15); } }
@keyframes pricing-drift-b { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(16%, -10%) scale(0.9); } }
@keyframes pricing-drift-c { 0%, 100% { transform: translate(0, 0) scale(1.05); } 50% { transform: translate(-10%, -16%) scale(1.2); } }
`;

// A card with an inset top panel (plan, price, call to action) and the feature list below.
export function PlanCard({ plan }: { plan: EditionPlan }) {
  const isPro = plan.highlighted;
  const isExternal = plan.cta.href.startsWith("http");

  return (
    <article className="flex flex-col border border-border bg-background p-2 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.25)]">
      <div
        className={cn(
          "relative isolate flex flex-col overflow-hidden p-6 md:p-8",
          isPro ? "bg-[#EEF4FF] dark:bg-[#0A1428]" : "bg-muted"
        )}
      >
        {isPro && <AnimatedGlow />}

        <header className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium tracking-[-0.01em]">{plan.name}</h3>
          {plan.comingSoon && (
            <span className="bg-[#0A6EFF] px-1.5 py-px font-mono text-[0.625rem] tracking-wider text-white uppercase">
              Coming soon
            </span>
          )}
        </header>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <p className="text-6xl font-semibold tracking-[-0.05em] md:text-7xl">
            {plan.offer?.price ?? plan.price}
          </p>
          {plan.offer && (
            <s className="text-xl font-medium text-foreground/45">
              <span className="sr-only">Regular price </span>
              {plan.price}
            </s>
          )}
          <span className="text-sm text-foreground/60">/{plan.priceSuffix}</span>
        </div>
        {plan.offer && (
          <p className="mt-2 font-mono text-xs tracking-wider text-[#0A6EFF] uppercase dark:text-[#86B6FF]">
            {plan.offer.note}
          </p>
        )}

        <p className="mt-4 max-w-sm text-base leading-relaxed text-foreground/75">{plan.tagline}</p>

        <Link
          href={plan.cta.href}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          className={cn(
            "mt-8 flex h-12 items-center justify-center gap-2 text-base font-medium outline-none",
            "transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:active:scale-100",
            "focus-visible:ring-2 focus-visible:ring-[#0A6EFF] focus-visible:ring-offset-2",
            isPro
              ? "bg-[#0A6EFF] text-white hover:bg-[#0858D0]"
              : "bg-foreground text-background hover:bg-foreground/85"
          )}
        >
          {plan.cta.label}
          <span aria-hidden>→</span>
        </Link>
      </div>

      <ul className="flex flex-col gap-3.5 px-6 pt-7 pb-6 md:px-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-base">
            <CircleCheck
              aria-hidden
              className={cn("mt-0.5 size-5 shrink-0", isPro ? "text-[#0A6EFF]" : "text-foreground/60")}
            />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Soft Devsloka-blue light drifting across the Pro panel. Transform-only, paused for reduced motion.
function AnimatedGlow() {
  const blob = "absolute rounded-full blur-3xl motion-reduce:animate-none";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <style href="pricing-glow-keyframes" precedence="default">
        {KEYFRAMES}
      </style>
      <span
        className={cn(blob, "-top-1/3 right-[-10%] size-[70%] bg-[#0A6EFF]/55 animate-[pricing-drift-a_14s_ease-in-out_infinite]")}
      />
      <span
        className={cn(blob, "-top-1/4 right-[-25%] size-[55%] bg-[#7C5CFF]/45 animate-[pricing-drift-b_17s_ease-in-out_infinite]")}
      />
      <span
        className={cn(blob, "right-[-15%] -bottom-1/3 size-[55%] bg-[#3D8BFF]/50 animate-[pricing-drift-c_19s_ease-in-out_infinite]")}
      />
    </div>
  );
}
