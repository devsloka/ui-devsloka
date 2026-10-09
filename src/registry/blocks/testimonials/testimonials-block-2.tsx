"use client";

import { useId, type ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type WallQuote = {
  quote: string;
  name: string;
  /** Role and business, e.g. "Owner, Fernhill Bakery". */
  detail: string;
  /** Renders the cell in the accent color. Use on one quote at most. */
  highlighted?: boolean;
};

export type TestimonialsBlockTwoProps = {
  eyebrow?: string;
  title?: string;
  rating?: { score: string; count: string };
  quotes?: WallQuote[];
  footnote?: string;
} & ComponentProps<"section">;

const DEFAULT_QUOTES: WallQuote[] = [
  {
    quote:
      "Closed March in two evenings. Last year it took me most of April.",
    name: "Joanna Kerr",
    detail: "Owner, Fernhill Bakery",
  },
  {
    quote:
      "I'm not an accountant and I don't want to become one. Ledgerly matches the bank feed, flags the six things that look off, and gets out of my way. My actual accountant said our books were the cleanest she'd seen from a client our size, which, frankly, has never happened before.",
    name: "Luis Andrade",
    detail: "Founder, Quarry Bikes",
  },
  {
    quote:
      "Receipts from a photo actually work. Even the crumpled ones from the hardware store.",
    name: "Aisha Bello",
    detail: "Contractor, Bello Renovations",
  },
  {
    quote:
      "We switched mid-year, which everyone told me not to do. The import took twenty minutes and the opening balances matched to the cent.",
    name: "Ronan Fitzgerald",
    detail: "Finance lead, Sixpoint Studio",
    highlighted: true,
  },
  {
    quote: "Support answered on a Sunday. A real person, too.",
    name: "Mei Lin Tan",
    detail: "Owner, Two Kettles Café",
  },
  {
    quote:
      "Sales tax across three states used to be a spreadsheet I was scared of. Now it's a report I export on the 18th.",
    name: "Grace Whitfield",
    detail: "Ops, Little Fern Goods",
  },
  {
    quote:
      "Honestly the best part is the weekly email. Cash in, cash out, what's overdue. I read it with my coffee and that's my finance meeting.",
    name: "Samir Haddad",
    detail: "Co-owner, Haddad & Sons Tiling",
  },
  {
    quote:
      "Took a bit to set up the categories the way I like, but once it learned them I stopped touching it.",
    name: "Ella Novak",
    detail: "Freelance illustrator",
  },
  {
    quote:
      "Paid invoices went from 41 days on average to 19 after we turned on reminders. That's payroll, basically.",
    name: "Kwame Asante",
    detail: "MD, Asante Logistics",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function TestimonialsBlockTwo({
  eyebrow = "Customers",
  title = "Small businesses, fewer late nights",
  rating = { score: "4.9", count: "1,240" },
  quotes = DEFAULT_QUOTES,
  footnote = "From in-app reviews, January–September 2026. Unedited except for typos.",
  className,
  ...props
}: TestimonialsBlockTwoProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();

  return (
    <section
      data-slot="testimonials-block-2"
      aria-labelledby={titleId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t pt-8 md:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">
            {eyebrow}
          </p>
          <div className="md:col-span-8">
            <h2
              id={titleId}
              className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-5xl md:tracking-[-0.03em]"
            >
              {title}
            </h2>
            {rating && (
              <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <span aria-hidden="true" className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="size-2 bg-primary" />
                  ))}
                </span>
                <span>
                  Rated{" "}
                  <span className="font-medium tabular-nums text-foreground">
                    {rating.score}
                  </span>{" "}
                  from{" "}
                  <span className="tabular-nums text-foreground">
                    {rating.count}
                  </span>{" "}
                  reviews
                </span>
              </p>
            )}
          </div>
        </div>

        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {quotes.map((item, i) => (
            <motion.li
              key={`${item.name}-${i}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: (i % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4 break-inside-avoid"
            >
              <figure
                className={cn(
                  "flex flex-col gap-6 border p-6",
                  item.highlighted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground",
                )}
              >
                <blockquote
                  className={cn(
                    "text-pretty",
                    item.highlighted
                      ? "text-xl leading-snug tracking-tight"
                      : "text-[0.95rem] leading-relaxed",
                  )}
                >
                  {item.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-sm font-mono text-[0.65rem]",
                      item.highlighted
                        ? "bg-primary-foreground/15"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {initials(item.name)}
                  </span>
                  <span className="min-w-0 text-xs leading-tight">
                    <span className="block font-medium">{item.name}</span>
                    <span
                      className={cn(
                        "mt-0.5 block font-mono uppercase tracking-wider",
                        item.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.detail}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>

        {footnote && (
          <p className="mt-8 font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">* </span>
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
