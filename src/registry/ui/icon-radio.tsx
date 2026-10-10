"use client";

import { createContext, useContext, useState } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SelectedValueContext = createContext<string | undefined>(undefined);

export type IconRadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

export function IconRadioGroup({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: IconRadioGroupProps) {
  // Mirrors the selection so items can animate when they become checked.
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selected = value ?? uncontrolledValue;

  return (
    <SelectedValueContext.Provider value={selected}>
      <RadioGroupPrimitive.Root
        data-slot="icon-radio-group"
        value={selected}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolledValue(next);
          onValueChange?.(next);
        }}
        className={cn("flex flex-wrap gap-4", className)}
        {...props}
      />
    </SelectedValueContext.Provider>
  );
}

export type IconRadioItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  icon: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
};

export function IconRadioItem({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: IconRadioItemProps) {
  const isChecked = useContext(SelectedValueContext) === value;
  const reduceMotion = useReducedMotion();

  return (
    <RadioGroupPrimitive.Item
      data-slot="icon-radio-item"
      value={value}
      className={cn(
        "group flex cursor-pointer flex-col items-center gap-2 rounded-md text-sm font-medium outline-none",
        "text-muted-foreground transition-colors hover:text-foreground data-[state=checked]:text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <motion.span
        className={cn(
          "flex size-14 items-center justify-center rounded-full border bg-background transition-colors",
          "group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary/10",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
        )}
        animate={
          isChecked && !reduceMotion
            ? { scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <Icon className="size-5" />
      </motion.span>
      {label}
    </RadioGroupPrimitive.Item>
  );
}
