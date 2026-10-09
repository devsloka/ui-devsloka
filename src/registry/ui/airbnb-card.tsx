"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type ListingImage = { src: string; alt: string };

export type ListingCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  images: ListingImage[];
  title: React.ReactNode;
  /** Secondary line, e.g. the location. */
  subtitle?: React.ReactNode;
  /** Extra details such as dates or the host line. */
  meta?: React.ReactNode;
  rating?: number;
  reviewCount?: number;
  /** Pre-formatted price, e.g. "$250". */
  price: React.ReactNode;
  /** Shown after the price, e.g. "night". */
  priceSuffix?: React.ReactNode;
  /** Shown over the top-left of the image, e.g. "Superhost". */
  badge?: React.ReactNode;
  favorite?: boolean;
  defaultFavorite?: boolean;
  onFavoriteChange?: (favorite: boolean) => void;
  /** Accessible label for the favorite toggle. */
  favoriteLabel?: string;
  /** `sizes` passed to next/image for the carousel slides. */
  imageSizes?: string;
};

const navButton =
  "absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-sm transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100 disabled:hidden opacity-0 group-hover/media:opacity-100";

export function ListingCard({
  images,
  title,
  subtitle,
  meta,
  rating,
  reviewCount,
  price,
  priceSuffix,
  badge,
  favorite,
  defaultFavorite = false,
  onFavoriteChange,
  favoriteLabel = "Save to wishlist",
  imageSizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  className,
  ...props
}: ListingCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [uncontrolledFavorite, setUncontrolledFavorite] = useState(defaultFavorite);
  const isFavorite = favorite ?? uncontrolledFavorite;

  const toggleFavorite = () => {
    const next = !isFavorite;
    if (favorite === undefined) setUncontrolledFavorite(next);
    onFavoriteChange?.(next);
  };

  // Sync the active dot with the native scroll position (rAF-throttled).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        setIndex(Math.round(track.scrollLeft / width));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToIndex = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const count = images.length;

  return (
    <div data-slot="airbnb-card" className={cn("w-full max-w-sm", className)} {...props}>
      <div className="group/media relative mb-3 aspect-square overflow-hidden rounded-xl bg-muted">
        <div
          ref={trackRef}
          className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              className="relative size-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={imageSizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Scrim keeps the overlaid controls legible on bright photos. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"
        />

        {badge && (
          <div className="absolute top-3 left-3 rounded-md bg-background px-2 py-0.5 text-xs font-medium text-foreground shadow-sm">
            {badge}
          </div>
        )}

        <button
          type="button"
          aria-label={favoriteLabel}
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
          className="absolute top-2.5 right-2.5 z-10 flex size-9 items-center justify-center rounded-full text-white outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <Heart
            className={cn(
              "size-6 drop-shadow-sm",
              isFavorite && "fill-current text-destructive"
            )}
            strokeWidth={2}
          />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              disabled={index === 0}
              onClick={() => scrollToIndex(index - 1)}
              className={cn(navButton, "left-2")}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              disabled={index === count - 1}
              onClick={() => scrollToIndex(index + 1)}
              className={cn(navButton, "right-2")}
            >
              <ChevronRight className="size-4" />
            </button>

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"
            >
              {images.map((image, i) => (
                <span
                  key={image.src}
                  className={cn(
                    "size-1.5 rounded-full bg-white shadow-sm transition-opacity",
                    i === index ? "opacity-100" : "opacity-60"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-0.5 text-sm">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-foreground">{title}</h3>
          {rating !== undefined && (
            <p className="flex shrink-0 items-center gap-1 text-foreground">
              <Star aria-hidden className="size-3.5 fill-current" />
              <span>
                <span className="sr-only">Rated </span>
                {rating}
              </span>
              {reviewCount !== undefined && (
                <span className="text-muted-foreground">
                  ({reviewCount}
                  <span className="sr-only"> reviews</span>)
                </span>
              )}
            </p>
          )}
        </div>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        {meta && <div className="text-muted-foreground">{meta}</div>}
        <p className="pt-1 text-foreground">
          <span className="font-semibold">{price}</span>
          {priceSuffix && <span> {priceSuffix}</span>}
        </p>
      </div>
    </div>
  );
}

/** @deprecated Use `ListingCard`. Kept for backwards compatibility. */
export const AirbnbListingCard = ListingCard;
export type ListingProps = ListingCardProps;
