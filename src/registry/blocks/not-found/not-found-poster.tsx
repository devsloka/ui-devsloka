import { useId, type CSSProperties, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };
type Destination = { label: string; href: string };

export type NotFoundPosterProps = {
  /** Background field colour. Text on it is white, so keep it saturated or dark. */
  accent?: string;
  /** Second ink, used for the "0" disc and one bar. */
  secondary?: string;
  /** The path that was requested, shown in mono. */
  path?: string;
  title?: string;
  description?: string;
  homeAction?: Action;
  docsAction?: Action;
  destinationsLabel?: string;
  destinations?: Destination[];
} & ComponentProps<"section">;

const DEFAULTS = {
  accent: "#0A6EFF",
  secondary: "#0A0A0A",
  path: "/pricing-2024",
  title: "This page moved, or never existed.",
  description:
    "Osier changed its plans in September and some old links still point at the 2024 price sheet. Everything that page had is now on the current pricing page.",
  homeAction: { label: "Go home", href: "/" },
  docsAction: { label: "Search the docs", href: "/docs" },
  destinationsLabel: "Popular right now",
  destinations: [
    { label: "Pricing", href: "/pricing" },
    { label: "Booking setup guide", href: "/docs/booking-setup" },
    { label: "Changelog", href: "/changelog" },
    { label: "System status", href: "/status" },
  ],
} satisfies Partial<NotFoundPosterProps>;

const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFFFFF]";

export function NotFoundPoster({
  accent = DEFAULTS.accent,
  secondary = DEFAULTS.secondary,
  path = DEFAULTS.path,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  homeAction = DEFAULTS.homeAction,
  docsAction = DEFAULTS.docsAction,
  destinationsLabel = DEFAULTS.destinationsLabel,
  destinations = DEFAULTS.destinations,
  className,
  style,
  ...props
}: NotFoundPosterProps) {
  const headingId = useId();

  return (
    <section
      data-slot="not-found-poster"
      aria-labelledby={headingId}
      className={cn(
        "w-full overflow-hidden bg-[var(--block-accent)] text-[#FFFFFF]",
        className
      )}
      style={
        {
          "--block-accent": accent,
          "--block-secondary": secondary,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex items-baseline justify-between border-b border-[#FFFFFF] pb-3 font-mono text-xs uppercase tracking-wider">
          <span>Error 404 · Not found</span>
          <span className="hidden sm:inline">Osier</span>
        </div>

        {/* The poster: "4", a disc standing in for the 0, "4", plus a half-disc and two bars. */}
        <div
          aria-hidden="true"
          className="relative mt-10 select-none text-[clamp(8rem,31vw,21rem)] leading-[0.78] font-semibold tracking-[-0.06em] md:mt-14"
        >
          <div className="relative z-10 flex items-center">
            <span>4</span>
            <span className="relative mx-[0.04em] inline-block size-[0.72em] shrink-0 rounded-full bg-[var(--block-secondary)]">
              <span className="absolute top-[22%] left-[30%] size-[0.24em] rounded-full bg-[var(--block-accent)]" />
            </span>
            <span>4</span>
          </div>
          <span className="absolute top-[4%] right-[6%] hidden h-[0.42em] w-[0.84em] rounded-t-full bg-[#FFFFFF] md:block" />
          <span className="absolute top-[46%] right-[6%] hidden h-[0.07em] w-[0.84em] bg-[var(--block-secondary)] md:block" />
          <span className="absolute right-[6%] bottom-[4%] hidden h-[0.07em] w-[0.5em] bg-[#FFFFFF] md:block" />
        </div>

        <div className="mt-14 grid gap-12 border-t border-[#FFFFFF] pt-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2
              id={headingId}
              className="max-w-xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#FFFFFF]/80">
              {description}
            </p>
            <p className="mt-6 font-mono text-sm">
              <span className="text-[#FFFFFF]/70">Requested </span>
              <code className="break-all border-b border-dashed border-[#FFFFFF] pb-0.5">
                {path}
              </code>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={homeAction.href}
                className={cn(
                  "inline-flex h-11 items-center bg-[#FFFFFF] px-6 text-sm font-medium text-[var(--block-accent)] transition-colors hover:bg-[var(--block-secondary)] hover:text-[#FFFFFF]",
                  focusRing
                )}
              >
                {homeAction.label}
              </a>
              <a
                href={docsAction.href}
                className={cn(
                  "text-sm font-medium underline decoration-1 underline-offset-[6px] hover:decoration-2",
                  focusRing
                )}
              >
                {docsAction.label}
              </a>
            </div>
          </div>

          {destinations.length > 0 && (
            <nav aria-label={destinationsLabel} className="md:col-span-4 md:col-start-9">
              <p className="font-mono text-xs uppercase tracking-wider text-[#FFFFFF]/70">
                {destinationsLabel}
              </p>
              <ul className="mt-4 border-t border-[#FFFFFF]">
                {destinations.map((destination) => (
                  <li key={destination.href} className="border-b border-[#FFFFFF]">
                    <a
                      href={destination.href}
                      className={cn(
                        "group flex items-baseline justify-between gap-4 py-3 text-sm",
                        focusRing
                      )}
                    >
                      <span className="font-medium group-hover:underline group-hover:underline-offset-4">
                        {destination.label}
                      </span>
                      <span className="font-mono text-xs text-[#FFFFFF]/70">
                        {destination.href}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
