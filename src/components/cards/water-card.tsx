"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";

export function WaterCard() {
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
          src="/images/ocean.jpg"
          alt="Ocean view"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isHovering
              ? "brightness(0.8) saturate(1.2)"
              : "brightness(0.9)",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovering ? 0.8 : 0.6 }}
        />
      </div>

      {/* Animated water waves */}
      <div
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[10%] left-0 right-0 bg-blue-400/20"
            style={{
              bottom: `${i * 10}%`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              x: isHovering
                ? [i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 20 : -20]
                : 0,
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="#0ea5e9"
                fillOpacity={0.1 + i * 0.05}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Water splash gif */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
        animate={{
          opacity: isHovering ? 0.8 : 0,
          y: isHovering ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/water-splash.gif"
          alt="Water splash"
          className="w-full h-full object-cover object-bottom"
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
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm p-3 rounded-full"
          animate={{
            y: isHovering ? [0, -5, 0] : 0,
            rotate: isHovering ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Waves className="w-6 h-6 text-blue-200" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Ocean Depths
        </motion.h2>

        <motion.p
          className="text-sm text-blue-100 mb-4 max-w-[80%]"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Dive into the mesmerizing beauty of the ocean and discover its hidden
          wonders.
        </motion.p>

        <motion.button
          className="bg-blue-500/30 backdrop-blur-sm text-white py-2 px-4 rounded-full w-fit border border-blue-400/30 hover:bg-blue-500/40 transition-colors"
          animate={{
            y: isHovering ? -5 : 0,
            opacity: isHovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore Depths
        </motion.button>
      </div>

      {/* Floating bubbles */}
      {isHovering &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/40 bg-white/10"
            style={{
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(${30 + Math.random() * 30}px)`,
            }}
            animate={{
              y: [0, -300 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
    </motion.div>
  );
}
