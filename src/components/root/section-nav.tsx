"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { isNewItem } from "@/lib/new-items";
import { NewBadge } from "@/components/root/new-badge";

export type SectionNavItem = { title: string; href: string };

type SectionNavProps = {
  items: SectionNavItem[];
  "aria-label": string;
  className?: string;
};

const FADE = "48px";

/**
 * Horizontal sub-navigation for Blocks and Templates. The active item is marked
 * with the same square as the docs sidebar, and it morphs between items. When the
 * row overflows, each edge fades and gets an arrow button while there is more to see.
 */
export function SectionNav({ items, className, ...props }: SectionNavProps) {
  const pathname = usePathname();
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [overflow, setOverflow] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const start = list.scrollLeft > 1;
    const end = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
    setOverflow((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  // ResizeObserver reports once on observe, so this also covers the first measurement.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  const scrollBy = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({
      left: direction * list.clientWidth * 0.6,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Fade only the edges that hide more items.
  const mask = `linear-gradient(to right, ${overflow.start ? "transparent" : "#000"}, #000 ${FADE}, #000 calc(100% - ${FADE}), ${overflow.end ? "transparent" : "#000"})`;

  return (
    <nav aria-label={props["aria-label"]} className={cn("relative border-b", className)}>
      {/* layoutScroll keeps the morph correct while the row is scrolled sideways. */}
      <motion.ul
        ref={listRef}
        layoutScroll
        onScroll={measure}
        className="-mb-px flex gap-7 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
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
                {isNewItem(item.href) && <NewBadge className="tracking-wider" />}
              </Link>
            </li>
          );
        })}
      </motion.ul>

      {overflow.start && (
        <ScrollButton side="start" onClick={() => scrollBy(-1)} />
      )}
      {overflow.end && <ScrollButton side="end" onClick={() => scrollBy(1)} />}
    </nav>
  );
}

function ScrollButton({ side, onClick }: { side: "start" | "end"; onClick: () => void }) {
  const Icon = side === "start" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      // Pointer users get the buttons; keyboard users already reach every tab with Tab.
      tabIndex={-1}
      aria-label={side === "start" ? "Scroll tabs left" : "Scroll tabs right"}
      className={cn(
        "absolute top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center border bg-background text-muted-foreground transition-colors hover:text-foreground",
        side === "start" ? "left-0" : "right-0"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
