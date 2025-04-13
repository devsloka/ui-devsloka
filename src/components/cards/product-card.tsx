"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart, Eye, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";

export interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  colors?: string[];
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  category,
  rating,
  inStock = true,
  isNew = false,
  isFeatured = false,
  discount,
  colors = ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="group py-0 relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600">New</Badge>
          )}
          {discount && (
            <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
          {isFeatured && (
            <Badge
              variant="outline"
              className="border-amber-400 text-amber-500 bg-amber-50"
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-muted-foreground"
            }`}
          />
        </motion.button>

        {/* Image container */}
        <motion.div
          className="relative aspect-square overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2"
            >
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full px-4 flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                Quick View
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-6 flex flex-col flex-grow"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">{category}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Stock status */}
          <div className="flex items-center mb-3 text-sm">
            {inStock ? (
              <div className="flex items-center text-emerald-600">
                <Check className="h-4 w-4 mr-1" />
                <span>In Stock</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Ships in 2-3 weeks</span>
              </div>
            )}
          </div>

          {/* Color options */}
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-2">Colors</div>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`h-6 w-6 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-0"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Spacer to push price and button to bottom */}
          <div className="flex-grow"></div>

          <div className="flex items-center justify-between mt-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary/90">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">Free shipping</div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary hover:bg-primary/90 rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
