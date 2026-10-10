"use client";

import { useId, useState, type ComponentProps, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Square portrait URL. Falls back to an initials monogram when omitted. */
  avatar?: string;
};

export type TestimonialsBlockProps = {
  eyebrow?: string;
  title?: string;
  testimonials?: Testimonial[];
  footnote?: string;
} & ComponentProps<"section">;

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We used to block three full days for onboarding. With Fieldbook it's an afternoon — new hires open the runbook, click through, and ship a small fix before dinner. I honestly didn't believe it until the second cohort.",
    name: "Maren Okafor",
    role: "Head of Platform",
    company: "Tidewater Freight",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "The thing nobody tells you is that docs rot because nobody owns them. Fieldbook pings the last person who touched a page when the code under it changes. Our stale-page count went from 212 to 19 in a quarter.",
    name: "Daniel Reyes",
    role: "Staff Engineer",
    company: "Corvid Health",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "I was the skeptic. We'd tried two wikis and a Notion graveyard already. What won me over was search that actually finds the incident write-up from 2023, not a meeting note that mentions it.",
    name: "Priya Natarajan",
    role: "Engineering Manager",
    company: "Ashgrove Labs",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "On-call handoffs are about four minutes now. Everything the next person needs is linked from one page, and it's the same page every time.",
    name: "Tomasz Wiącek",
    role: "SRE Lead",
    company: "Brightline Payments",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Small team, no dedicated writer. We still have docs people trust, mostly because Fieldbook makes the boring part — keeping them current — somebody's two-minute job instead of nobody's.",
    name: "Hana Sato",
    role: "Co-founder & CTO",
    company: "Paperkite",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export default function TestimonialsBlock({
  eyebrow = "Field reports",
  title = "What changed after the first quarter",
  testimonials = DEFAULT_TESTIMONIALS,
  footnote = "Quotes lightly edited for length. Shared with permission, 2026.",
  className,
  ...props
}: TestimonialsBlockProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const total = testimonials.length;
  const current = testimonials[index] ?? testimonials[0];

  const go = (delta: number) => {
    if (total === 0) return;
    setIndex((i) => (i + delta + total) % total);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      data-slot="testimonials-block"
      aria-labelledby={titleId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t pt-8 md:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 md:col-span-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
              <h2
                id={titleId}
                className="mt-4 max-w-xs text-2xl font-medium tracking-tight text-balance md:text-3xl"
              >
                {title}
              </h2>
            </div>

            {total > 1 && (
              <div className="flex items-center gap-4">
                <p
                  className="font-mono text-sm tabular-nums text-muted-foreground"
                  aria-hidden="true"
                >
                  <span className="text-foreground">{pad(index + 1)}</span> /{" "}
                  {pad(total)}
                </p>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="inline-flex size-10 items-center justify-center border text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="-ml-px inline-flex size-10 items-center justify-center border text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:col-span-8"
          >
            <div aria-live="polite" aria-atomic="true">
              <span className="sr-only">
                Testimonial {index + 1} of {total}
              </span>
              {current && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={index}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    transition={{
                      duration: reduceMotion ? 0.12 : 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="min-h-[22rem] md:min-h-[24rem]"
                  >
                    <blockquote className="relative text-2xl leading-snug font-normal tracking-tight text-pretty sm:text-3xl md:text-[2.5rem] md:leading-[1.15]">
                      <span
                        aria-hidden="true"
                        className="absolute top-0 -left-[0.45em] text-muted-foreground"
                      >
                        &ldquo;
                      </span>
                      {current.quote}
                      <span aria-hidden="true" className="text-muted-foreground">
                        &rdquo;
                      </span>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-4">
                      {current.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element -- plain <img> keeps the block portable outside Next.js
                        <img
                          src={current.avatar}
                          alt=""
                          width={48}
                          height={48}
                          className="size-12 rounded-sm object-cover grayscale"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex size-12 items-center justify-center rounded-sm bg-muted font-mono text-xs text-muted-foreground"
                        >
                          {initials(current.name)}
                        </span>
                      )}
                      <div className="font-mono text-xs uppercase tracking-wider">
                        <p className="text-foreground">{current.name}</p>
                        <p className="mt-1 text-muted-foreground">
                          {current.role}, {current.company}
                        </p>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {footnote && (
          <div className="mt-12 grid grid-cols-1 gap-x-8 md:grid-cols-12">
            <p className="border-t pt-4 font-mono text-xs text-muted-foreground md:col-span-8 md:col-start-5">
              {footnote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
