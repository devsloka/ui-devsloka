"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SuccessResultProps = Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Replaces the default animated icon. */
  icon?: React.ReactNode;
  /** Slot for follow-up actions, e.g. a Button. */
  action?: React.ReactNode;
};

export function SuccessResult({
  title = "Success",
  description,
  icon,
  action,
  className,
  ...props
}: SuccessResultProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-slot="success-result"
      role="status"
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center text-card-foreground",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        {icon ?? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="m8 12 3 3 5-6"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 }}
            />
          </svg>
        )}
      </div>
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
      >
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-balance text-muted-foreground">{description}</p>
        )}
      </motion.div>
      {action && <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
