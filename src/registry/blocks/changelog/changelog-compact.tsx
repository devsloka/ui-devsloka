"use client";

import { useId, useState, type ComponentProps, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type CompactChangeType = "new" | "improved" | "fixed";
export type CompactFilter = "all" | CompactChangeType;

export type CompactChange = {
  /** Display date, e.g. "06 Oct". */
  date: string;
  /** Machine-readable date for the <time> element, e.g. "2026-10-06". */
  dateTime: string;
  type: CompactChangeType;
  text: string;
  version: string;
  href: string;
};

export type ChangelogCompactProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  changes?: CompactChange[];
  /** Controlled filter. Leave undefined to let the block manage it. */
  filter?: CompactFilter;
  defaultFilter?: CompactFilter;
  onFilterChange?: (filter: CompactFilter) => void;
  rssHref?: string;
  /** Marker colour for "New". Default Devsloka blue. */
  accent?: string;
  /** Marker colour for "Improved". Default ink blue. */
  secondary?: string;
} & ComponentProps<"section">;

const FILTERS: { value: CompactFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "improved", label: "Improved" },
  { value: "fixed", label: "Fixed" },
];

const TYPE_LABEL: Record<CompactChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
};

const MARKER_CLASS: Record<CompactChangeType, string> = {
  new: "bg-[var(--block-accent)]",
  improved: "bg-[var(--block-secondary)] ring-1 ring-border",
  fixed: "border border-foreground",
};

const v = (version: string) => ({ version, href: `#v${version}` });

const DEFAULT_CHANGES: CompactChange[] = [
  { date: "06 Oct", dateTime: "2026-10-06", type: "new", text: "Baselines are committed to .plumbline/ in your repository.", ...v("5.0.0") },
  { date: "06 Oct", dateTime: "2026-10-06", type: "new", text: "plumbline review runs the review queue on localhost:4410.", ...v("5.0.0") },
  { date: "06 Oct", dateTime: "2026-10-06", type: "improved", text: "Capture on 400 stories: 6m 12s down to 2m 41s.", ...v("5.0.0") },
  { date: "29 Sep", dateTime: "2026-09-29", type: "new", text: "Review queue groups snapshots by component.", ...v("4.12.0") },
  { date: "29 Sep", dateTime: "2026-09-29", type: "fixed", text: "Webfont 404s on Linux runners now fail the capture loudly.", ...v("4.12.0") },
  { date: "16 Sep", dateTime: "2026-09-16", type: "fixed", text: "Subpixel antialiasing ignored on text below 12px.", ...v("4.11.2") },
  { date: "16 Sep", dateTime: "2026-09-16", type: "improved", text: "Missing baseline branch is named in the error message.", ...v("4.11.2") },
  { date: "02 Sep", dateTime: "2026-09-02", type: "new", text: "Drift report flags colours within ΔE 2 of a token.", ...v("4.11.0") },
  { date: "02 Sep", dateTime: "2026-09-02", type: "improved", text: "Uploads resume after a dropped connection.", ...v("4.11.0") },
  { date: "19 Aug", dateTime: "2026-08-19", type: "fixed", text: "Timestamps in the digest use the team's time zone, not UTC.", ...v("4.10.1") },
  { date: "12 Aug", dateTime: "2026-08-12", type: "new", text: "Capture shards across up to 16 parallel workers.", ...v("4.10.0") },
  { date: "12 Aug", dateTime: "2026-08-12", type: "improved", text: "plumbline.config.ts gets full type hints for every option.", ...v("4.10.0") },
];

export function ChangelogCompact({
  eyebrow = "Plumbline / Changelog",
  title = "Every change, one line each",
  description = "The short version of the release notes. Filter by kind, or follow along in your feed reader.",
  changes = DEFAULT_CHANGES,
  filter: filterProp,
  defaultFilter = "all",
  onFilterChange,
  rssHref = "/changelog/rss.xml",
  accent = "#0A6EFF",
  secondary = "#0A0A0A",
  className,
  style,
  ...props
}: ChangelogCompactProps) {
  const headingId = useId();
  const [uncontrolledFilter, setFilter] = useState<CompactFilter>(defaultFilter);
  const filter = filterProp ?? uncontrolledFilter;

  const visible = filter === "all" ? changes : changes.filter((c) => c.type === filter);
  const activeLabel = FILTERS.find((f) => f.value === filter)?.label ?? "All";

  const choose = (next: CompactFilter) => {
    setFilter(next);
    onFilterChange?.(next);
  };

  return (
    <section
      data-slot="changelog-compact"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={
        { "--block-accent": accent, "--block-secondary": secondary, ...style } as CSSProperties
      }
      {...props}
    >
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <a
            href={rssHref}
            className="shrink-0 self-start font-mono text-xs uppercase tracking-wider underline decoration-1 underline-offset-4 outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring md:self-auto"
          >
            Subscribe via RSS
          </a>
        </header>

        <div
          role="group"
          aria-label="Filter changes by type"
          className="mt-10 flex flex-wrap border-y"
        >
          {FILTERS.map((f) => {
            const pressed = filter === f.value;
            const count =
              f.value === "all" ? changes.length : changes.filter((c) => c.type === f.value).length;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => choose(f.value)}
                className={cn(
                  "flex items-center gap-2 border-r px-4 py-2.5 text-sm outline-none transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  pressed
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {f.value !== "all" && (
                  <span aria-hidden className={cn("size-2", MARKER_CLASS[f.value])} />
                )}
                {f.label}
                <span className="font-mono text-[11px] tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {filter === "all"
            ? `Showing all ${visible.length} changes`
            : `Showing ${visible.length} ${activeLabel.toLowerCase()} changes`}
        </p>

        {visible.length > 0 ? (
          <ul className="divide-y border-b">
            {visible.map((change, i) => (
              <li
                key={`${change.version}-${i}-${change.text}`}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-3 text-sm sm:grid-cols-[4.5rem_6.5rem_1fr_auto]"
              >
                <time
                  dateTime={change.dateTime}
                  className="font-mono text-xs tabular-nums text-muted-foreground"
                >
                  {change.date}
                </time>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground max-sm:hidden">
                  <span aria-hidden className={cn("size-2 shrink-0", MARKER_CLASS[change.type])} />
                  {TYPE_LABEL[change.type]}
                </span>
                <span className="leading-relaxed">
                  <span className="sr-only sm:hidden">{TYPE_LABEL[change.type]}: </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mr-2 inline-block size-2 align-middle sm:hidden",
                      MARKER_CLASS[change.type]
                    )}
                  />
                  {change.text}
                </span>
                <a
                  href={change.href}
                  className="col-start-2 font-mono text-xs tabular-nums text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring sm:col-start-auto sm:text-right"
                >
                  v{change.version}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-b py-16 text-center">
            <p className="text-sm">No {activeLabel.toLowerCase()} changes in this period.</p>
            <button
              type="button"
              onClick={() => choose("all")}
              className="mt-3 font-mono text-xs uppercase tracking-wider underline decoration-1 underline-offset-4 outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all changes
            </button>
          </div>
        )}

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Showing {visible.length} of {changes.length} · Older entries are in the 4.x archive.
        </p>
      </div>
    </section>
  );
}
