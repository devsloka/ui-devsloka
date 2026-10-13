"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type HoverExpandItem = {
  label: string;
  image: { src: string; alt?: string };
  /** Extra classes for the image, e.g. "grayscale". */
  imageClassName?: string;
};

export type HoverExpandGalleryProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  items: HoverExpandItem[];
  /** Expanded panel (controlled). */
  activeIndex?: number;
  defaultIndex?: number;
  onActiveChange?: (index: number) => void;
  /** Any CSS color for the focus ring. */
  accent?: string;
};

export function HoverExpandGallery({
  items,
  activeIndex,
  defaultIndex = 0,
  onActiveChange,
  accent = "#0A6EFF",
  className,
  style,
  ...props
}: HoverExpandGalleryProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultIndex);
  const active = activeIndex ?? uncontrolled;
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    if (index === active) return;
    if (activeIndex === undefined) setUncontrolled(index);
    onActiveChange?.(index);
  };

  // Arrow keys move between panels; focusing one expands it.
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    panelRefs.current[(index + step + items.length) % items.length]?.focus();
  };

  return (
    <div
      data-slot="hover-expand-gallery"
      role="list"
      style={{ "--gallery-accent": accent, ...style } as React.CSSProperties}
      className={cn("flex h-[30rem] w-full gap-2", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <div
            key={`${item.label}-${index}`}
            role="listitem"
            // The expanded panel takes most of the row; the rest share what's left.
            className={cn(
              "relative min-w-10 basis-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
              isActive ? "grow-[10]" : "grow"
            )}
          >
            <button
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              onPointerEnter={(event) => event.pointerType === "mouse" && select(index)}
              onFocus={() => select(index)}
              // Taps don't hover, so a tap expands the panel instead.
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="group absolute inset-0 cursor-pointer overflow-hidden rounded-md bg-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gallery-accent)] focus-visible:ring-offset-2"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt ?? ""}
                fill
                sizes="(min-width: 768px) 360px, 60vw"
                className={cn("object-cover", item.imageClassName)}
              />
              {/* A soft shade and the label, shown once the panel has opened. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-5 left-5 text-2xl font-light tracking-tight whitespace-nowrap text-white",
                  "transition-[opacity,transform] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
                  isActive
                    ? "translate-y-0 opacity-100 delay-200 duration-300"
                    : "translate-y-2 opacity-0 delay-0 duration-150 motion-reduce:translate-y-0"
                )}
              >
                {item.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
