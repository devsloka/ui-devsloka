"use client";

import { useId, useRef, useState, type ComponentProps, type CSSProperties, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type BillingCycle = "monthly" | "yearly";

export type PricingPlan = {
  name: string;
  /** One line on who the plan is for. */
  description?: string;
  /** Display prices per cycle, e.g. { monthly: "$18", yearly: "$15" }. */
  price: Record<BillingCycle, string>;
  /** Text after the price per cycle. Defaults to "per month" and "per month, billed yearly". */
  period?: Partial<Record<BillingCycle, string>>;
  features: string[];
  cta: { label: string; href: string };
  /** Marks the recommended plan with the accent colour. */
  highlighted?: boolean;
  /** Short label on the highlighted plan, e.g. "Most studios pick this". */
  badge?: string;
};

export type PricingBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plans?: PricingPlan[];
  defaultBilling?: BillingCycle;
  /** Shown next to the yearly option, e.g. "2 months free". */
  yearlyNote?: string;
  footnote?: string;
  /** Any CSS color for the highlighted plan and the active toggle. */
  accent?: string;
  /** Text color on the accent. */
  accentForeground?: string;
} & Omit<ComponentProps<"section">, "title">;

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: "Solo",
    description: "For one person sending a handful of invoices a month.",
    price: { monthly: "$0", yearly: "$0" },
    period: { monthly: "free for good", yearly: "free for good" },
    features: ["5 invoices a month", "Card and bank payments", "Automatic reminders on day 7 and 14"],
    cta: { label: "Start invoicing free", href: "#" },
  },
  {
    name: "Studio",
    description: "For small teams that bill by the project or the hour.",
    price: { monthly: "$18", yearly: "$15" },
    features: [
      "Unlimited invoices and quotes",
      "Time tracking that turns into line items",
      "Up to 5 teammates",
      "Exports for Xero and QuickBooks",
    ],
    cta: { label: "Try Studio for 14 days", href: "#" },
    highlighted: true,
    badge: "Most studios pick this",
  },
  {
    name: "Agency",
    description: "For agencies with several clients and approval steps.",
    price: { monthly: "$42", yearly: "$35" },
    features: ["Everything in Studio", "Unlimited teammates", "Client approval before sending", "Priority support, replies within 4 hours"],
    cta: { label: "Talk to us about Agency", href: "#" },
  },
];

const DEFAULTS = {
  eyebrow: "(Pricing)",
  title: "Pay for the invoices you send, not the seats you might need.",
  description: "Every plan includes card and bank payments at the processor's rate. We don't add a percentage on top.",
  yearlyNote: "2 months free",
  footnote: "Prices in USD, excluding tax. Cancel any time; your invoices stay exportable.",
};

const CYCLES: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

/**
 * Pricing section: a heading, a monthly/yearly toggle and plan columns separated by hairlines.
 * The highlighted plan carries the accent; every plan's call to action is a link.
 */
export default function PricingBlock({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  plans = DEFAULT_PLANS,
  defaultBilling = "yearly",
  yearlyNote = DEFAULTS.yearlyNote,
  footnote = DEFAULTS.footnote,
  accent = "#0A6EFF",
  accentForeground = "#FFFFFF",
  className,
  style,
  ...props
}: PricingBlockProps) {
  const headingId = useId();
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Radio-group keyboard pattern: arrow keys move the selection and the focus together.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1) + CYCLES.length) % CYCLES.length;
    setBilling(CYCLES[next].value);
    optionRefs.current[next]?.focus();
  };

  return (
    <section
      data-slot="pricing-block"
      aria-labelledby={headingId}
      style={{ "--block-accent": accent, "--block-accent-fg": accentForeground, ...style } as CSSProperties}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">{eyebrow}</p>
          <div className="md:col-span-8">
            <h2 id={headingId} className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>

            <div role="radiogroup" aria-label="Billing period" className="mt-8 inline-flex border">
              {CYCLES.map((cycle, index) => {
                const checked = billing === cycle.value;
                return (
                  <button
                    key={cycle.value}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    tabIndex={checked ? 0 : -1}
                    onClick={() => setBilling(cycle.value)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "min-h-11 cursor-pointer px-4 font-mono text-xs uppercase tracking-wider transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--block-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      checked ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cycle.label}
                    {cycle.value === "yearly" && yearlyNote && (
                      <span className={cn("ml-2 normal-case tracking-normal", checked ? "text-background/70" : "text-[var(--block-accent)]")}>
                        {yearlyNote}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <ul className={cn("mt-16 grid border-t", plans.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
          {plans.map((plan, i) => {
            const period = plan.period?.[billing] ?? (billing === "yearly" ? "per month, billed yearly" : "per month");
            return (
              <li
                key={plan.name}
                className={cn(
                  "relative flex flex-col border-b py-10 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0",
                  i > 0 && "lg:border-l"
                )}
              >
                {plan.highlighted && (
                  <span aria-hidden className="absolute -top-px right-0 left-0 h-0.5 bg-[var(--block-accent)] lg:left-8 lg:right-8" />
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-medium tracking-[-0.01em]">{plan.name}</h3>
                  {plan.highlighted && plan.badge && (
                    <span className="bg-[var(--block-accent)] px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-[var(--block-accent-fg)]">
                      {plan.badge}
                    </span>
                  )}
                </div>
                {plan.description && <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">{plan.description}</p>}

                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">{plan.price[billing]}</span>
                  <span className="text-sm text-muted-foreground">{period}</span>
                </p>

                <ul className="mt-8 mb-10 flex-1 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--block-accent)]" strokeWidth={2} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.cta.href}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center px-5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--block-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    plan.highlighted
                      ? "bg-[var(--block-accent)] text-[var(--block-accent-fg)] hover:opacity-90"
                      : "border hover:bg-muted"
                  )}
                >
                  {plan.cta.label}
                </a>
              </li>
            );
          })}
        </ul>

        {footnote && <p className="mt-10 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{footnote}</p>}
      </div>
    </section>
  );
}

export { PricingBlock };
