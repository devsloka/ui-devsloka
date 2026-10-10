"use client";

import { useRef, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type AnimatedMultiSelectProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  emptyText?: React.ReactNode;
  /** Number of chips shown before collapsing the rest into a "+N" chip. */
  maxCount?: number;
  disabled?: boolean;
};

export function AnimatedMultiSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search...",
  emptyText = "No results found.",
  maxCount,
  disabled = false,
  className,
  ...props
}: AnimatedMultiSelectProps) {
  const reduceMotion = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
    defaultValue ?? []
  );
  const selected = value ?? uncontrolledValue;

  const setSelected = (next: string[]) => {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  const toggle = (optionValue: string) => {
    setSelected(
      selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue]
    );
    setSearch("");
  };

  const remove = (optionValue: string) => {
    setSelected(selected.filter((v) => v !== optionValue));
    inputRef.current?.focus();
  };

  const labelFor = (optionValue: string) =>
    options.find((option) => option.value === optionValue)?.label ??
    optionValue;

  const visible =
    maxCount === undefined ? selected : selected.slice(0, maxCount);
  const hiddenCount = selected.length - visible.length;

  const chipMotion = reduceMotion
    ? { initial: false as const, exit: { opacity: 0, transition: { duration: 0 } } }
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.15 },
      };

  return (
    <Command
      data-slot="animated-multi-select"
      loop
      className={cn(
        "h-auto w-full overflow-visible bg-transparent text-foreground",
        className
      )}
      {...props}
    >
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            ref={anchorRef}
            data-disabled={disabled || undefined}
            onClick={() => {
              if (disabled) return;
              setOpen(true);
              inputRef.current?.focus();
            }}
            className={cn(
              "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5 text-sm shadow-xs transition-[color,box-shadow]",
              "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
              "data-disabled:cursor-not-allowed data-disabled:opacity-50"
            )}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((optionValue) => {
                const label = labelFor(optionValue);
                return (
                  <motion.span
                    key={optionValue}
                    layout={!reduceMotion}
                    {...chipMotion}
                    className="inline-flex items-center gap-1 rounded-md bg-secondary py-0.5 pr-1 pl-2 text-xs font-medium text-secondary-foreground"
                  >
                    {label}
                    <button
                      type="button"
                      aria-label={`Remove ${label}`}
                      disabled={disabled}
                      onClick={(event) => {
                        event.stopPropagation();
                        remove(optionValue);
                      }}
                      className="rounded-sm p-0.5 text-muted-foreground outline-none hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X className="size-3" aria-hidden />
                    </button>
                  </motion.span>
                );
              })}
              {hiddenCount > 0 && (
                <motion.span
                  key="overflow"
                  layout={!reduceMotion}
                  {...chipMotion}
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  +{hiddenCount}
                </motion.span>
              )}
            </AnimatePresence>

            <CommandPrimitive.Input
              ref={inputRef}
              value={search}
              onValueChange={(next) => {
                setSearch(next);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(event) => {
                if (
                  event.key === "Backspace" &&
                  search === "" &&
                  selected.length > 0
                ) {
                  setSelected(selected.slice(0, -1));
                }
              }}
              disabled={disabled}
              aria-label={placeholder}
              placeholder={selected.length === 0 ? placeholder : undefined}
              className="min-w-24 flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />

            <button
              type="button"
              aria-label={open ? "Hide options" : "Show options"}
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation();
                setOpen(!open);
              }}
              className="ml-auto rounded-sm p-0.5 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-4 transition-transform motion-reduce:transition-none",
                  open && "rotate-180"
                )}
              />
            </button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
          // Keep focus in the search input so typing and arrow keys keep working.
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            if (anchorRef.current?.contains(event.target as Node)) {
              event.preventDefault();
            }
          }}
        >
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    disabled={option.disabled}
                    aria-checked={isSelected}
                    onSelect={() => toggle(option.value)}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    <Check
                      aria-hidden
                      className={cn(
                        "text-primary",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
}
