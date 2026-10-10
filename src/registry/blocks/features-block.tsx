import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type FeaturesBlockFeature = {
  title: string;
  description: string;
  /** Small mono detail under the description, e.g. a limit or plan. */
  meta?: string;
};

export type FeaturesBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Mono metadata shown in the label row above the grid. */
  labels?: string[];
  features?: FeaturesBlockFeature[];
  /** Index of the cell drawn in the accent color. Pass -1 for none. */
  highlightIndex?: number;
} & ComponentProps<"section">;

const DEFAULT_FEATURES: FeaturesBlockFeature[] = [
  {
    title: "Branching databases",
    description:
      "Fork production into an isolated copy in about two seconds. Schema and data, copy-on-write, so a 400 GB branch costs what it changes.",
    meta: "Up to 50 branches per project",
  },
  {
    title: "Point-in-time restore",
    description:
      "Pick any second from the last 30 days and restore to a new branch. Your current database keeps serving traffic while you look.",
    meta: "30-day window on Pro",
  },
  {
    title: "Read replicas in four regions",
    description:
      "Frankfurt, Virginia, Singapore and São Paulo. Replication lag sits under 80 ms at the 95th percentile.",
    meta: "p95 lag, Aug 2026",
  },
  {
    title: "Query insights",
    description:
      "The ten slowest statements of the day, with plans, call counts and the deploy that introduced them.",
  },
  {
    title: "Connection pooling",
    description:
      "A built-in pooler holds 10,000 client connections against 120 on the server. Serverless functions stop exhausting your limit.",
    meta: "Transaction mode",
  },
  {
    title: "Plain Postgres 17",
    description:
      "No forked engine, no proprietary SQL. pg_dump works, extensions work, and leaving takes one command.",
    meta: "62 extensions enabled",
  },
];

const DEFAULTS = {
  eyebrow: "(Features)",
  title: "Postgres, with the parts you used to script yourself.",
  description:
    "Ferro runs standard Postgres and handles branching, backups, replicas and pooling around it. Six things you get on day one.",
  labels: ["06 capabilities", "Ferro 3.2", "Updated 18 Sep 2026"],
};

export default function FeaturesBlock({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  labels = DEFAULTS.labels,
  features = DEFAULT_FEATURES,
  highlightIndex = 0,
  className,
  ...props
}: FeaturesBlockProps) {
  const headingId = useId();

  return (
    <section
      data-slot="features-block"
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

        {labels.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}

        <ul className="grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const highlighted = i === highlightIndex;
            return (
              <li
                key={feature.title}
                className={cn(
                  "flex min-h-64 flex-col border-r border-b p-6 md:p-8",
                  highlighted && "bg-primary text-primary-foreground"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    highlighted
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-lg font-medium tracking-tight">
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    highlighted
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {feature.description}
                </p>
                {feature.meta && (
                  <p
                    className={cn(
                      "mt-auto pt-6 font-mono text-[11px] uppercase tracking-wider",
                      highlighted
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {feature.meta}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
