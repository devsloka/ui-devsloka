"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export type IconRadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

export function IconRadioGroup({ className, ...props }: IconRadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="icon-radio-group"
      className={cn("flex flex-wrap gap-4", className)}
      {...props}
    />
  );
}

export type IconRadioItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  icon: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
};

export function IconRadioItem({ icon: Icon, label, className, ...props }: IconRadioItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="icon-radio-item"
      className={cn(
        "group flex cursor-pointer flex-col items-center gap-2 rounded-md text-sm font-medium outline-none",
        "text-muted-foreground transition-colors hover:text-foreground data-[state=checked]:text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* Selection is shown by colour alone: it changes often, including from arrow keys. */}
      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-full border bg-background",
          "transition-[color,background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-active:scale-[0.97] motion-reduce:group-active:scale-100",
          "group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary/10",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
        )}
      >
        <Icon className="size-5" />
      </span>
      {label}
    </RadioGroupPrimitive.Item>
  );
}
