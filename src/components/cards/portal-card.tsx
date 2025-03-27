"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

export function PortalCard() {
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  // Calculate rotation based on mouse position
  const rotateX = isHovering ? (mousePosition.y / cardRef.current?.offsetHeight! - 0.5) * 10 : 0
  const rotateY = isHovering ? -(mousePosition.x / cardRef.current?.offsetWidth! - 0.5) * 10 : 0

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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900" />
      </div>

      {/* Portal ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
          background:
            "conic-gradient(from 0deg, #9333ea, #7e22ce, #6b21a8, #581c87, #4c1d95, #6b21a8, #7e22ce, #9333ea)",
          boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
        }}
        animate={{
          rotate: [0, 360],
          scale: isHovering ? 1 : 0.9,
        }}
        transition={{
          rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 0.5 },
        }}
      />

      {/* Portal inner */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full bg-gradient-to-br from-fuchsia-400 via-purple-300 to-indigo-400 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)",
        }}
        animate={{
          scale: isHovering ? [1, 1.05, 1] : 0.8,
          boxShadow: isHovering ? "0 0 30px rgba(192, 132, 252, 0.8)" : "0 0 20px rgba(192, 132, 252, 0.5)",
        }}
        transition={{
          scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          boxShadow: { duration: 0.5 },
        }}
      >
        {/* Portal swirl */}
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(255, 255, 255, 0.5) 15deg 30deg)",
          }}
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Portal center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-white"
          animate={{
            scale: isHovering ? [0.8, 1, 0.8] : 0.8,
            opacity: isHovering ? [0.7, 0.9, 0.7] : 0.7,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
          }}
        />
      </motion.div>

      {/* Energy particles */}
      {isHovering &&
        [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-purple-300"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${40 + Math.random() * 20}px)`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 150],
              y: [0, (Math.random() - 0.5) * 150],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-between text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(40px)",
        }}
      >
        <motion.h2
          className="text-2xl font-bold text-center"
          animate={{ y: isHovering ? -10 : 0, opacity: isHovering ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
        >
          Dimensional Portal
        </motion.h2>

        <motion.div
          className="mt-auto bg-black/30 backdrop-blur-sm p-4 rounded-lg"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-gray-200 mb-4">
            Step through the gateway to explore alternate realities and unknown dimensions.
          </p>

          <motion.button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Portal
          </motion.button>
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
          transformStyle: "preserve-3d",
          transform: "translateZ(5px)",
        }}
        animate={{
          boxShadow: isHovering ? "0 0 30px rgba(147, 51, 234, 0.6)" : "0 0 30px rgba(147, 51, 234, 0.3)",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

