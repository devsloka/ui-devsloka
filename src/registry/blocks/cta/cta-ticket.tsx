import { useId, type ComponentProps, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type CtaTicketDetail = { label: string; value: string };

export type CtaTicketProps = {
  eyebrow?: string;
  /** Short intro beside the ticket. */
  description?: string;
  /** Availability line, e.g. "214 of 600 left". */
  availability?: string;
  eventName?: string;
  edition?: string;
  ticketNumber?: string;
  /** Date, venue, city, seat and price rows, set in mono. */
  details?: CtaTicketDetail[];
  /** The stub: weekday, big day numeral, month + year. */
  stub?: { weekday: string; day: string; monthYear: string; note?: string };
  primaryAction?: Action;
  /** Usually a link to an .ics file. */
  calendarAction?: Action;
  /** Stub ink. Defaults to Devsloka blue; a pale tint (#E8F0FF) works with accentForeground "#0A0A0A". */
  accent?: string;
  /** Text colour on the stub. Must pass contrast against `accent`. */
  accentForeground?: string;
} & ComponentProps<"section">;

const DEFAULTS = {
  eyebrow: "Tickets · On sale now",
  description:
    "Two days of risograph, letterpress and type in a riverside warehouse. Forty print studios, six talks, one long lunch. No livestream, no recordings.",
  availability: "214 of 600 weekend passes left",
  eventName: "Halftone Days",
  edition: "Edition 03",
  ticketNumber: "No. 0412",
  details: [
    { label: "Date", value: "Sat 21 – Sun 22 Nov 2026" },
    { label: "Doors", value: "09:30, talks from 11:00" },
    { label: "Venue", value: "Armazém 16, Rua da Cintura do Porto" },
    { label: "City", value: "Lisbon, Portugal" },
    { label: "Seat", value: "General admission, standing" },
    { label: "Price", value: "€85 weekend · €50 one day" },
  ],
  stub: { weekday: "Sat", day: "21", monthYear: "Nov 2026", note: "Gate B · Keep this half" },
  primaryAction: { label: "Get tickets", href: "#" },
  calendarAction: { label: "Add to calendar", href: "#" },
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

// Deterministic bar widths for the printed barcode on the stub.
const BARCODE = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2];
const BARCODE_WIDTH = BARCODE.reduce((sum, w) => sum + w, 0);
// Even entries are ink bars, odd entries are gaps.
const BARS = BARCODE.flatMap((w, i) => {
  const x = BARCODE.slice(0, i).reduce((sum, v) => sum + v, 0);
  return i % 2 === 0 ? [{ x, w }] : [];
});

export function CtaTicket({
  eyebrow = DEFAULTS.eyebrow,
  description = DEFAULTS.description,
  availability = DEFAULTS.availability,
  eventName = DEFAULTS.eventName,
  edition = DEFAULTS.edition,
  ticketNumber = DEFAULTS.ticketNumber,
  details = DEFAULTS.details,
  stub = DEFAULTS.stub,
  primaryAction = DEFAULTS.primaryAction,
  calendarAction = DEFAULTS.calendarAction,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: CtaTicketProps) {
  const headingId = useId();

  return (
    <section
      data-slot="cta-ticket"
      aria-labelledby={headingId}
      style={{ "--block-accent": accent, "--block-accent-fg": accentForeground, ...style } as CSSProperties}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:pt-2">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
          <p className="mt-6 max-w-sm text-base leading-relaxed">{description}</p>
          {availability && (
            <p className="mt-6 flex items-center gap-2 font-mono text-xs tabular-nums text-muted-foreground">
              <span aria-hidden className="size-2 bg-[var(--block-accent)]" />
              {availability}
            </p>
          )}
        </div>

        <article className="flex flex-col md:flex-row lg:col-span-8" aria-labelledby={headingId}>
          {/* Main part of the ticket. */}
          <div className="flex-1 bg-muted p-6 sm:p-8">
            <div className="flex justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Admit one · {ticketNumber}</span>
              <span>{edition}</span>
            </div>
            <h2
              id={headingId}
              className="mt-8 text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-6xl"
            >
              {eventName}
            </h2>
            <dl className="mt-8 grid gap-x-6 border-t border-foreground/15 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[4.5rem_1fr] gap-x-3 border-b border-foreground/15 py-2.5 font-mono text-xs">
                  <dt className="uppercase tracking-wider text-muted-foreground">{d.label}</dt>
                  <dd className="tabular-nums">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg" className="rounded-none">
                <a href={primaryAction.href}>{primaryAction.label}</a>
              </Button>
              <a
                href={calendarAction.href}
                className="text-sm font-medium underline decoration-1 underline-offset-[6px] outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {calendarAction.label}
              </a>
            </div>
          </div>

          {/* Tear-off stub: perforated edge plus two notches punched out in the page colour. */}
          <div className="relative flex flex-row items-end justify-between gap-6 border-t-2 border-dashed border-background bg-[var(--block-accent)] p-6 text-[var(--block-accent-fg)] sm:p-8 md:w-56 md:flex-col md:items-start md:border-t-0 md:border-l-2">
            <span aria-hidden className="absolute -top-3 -left-3 size-6 rounded-full bg-background" />
            <span
              aria-hidden
              className="absolute -top-3 -right-3 size-6 rounded-full bg-background md:top-auto md:right-auto md:-bottom-3 md:-left-3"
            />
            <p className="sr-only">
              {stub.weekday} {stub.day} {stub.monthYear}
            </p>
            <div aria-hidden>
              <p className="font-mono text-xs uppercase tracking-wider">{stub.weekday}</p>
              <p className="text-8xl font-semibold leading-[0.85] tracking-[-0.05em] tabular-nums md:text-9xl">
                {stub.day}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider">{stub.monthYear}</p>
            </div>
            <div className="text-right md:text-left">
              <svg aria-hidden viewBox={`0 0 ${BARCODE_WIDTH} 20`} preserveAspectRatio="none" className="ml-auto h-8 w-28 md:ml-0">
                {BARS.map((b) => (
                  <rect key={b.x} x={b.x} y="0" width={b.w} height="20" fill="currentColor" />
                ))}
              </svg>
              {stub.note && <p className="mt-2 font-mono text-[10px] uppercase tracking-wider">{stub.note}</p>}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
