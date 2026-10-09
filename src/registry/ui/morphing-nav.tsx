"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type MorphingNavItem = {
  value: string;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  /** When set, the item renders as a link instead of a button. */
  href?: string;
  disabled?: boolean;
};

export type MorphingNavProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  items: MorphingNavItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Element used for items with an `href`, e.g. Next.js `Link`. */
  linkAs?: React.ElementType<React.ComponentProps<"a">>;
  itemClassName?: string;
  indicatorClassName?: string;
};

export function MorphingNav({
  items,
  value,
  defaultValue,
  onValueChange,
  linkAs: LinkComponent = "a",
  className,
  itemClassName,
  indicatorClassName,
  ...props
}: MorphingNavProps) {
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? items[0]?.value
  );
  const activeValue = value ?? uncontrolledValue;
  // Links navigate with Tab; buttons behave as a single-choice group with arrow keys.
  const isLinkGroup = items.some((item) => item.href);
  // A nav landmark only makes sense when the items are links.
  const Root = (isLinkGroup ? "nav" : "div") as "div";

  const select = (next: string) => {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (isLinkGroup) return;
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();

    for (let offset = 1; offset <= items.length; offset++) {
      const nextIndex = (index + step * offset + items.length) % items.length;
      if (!items[nextIndex].disabled) {
        select(items[nextIndex].value);
        itemRefs.current[nextIndex]?.focus();
        return;
      }
    }
  };

  return (
    <Root data-slot="morphing-nav" className={cn("inline-flex", className)} {...props}>
      <div
        role={isLinkGroup ? undefined : "radiogroup"}
        className="flex items-center gap-1 overflow-x-auto rounded-lg border bg-background p-1"
      >
        {items.map((item, index) => {
          const isActive = item.value === activeValue;
          const Icon = item.icon;
          const content = (
            <>
              {isActive && (
                <motion.span
                  layoutId={indicatorId}
                  aria-hidden
                  className={cn("absolute inset-0 rounded-md bg-primary", indicatorClassName)}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.2, duration: 0.5 }
                  }
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon className="size-4 shrink-0" />}
                {item.label}
              </span>
            </>
          );
          const itemClasses = cn(
            "relative rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            isActive
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
            itemClassName
          );

          if (item.href) {
            return (
              <LinkComponent
                key={item.value}
                ref={(node: HTMLAnchorElement | null) => {
                  itemRefs.current[index] = node;
                }}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={item.disabled || undefined}
                onClick={() => select(item.value)}
                className={itemClasses}
              >
                {content}
              </LinkComponent>
            );
          }

          return (
            <button
              key={item.value}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={itemClasses}
            >
              {content}
            </button>
          );
        })}
      </div>
    </Root>
  );
}
