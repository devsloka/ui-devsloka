"use client";

import { useId, useState, type CSSProperties, type ComponentProps, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Destination = { title: string; description: string; href: string };

export type NotFoundIndexProps = {
  /** Marker colour (the small square). */
  accent?: string;
  /** The path that was requested. */
  path?: string;
  /** Pre-formatted time of the request, e.g. "9 Oct 2026, 14:02". */
  timestamp?: string;
  title?: string;
  description?: string;
  /** A likely intended path, rendered as "Did you mean …?". */
  suggestion?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void | Promise<void>;
  destinationsLabel?: string;
  destinations?: Destination[];
  /** Address for the "Report a broken link" mailto. */
  reportEmail?: string;
  reportLabel?: string;
} & ComponentProps<"section">;

const pad = (n: number) => String(n).padStart(2, "0");

const DEFAULTS = {
  accent: "#0A6EFF",
  path: "/pricing-2024",
  timestamp: "9 Oct 2026, 14:02",
  title: "We couldn't find that page.",
  description:
    "The address may be from an old email or a bookmark from before our September rename. Search below, or pick up from one of the pages most people are looking for.",
  suggestion: "/pricing",
  searchLabel: "Search Osier",
  searchPlaceholder: "Try “recurring bookings” or “refunds”",
  destinationsLabel: "Where people usually go",
  destinations: [
    {
      title: "Pricing",
      description: "Three plans, billed monthly or yearly. The 2024 rates are listed at the bottom.",
      href: "/pricing",
    },
    {
      title: "Getting started",
      description: "Set up your first booking page in about ten minutes.",
      href: "/docs/getting-started",
    },
    {
      title: "Payments and refunds",
      description: "Deposits, cancellation windows and how refunds reach your clients.",
      href: "/docs/payments",
    },
    {
      title: "Changelog",
      description: "What shipped this month, including the new calendar sync.",
      href: "/changelog",
    },
    {
      title: "Talk to support",
      description: "A real person replies within one working day, Monday to Friday.",
      href: "/support",
    },
  ],
  reportEmail: "web@osier.app",
  reportLabel: "Report a broken link",
} satisfies Partial<NotFoundIndexProps>;

export function NotFoundIndex({
  accent = DEFAULTS.accent,
  path = DEFAULTS.path,
  timestamp = DEFAULTS.timestamp,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  suggestion = DEFAULTS.suggestion,
  searchLabel = DEFAULTS.searchLabel,
  searchPlaceholder = DEFAULTS.searchPlaceholder,
  onSearch,
  destinationsLabel = DEFAULTS.destinationsLabel,
  destinations = DEFAULTS.destinations,
  reportEmail = DEFAULTS.reportEmail,
  reportLabel = DEFAULTS.reportLabel,
  className,
  style,
  ...props
}: NotFoundIndexProps) {
  const headingId = useId();
  const inputId = useId();
  const listLabelId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "done">("idle");
  const [lastQuery, setLastQuery] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setLastQuery(trimmed);
    setStatus("searching");
    try {
      await onSearch?.(trimmed);
    } finally {
      setStatus("done");
    }
  };

  const reportHref = `mailto:${reportEmail}?subject=${encodeURIComponent(
    `Broken link: ${path}`
  )}&body=${encodeURIComponent(`I followed a link to ${path} and got a 404.\n\nWhere I found the link:\n`)}`;

  return (
    <section
      data-slot="not-found-index"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      style={{ "--block-accent": accent, ...style } as CSSProperties}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <div className="md:col-span-5">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="size-2.5 shrink-0 bg-[var(--block-accent)]" />
            <span className="text-foreground">GET</span>
            <span className="break-all">{path}</span>
            <span aria-hidden="true">→</span>
            <span className="text-foreground">404</span>
            <span aria-hidden="true">·</span>
            <span>{timestamp}</span>
          </p>

          <h2
            id={headingId}
            className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          {suggestion && (
            <p className="mt-6 text-sm">
              Did you mean{" "}
              <a
                href={suggestion}
                className="font-mono underline decoration-[var(--block-accent)] decoration-2 underline-offset-4 hover:decoration-foreground"
              >
                {suggestion}
              </a>
              ?
            </p>
          )}

          <form onSubmit={handleSubmit} role="search" className="mt-10 border-t pt-6">
            <Label
              htmlFor={inputId}
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {searchLabel}
            </Label>
            <div className="mt-3 flex gap-2">
              <Input
                id={inputId}
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                required
                className="rounded-none"
              />
              <Button type="submit" className="rounded-none" disabled={status === "searching"}>
                Search
              </Button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-5 text-xs text-muted-foreground">
              {status === "searching" && `Searching for “${lastQuery}”…`}
              {status === "done" && `Showing results for “${lastQuery}”.`}
            </p>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            Followed a link from somewhere else?{" "}
            <a
              href={reportHref}
              className="text-foreground underline decoration-1 underline-offset-4 hover:decoration-[var(--block-accent)] hover:decoration-2"
            >
              {reportLabel}
            </a>
            .
          </p>
        </div>

        {destinations.length > 0 && (
          <nav aria-labelledby={listLabelId} className="md:col-span-6 md:col-start-7 md:pt-1">
            <p
              id={listLabelId}
              className="flex items-baseline justify-between border-b pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              <span>{destinationsLabel}</span>
              <span className="tabular-nums">{pad(destinations.length)}</span>
            </p>
            <ol className="divide-y border-b">
              {destinations.map((destination, i) => (
                <li key={destination.href}>
                  <a
                    href={destination.href}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="pt-1 font-mono text-xs tabular-nums text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span className="block font-medium decoration-1 underline-offset-4 group-hover:underline">
                        {destination.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {destination.description}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
