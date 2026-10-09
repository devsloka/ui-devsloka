"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SectionNavItem = { title: string; href: string };

type SectionNavProps = {
  items: SectionNavItem[];
  "aria-label": string;
  className?: string;
};

/**
 * Horizontal sub-navigation for Blocks and Templates. The active item is marked
 * with the same square as the docs sidebar, and it morphs between items.
 */
export function SectionNav({ items, className, ...props }: SectionNavProps) {
  const pathname = usePathname();
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav aria-label={props["aria-label"]} className={cn("border-b", className)}>
      {/* layoutScroll keeps the morph correct while the row is scrolled sideways. */}
      <motion.ul
        layoutScroll
        className="-mb-px flex gap-7 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%-32px),transparent)] px-1 [scrollbar-width:none]"
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                ref={isActive ? activeRef : undefined}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 border-b py-3 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors outline-none focus-visible:text-foreground",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span aria-hidden className="relative size-1.5 shrink-0">
                  {isActive && (
                    <motion.span
                      layoutId={indicatorId}
                      className="absolute inset-0 bg-[#0A6EFF]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34, mass: 0.6 }
                      }
                    />
                  )}
                </span>
                {item.title}
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
