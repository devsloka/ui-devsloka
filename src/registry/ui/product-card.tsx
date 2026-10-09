"use client";

import { useState } from "react";
import Image from "next/image";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductColor = { name: string; value: string };

export type ProductCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  image: { src: string; alt: string };
  title: React.ReactNode;
  category?: React.ReactNode;
  /** Pre-formatted price, e.g. "$89.99". */
  price: React.ReactNode;
  /** Pre-formatted original price, shown struck through. */
  compareAtPrice?: React.ReactNode;
  rating?: number;
  reviewCount?: number;
  /** Badges shown over the top-left of the image. */
  badges?: React.ReactNode[];
  colors?: ProductColor[];
  /** Selected color name (controlled). */
  color?: string;
  defaultColor?: string;
  onColorChange?: (color: string) => void;
  inStock?: boolean;
  /** Small note under the price, e.g. "Free shipping". */
  stockNote?: React.ReactNode;
  onAddToCart?: () => void;
  addToCartLabel?: React.ReactNode;
  outOfStockLabel?: React.ReactNode;
  wishlisted?: boolean;
  defaultWishlisted?: boolean;
  onWishlistChange?: (wishlisted: boolean) => void;
  wishlistLabel?: string;
  imageSizes?: string;
};

export function ProductCard({
  image,
  title,
  category,
  price,
  compareAtPrice,
  rating,
  reviewCount,
  badges,
  colors,
  color,
  defaultColor,
  onColorChange,
  inStock = true,
  stockNote,
  onAddToCart,
  addToCartLabel = "Add to cart",
  outOfStockLabel = "Out of stock",
  wishlisted,
  defaultWishlisted = false,
  onWishlistChange,
  wishlistLabel = "Add to wishlist",
  imageSizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  className,
  ...props
}: ProductCardProps) {
  const [uncontrolledColor, setUncontrolledColor] = useState(
    defaultColor ?? colors?.[0]?.name
  );
  const selectedColor = color ?? uncontrolledColor;
  const setColor = (next: string) => {
    if (color === undefined) setUncontrolledColor(next);
    onColorChange?.(next);
  };

  const [uncontrolledWishlisted, setUncontrolledWishlisted] = useState(defaultWishlisted);
  const isWishlisted = wishlisted ?? uncontrolledWishlisted;
  const toggleWishlist = () => {
    const next = !isWishlisted;
    if (wishlisted === undefined) setUncontrolledWishlisted(next);
    onWishlistChange?.(next);
  };

  return (
    <div
      data-slot="product-card"
      className={cn(
        "group flex w-full max-w-xs flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {badges && badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {badges.map((badge, i) => (
              <Badge key={i} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={wishlistLabel}
          aria-pressed={isWishlisted}
          onClick={toggleWishlist}
          className="absolute top-3 right-3 size-8 rounded-full shadow-sm"
        >
          <Heart className={cn("size-4", isWishlisted && "fill-current text-destructive")} />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          {(category || rating !== undefined) && (
            <div className="flex items-center justify-between gap-2 text-xs">
              {category && <span className="text-muted-foreground">{category}</span>}
              {rating !== undefined && (
                <span className="ml-auto flex items-center gap-1 text-foreground">
                  <Star aria-hidden className="size-3.5 fill-current" />
                  <span className="sr-only">Rated </span>
                  {rating.toFixed(1)}
                  {reviewCount !== undefined && (
                    <span className="text-muted-foreground">
                      ({reviewCount}
                      <span className="sr-only"> reviews</span>)
                    </span>
                  )}
                </span>
              )}
            </div>
          )}
          <h3 className="line-clamp-2 font-medium">{title}</h3>
        </div>

        {colors && colors.length > 0 && (
          <RadioGroupPrimitive.Root
            aria-label="Color"
            value={selectedColor}
            onValueChange={setColor}
            orientation="horizontal"
            className="flex flex-wrap items-center gap-2"
          >
            {colors.map((c) => (
              <RadioGroupPrimitive.Item
                key={c.name}
                value={c.name}
                aria-label={c.name}
                title={c.name}
                className="size-6 rounded-full border shadow-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-background"
                style={{ backgroundColor: c.value }}
              />
            ))}
          </RadioGroupPrimitive.Root>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold">{price}</span>
              {compareAtPrice && (
                <s className="text-sm text-muted-foreground">
                  <span className="sr-only">Original price </span>
                  {compareAtPrice}
                </s>
              )}
            </div>
            {stockNote && <p className="text-xs text-muted-foreground">{stockNote}</p>}
          </div>
          <Button type="button" size="sm" disabled={!inStock} onClick={onAddToCart}>
            {inStock && <ShoppingBag aria-hidden />}
            {inStock ? addToCartLabel : outOfStockLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
