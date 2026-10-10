import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type FeatureStat = {
  /** The figure itself, e.g. "9s". Set in tabular numerals. */
  value: string;
  label: string;
  /** One or two sentences of context under the figure. */
  note: string;
  /** Footnote text; numbered automatically. */
  footnote?: string;
};

export type FeaturesBlockFourProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: FeatureStat[];
  /** Small line above the footnotes, e.g. when the numbers were measured. */
  measuredAt?: string;
} & ComponentProps<"section">;

const DEFAULT_STATS: FeatureStat[] = [
  {
    value: "9s",
    label: "Median build",
    note: "Down from 41 seconds before the shared cache. Most rebuilds only touch the files that changed.",
    footnote: "Median across 1.2M builds on the Team plan, July–September 2026.",
  },
  {
    value: "14",
    label: "Edge regions",
    note: "Deploys go out to every region at once. Rolling back takes the same single click.",
  },
  {
    value: "99.98%",
    label: "Uptime, last 12 months",
    note: "Two incidents, both under 20 minutes, both written up publicly the same week.",
    footnote: "Measured by an external probe every 30 seconds from six locations.",
  },
  {
    value: "3.1M",
    label: "Deploys a month",
    note: "From weekend side projects to teams shipping forty times a day.",
  },
];

const DEFAULTS = {
  eyebrow: "(By the numbers)",
  title: "Fast enough that you stop noticing the deploy.",
  description:
    "We publish these every quarter, including the ones that got worse. This is where Tern stands today.",
  measuredAt: "Last updated 1 Oct 2026",
};

export default function FeaturesBlockFour({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  stats = DEFAULT_STATS,
  measuredAt = DEFAULTS.measuredAt,
  className,
  ...props
}: FeaturesBlockFourProps) {
  const headingId = useId();
  // Footnote numbers follow the order the stats appear in.
  let footnoteCount = 0;
  const numbered = stats.map((stat) => ({
    ...stat,
    footnoteNumber: stat.footnote ? ++footnoteCount : undefined,
  }));

  return (
    <section
      data-slot="features-block-four"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">
            {eyebrow}
          </p>
          <div className="md:col-span-8">
            <h2
              id={headingId}
              className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <dl className="mt-16 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {numbered.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col border-b py-8 sm:px-6 lg:border-b-0",
                i % 2 === 1 && "sm:border-l",
                i > 0 && "lg:border-l",
                "sm:first:pl-0"
              )}
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-6 text-5xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl">
                {stat.value}
                {stat.footnoteNumber && (
                  <sup className="ml-1 align-super font-mono text-xs font-normal tracking-normal text-muted-foreground">
                    <a href={`#${headingId}-note-${stat.footnoteNumber}`}>
                      {stat.footnoteNumber}
                    </a>
                  </sup>
                )}
              </dd>
              <dd className="mt-4 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                {stat.note}
              </dd>
            </div>
          ))}
        </dl>

        {(footnoteCount > 0 || measuredAt) && (
          <footer className="mt-12 grid gap-6 border-t pt-4 md:grid-cols-12 md:gap-10">
            {measuredAt && (
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">
                {measuredAt}
              </p>
            )}
            <ol className="space-y-1.5 text-xs leading-relaxed text-muted-foreground md:col-span-8">
              {numbered
                .filter((stat) => stat.footnoteNumber)
                .map((stat) => (
                  <li
                    key={stat.label}
                    id={`${headingId}-note-${stat.footnoteNumber}`}
                    className="flex gap-3"
                  >
                    <span className="font-mono tabular-nums">{stat.footnoteNumber}</span>
                    {stat.footnote}
                  </li>
                ))}
            </ol>
          </footer>
        )}
      </div>
    </section>
  );
}

export { FeaturesBlockFour };
