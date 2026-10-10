"use client";

import { useId, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MorphingCardProps = Omit<React.ComponentProps<"button">, "title" | "children"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  /** Content shown only in the expanded dialog. */
  children?: React.ReactNode;
  /** Rendered at the bottom of the expanded dialog, e.g. a call-to-action button. */
  action?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
  contentClassName?: string;
};

const spring = { type: "spring", bounce: 0.15, duration: 0.5 } as const;

export function MorphingCard({
  title,
  description,
  image,
  imageAlt = "",
  children,
  action,
  open,
  defaultOpen = false,
  onOpenChange,
  closeLabel = "Close",
  className,
  contentClassName,
  ...props
}: MorphingCardProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  // With reduced motion nothing morphs; the dialog simply fades.
  const layoutId = (part: string) => (reduceMotion ? undefined : `${id}-${part}`);
  const transition = reduceMotion ? { duration: 0.15 } : spring;

  const cardImage = image && (
    // eslint-disable-next-line @next/next/no-img-element -- plain <img> keeps the component framework-agnostic
    <img src={image} alt={imageAlt} className="block aspect-video w-full object-cover" />
  );
  const cardText = (titleNode: React.ReactNode) => (
    <span className="block p-4">
      {titleNode}
      {description && (
        <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</span>
      )}
    </span>
  );

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="morphing-card"
          className={cn(
            "group relative block w-full rounded-xl text-left text-card-foreground outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className
          )}
          {...props}
        >
          {isOpen ? (
            // Placeholder that keeps the grid slot sized while the card lives in the dialog.
            <span aria-hidden className="invisible block overflow-hidden rounded-xl border">
              {cardImage}
              {cardText(<span className="block text-lg font-semibold">{title}</span>)}
            </span>
          ) : (
            <motion.span
              layoutId={layoutId("card")}
              transition={transition}
              className="block overflow-hidden rounded-xl border bg-card transition-colors group-hover:border-foreground/20"
            >
              {cardImage && (
                <motion.span layoutId={layoutId("image")} transition={transition} className="block">
                  {cardImage}
                </motion.span>
              )}
              {cardText(
                <motion.span
                  layoutId={layoutId("title")}
                  layout="position"
                  transition={transition}
                  className="block text-lg font-semibold"
                >
                  {title}
                </motion.span>
              )}
            </motion.span>
          )}
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
                // Opt out of Radix's missing-description warning only when there is none.
                {...(description ? {} : { "aria-describedby": undefined })}
              >
                <motion.div
                  layoutId={layoutId("card")}
                  transition={transition}
                  initial={reduceMotion ? { opacity: 0 } : undefined}
                  animate={reduceMotion ? { opacity: 1 } : undefined}
                  exit={reduceMotion ? { opacity: 0 } : undefined}
                  className={cn(
                    "pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl border bg-card text-card-foreground outline-none",
                    contentClassName
                  )}
                >
                  {cardImage && (
                    <motion.div layoutId={layoutId("image")} transition={transition}>
                      {cardImage}
                    </motion.div>
                  )}
                  <div className="space-y-4 p-6">
                    <div className="space-y-1.5 pr-8">
                      <DialogPrimitive.Title asChild>
                        <motion.h2
                          layoutId={layoutId("title")}
                          layout="position"
                          transition={transition}
                          className="text-xl font-semibold"
                        >
                          {title}
                        </motion.h2>
                      </DialogPrimitive.Title>
                      {description && (
                        <DialogPrimitive.Description className="text-sm text-muted-foreground">
                          {description}
                        </DialogPrimitive.Description>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: reduceMotion ? 0 : 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="space-y-4"
                    >
                      {children && <div className="text-sm leading-relaxed">{children}</div>}
                      {action && <div className="flex justify-end gap-2">{action}</div>}
                    </motion.div>
                  </div>
                  <DialogPrimitive.Close
                    aria-label={closeLabel}
                    className={cn(
                      "absolute top-3 right-3 flex size-8 items-center justify-center rounded-md border bg-background text-foreground outline-none transition-colors",
                      "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
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
