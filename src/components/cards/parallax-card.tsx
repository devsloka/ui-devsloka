"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export function ParallaxCard() {
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
      className="relative w-full aspect-[3/4] rounded-xl perspective-1000 overflow-hidden"
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
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900"
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
      />

      {/* Stars layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: isHovering ? [0.3, 1, 0.3] : [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Mountains layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        animate={{
          y: isHovering ? 10 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        <svg
          viewBox="0 0 900 300"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C912,256,960,224,1008,213.3C1056,203,1104,213,1152,229.3C1200,245,1248,267,1296,261.3C1344,256,1392,224,1416,208L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            fill="#4c1d95"
          />
        </svg>
      </motion.div>

      {/* Moon layer */}
      <motion.div
        className="absolute top-[15%] right-[20%] w-16 h-16 rounded-full bg-yellow-100"
        animate={{
          y: isHovering ? -5 : 0,
          boxShadow: isHovering
            ? "0 0 30px 5px rgba(255, 249, 219, 0.7)"
            : "0 0 20px 2px rgba(255, 249, 219, 0.5)",
        }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)",
        }}
      />

      {/* Shooting stars */}
      {isHovering &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 40 + 5}%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(${40 + i * 5}px) rotate(${
                -30 - Math.random() * 30
              }deg)`,
            }}
            animate={{
              width: [0.5, 100, 0.5],
              height: [0.5, 1, 0.5],
              opacity: [1, 0.8, 0],
              x: [0, 100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 5 + 2,
            }}
          />
        ))}

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-end text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
        }}
      >
        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Cosmic Journey
        </motion.h2>

        <motion.p
          className="text-sm text-gray-200 mb-4 max-w-[80%]"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore the depths of space and discover the wonders of the universe.
        </motion.p>

        <motion.button
          className="bg-white/10 backdrop-blur-sm text-white py-2 px-4 rounded-full w-fit border border-white/20 hover:bg-white/20 transition-colors"
          animate={{
            y: isHovering ? -5 : 0,
            opacity: isHovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Begin Journey
        </motion.button>
      </div>
    </motion.div>
  );
}
