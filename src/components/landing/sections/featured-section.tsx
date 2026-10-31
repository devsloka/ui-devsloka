"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../section-heading";

type Listing = {
  platform: string;
  href: string;
  /** Verification crawlers look for this exact image inside the link. */
  badge: { src: string; alt: string; width: number; height: number };
};

// Keep the hrefs and badge URLs exactly as each platform issued them.
const LISTINGS: Listing[] = [
  {
    platform: "Product Hunt",
    href: "https://www.producthunt.com/products/devsloka-ui?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-devsloka-ui",
    badge: {
      src: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=969805&theme=dark&t=1793451719248",
      alt: "Devsloka Ui - Modern, animated React UI components & templates. | Product Hunt",
      width: 250,
      height: 54,
    },
  },
  {
    platform: "LaunchNest",
    href: "https://launchnest.io/p/devsloka-ui",
    badge: {
      src: "https://launchnest.io/badge/devsloka-ui.svg?variant=featured",
      alt: "Devsloka UI on LaunchNest",
      width: 220,
      height: 56,
    },
  },
  {
    platform: "StartupBase",
    href: "https://startupbase.io/products/devsloka-ui?utm_source=startupbase&utm_medium=badge&utm_campaign=featured-badge-dark",
    badge: {
      src: "https://statics.startupbase.io/site/badges/featured-on-sb-dark.svg",
      alt: "Featured on StartupBase",
      width: 220,
      height: 55,
    },
  },
  {
    platform: "CodeHype",
    href: "https://www.codehype.ai/product/devsloka-ui?utm_source=codehype_badge",
    badge: {
      src: "https://www.codehype.ai/badges/devsloka-ui.svg?variant=find-us&v=20",
      alt: "Featured on CodeHype",
      width: 180,
      height: 65,
    },
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function FeaturedSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="featured" aria-labelledby="featured-title" className="mt-40 scroll-mt-24">
      <SectionHeading
        title={<span id="featured-title">Out in the wild.</span>}
        description="Devsloka UI is live on the launch boards makers browse first. Find us there, leave an upvote, and tell us what to build next."
      />

      <motion.ul
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
        className="mt-12 grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {LISTINGS.map((listing, i) => (
          <motion.li
            key={listing.platform}
            variants={{
              hidden: { opacity: 0, transform: reduceMotion ? "none" : "translateY(12px)" },
              shown: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.5, ease: EASE_OUT } },
            }}
            className="border-r border-b border-border"
          >
            <a
              href={listing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-56 flex-col overflow-hidden p-5 outline-none focus-visible:ring-2 focus-visible:ring-[#0A6EFF] focus-visible:ring-inset"
            >
              {/* A dot grid that surfaces on hover, like a listing card being picked up. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
              />

              <span className="relative flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-wider">
                <span>
                  <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span> {listing.platform}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span aria-hidden className="relative flex size-1.5">
                    <span className="absolute inset-0 animate-ping bg-[#0A6EFF]/60 [animation-duration:2.4s] motion-reduce:hidden" />
                    <span className="relative size-1.5 bg-[#0A6EFF]" />
                  </span>
                  Live
                </span>
              </span>

              <span className="relative flex flex-1 items-center justify-center py-6">
                {/* eslint-disable-next-line @next/next/no-img-element -- platforms verify their own badge URL in a plain <img> */}
                <img
                  src={listing.badge.src}
                  alt={listing.badge.alt}
                  width={listing.badge.width}
                  height={listing.badge.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-16 w-auto max-w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 group-hover:-rotate-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                />
              </span>

              <span className="relative flex items-center justify-between border-t border-border pt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                View listing
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
