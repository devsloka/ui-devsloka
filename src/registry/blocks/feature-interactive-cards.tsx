"use client";

import { useId, useState, type ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type InteractiveFeature = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  points?: string[];
  stat?: { value: string; label: string };
};

export type FeatureInteractiveCardsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: InteractiveFeature[];
  /** Controlled active feature id. */
  value?: string;
  /** Initially active feature id when uncontrolled. Defaults to the first feature. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
} & Omit<ComponentProps<"section">, "defaultValue" | "onChange">;

const DEFAULT_FEATURES: InteractiveFeature[] = [
  {
    id: "routing",
    title: "Routing that reads the ticket",
    summary: "Sends each conversation to the person who closed the last similar one.",
    detail:
      "Kestrel looks at the customer's plan, the product area and the language, then routes to whoever resolved the closest match in the past 90 days. If that person is offline, it falls back to the team queue instead of guessing.",
    points: [
      "Rules editor for the cases you want to pin by hand",
      "Round-robin fallback per team",
      "Every routing decision shows its reason",
    ],
    stat: { value: "38%", label: "fewer reassignments in the first month" },
  },
  {
    id: "drafts",
    title: "Replies drafted from your docs",
    summary: "Suggests an answer citing your help center, never the open web.",
    detail:
      "Drafts are built only from articles and macros you've published. Each one lists the sources it used, and agents edit before sending. Nothing goes out on its own.",
    points: [
      "Sources linked inline under every draft",
      "Per-team tone settings",
      "Turn it off for any queue",
    ],
    stat: { value: "4m 12s", label: "median first response, down from 11m" },
  },
  {
    id: "handoff",
    title: "Handoffs without re-explaining",
    summary: "A six-line brief travels with the ticket when it changes hands.",
    detail:
      "When a ticket moves from support to engineering, Kestrel writes a short brief: what the customer tried, what was ruled out, and the exact error text. The engineer reads six lines instead of forty messages.",
    points: [
      "Linked to the Linear or Jira issue it creates",
      "Customer is notified when status changes",
    ],
    stat: { value: "2.1×", label: "faster escalations, measured over Q2 2026" },
  },
  {
    id: "reporting",
    title: "Reports the CFO can read",
    summary: "Cost per resolved ticket, by team and by product area.",
    detail:
      "Weekly reports land in your inbox every Monday at 08:00 with cost per resolution, backlog age and the three topics that grew fastest. Export any chart to CSV.",
    points: [
      "Scheduled email or Slack digest",
      "Raw data via the reporting API",
    ],
    stat: { value: "Mon 08:00", label: "weekly digest, in your team's time zone" },
  },
];

const DEFAULTS = {
  eyebrow: "Kestrel for support teams",
  title: "Four things your queue does differently on Kestrel.",
  description:
    "Pick one to see how it works. Numbers come from 212 teams that switched between January and June 2026.",
};

export function FeatureInteractiveCards({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  features = DEFAULT_FEATURES,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: FeatureInteractiveCardsProps) {
  const headingId = useId();
  const reduceMotion = useReducedMotion();
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? features[0]?.id ?? ""
  );
  const current = value ?? uncontrolled;

  const handleChange = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <section
      data-slot="feature-interactive-cards"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <TabsPrimitive.Root
          value={current}
          onValueChange={handleChange}
          orientation="vertical"
          className="mt-14 grid border-t lg:grid-cols-12"
        >
          <TabsPrimitive.List
            aria-label="Features"
            className="flex flex-col divide-y border-b lg:col-span-5 lg:border-r lg:border-b-0"
          >
            {features.map((feature, i) => (
              <TabsPrimitive.Trigger
                key={feature.id}
                value={feature.id}
                className={cn(
                  "group relative flex gap-5 py-5 pr-6 text-left outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 w-0.5 bg-primary opacity-0 transition-opacity group-data-[state=active]:opacity-100"
                />
                <span className="pl-4 font-mono text-xs tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-base font-medium tracking-tight">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {feature.summary}
                  </span>
                </span>
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {features.map((feature, i) => (
            <TabsPrimitive.Content
              key={feature.id}
              value={feature.id}
              className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset lg:col-span-7"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col py-8 lg:px-10 lg:py-10"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
                  {feature.detail}
                </p>

                {feature.points && feature.points.length > 0 && (
                  <ul className="mt-8 divide-y border-y text-sm">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-baseline gap-3 py-3">
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 translate-y-[-1px] bg-primary"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {feature.stat && (
                  <div className="mt-auto flex items-baseline gap-4 pt-10">
                    <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums">
                      {feature.stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {feature.stat.label}
                    </span>
                  </div>
                )}
              </motion.div>
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      </div>
    </section>
  );
}
