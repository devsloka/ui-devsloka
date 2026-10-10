"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  /** Describes the image itself. */
  alt: string;
  /** Optional caption shown over the image on hover (always shown on touch devices). */
  caption?: React.ReactNode;
  /** Intrinsic size. When omitted the image is shown in a 4:3 frame. */
  width?: number;
  height?: number;
};

const COLUMNS = {
  2: { className: "sm:columns-2", sizes: "(min-width: 640px) 50vw, 100vw" },
  3: { className: "sm:columns-2 lg:columns-3", sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
  4: {
    className: "sm:columns-2 lg:columns-3 xl:columns-4",
    sizes: "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
} as const;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export type ImageGalleryProps = React.ComponentProps<"div"> & {
  images: GalleryImage[];
  /** Columns at the widest breakpoint. Collapses responsively. @default 3 */
  columns?: keyof typeof COLUMNS;
};

/** Masonry image gallery whose items fade and rise in as they scroll into view. */
export function ImageGallery({ images, columns = 3, className, ...props }: ImageGalleryProps) {
  const reduceMotion = useReducedMotion();
  const layout = COLUMNS[columns];

  return (
    <div
      data-slot="animated-image-gallery"
      className={cn("columns-1 gap-4", layout.className, className)}
      {...props}
    >
      {images.map((image, index) => (
        <motion.figure
          key={image.src}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: (index % (columns * 2)) * 0.06 }}
          className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border bg-muted"
        >
          {image.width && image.height ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={layout.sizes}
              className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={layout.sizes}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          )}
          {image.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
              {image.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
