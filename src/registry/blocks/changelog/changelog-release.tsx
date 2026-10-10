import { useId, type ComponentProps, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ReleaseGroup = { heading: string; items: string[] };

export type ChangelogReleaseProps = {
  /** Full version, used in metadata, e.g. "5.0.0". */
  version?: string;
  /** Short form set as the poster numeral, e.g. "5.0". */
  numeral?: string;
  product?: string;
  title?: string;
  /** Display date, e.g. "6 October 2026". */
  date?: string;
  /** Machine-readable date for the <time> element. */
  dateTime?: string;
  lead?: string;
  groups?: ReleaseGroup[];
  /** Footnote under the groups, e.g. upgrade instructions. */
  note?: string;
  /** The colour field. Default ink blue. */
  accent?: string;
  /** Second ink, used for the shapes on the field. Default near-black. */
  secondary?: string;
  /** Text and line colour on the field. Default white. */
  fieldForeground?: string;
} & ComponentProps<"section">;

const DEFAULT_GROUPS: ReleaseGroup[] = [
  {
    heading: "New",
    items: [
      "Baselines are committed to .plumbline/ as lossless WebP, about 40 KB per snapshot, and reviewed in the same pull request as the code.",
      "plumbline review opens the review queue on localhost:4410, so you can approve before you push.",
      "Per-story thresholds: set tolerance: 0.2% on a chart story without loosening the rest of the library.",
    ],
  },
  {
    heading: "Improved",
    items: [
      "Capture on a 400-story library dropped from 6m 12s to 2m 41s on the default 4-core runner.",
      "Review queue shortcuts: J and K to move, A to approve, R to request changes.",
      "Diffs open at the changed region instead of the top-left of the snapshot.",
    ],
  },
  {
    heading: "Fixed",
    items: [
      "Snapshots taken at 125% zoom no longer report a 1px shift on every edge.",
      "Stories with an autoplaying video are captured on the first frame, every time.",
      "Renaming a story keeps its history instead of starting a new baseline.",
    ],
  },
];

const DEFAULTS = {
  version: "5.0.0",
  numeral: "5.0",
  product: "Plumbline",
  title: "Baselines that live next to your code",
  date: "6 October 2026",
  dateTime: "2026-10-06",
  lead: "For four years Plumbline kept your approved screenshots on our servers. That meant a revert restored the code but not the pictures, and two branches could fight over one baseline. In version 5 the baselines move into your repository, and the rest of the release follows from that.",
  note: "Upgrading from 4.x: run npx plumbline migrate. It copies your current baselines into the repository and opens one commit for you to review. Nothing is deleted from our side for 90 days.",
};

export function ChangelogRelease({
  version = DEFAULTS.version,
  numeral = DEFAULTS.numeral,
  product = DEFAULTS.product,
  title = DEFAULTS.title,
  date = DEFAULTS.date,
  dateTime = DEFAULTS.dateTime,
  lead = DEFAULTS.lead,
  groups = DEFAULT_GROUPS,
  note = DEFAULTS.note,
  accent = "#0A6EFF",
  secondary = "#0A0A0A",
  fieldForeground = "#FFFFFF",
  className,
  style,
  ...props
}: ChangelogReleaseProps) {
  const headingId = useId();

  return (
    <section
      data-slot="changelog-release"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={
        {
          "--block-accent": accent,
          "--block-secondary": secondary,
          "--block-on-accent": fieldForeground,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>{product} release notes</span>
          <span>
            Version {version} · <time dateTime={dateTime}>{date}</time>
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          {/* The colour field: a poster numeral and a plumb line. */}
          <div
            aria-hidden
            className="relative aspect-[4/5] overflow-hidden bg-[var(--block-accent)] text-[var(--block-on-accent)] md:col-span-7"
          >
            <svg
              viewBox="0 0 400 500"
              preserveAspectRatio="xMaxYMin slice"
              className="absolute inset-0 size-full"
            >
              <circle cx="400" cy="110" r="96" fill="var(--block-secondary)" />
              <line
                x1="270"
                y1="0"
                x2="270"
                y2="258"
                stroke="var(--block-on-accent)"
                strokeWidth="1.5"
              />
              <path d="M250 258 h40 l-20 52 z" fill="var(--block-secondary)" />
              <rect x="252" y="252" width="36" height="6" fill="var(--block-on-accent)" />
              {Array.from({ length: 20 }, (_, i) => (
                <circle
                  key={i}
                  cx={300 + (i % 5) * 18}
                  cy={360 + Math.floor(i / 5) * 18}
                  r="2.2"
                  fill="var(--block-on-accent)"
                />
              ))}
            </svg>
            <p className="absolute top-6 left-6 font-mono text-xs uppercase tracking-wider">
              {product} / {version}
            </p>
            <p className="absolute bottom-0 left-4 text-[8.5rem] leading-[0.8] font-semibold tracking-[-0.06em] tabular-nums sm:text-[13rem] lg:text-[15rem]">
              {numeral}
            </p>
          </div>

          <div className="flex flex-col md:col-span-5 md:pt-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <time dateTime={dateTime}>{date}</time>
            </p>
            <h2
              id={headingId}
              className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-8 font-serif text-lg leading-relaxed text-pretty">{lead}</p>
            <p className="mt-auto hidden border-t pt-4 font-mono text-xs text-muted-foreground md:block">
              Continued below: {groups.reduce((n, g) => n + g.items.length, 0)} changes in{" "}
              {groups.length} groups.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t pt-10 md:grid-cols-3 md:gap-0 md:divide-x">
          {groups.map((group, i) => (
            <div key={group.heading} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-wider">
                <span className="text-muted-foreground tabular-nums">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                {group.heading}
              </h3>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-1.5 shrink-0 bg-[var(--block-secondary)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {note && (
          <p className="mt-14 max-w-2xl border-l-2 border-[var(--block-secondary)] pl-4 text-sm leading-relaxed text-muted-foreground">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
