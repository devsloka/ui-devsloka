"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export type DockGalleryItem = {
  title: string;
  image: { src: string; alt?: string };
  href?: string;
  /** Small badge in the card's top-right corner. */
  icon?: React.ReactNode;
};

export type DockGalleryProps = Omit<React.ComponentProps<"section">, "children"> & {
  items: DockGalleryItem[];
  /** Pinned above the row, e.g. a brand, intro copy and nav. */
  header?: React.ReactNode;
  /** Card width (px) far from the focus. */
  minWidth?: number;
  /** Card width (px) at the focus. */
  maxWidth?: number;
  /** How many cards either side of the focus are magnified. */
  spread?: number;
  /** Card width ÷ height. */
  aspectRatio?: number;
};

const SIZE_SPRING = { stiffness: 320, damping: 32, mass: 0.6 };
const FOCUS_SPRING = { type: "spring", stiffness: 220, damping: 30 } as const;

export function DockGallery({
  items,
  header,
  minWidth = 96,
  maxWidth = 200,
  spread = 3,
  aspectRatio = 3 / 4,
  className,
  ...props
}: DockGalleryProps) {
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const restIndex = (items.length - 1) / 2;
  // The magnified spot as a fractional card index: 3.5 sits between the 4th and 5th card.
  // It starts in the middle, so even the server render shows the centred pyramid.
  const focus = useMotionValue(restIndex);

  const moveFocus = (target: number) => {
    if (reduceMotion) focus.set(target);
    else animate(focus, target, FOCUS_SPRING);
  };

  // Pointer x → fractional index, read from the cards' current boxes (one read per move).
  const indexAt = (x: number) => {
    const boxes = cardRefs.current.map((card) => card?.getBoundingClientRect());
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (!box) continue;
      // Card i spans i - 0.5 … i + 0.5; the gap before it sits exactly at i - 0.5.
      if (x < box.left) return i - 0.5;
      if (x <= box.right) return i - 0.5 + (x - box.left) / box.width;
    }
    return boxes.length - 0.5;
  };

  return (
    <section
      data-slot="dock-gallery"
      className={cn("flex w-full flex-col overflow-hidden rounded-xl bg-[#F3F0EE] text-neutral-900", className)}
      {...props}
    >
      {header && <div className="px-6 pt-5 sm:px-8">{header}</div>}

      <div
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          // Follows the pointer directly; each card's size spring smooths the motion.
          focus.stop();
          focus.set(Math.min(Math.max(indexAt(event.clientX), 0), items.length - 1));
        }}
        onPointerLeave={() => moveFocus(restIndex)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) moveFocus(restIndex);
        }}
        className="mt-auto flex items-end justify-center gap-3 overflow-hidden px-4 pt-10 pb-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {items.map((item, index) => (
          <DockCard
            key={`${item.title}-${index}`}
            ref={(card) => {
              cardRefs.current[index] = card;
            }}
            item={item}
            index={index}
            focus={focus}
            minWidth={minWidth}
            maxWidth={maxWidth}
            spread={spread}
            aspectRatio={aspectRatio}
            reduceMotion={!!reduceMotion}
            onFocusCard={() => moveFocus(index)}
          />
        ))}
      </div>
    </section>
  );
}

function DockCard({
  ref,
  item,
  index,
  focus,
  minWidth,
  maxWidth,
  spread,
  aspectRatio,
  reduceMotion,
  onFocusCard,
}: {
  ref: React.Ref<HTMLDivElement>;
  item: DockGalleryItem;
  index: number;
  focus: MotionValue<number>;
  minWidth: number;
  maxWidth: number;
  spread: number;
  aspectRatio: number;
  reduceMotion: boolean;
  onFocusCard: () => void;
}) {
  // Cosine falloff: full size at the focus, easing to minWidth `spread` cards away.
  // Big, smaller, smaller… on both sides, with no hard steps between neighbours.
  const targetWidth = useTransform(focus, (value) => {
    const t = Math.max(0, 1 - Math.abs(index - value) / spread);
    return minWidth + (maxWidth - minWidth) * ((1 - Math.cos(t * Math.PI)) / 2);
  });
  const springWidth = useSpring(targetWidth, SIZE_SPRING);
  const width = reduceMotion ? targetWidth : springWidth;
  const height = useTransform(width, (value) => value / aspectRatio);
  // Labels and badges quieten with distance, so the focused card leads.
  const emphasis = useTransform(width, [minWidth, maxWidth], [0.55, 1]);

  const card = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="relative overflow-hidden rounded-md bg-neutral-300 shadow-sm"
    >
      <Image
        src={item.image.src}
        alt={item.image.alt ?? ""}
        fill
        sizes={`${maxWidth}px`}
        draggable={false}
        className="object-cover"
      />
      {item.icon && (
        <motion.span
          style={{ opacity: emphasis }}
          className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-sm bg-white/90 text-neutral-900 shadow-sm [&>svg]:size-4"
        >
          {item.icon}
        </motion.span>
      )}
    </motion.div>
  );

  return (
    <div className="flex shrink-0 flex-col items-start gap-2.5">
      <motion.p style={{ opacity: emphasis }} className="flex items-center gap-1.5 text-xs whitespace-nowrap">
        <span aria-hidden className="size-2 rounded-full border border-current" />
        {item.title}
      </motion.p>
      {item.href ? (
        <a
          href={item.href}
          onFocus={onFocusCard}
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F0EE]"
        >
          <span className="sr-only">{item.title}</span>
          {card}
        </a>
      ) : (
        card
      )}
    </div>
  );
}
