"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface Image {
  url: string;
  alt: string;
  width: string;
  height: string;
}

interface ImageGalleryProps {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay between items in milliseconds */
  stagger?: number;
  /** CSS easing function for the animation */
  easing?: string;
  images: Image[];
}

export function ImageGallery({
  duration = 800,
  stagger = 100,
  easing = "cubic-bezier(0.5, 1.5, 0.5, 1.5)",
  images,
}: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = (element: HTMLElement, index: number) => {
      const delay = stagger * (index % 3);
      element.style.setProperty("--delay", `${delay}ms`);
      element.style.setProperty("--duration", `${duration}ms`);
      element.style.setProperty("--easing", easing);
      element.classList.add("animate-in");
    };

    if (prefersReducedMotion) {
      galleryRef.current?.querySelectorAll(".gallery-item").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement, index);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    galleryRef.current?.querySelectorAll(".gallery-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [duration, stagger, easing]);

  return (
    <div ref={galleryRef} className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "gallery-item",
              "opacity-0",
              "group relative overflow-hidden rounded-2xl shadow-xl",
              "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.3)_0%,transparent_70%)] before:opacity-0 before:transition-opacity before:duration-300",
              "hover:before:opacity-100 hover:shadow-2xl hover:z-10",
              "motion-safe:animate-float"
            )}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--x",
                `${e.clientX - rect.left}px`
              );
              e.currentTarget.style.setProperty(
                "--y",
                `${e.clientY - rect.top}px`
              );
            }}
          >
            <noscript>
              <style>{`.gallery-item { opacity: 1; }`}</style>
            </noscript>

            <div className="relative aspect-[3/2] overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.03]">
              <img
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 p-6 flex items-end">
                <p className="text-white text-lg font-medium translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                  {image.alt}
                </p>
              </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--x)_var(--y),#7d7dff_0%,transparent_70%)] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-0.5deg);
          }
          50% {
            transform: translateY(-12px) rotate(0.5deg);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateX(45deg) rotateY(-15deg) rotateZ(10deg);
            filter: brightness(1.5) saturate(1.5);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0) rotateY(0) rotateZ(0);
            filter: none;
          }
        }

        .gallery-item.animate-in {
          animation: popIn var(--duration) var(--easing) forwards;
          animation-delay: var(--delay);
        }

        .motion-safe\:animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\:animate-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
