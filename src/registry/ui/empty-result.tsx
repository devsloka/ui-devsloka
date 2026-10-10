"use client";

import { motion, useReducedMotion } from "motion/react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export type EmptyResultProps = Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Replaces the default animated icon. */
  icon?: React.ReactNode;
  /** Slot for follow-up actions, e.g. a Button. */
  action?: React.ReactNode;
};

export function EmptyResult({
  title = "No results",
  description,
  icon,
  action,
  className,
  ...props
}: EmptyResultProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-slot="empty-result"
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center text-card-foreground",
        className
      )}
      {...props}
    >
      <motion.div
        aria-hidden
        className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [12, -3, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {icon ?? <Inbox className="size-6" />}
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-balance text-muted-foreground">{description}</p>
        )}
      </motion.div>
      {action && <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
