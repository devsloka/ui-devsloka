"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type ExpandingCardsItem = {
  id: string;
  title: string;
  description?: React.ReactNode;
  image: string;
  imageAlt?: string;
};

export type ExpandingCardsProps = Omit<
  React.ComponentProps<"ul">,
  "defaultValue" | "onChange"
> & {
  items: ExpandingCardsItem[];
  /** Id of the expanded item. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function ExpandingCards({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ExpandingCardsProps) {
  const baseId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const activeId = value ?? uncontrolledValue ?? items[0]?.id;

  const select = (next: string) => {
    if (next === activeId) return;
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <ul
      data-slot="expanding-cards"
      className={cn(
        "flex h-[32rem] w-full flex-col gap-2 md:h-96 md:flex-row md:gap-3",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const contentId = `${baseId}-${item.id}`;

        return (
          <li
            key={item.id}
            data-active={isActive}
            className={cn(
              "group relative min-h-0 min-w-0 grow basis-0 overflow-hidden rounded-xl bg-muted",
              "transition-[flex-grow] duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
              "data-[active=true]:grow-[5]"
            )}
          >
            {/* Plain <img> keeps the component portable outside Next.js. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.imageAlt ?? ""}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-data-[active=true]:scale-105 motion-reduce:transition-none"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10"
            />

            <button
              type="button"
              aria-expanded={isActive}
              aria-controls={item.description ? contentId : undefined}
              onClick={() => select(item.id)}
              className="absolute inset-0 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <span className="sr-only">{item.title}</span>
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-white md:p-5">
              <span
                aria-hidden
                className={cn(
                  "truncate text-base font-semibold",
                  isActive
                    ? "text-xl md:text-2xl"
                    : "md:max-h-64 md:rotate-180 md:[writing-mode:vertical-rl]"
                )}
              >
                {item.title}
              </span>
              {item.description && (
                <div
                  id={contentId}
                  inert={!isActive}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
                    isActive
                      ? "pointer-events-auto grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden text-sm text-white/85">
                    {item.description}
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
