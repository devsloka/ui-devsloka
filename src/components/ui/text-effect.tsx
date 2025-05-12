"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type AnimationEffect =
  | "flip"
  | "fade"
  | "slide"
  | "scale"
  | "rotate"
  | "bounce"
  | "morph"
  | "blur";

interface TextFlipProps {
  words: string[];
  className?: string;
  duration?: number;
  effect?: AnimationEffect;
  textClassName?: string;
}

const animations = {
  flip: {
    initial: { y: 20, opacity: 0, rotateX: 90 },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    exit: {
      y: -20,
      opacity: 0,
      rotateX: -90,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  },
  fade: {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  slide: {
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  },
  scale: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  rotate: {
    initial: { rotate: -180, opacity: 0, scale: 0.5 },
    animate: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: {
      rotate: 180,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  bounce: {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
  },
  morph: {
    initial: {
      opacity: 0,
      scale: 0.8,
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  },
  blur: {
    initial: { filter: "blur(12px)", opacity: 0 },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
      filter: "blur(14px)",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  },
};

export const TextEffect = ({
  words,
  className = "",
  duration = 3000,
  effect = "flip",
  textClassName = "",
}: TextFlipProps) => {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (hiddenRef.current && containerRef.current) {
        const width = hiddenRef.current.offsetWidth + 30;
        const height = hiddenRef.current.offsetHeight;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  const currentAnimation = animations[effect];
  const currentWord = words[index];

  return (
    <motion.div
      ref={containerRef}
      layout
      animate={{
        width: dimensions.width,
        height: dimensions.height,
      }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      className={cn("relative inline-block overflow-hidden", className)}
    >
      {/* Hidden measurement element */}
      <span
        ref={hiddenRef}
        className={cn(
          "invisible whitespace-nowrap pointer-events-none",
          textClassName
        )}
      >
        {currentWord}
      </span>

      {/* Animated content */}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={currentAnimation}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            textClassName
          )}
          style={{ transformOrigin: "center center" }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};
