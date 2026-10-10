import { useId, type ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

type CalendarEvent = {
  /** 0 = Monday. */
  day: number;
  /** Start and end in hours, e.g. 9.5 for 09:30. */
  start: number;
  end: number;
  title: string;
  /** Protected focus time is drawn in the accent color. */
  focus?: boolean;
};

export type HeroSectionBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  note?: string;
  events?: CalendarEvent[];
} & ComponentProps<"section">;

const DAYS = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
const FIRST_HOUR = 8;
const LAST_HOUR = 18;

const DEFAULT_EVENTS: CalendarEvent[] = [
  { day: 0, start: 9, end: 12, title: "Deep work", focus: true },
  { day: 0, start: 14, end: 14.5, title: "1:1 with Priya" },
  { day: 1, start: 9, end: 12, title: "Deep work", focus: true },
  { day: 1, start: 15, end: 16, title: "Design review" },
  { day: 2, start: 10, end: 10.5, title: "Standup, moved" },
  { day: 2, start: 13, end: 17, title: "No meetings Wednesday", focus: true },
  { day: 3, start: 9, end: 12, title: "Deep work", focus: true },
  { day: 3, start: 16, end: 16.5, title: "Hiring sync" },
  { day: 4, start: 9, end: 11, title: "Writing", focus: true },
  { day: 4, start: 15.5, end: 16.5, title: "Demo" },
];

const DEFAULTS = {
  eyebrow: "Margin 3 · Released 6 Oct 2026",
  title: "Fewer meetings. Longer afternoons.",
  description:
    "Margin is a calendar that defends your focus time. It books meetings into the gaps you choose and quietly declines the rest.",
  primaryAction: { label: "Start free, no card", href: "#" },
  secondaryAction: { label: "Read the changelog", href: "#" },
  note: "Used by 18,000 people who guard their mornings.",
};

const pad = (n: number) => String(n).padStart(2, "0");
const formatHour = (h: number) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;

export default function HeroSectionBlock({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  note = DEFAULTS.note,
  events = DEFAULT_EVENTS,
  className,
  ...props
}: HeroSectionBlockProps) {
  const headingId = useId();
  const span = LAST_HOUR - FIRST_HOUR;

  return (
    <section
      data-slot="hero-section"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
        <h1
          id={headingId}
          className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-balance sm:text-6xl md:text-8xl"
        >
          {title}
        </h1>

        <div className="mt-12 grid gap-8 border-t pt-6 md:grid-cols-12 md:gap-10">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5">
            {description}
          </p>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:col-span-4">
            <Button asChild size="lg" className="rounded-none">
              <a href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <a
              href={secondaryAction.href}
              className="py-2 text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground"
            >
              {secondaryAction.label}
            </a>
          </div>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground md:col-span-3 md:text-right">
            {note}
          </p>
        </div>

        {/* A plain week view: the product, not an illustration of it. */}
        <figure className="mt-16 border">
          <figcaption className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <span>Week 42 · October</span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="size-2 bg-primary" />
              Protected focus time
            </span>
          </figcaption>
          <div className="overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-[3.5rem_repeat(5,1fr)]">
              <div className="border-r" />
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="border-r px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground last:border-r-0"
                >
                  {day}
                </div>
              ))}

              <div className="relative border-t border-r" style={{ height: `${span * 2.25}rem` }}>
                {Array.from({ length: span }, (_, i) => (
                  <span
                    key={i}
                    className="absolute right-2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground"
                    style={{ top: `${(i / span) * 100}%` }}
                  >
                    {i > 0 && formatHour(FIRST_HOUR + i)}
                  </span>
                ))}
              </div>
              {DAYS.map((day, dayIndex) => (
                <div
                  key={day}
                  className="relative border-t border-r last:border-r-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                    backgroundSize: `100% ${100 / span}%`,
                  }}
                >
                  {events
                    .filter((event) => event.day === dayIndex)
                    .map((event) => {
                      // Half-hour events don't fit two lines, so they get one compact line.
                      const compact = event.end - event.start < 1;
                      const time = `${formatHour(event.start)}–${formatHour(event.end)}`;
                      return (
                        <div
                          key={`${event.title}-${event.start}`}
                          title={`${event.title}, ${time}`}
                          className={cn(
                            "absolute inset-x-1 overflow-hidden border px-2 text-xs",
                            compact ? "flex items-center leading-none" : "py-1",
                            event.focus
                              ? "border-primary bg-primary text-primary-foreground"
                              : "bg-background"
                          )}
                          style={{
                            top: `${((event.start - FIRST_HOUR) / span) * 100}%`,
                            height: `${((event.end - event.start) / span) * 100}%`,
                          }}
                        >
                          <p className="truncate font-medium">
                            {event.title}
                            {compact && <span className="sr-only">, {time}</span>}
                          </p>
                          {!compact && (
                            <p
                              className={cn(
                                "font-mono text-[10px]",
                                event.focus ? "text-primary-foreground/70" : "text-muted-foreground"
                              )}
                            >
                              {time}
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
