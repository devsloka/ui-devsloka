import { useId, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ChangeType = "new" | "improved" | "fixed";

export type ChangelogChange = { type: ChangeType; text: string };

export type TimelineRelease = {
  version: string;
  /** Display date, e.g. "6 Oct 2026". */
  date: string;
  /** Machine-readable date for the <time> element, e.g. "2026-10-06". */
  dateTime: string;
  title: string;
  summary: string;
  changes: ChangelogChange[];
  /** Optional screenshot-like visual shown under the changes. */
  visual?: ReactNode;
};

export type ChangelogTimelineProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  releases?: TimelineRelease[];
  /** Fill of the "New" tag. Text on it is white, so keep it saturated or dark. Default Devsloka blue. */
  accent?: string;
  /** Fill of the "Improved" tag. Text on it is near-black, so keep it light. Default pale blue tint. */
  highlight?: string;
} & ComponentProps<"section">;

const TYPE_LABEL: Record<ChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
};

const TAG_CLASS: Record<ChangeType, string> = {
  new: "bg-[var(--block-accent)] text-white",
  improved: "bg-[var(--block-highlight)] text-[#0A0A0A]",
  fixed: "bg-foreground text-background",
};

/** A small UI fragment: a snapshot diff, baseline against the new capture. */
function SnapshotDiff() {
  return (
    <figure className="mt-8 border bg-card">
      <figcaption className="flex items-center justify-between border-b px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>Button / Primary / Disabled</span>
        <span className="tabular-nums">0.42% changed</span>
      </figcaption>
      <div className="grid grid-cols-2 divide-x">
        {(["Baseline", "Current"] as const).map((side) => (
          <div key={side} className="p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {side}
            </p>
            <div className="mt-4 flex h-24 items-center justify-center border border-dashed">
              <div
                className={cn(
                  "relative border px-4 py-1.5 text-xs text-muted-foreground",
                  side === "Current" && "px-5"
                )}
              >
                Save changes
                {side === "Current" && (
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 border-2 border-[var(--block-accent)]"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>Padding 16px → 20px, from token space.5</span>
        <span>Grouped under Button · 14 stories</span>
      </div>
    </figure>
  );
}

function Screenshot() {
  return (
    <figure className="mt-8 border">
      {/* Plain <img> keeps the block portable outside Next.js. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
        alt="An analytics dashboard with charts open on a laptop screen"
        width={1200}
        height={800}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover"
      />
      <figcaption className="border-t px-4 py-2 font-mono text-[11px] text-muted-foreground">
        Fig. 1 — The drift report sits beside your team’s existing dashboards.
      </figcaption>
    </figure>
  );
}

const DEFAULT_RELEASES: TimelineRelease[] = [
  {
    version: "5.0.0",
    date: "6 Oct 2026",
    dateTime: "2026-10-06",
    title: "Baselines now live in your repository",
    summary:
      "Plumbline 5 stores approved snapshots as small files under .plumbline/, so every branch carries its own visual baseline and a revert restores the screenshots along with the code.",
    changes: [
      { type: "new", text: "Baselines are committed as lossless WebP, about 40 KB per snapshot." },
      { type: "new", text: "plumbline review opens the review queue locally on port 4410." },
      { type: "improved", text: "Capture on a 400-story library dropped from 6m 12s to 2m 41s." },
      { type: "fixed", text: "Snapshots taken at 125% zoom no longer report a 1px shift on every edge." },
    ],
  },
  {
    version: "4.12.0",
    date: "29 Sep 2026",
    dateTime: "2026-09-29",
    title: "Review diffs by component, not by page",
    summary:
      "When a shared button changes, you used to approve it on every page it appeared on. The review queue now groups snapshots by component, so one decision covers all of its stories.",
    changes: [
      { type: "new", text: "Component grouping in the review queue, with a count of affected stories." },
      { type: "new", text: "plumbline approve --since main approves only what changed on your branch." },
      { type: "improved", text: "The diff overlay renders 3x faster on 4K snapshots (median 410 ms to 130 ms)." },
      { type: "fixed", text: "Webfont 404s on Linux runners no longer fall back silently to a system font." },
    ],
    visual: <SnapshotDiff />,
  },
  {
    version: "4.11.2",
    date: "16 Sep 2026",
    dateTime: "2026-09-16",
    title: "Fewer flaky text diffs",
    summary:
      "A patch release for teams who saw diffs on small text that nobody could see with their eyes.",
    changes: [
      { type: "fixed", text: "Subpixel antialiasing is ignored on text set below 12px." },
      { type: "fixed", text: "Approving a snapshot on a closed pull request no longer reopens its check." },
      { type: "improved", text: "A missing baseline branch is now named in the error, not just “not found”." },
    ],
  },
  {
    version: "4.11.0",
    date: "2 Sep 2026",
    dateTime: "2026-09-02",
    title: "Token drift reports",
    summary:
      "Plumbline now reads your design tokens and flags hard-coded values that are almost, but not quite, a token. Most teams find a dozen in the first run.",
    changes: [
      { type: "new", text: "Drift report flags colours within ΔE 2 of a token and spacing within 2px." },
      { type: "new", text: "A weekly digest per team, sent Monday at 09:00 in the team's time zone." },
      { type: "improved", text: "Uploads resume after a dropped connection instead of restarting the run." },
    ],
    visual: <Screenshot />,
  },
];

export function ChangelogTimeline({
  eyebrow = "Changelog",
  title = "What changed in Plumbline",
  description = "Every release of the visual testing tool, newest first. Patch notes are written by the engineer who shipped the change.",
  releases = DEFAULT_RELEASES,
  accent = "#0A6EFF",
  highlight = "#E8F0FF",
  className,
  style,
  ...props
}: ChangelogTimelineProps) {
  const headingId = useId();

  return (
    <section
      data-slot="changelog-timeline"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={
        { "--block-accent": accent, "--block-highlight": highlight, ...style } as CSSProperties
      }
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="grid gap-6 border-b pb-12 md:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
            {eyebrow}
          </p>
          <div className="md:col-span-9">
            <h2
              id={headingId}
              className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </header>

        <ol className="relative">
          {releases.map((release, i) => (
            <li key={release.version} className="grid md:grid-cols-12">
              <div className="pt-12 md:col-span-3 md:pr-8">
                <div className="md:sticky md:top-24">
                  <time
                    dateTime={release.dateTime}
                    className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    {release.date}
                  </time>
                  <p className="mt-2 font-mono text-sm tabular-nums">v{release.version}</p>
                </div>
              </div>

              {/* The hairline that runs between releases, with a square node per release. */}
              <article
                aria-labelledby={`${headingId}-${i}`}
                className="relative border-l pt-12 pb-4 pl-6 md:col-span-9 md:pl-10"
              >
                <span
                  aria-hidden
                  className="absolute top-[3.35rem] -left-[5px] size-[9px] border border-foreground bg-background"
                />
                <h3
                  id={`${headingId}-${i}`}
                  className="text-2xl font-semibold tracking-tight text-balance"
                >
                  {release.title}
                </h3>
                <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                  {release.summary}
                </p>
                <ul className="mt-6 max-w-prose divide-y border-y">
                  {release.changes.map((change, j) => (
                    <li key={j} className="flex items-baseline gap-4 py-3 text-sm leading-relaxed">
                      <span
                        className={cn(
                          "w-[4.75rem] shrink-0 px-1.5 py-0.5 text-center font-mono text-[10px] font-semibold uppercase tracking-wider",
                          TAG_CLASS[change.type]
                        )}
                      >
                        {TYPE_LABEL[change.type]}
                      </span>
                      <span>{change.text}</span>
                    </li>
                  ))}
                </ul>
                {release.visual && <div className="max-w-2xl">{release.visual}</div>}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
