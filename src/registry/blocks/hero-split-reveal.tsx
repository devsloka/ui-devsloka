"use client";

import { useId, type ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type HeroSplitRevealProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  /** Short facts in a mono list, e.g. delivery details. */
  facts?: string[];
  image?: { src: string; alt: string; caption?: string; credit?: string };
} & ComponentProps<"section">;

const DEFAULTS = {
  eyebrow: "Bramble · Autumn list, 2026",
  title: "Plants from people who grew them.",
  description:
    "We buy from fourteen small nurseries within a day's drive of our shed, then pack every pot by hand. No warehouse, no plastic wrap.",
  primaryAction: { label: "Browse the autumn list", href: "#" },
  secondaryAction: { label: "Meet the growers", href: "#" },
  facts: ["Delivered Tue–Fri", "Free over €45", "30-day thriving promise"],
  image: {
    src: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
    alt: "A zebra haworthia in a mint-green pot against a white wall",
    caption: "Zebra haworthia, repotted this morning",
    credit: "Photographed in the packing shed",
  },
};

const EASE = [0.65, 0, 0.35, 1] as const;

export default function HeroSplitReveal({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  primaryAction = DEFAULTS.primaryAction,
  secondaryAction = DEFAULTS.secondaryAction,
  facts = DEFAULTS.facts,
  image = DEFAULTS.image,
  className,
  ...props
}: HeroSplitRevealProps) {
  const headingId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-slot="hero-split-reveal"
      aria-labelledby={headingId}
      className={cn("w-full bg-background text-foreground", className)}
      {...props}
    >
      <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-28">
        <div className="md:col-span-5 md:pb-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-balance md:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="rounded-none">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            <a
              href={secondaryAction.href}
              className="text-sm font-medium underline decoration-1 underline-offset-[6px] hover:text-muted-foreground"
            >
              {secondaryAction.label}
            </a>
          </div>
          {facts.length > 0 && (
            <ul className="mt-12 divide-y border-y font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {facts.map((fact) => (
                <li key={fact} className="py-2.5">
                  {fact}
                </li>
              ))}
            </ul>
          )}
        </div>

        <figure className="md:col-span-7">
          {/* The photo uncovers from the bottom once, like a print sliding out of a sleeve. */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] md:aspect-[4/5]"
            initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              width={1200}
              height={1500}
              className="absolute inset-0 size-full object-cover"
              initial={reduceMotion ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </motion.div>
          {(image.caption || image.credit) && (
            <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-xs text-muted-foreground">
              {image.caption && <span>{image.caption}</span>}
              {image.credit && <span>{image.credit}</span>}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
