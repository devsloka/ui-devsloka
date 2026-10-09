"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/utilities/sidebarItems";

const CompSidebar = () => {
  const pathname = usePathname();
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Keep the current page visible in the scrollable sidebar after navigation.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  return (
    // layoutScroll lets the indicator morph correctly while this container is scrolled.
    <motion.div layoutScroll className="h-full overflow-x-hidden overflow-y-auto">
      <nav aria-label="Documentation" className="space-y-8 py-8 pr-4">
        {sidebarItems.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 flex items-baseline justify-between px-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              {section.href ? (
                <Link href={section.href} className="transition-colors hover:text-foreground">
                  {section.title}
                </Link>
              ) : (
                section.title
              )}
              {section.children.length > 2 && (
                <span className="tabular-nums">{section.children.length}</span>
              )}
            </h2>
            <ul className="space-y-px">
              {section.children.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      ref={isActive ? activeRef : undefined}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {/* Fixed slot so labels don't shift; the square morphs between slots. */}
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
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-auto shrink-0 font-mono text-[0.625rem] uppercase tracking-wider",
                            item.badge === "Pro" ? "text-[#0A6EFF]" : "text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </motion.div>
  );
};

export default CompSidebar;
