import { useId, type ComponentProps, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type CtaPosterProps = {
  /** Small mono labels across the top of the poster: left and right. */
  kicker?: [string, string];
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  footnote?: string;
  /** The poster field colour. Defaults to Devsloka blue; near-black (#0A0A0A) also works with the default text colour. */
  accent?: string;
  /** Text and button colour on the field. Must pass contrast against `accent`. */
  accentForeground?: string;
  /** The second ink, used only for the large circle in the composition. */
  highlight?: string;
} & ComponentProps<"section">;

const DEFAULTS = {
  kicker: ["Plinth · Portfolio sites for architects", "No. 04 / Winter intake"] as [string, string],
  title: "Show the drawings, not the template.",
  description:
    "Plinth sets your plans, sections and site photos on a strict grid, at full resolution, with project data in the margin. Most studios publish their first twelve projects in an afternoon.",
  primaryAction: { label: "Start a 30-day trial", href: "#" },
  secondaryAction: { label: "See studios using Plinth", href: "#" },
  footnote: "No card needed. From €14 a month after the trial, billed per studio, not per seat.",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
  highlight: "#0A0A0A",
};

// A fixed 5 x 5 grid of dots, computed once (no randomness, so markup is stable across renders).
const DOTS = Array.from({ length: 25 }, (_, i) => ({ x: 36 + (i % 5) * 22, y: 36 + Math.floor(i / 5) * 22 }));

export function CtaPoster({
  kicker = DEFAULTS.kicker,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  footnote = DEFAULTS.footnote,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  highlight = DEFAULTS.highlight,
  className,
  style,
  ...props
}: CtaPosterProps) {
  const headingId = useId();

  return (
    <section
      data-slot="cta-poster"
      aria-labelledby={headingId}
      style={
        {
          "--block-accent": accent,
          "--block-fg": accentForeground,
          "--block-highlight": highlight,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "relative w-full overflow-hidden bg-[var(--block-accent)] text-[var(--block-fg)]",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-[var(--block-fg)] pb-3 font-mono text-[11px] uppercase tracking-wider">
          <span>{kicker[0]}</span>
          <span>{kicker[1]}</span>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-6 md:pt-14">
          {/* Composition: a disc cropped by the edge, a dot grid, three stepped bars and a punched hole. */}
          <div aria-hidden className="order-first ml-auto w-3/5 max-w-xs md:order-last md:col-span-4 md:-mr-24 md:w-auto md:max-w-none lg:-mr-40">
            <svg viewBox="0 0 400 460" className="block h-auto w-full" fill="none">
              <circle cx="250" cy="190" r="160" fill="var(--block-highlight)" />
              <circle cx="300" cy="140" r="26" fill="var(--block-accent)" />
              {DOTS.map((d) => (
                <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="3.5" fill="var(--block-fg)" />
              ))}
              <rect x="36" y="330" width="250" height="20" fill="var(--block-fg)" />
              <rect x="36" y="370" width="180" height="20" fill="var(--block-fg)" />
              <rect x="36" y="410" width="110" height="20" fill="var(--block-fg)" />
            </svg>
          </div>

          <div className="md:col-span-8">
            <h2
              id={headingId}
              className="text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-balance sm:text-7xl lg:text-[7.5rem]"
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[var(--block-fg)] pt-8 md:mt-20 md:grid-cols-12 md:gap-6">
          <p className="max-w-md text-base leading-relaxed md:col-span-6">{description}</p>
          <div className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button
                asChild
                size="lg"
                className="rounded-none bg-[var(--block-fg)] text-[var(--block-accent)] shadow-none hover:bg-[var(--block-fg)] hover:underline hover:underline-offset-4 focus-visible:ring-[var(--block-fg)]"
              >
                <a href={primaryAction.href}>{primaryAction.label}</a>
              </Button>
              <a
                href={secondaryAction.href}
                className="rounded-none text-sm font-medium underline decoration-1 underline-offset-[6px] outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-[var(--block-fg)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--block-accent)]"
              >
                {secondaryAction.label}
              </a>
            </div>
            {footnote && <p className="mt-5 max-w-sm font-mono text-[11px] leading-relaxed">{footnote}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
