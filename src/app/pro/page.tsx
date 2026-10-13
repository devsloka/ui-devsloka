import Link from "next/link";
import { Check, Infinity as InfinityIcon, LayoutTemplate, Minus, RefreshCw, Sparkles, WandSparkles } from "lucide-react";
import { generateSEO } from "@/config/seo/seo.utils";
import { FuzzyMascot } from "@/registry/ui/fuzzy-mascot";
import { EDITIONS } from "@/components/landing/data/editions";
import { PlanCard } from "@/components/landing/sections/editions-section";
import { SectionHeading } from "@/components/landing/section-heading";

export const metadata = generateSEO({
  title: "Pro — Coming soon",
  description:
    "Devsloka UI Pro is coming soon: more animated and complex components, new components every month and an AI skill to customize them. $199 one-time, $149 at launch.",
  path: "pro",
});

const NOTIFY_HREF = "https://www.devsloka.in/contact";

const FEATURES = [
  {
    icon: Sparkles,
    title: "More animated and complex components",
    body: "Multi-step flows, gesture-driven surfaces and richer interactions, built to the same motion and accessibility bar as the free library.",
  },
  {
    icon: RefreshCw,
    title: "New, on-trend components every month",
    body: "A fresh drop every month, following what's catching on in interface design.",
  },
  {
    icon: WandSparkles,
    title: "An AI skill that customizes components",
    body: "Point your AI assistant at a component and it reshapes the props, styling and motion to fit your design system.",
  },
  {
    icon: LayoutTemplate,
    title: "Full-page blocks and complete templates",
    body: "Whole landing pages and product sites you can drop in and restyle, not just individual sections.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime updates and priority support",
    body: "Pay once and keep every future release, with faster answers when your project needs a hand.",
  },
];

// true = included, false = not included, string = included with a note.
const COMPARISON: { feature: string; free: boolean | string; pro: boolean | string }[] = [
  { feature: "Every component, background and hook in the index", free: true, pro: true },
  { feature: "Section blocks for real pages", free: true, pro: true },
  { feature: "shadcn CLI install, full source ownership", free: true, pro: true },
  { feature: "Advanced animated and complex components", free: false, pro: true },
  { feature: "New components", free: "As the library grows", pro: "Every month" },
  { feature: "AI skill to customize components", free: false, pro: true },
  { feature: "Full-page blocks and complete templates", free: false, pro: true },
  { feature: "Priority support", free: false, pro: true },
  { feature: "Price", free: "$0, forever", pro: "$199 once ($149 at launch)" },
];

const FAQS = [
  {
    q: "Will the free library stay free?",
    a: "Yes. Everything that's free today stays free and MIT licensed, for personal and commercial work. Pro adds to the library; it doesn't take anything away.",
  },
  {
    q: "Is Pro a subscription?",
    a: "No. Pro is a single payment of $199. There's nothing to renew, and you keep every future update.",
  },
  {
    q: "How does the launch price work?",
    a: "For the first 30 days after Pro launches, it's $149 instead of $199. Leave your details and we'll let you know the moment it's live.",
  },
  {
    q: "What is the AI skill?",
    a: "A skill for AI coding assistants that knows how Devsloka components are built, so it can adapt a component's props, styling and motion to your project's design system for you.",
  },
  {
    q: "When is Pro launching?",
    a: "Soon. We're building the first set of Pro components now. Get notified and you'll hear first, with the launch price.",
  },
];

export default function ProPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32">
      <Hero />

      <section aria-labelledby="pro-features" className="mt-32">
        <SectionHeading
          title={<span id="pro-features">What Pro will include</span>}
          description="Everything in the free library, plus the bigger pieces: deeper components, a monthly drop and an AI skill that adapts them to your project."
        />
        <ul className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className={i === 0 ? "bg-background p-7 lg:row-span-2 lg:p-9" : "bg-background p-7"}>
              <span className="flex size-10 items-center justify-center bg-[#0A6EFF]/10 text-[#0A6EFF]">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className={i === 0 ? "mt-6 text-2xl font-medium tracking-[-0.02em] lg:mt-10 lg:text-3xl" : "mt-6 text-lg font-medium tracking-[-0.01em]"}>
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pro-compare" className="mt-32">
        <SectionHeading
          title={<span id="pro-compare">Free and Pro, side by side</span>}
          description="Start with Free today. Pro is there when a project needs more."
        />
        <div className="mx-auto mt-12 max-w-4xl overflow-x-auto border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-border font-mono text-xs uppercase tracking-wider">
                <th scope="col" className="p-4 font-normal text-muted-foreground md:px-6">Feature</th>
                <th scope="col" className="w-36 p-4 font-normal md:w-48">Free</th>
                <th scope="col" className="w-36 bg-[#0A6EFF]/[0.05] p-4 font-normal text-[#0A6EFF] md:w-52">Pro</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-b-0">
                  <th scope="row" className="p-4 font-normal md:px-6">{row.feature}</th>
                  <td className="p-4"><Cell value={row.free} /></td>
                  <td className="bg-[#0A6EFF]/[0.05] p-4"><Cell value={row.pro} pro /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="pro-pricing" className="mt-32">
        <SectionHeading
          title={<span id="pro-pricing">One price. Yours forever.</span>}
          description="No subscription. Pay once for Pro and keep every update, or keep building with Free."
        />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {EDITIONS.map((plan) => (
            <PlanCard key={plan.name} plan={plan.name === "Pro" ? { ...plan, cta: { label: "Get notified at launch", href: NOTIFY_HREF } } : plan} />
          ))}
        </div>
      </section>

      <section aria-labelledby="pro-faq" className="mt-32">
        <SectionHeading
          title={<span id="pro-faq">Questions, answered</span>}
          description="The short version of what Pro is and how it works."
        />
        <div className="mx-auto mt-12 max-w-3xl border-t border-border">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em] outline-none focus-visible:text-[#0A6EFF] [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden className="relative size-3.5 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-6 text-base leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-32 border-t border-border pt-16 text-center">
        <p className="mx-auto max-w-2xl text-4xl leading-[1] font-medium tracking-[-0.04em] text-balance md:text-6xl">
          Be first in line for Pro<span className="text-[#0A6EFF]">.</span>
        </p>
        <p className="mx-auto mt-5 max-w-lg text-lg text-foreground/70">
          Get notified at launch and lock in $149 for the first 30 days.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a
            href={NOTIFY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0A6EFF] px-6 py-3.5 text-base font-medium text-white transition-[background-color,transform] duration-[160ms] hover:bg-[#0858D0] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            Get notified at launch <span aria-hidden>→</span>
          </a>
          <Link
            href="/components"
            className="self-center text-base underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
          >
            Browse the free library
          </Link>
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <header className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span aria-hidden className="size-1.5 bg-[#0A6EFF]" />
          Devsloka UI / Pro
          <span className="ml-1 bg-[#0A6EFF] px-1.5 py-px text-[0.625rem] text-white">Coming soon</span>
        </p>
        <h1 className="mt-6 text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.055em]">
          Ship the interfaces <span className="text-[#0A6EFF]">people remember.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-foreground/70">
          Devsloka UI Pro adds more animated and complex components, a new drop every month, and
          an AI skill that tailors them to your project. Everything free today stays free.
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-4xl font-semibold tracking-[-0.04em]">$149</span>
          <s className="text-lg text-foreground/45">
            <span className="sr-only">Regular price </span>$199
          </s>
          <span className="text-sm text-foreground/60">one-time · launch price for the first 30 days</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={NOTIFY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0A6EFF] px-6 py-3.5 text-base font-medium text-white transition-[background-color,transform] duration-[160ms] hover:bg-[#0858D0] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            Get notified at launch <span aria-hidden>→</span>
          </a>
          <Link
            href="#pro-compare"
            className="text-base underline decoration-1 underline-offset-[6px] transition-colors hover:text-[#0A6EFF]"
          >
            Compare Free and Pro
          </Link>
        </div>
      </div>

      <figure className="flex flex-col border border-border lg:col-span-6">
        <figcaption className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse bg-[#0A6EFF] motion-reduce:animate-none" aria-hidden />
            Building Pro
          </span>
          <span className="text-muted-foreground">Click a mascot</span>
        </figcaption>
        <div className="relative h-[22rem] overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#1B2440,#0B0F1C)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%]">
            <FuzzyMascot shape="devsloka" shading="glass" state="working" size={170} label="Devsloka mascot, at work on Pro" />
          </div>
          <div className="absolute top-[12%] left-[10%]">
            <FuzzyMascot shape="star" shading="plastic" size={74} />
          </div>
          <div className="absolute right-[10%] bottom-[12%]">
            <FuzzyMascot shape="orb" size={78} />
          </div>
          <div className="absolute top-[12%] right-[12%]">
            <FuzzyMascot shape="bot" state="working" size={70} />
          </div>
          <div className="absolute bottom-[12%] left-[12%]">
            <FuzzyMascot shape="mango" shading="fabric" size={76} />
          </div>
        </div>
      </figure>
    </header>
  );
}

function Cell({ value, pro }: { value: boolean | string; pro?: boolean }) {
  if (typeof value === "string") return <span className={pro ? "font-medium" : "text-muted-foreground"}>{value}</span>;
  return value ? (
    <>
      <Check aria-hidden className={pro ? "size-5 text-[#0A6EFF]" : "size-5"} />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="size-5 text-muted-foreground/50" />
      <span className="sr-only">Not included</span>
    </>
  );
}
