"use client";

import { useId, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MorphingModalTab = {
  value: string;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
};

export type MorphingModalProps = Omit<React.ComponentProps<"button">, "title" | "children"> & {
  /** Content of the button that opens the modal. */
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  tabs: MorphingModalTab[];
  tab?: string;
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Rendered below the tab panels, e.g. cancel / submit buttons. */
  footer?: React.ReactNode;
  /** Accessible label for the close button. */
  closeLabel?: string;
  contentClassName?: string;
};

const spring = { type: "spring", bounce: 0.15, duration: 0.45 } as const;
// Indicators move on every arrow key, so they settle fast with barely any overshoot.
const INDICATOR_SPRING = { type: "spring", duration: 0.3, bounce: 0.1 } as const;

export function MorphingModal({
  trigger,
  title,
  description,
  tabs,
  tab,
  defaultTab,
  onTabChange,
  open,
  defaultOpen = false,
  onOpenChange,
  footer,
  closeLabel = "Close",
  className,
  contentClassName,
  ...props
}: MorphingModalProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const [uncontrolledTab, setUncontrolledTab] = useState(defaultTab ?? tabs[0]?.value);
  const activeTab = tab ?? uncontrolledTab;
  const setTab = (next: string) => {
    if (tab === undefined) setUncontrolledTab(next);
    onTabChange?.(next);
  };

  const surfaceId = reduceMotion ? undefined : `${id}-surface`;
  const transition = reduceMotion ? { duration: 0.15 } : spring;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="morphing-modal"
          className={cn(
            "relative inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-foreground outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:pointer-events-none disabled:opacity-50",
            className
          )}
          {...props}
        >
          {/* The button's surface is the element that morphs into the dialog. */}
          {!isOpen && (
            <motion.span
              aria-hidden
              layoutId={surfaceId}
              transition={transition}
              className="absolute inset-0 rounded-lg border bg-background transition-colors hover:bg-muted"
            />
          )}
          <span
            className={cn(
              "pointer-events-none relative inline-flex items-center gap-2 transition-opacity",
              isOpen && "opacity-0"
            )}
          >
            {trigger}
          </span>
        </button>
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-4">
              <DialogPrimitive.Content
                asChild
                forceMount
                {...(description ? {} : { "aria-describedby": undefined })}
              >
                <motion.div
                  layoutId={surfaceId}
                  transition={transition}
                  initial={reduceMotion ? { opacity: 0 } : undefined}
                  animate={reduceMotion ? { opacity: 1 } : undefined}
                  exit={reduceMotion ? { opacity: 0 } : undefined}
                  className={cn(
                    "pointer-events-auto relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border bg-background text-foreground outline-none",
                    contentClassName
                  )}
                >
                  <motion.div
                    className="flex min-h-0 flex-1 flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: reduceMotion ? 0 : 0.12 } }}
                    exit={{ opacity: 0, transition: { duration: 0.08 } }}
                  >
                    <div className="space-y-1.5 p-6 pr-14 pb-4">
                      <DialogPrimitive.Title className="text-lg font-semibold">
                        {title}
                      </DialogPrimitive.Title>
                      {description && (
                        <DialogPrimitive.Description className="text-sm text-muted-foreground">
                          {description}
                        </DialogPrimitive.Description>
                      )}
                    </div>

                    <TabsPrimitive.Root
                      value={activeTab}
                      onValueChange={setTab}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <TabsPrimitive.List className="mx-6 flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
                        {tabs.map((item) => {
                          const Icon = item.icon;
                          return (
                            <TabsPrimitive.Trigger
                              key={item.value}
                              value={item.value}
                              className={cn(
                                "relative flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-none transition-colors",
                                "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground",
                                "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                              )}
                            >
                              {item.value === activeTab && (
                                <motion.span
                                  aria-hidden
                                  layoutId={`${id}-tab-indicator`}
                                  transition={reduceMotion ? { duration: 0 } : INDICATOR_SPRING}
                                  className="absolute inset-0 rounded-md border bg-background shadow-sm"
                                />
                              )}
                              {Icon && <Icon className="relative size-4 shrink-0" />}
                              <span className="relative">{item.label}</span>
                            </TabsPrimitive.Trigger>
                          );
                        })}
                      </TabsPrimitive.List>

                      <div className="min-h-0 flex-1 overflow-y-auto p-6">
                        {tabs.map((item) => (
                          <TabsPrimitive.Content
                            key={item.value}
                            value={item.value}
                            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.content}
                            </motion.div>
                          </TabsPrimitive.Content>
                        ))}
                      </div>
                    </TabsPrimitive.Root>

                    {footer && (
                      <div className="flex justify-end gap-2 border-t bg-muted/50 px-6 py-4">
                        {footer}
                      </div>
                    )}
                  </motion.div>

                  <DialogPrimitive.Close
                    aria-label={closeLabel}
                    className={cn(
                      "absolute top-4 right-4 flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors",
                      "hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    <X className="size-4" aria-hidden />
                  </DialogPrimitive.Close>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
