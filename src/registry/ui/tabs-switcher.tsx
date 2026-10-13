"use client";

import { useId, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Indicators move on every arrow key, so they settle fast with barely any overshoot.
const INDICATOR_SPRING = { type: "spring", duration: 0.3, bounce: 0.1 } as const;

export type TabsSwitcherItem = {
  value: string;
  title: React.ReactNode;
  /** Shown under the title while the item is active. */
  description?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsSwitcherProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  "children" | "activationMode" | "dir"
> & {
  items: TabsSwitcherItem[];
  /** Activate a tab when the pointer hovers its trigger (mouse only). */
  activateOnHover?: boolean;
  listClassName?: string;
  panelClassName?: string;
};

export function TabsSwitcher({
  items,
  value,
  defaultValue,
  onValueChange,
  activateOnHover = false,
  orientation = "vertical",
  className,
  listClassName,
  panelClassName,
  ...props
}: TabsSwitcherProps) {
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? items[0]?.value
  );
  const activeValue = value ?? uncontrolledValue;
  const isVertical = orientation === "vertical";

  const select = (next: string) => {
    if (next === activeValue) return;
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsPrimitive.Root
      data-slot="tabs-switcher"
      value={activeValue}
      onValueChange={select}
      orientation={orientation}
      className={cn(
        "grid gap-6",
        isVertical && "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start",
        className
      )}
      {...props}
    >
      <TabsPrimitive.List
        className={cn(
          "flex gap-1",
          isVertical ? "flex-col" : "flex-col sm:flex-row",
          listClassName
        )}
      >
        {items.map((item) => {
          const isActive = item.value === activeValue;
          return (
            <TabsPrimitive.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              onPointerEnter={(event) => {
                if (activateOnHover && event.pointerType === "mouse" && !item.disabled) {
                  select(item.value);
                }
              }}
              className={cn(
                "group relative flex-1 rounded-lg px-4 py-3 text-left outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={indicatorId}
                  aria-hidden
                  className="absolute inset-0 rounded-lg border bg-muted"
                  transition={
                    reduceMotion ? { duration: 0 } : INDICATOR_SPRING
                  }
                />
              )}
              <span className="relative block text-sm font-medium">{item.title}</span>
              {item.description && (
                <span
                  className={cn(
                    "relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
                    "group-data-[state=active]:grid-rows-[1fr]"
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-1 text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </span>
              )}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>

      {/* Panels share one grid cell so they cross-fade without layout shift; a light blur masks the overlap. */}
      <div className="grid">
        {items.map((item) => {
          const isActive = item.value === activeValue;
          return (
            <TabsPrimitive.Content
              key={item.value}
              value={item.value}
              forceMount
              inert={!isActive}
              className={cn(
                "col-start-1 row-start-1 rounded-xl outline-none transition-[opacity,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
                "focus-visible:ring-2 focus-visible:ring-ring",
                "data-[state=inactive]:pointer-events-none data-[state=inactive]:opacity-0 data-[state=inactive]:blur-[2px] motion-reduce:data-[state=inactive]:blur-none",
                panelClassName
              )}
            >
              {item.content}
            </TabsPrimitive.Content>
          );
        })}
      </div>
    </TabsPrimitive.Root>
  );
}
