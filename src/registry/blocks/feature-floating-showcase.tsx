"use client";

import { useId, useState, type ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type ShowcaseAnnotation = {
  title: string;
  description: string;
};

export type ShowcaseDeploy = {
  commit: string;
  message: string;
  branch: string;
  author: string;
  status: "live" | "queued" | "building" | "rolled back";
  duration: string;
};

export type FloatingFeatureShowcaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /**
   * Notes keyed to the numbered markers in the panel, in order:
   * 01 queue header, 02 preview link, 03 rollback action, 04 audit footer.
   */
  annotations?: ShowcaseAnnotation[];
  deploys?: ShowcaseDeploy[];
  /** Line shown in the panel's audit footer (marker 04). */
  auditLine?: string;
  footnote?: string;
} & ComponentProps<"section">;

const DEFAULT_ANNOTATIONS: ShowcaseAnnotation[] = [
  {
    title: "One queue per environment",
    description:
      "Merges line up in the order they were approved. Halyard rebases each one on the last green build, so main never breaks on a race.",
  },
  {
    title: "A preview for every branch",
    description:
      "Each push gets its own URL with seeded data, torn down 48 hours after the branch merges or goes quiet.",
  },
  {
    title: "Rollback is a single action",
    description:
      "The previous build stays warm for 24 hours. Rolling back swaps traffic in under four seconds, no rebuild involved.",
  },
  {
    title: "Every change is on the record",
    description:
      "Who shipped what, when, and who approved it, exportable as CSV for the quarterly audit nobody enjoys.",
  },
];

const DEFAULT_DEPLOYS: ShowcaseDeploy[] = [
  {
    commit: "a41f9c2",
    message: "Cap retry backoff at 30s",
    branch: "main",
    author: "R. Okafor",
    status: "live",
    duration: "1m 52s",
  },
  {
    commit: "7be03d1",
    message: "Invoice PDF uses tenant locale",
    branch: "fix/invoice-locale",
    author: "M. Lindqvist",
    status: "building",
    duration: "0m 41s",
  },
  {
    commit: "c9921ee",
    message: "Drop legacy webhook signer",
    branch: "chore/webhooks-v1",
    author: "T. Brandt",
    status: "queued",
    duration: "—",
  },
  {
    commit: "0d5a6b8",
    message: "Bump connection pool to 40",
    branch: "main",
    author: "A. Ruiz",
    status: "rolled back",
    duration: "2m 07s",
  },
];

const DEFAULTS = {
  eyebrow: "Halyard / Deploys",
  title: "The release page your on-call engineer actually wants open at 2 a.m.",
  description:
    "Halyard puts the merge queue, previews, rollbacks and the audit trail on one screen. Here is what each part does.",
  auditLine: "14:02 — R. Okafor promoted a41f9c2, approved by A. Ruiz",
  footnote:
    "Timings measured on the Halyard Team plan, Frankfurt region, September 2026.",
};

function Marker({
  n,
  active,
  className,
}: {
  n: number;
  active: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-sm border font-mono text-[10px] tabular-nums transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-foreground/30 bg-background text-foreground",
        className
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

const STATUS_STYLES: Record<ShowcaseDeploy["status"], string> = {
  live: "bg-primary",
  building: "bg-foreground/60",
  queued: "bg-transparent border border-foreground/40",
  "rolled back": "bg-destructive",
};

export function FloatingFeatureShowcase({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  annotations = DEFAULT_ANNOTATIONS,
  deploys = DEFAULT_DEPLOYS,
  auditLine = DEFAULTS.auditLine,
  footnote = DEFAULTS.footnote,
  className,
  ...props
}: FloatingFeatureShowcaseProps) {
  const headingId = useId();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  const isActive = (n: number) => active === n;

  return (
    <section
      data-slot="feature-floating-showcase"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-6 border-t pt-6 md:grid-cols-12 md:gap-10">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
            {eyebrow}
          </p>
          <div className="md:col-span-9">
            <h2
              id={headingId}
              className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Product panel built from plain UI */}
          <motion.div
            {...fadeIn}
            aria-hidden="true"
            className="overflow-hidden rounded-sm border bg-card text-card-foreground lg:col-span-8"
          >
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full border border-foreground/30" />
                <span className="size-2 rounded-full border border-foreground/30" />
                <span className="size-2 rounded-full border border-foreground/30" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                halyard.app/acme-billing/production
              </span>
              <span className="w-10" />
            </div>

            <div className="grid sm:grid-cols-[9rem_1fr]">
              <div className="hidden border-r p-4 sm:block">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Environments
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="font-medium">Production</li>
                  <li className="text-muted-foreground">Staging</li>
                  <li className="text-muted-foreground">Previews</li>
                </ul>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Team
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>Approvals</li>
                  <li>Audit log</li>
                </ul>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3 border-b px-4 py-3">
                  <Marker n={1} active={isActive(1)} />
                  <p className="text-sm font-medium">Merge queue</p>
                  <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
                    {deploys.length} entries
                  </span>
                </div>

                <ul className="divide-y">
                  {deploys.map((deploy, i) => (
                    <li
                      key={deploy.commit}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 text-sm"
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          STATUS_STYLES[deploy.status]
                        )}
                      />
                      <div className="min-w-0">
                        <p className="truncate">{deploy.message}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted-foreground">
                          <span>{deploy.commit}</span>
                          <span>{deploy.branch}</span>
                          <span className="hidden sm:inline">
                            {deploy.author}
                          </span>
                          {i === 1 && (
                            <span className="inline-flex items-center gap-1.5 text-foreground underline underline-offset-2">
                              preview
                              <Marker n={2} active={isActive(2)} />
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden font-mono text-[11px] tabular-nums text-muted-foreground sm:inline">
                          {deploy.duration}
                        </span>
                        {i === 0 ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="rounded-sm border px-2 py-0.5 text-[11px]">
                              Roll back
                            </span>
                            <Marker n={3} active={isActive(3)} />
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {deploy.status}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 border-t bg-muted/50 px-4 py-2.5">
                  <Marker n={4} active={isActive(4)} />
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {auditLine}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Annotations */}
          <ol
            className="divide-y border-y lg:col-span-4"
            onMouseLeave={() => setActive(null)}
          >
            {annotations.map((note, i) => {
              const n = i + 1;
              return (
                <li
                  key={note.title}
                  onMouseEnter={() => setActive(n)}
                  className="flex gap-4 py-5"
                >
                  <Marker n={n} active={isActive(n)} className="mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">{note.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {note.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {footnote && (
          <p className="mt-10 font-mono text-xs text-muted-foreground">
            * {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
