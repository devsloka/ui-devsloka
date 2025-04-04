"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ExploreAnimatedCard() {
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  // Calculate rotation based on mouse position
  const rotateX =
    isHovering && cardRef.current
      ? (mousePosition.y / cardRef.current.offsetHeight - 0.5) * 20
      : 0;
  const rotateY =
    isHovering && cardRef.current
      ? -(mousePosition.x / cardRef.current.offsetWidth - 0.5) * 20
      : 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-md aspect-[3/4] rounded-xl perspective-1000"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Card base */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden shadow-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1743031031853-15698b5b8419?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80"
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isHovering
              ? "brightness(0.7) contrast(1.2)"
              : "brightness(0.9)",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovering ? 0.8 : 0.6 }}
        />
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-end text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(40px)`,
        }}
      >
        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Mountain Escape
        </motion.h2>

        <motion.p
          className="text-sm text-gray-200 mb-4 max-w-[80%]"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover the serenity of mountain landscapes and reconnect with
          nature&apos;s beauty.
        </motion.p>

        <motion.button
          className="bg-white/10 backdrop-blur-sm text-white py-2 px-4 rounded-full w-fit border border-white/20 hover:bg-white/20 transition-colors"
          animate={{
            y: isHovering ? -5 : 0,
            opacity: isHovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore Now
        </motion.button>
      </div>

      {/* Animated elements */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 opacity-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(30px) translateX(20px) translateY(-20px)`,
        }}
        animate={{
          opacity: isHovering ? 0.9 : 0,
          rotate: isHovering ? 10 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/nature.gif"
          alt="Nature animation"
          className="w-full h-full object-cover rounded-full"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/50"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${20 + i * 10}px)`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            opacity: isHovering ? [0, 0.8, 0] : 0,
            y: isHovering ? [0, -30, -60] : 0,
            x: isHovering ? [0, i % 2 === 0 ? 10 : -10, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            repeatType: "loop",
          }}
        />
      ))}

      {/* Light reflection effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(2px)",
          mixBlendMode: "overlay",
        }}
        animate={{
          opacity: isHovering ? [0, 0.3, 0] : 0,
          backgroundPosition: isHovering ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}
