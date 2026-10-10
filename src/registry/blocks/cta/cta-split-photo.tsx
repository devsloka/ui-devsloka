"use client";

import { useId, useState, type ComponentProps, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type CtaSlot = {
  id: string;
  /** Short day label, e.g. "Tue 13 Oct". */
  day: string;
  /** Time label, e.g. "10:30". */
  time: string;
};

export type CtaSplitPhotoProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Up to three or four short, concrete reasons. Rendered as a numbered list. */
  reasons?: string[];
  image?: { src: string; alt: string; caption?: string };
  /** Which side the photograph sits on from the `lg` breakpoint. */
  photoSide?: "left" | "right";
  /** The primary action. When a slot is selected, its label reads "Book <day>, <time>". */
  primaryAction?: Action;
  secondaryAction?: Action;
  /** Optional bookable times. Pass an empty array to hide the list. */
  slots?: CtaSlot[];
  slot?: string;
  defaultSlot?: string;
  onSlotChange?: (slotId: string) => void;
  timezoneNote?: string;
  /** Background of the offer panel. Defaults to a pale blue tint. */
  surface?: string;
  /** Text colour on the offer panel. Must pass contrast against `surface`. */
  surfaceForeground?: string;
  /** Second ink for numbers, selected slot and primary button. Defaults to Devsloka blue. */
  accent?: string;
  /** Text colour on `accent`. */
  accentForeground?: string;
} & ComponentProps<"section">;

const DEFAULTS = {
  eyebrow: "Wickham · Software for small holiday lets",
  title: "Talk to someone who has cleaned a room between guests.",
  description:
    "Book a 20-minute walkthrough with Ana or Tomás. Both ran guesthouses before joining Wickham. Bring your current calendar and we will import it while you watch.",
  reasons: [
    "One calendar for Airbnb, Booking and your own site, synced every 5 minutes.",
    "Cleaning rotas that text your cleaner the moment a checkout is confirmed.",
    "Tourist tax and invoices filed per property, ready for your accountant in April.",
  ],
  image: {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80",
    alt: "A cosy living room interior with a sofa, cushions and soft daylight",
    caption: "Casa Ribeira, Porto. Four rooms, run on Wickham since 2024.",
  },
  primaryAction: { label: "Book a walkthrough", href: "#" },
  secondaryAction: { label: "Watch the 6-minute tour", href: "#" },
  slots: [
    { id: "tue-1030", day: "Tue 13 Oct", time: "10:30" },
    { id: "tue-1600", day: "Tue 13 Oct", time: "16:00" },
    { id: "wed-0930", day: "Wed 14 Oct", time: "09:30" },
    { id: "thu-1400", day: "Thu 15 Oct", time: "14:00" },
  ],
  timezoneNote: "Times in Lisbon (WEST). Calls run on Google Meet or phone.",
  surface: "#E8F0FF",
  surfaceForeground: "#0A0A0A",
  accent: "#0A6EFF",
  accentForeground: "#FFFFFF",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function CtaSplitPhoto({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  reasons = DEFAULTS.reasons,
  image = DEFAULTS.image,
  photoSide = "left",
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  slots = DEFAULTS.slots,
  slot,
  defaultSlot,
  onSlotChange,
  timezoneNote = DEFAULTS.timezoneNote,
  surface = DEFAULTS.surface,
  surfaceForeground = DEFAULTS.surfaceForeground,
  accent = DEFAULTS.accent,
  accentForeground = DEFAULTS.accentForeground,
  className,
  style,
  ...props
}: CtaSplitPhotoProps) {
  const headingId = useId();
  const slotsLabelId = useId();
  const [uncontrolledSlot, setUncontrolledSlot] = useState(defaultSlot);
  const currentSlotId = slot ?? uncontrolledSlot;
  const currentSlot = slots.find((s) => s.id === currentSlotId);

  const selectSlot = (id: string) => {
    if (slot === undefined) setUncontrolledSlot(id);
    onSlotChange?.(id);
  };

  const primaryHref = currentSlot
    ? `${primaryAction.href}${primaryAction.href.includes("?") ? "&" : "?"}slot=${encodeURIComponent(currentSlot.id)}`
    : primaryAction.href;

  return (
    <section
      data-slot="cta-split-photo"
      aria-labelledby={headingId}
      style={
        {
          "--block-surface": surface,
          "--block-surface-fg": surfaceForeground,
          "--block-accent": accent,
          "--block-accent-fg": accentForeground,
          ...style,
        } as CSSProperties
      }
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-12">
          <figure className={cn("flex flex-col lg:col-span-5", photoSide === "right" && "lg:order-last")}>
            {/* eslint-disable-next-line @next/next/no-img-element -- plain <img> keeps the block portable outside Next.js */}
            <img
              src={image.src}
              alt={image.alt}
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/3] w-full flex-1 object-cover sm:aspect-[16/10] lg:aspect-auto"
            />
            {image.caption && (
              <figcaption className="border-x border-b px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground lg:border-x-0 lg:px-0">
                {image.caption}
              </figcaption>
            )}
          </figure>

          <div className="bg-[var(--block-surface)] px-6 py-10 text-[var(--block-surface-fg)] sm:px-10 md:py-14 lg:col-span-7 lg:px-14">
            <p className="font-mono text-xs uppercase tracking-wider">{eyebrow}</p>
            <h2
              id={headingId}
              className="mt-6 max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed">{description}</p>

            {reasons.length > 0 && (
              <ol className="mt-8 max-w-lg divide-y divide-[var(--block-surface-fg)]/25 border-y border-[var(--block-surface-fg)]/25">
                {reasons.map((reason, i) => (
                  <li key={reason} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-3 text-sm leading-relaxed">
                    <span aria-hidden className="font-mono text-xs font-semibold tabular-nums leading-6 text-[var(--block-accent)]">
                      {pad(i + 1)}
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ol>
            )}

            {slots.length > 0 && (
              <div className="mt-8">
                <p id={slotsLabelId} className="font-mono text-[11px] uppercase tracking-wider">
                  Next available
                </p>
                <div role="group" aria-labelledby={slotsLabelId} className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {slots.map((s) => {
                    const selected = s.id === currentSlotId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => selectSlot(s.id)}
                        className={cn(
                          "flex flex-col items-start border border-[var(--block-accent)] px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--block-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--block-surface)]",
                          selected
                            ? "bg-[var(--block-accent)] text-[var(--block-accent-fg)]"
                            : "hover:bg-[var(--block-surface-fg)]/10"
                        )}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-wider">{s.day}</span>
                        <span className="text-base font-semibold tabular-nums">{s.time}</span>
                      </button>
                    );
                  })}
                </div>
                {timezoneNote && <p className="mt-3 text-xs leading-relaxed">{timezoneNote}</p>}
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button
                asChild
                size="lg"
                className="rounded-none bg-[var(--block-accent)] text-[var(--block-accent-fg)] shadow-none hover:bg-[var(--block-accent)] hover:underline hover:underline-offset-4 focus-visible:ring-[var(--block-accent)]"
              >
                <a href={primaryHref}>
                  {currentSlot ? `Book ${currentSlot.day}, ${currentSlot.time}` : primaryAction.label}
                </a>
              </Button>
              <a
                href={secondaryAction.href}
                className="text-sm font-medium underline decoration-1 underline-offset-[6px] outline-none hover:decoration-2 focus-visible:ring-2 focus-visible:ring-[var(--block-accent)]"
              >
                {secondaryAction.label}
              </a>
            </div>
            <p aria-live="polite" className="sr-only">
              {currentSlot ? `Selected ${currentSlot.day} at ${currentSlot.time}.` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
