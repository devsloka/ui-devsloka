"use client";

import { createContext, useContext, useState } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const SelectedValueContext = createContext<string | undefined>(undefined);

export type CardRadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

export function CardRadioGroup({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: CardRadioGroupProps) {
  // Mirrors the selection so items can animate their check badge in and out.
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selected = value ?? uncontrolledValue;

  return (
    <SelectedValueContext.Provider value={selected}>
      <RadioGroupPrimitive.Root
        data-slot="card-radio-group"
        value={selected}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolledValue(next);
          onValueChange?.(next);
        }}
        className={cn(
          "grid gap-3 sm:aria-[orientation=horizontal]:auto-cols-fr sm:aria-[orientation=horizontal]:grid-flow-col",
          className
        )}
        {...props}
      />
    </SelectedValueContext.Provider>
  );
}

export type CardRadioItemProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  "title" | "children"
> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Trailing content such as a price. */
  aside?: React.ReactNode;
};

export function CardRadioItem({
  value,
  title,
  description,
  aside,
  className,
  ...props
}: CardRadioItemProps) {
  const isChecked = useContext(SelectedValueContext) === value;
  const reduceMotion = useReducedMotion();

  return (
    <RadioGroupPrimitive.Item
      data-slot="card-radio-item"
      value={value}
      className={cn(
        "relative flex h-full w-full cursor-pointer flex-col gap-1 rounded-xl border bg-card p-4 pr-10 text-left text-card-foreground outline-none",
        "transition-colors hover:bg-muted/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="font-medium">{title}</span>
      {description && <span className="text-sm text-muted-foreground">{description}</span>}
      {aside && <span className="mt-auto pt-2 text-lg font-semibold">{aside}</span>}
      <AnimatePresence initial={false}>
        {isChecked && (
          <motion.span
            key="check"
            aria-hidden
            className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
            initial={reduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
          >
            <Check className="size-3" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </RadioGroupPrimitive.Item>
  );
}
