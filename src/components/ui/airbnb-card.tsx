"use client";

import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ListingProps {
  id: string;
  title: string;
  location: string;
  host: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  perNight: boolean;
  dates: string;
  isSuperhost?: boolean;
  isNew?: boolean;
  category?: string;
}

export function AirbnbListingCard({
  title,
  location,
  host,
  images,
  rating,
  reviewCount,
  price,
  perNight = true,
  dates,
  isSuperhost = false,
  isNew = false,
  category,
}: ListingProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Handle next image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Handle previous image navigation
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    if (Math.abs(distance) < swipeThreshold) return;

    if (distance > 0) {
      nextImage(); // Swipe left
    } else {
      prevImage(); // Swipe right
    }
  };

  return (
    <div className="group w-[200px] sm:w-[300px] md:w-[400px] lg:w-[400px] xl:w-[400px]">
      <div
        className="relative aspect-square rounded-xl overflow-hidden mb-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image carousel container with sliding animation */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Image position indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    currentImageIndex === index
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 text-white hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className="h-7 w-7 drop-shadow-md"
            fill={isFavorite ? "#FF385C" : "transparent"}
            stroke={isFavorite ? "#FF385C" : "white"}
            strokeWidth={2}
          />
        </button>

        {/* Badges for superhost/new listing */}
        {(isSuperhost || isNew) && (
          <div className="absolute top-3 left-3">
            {isSuperhost && (
              <Badge className="bg-white text-black font-medium text-xs mb-2">
                Superhost
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-white text-black font-medium text-xs">
                New
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Listing details */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {location}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1">{rating}</span>
            {reviewCount > 0 && (
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({reviewCount})
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {category ? `${category} • ` : ""}Hosted by {host}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{dates}</p>

        <p className="pt-1">
          <span className="font-semibold">${price}</span>
          {perNight && (
            <span className="text-gray-900 dark:text-white"> night</span>
          )}
        </p>
      </div>
    </div>
  );
}
