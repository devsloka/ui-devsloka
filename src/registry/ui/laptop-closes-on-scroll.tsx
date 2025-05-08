"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMacBookProps {
  screenContent?: string;
  /** Color of the MacBook (silver, space-gray, gold) */
  color?: "silver" | "space-gray" | "gold";
  /** Scale factor for the MacBook size (default: 1) */
  scale?: number;
  /** How sensitive the animation is to scrolling (default: 1) */
  sensitivity?: number;
  /** Maximum rotation angle in degrees (default: 90) */
  maxRotation?: number;
  /** Custom class name for the container */
  className?: string;
  /** Custom class name for the screen content */
  screenClassName?: string;
}

export default function AnimatedMacBook({
  screenContent = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  color = "space-gray",
  scale = 1,
  sensitivity = 1,
  maxRotation = 90,
  className,
  screenClassName,
}: AnimatedMacBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to rotation angle
  const rotateX = useTransform(
    scrollYProgress,
    [0, sensitivity],
    [0, maxRotation]
  );

  // Additional transforms for enhanced realism
  const translateZ = useTransform(scrollYProgress, [0, sensitivity], [0, -50]);

  const opacity = useTransform(
    scrollYProgress,
    [0, sensitivity * 0.8],
    [1, 0.2]
  );

  // Color styles based on the color prop
  const colorStyles = {
    silver: {
      lid: "bg-gradient-to-b from-gray-200 to-gray-300",
      base: "bg-gradient-to-b from-gray-300 to-gray-400",
      inner: "bg-gray-700",
    },
    "space-gray": {
      lid: "bg-gradient-to-b from-gray-800 to-gray-900",
      base: "bg-gradient-to-b from-gray-700 to-gray-800",
      inner: "bg-gray-900",
    },
    gold: {
      lid: "bg-gradient-to-b from-amber-100 to-amber-200",
      base: "bg-gradient-to-b from-amber-200 to-amber-300",
      inner: "bg-gray-700",
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[200vh] w-full flex items-start justify-center pt-20",
        className
      )}
    >
      <div
        className="sticky top-[20vh] w-full max-w-4xl mx-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        {/* MacBook Container with 3D perspective */}
        <div className="relative w-full aspect-[16/10] perspective-[2000px]">
          {/* MacBook Lid */}
          <motion.div
            className="absolute inset-0 origin-bottom will-change-transform"
            style={{
              rotateX,
              translateZ,
              opacity,
            }}
          >
            {/* Lid Outer Shell with realistic gradient and shadow */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl shadow-lg border border-gray-900/20",
                colorStyles[color].lid
              )}
            >
              {/* Apple Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-10">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
            </div>

            {/* Screen Bezel with inner shadow */}
            <div
              className={cn(
                "absolute inset-[3px] rounded-xl bg-black shadow-inner",
                "after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_3px_rgba(0,0,0,0.3)]"
              )}
            >
              {/* Camera */}
              <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700/50"></div>

              {/* Screen Content with reflection effect */}
              <div
                className={cn(
                  "absolute inset-[4px] overflow-hidden rounded-lg bg-black",
                  "after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent after:opacity-50 after:z-10",
                  screenClassName
                )}
              >
                <img
                  src={screenContent || "/placeholder.svg"}
                  alt="Screen content"
                  className="w-full h-full object-cover"
                />

                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50"></div>
              </div>
            </div>
          </motion.div>

          {/* MacBook Base with realistic shadow and gradient */}
          <div
            className={cn(
              "absolute inset-x-[5%] bottom-0 h-[4%] rounded-b-xl",
              "shadow-[0_10px_20px_rgba(0,0,0,0.3)]",
              colorStyles[color].base
            )}
          >
            {/* Base Top Surface with keyboard hint */}
            <div className="absolute inset-x-[10%] top-[10%] h-[40%] bg-gray-800/10 rounded-lg"></div>

            {/* Trackpad */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] rounded-lg bg-gray-400/10 ring-1 ring-white/5"></div>

            {/* Front edge highlight */}
            <div className="absolute inset-x-[5%] bottom-[10%] h-[1px] bg-white/10 rounded-full"></div>

            {/* Side edges */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Base shadow */}
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-black/20 blur-xl rounded-[50%]"></div>
        </div>
      </div>
    </div>
  );
}
