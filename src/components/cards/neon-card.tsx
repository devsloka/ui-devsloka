"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export function NeonCard() {
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
      ? (mousePosition.y / cardRef.current.offsetHeight - 0.5) * 15
      : 0;
  const rotateY =
    isHovering && cardRef.current?.offsetWidth
      ? -(mousePosition.x / cardRef.current.offsetWidth - 0.5) * 15
      : 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full aspect-[3/4] rounded-xl perspective-1000"
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
          src="/images/neon-city.jpg"
          alt="Neon city"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isHovering
              ? "brightness(1.2) contrast(1.1)"
              : "brightness(0.9)",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-fuchsia-800/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovering ? 0.8 : 0.6 }}
        />
      </div>

      {/* Neon glow effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}
      >
        {/* Horizontal neon lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] left-[10%] right-[10%]"
            style={{
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg, transparent 0%, ${
                i === 0 ? "#f0abfc" : i === 1 ? "#818cf8" : "#22d3ee"
              } 50%, transparent 100%)`,
              boxShadow: `0 0 10px ${
                i === 0 ? "#f0abfc" : i === 1 ? "#818cf8" : "#22d3ee"
              }`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              opacity: isHovering ? [0.5, 1, 0.5] : 0.3,
              scaleX: isHovering ? [0.8, 1, 0.8] : 0.8,
            }}
            transition={{
              duration: 2 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />
        ))}
      </motion.div>

      {/* Audio visualizer */}
      <motion.div
        className="absolute bottom-[30%] left-[20%] right-[20%] h-[15%] flex items-end justify-between"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[5px] bg-fuchsia-500 rounded-t-sm"
            style={{
              height: "20%",
              boxShadow: "0 0 8px #f0abfc",
              transformStyle: "preserve-3d",
            }}
            animate={{
              height: isHovering
                ? `${20 + Math.sin(i / 2) * 60 + Math.random() * 20}%`
                : "20%",
              opacity: isHovering ? 1 : 0.5,
            }}
            transition={{
              height: {
                duration: 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.05,
              },
              opacity: { duration: 0.5 },
            }}
          />
        ))}
      </motion.div>

      {/* Animated equalizer gif */}
      <motion.div
        className="absolute top-[15%] left-[50%] w-[40%] aspect-square"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px) translateX(-50%)",
        }}
        animate={{
          opacity: isHovering ? 0.8 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/equalizer.gif"
          alt="Audio equalizer"
          className="w-full h-full object-contain"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-end text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(40px)",
        }}
      >
        <motion.div
          className="absolute top-6 right-6 bg-fuchsia-500/30 backdrop-blur-sm p-3 rounded-full"
          animate={{
            boxShadow: isHovering
              ? ["0 0 0px #f0abfc", "0 0 20px #f0abfc", "0 0 5px #f0abfc"]
              : "0 0 0px #f0abfc",
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <Music className="w-6 h-6 text-fuchsia-200" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Neon Nightlife
        </motion.h2>

        <motion.p
          className="text-sm text-fuchsia-100 mb-4 max-w-[80%]"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Experience the electric atmosphere of the city after dark with pulsing
          beats and vibrant lights.
        </motion.p>

        <motion.button
          className="bg-fuchsia-600/40 backdrop-blur-sm text-white py-2 px-4 rounded-full w-fit border border-fuchsia-500/30 hover:bg-fuchsia-600/50 transition-colors"
          animate={{
            y: isHovering ? -5 : 0,
            opacity: isHovering ? 1 : 0.7,
            boxShadow: isHovering
              ? "0 0 15px rgba(232, 121, 249, 0.5)"
              : "0 0 0px rgba(232, 121, 249, 0)",
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join the Party
        </motion.button>
      </div>
    </motion.div>
  );
}
