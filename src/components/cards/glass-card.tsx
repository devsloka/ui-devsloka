"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function GlassCard() {
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

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full aspect-[3/4] rounded-xl perspective-1000 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0.9 }}
      whileHover={{ opacity: 1 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl" />

      {/* Glass card */}
      <motion.div
        className="absolute inset-0 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
        animate={{
          rotateY: isHovering ? -5 : 0,
          rotateX: isHovering ? 5 : 0,
          translateZ: isHovering ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0"
          animate={{
            opacity: isHovering ? 0.5 : 0,
            left: isHovering ? ["-100%", "200%"] : "-100%",
            top: isHovering ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: 0.5,
          }}
          style={{
            transformStyle: "preserve-3d",
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-between text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)",
        }}
      >
        <div className="flex justify-between items-start">
          <motion.div
            className="bg-white/20 backdrop-blur-md p-2 rounded-lg"
            animate={{
              rotateY: isHovering ? 180 : 0,
              scale: isHovering ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            className="text-right"
            animate={{
              y: isHovering ? -5 : 0,
              opacity: isHovering ? 1 : 0.7,
            }}
          >
            <p className="text-xs text-white/70">Premium</p>
            <h3 className="text-lg font-semibold">Glass Card</h3>
          </motion.div>
        </div>

        <div>
          <motion.div
            className="mb-4"
            animate={{
              y: isHovering ? -10 : 0,
              opacity: isHovering ? 1 : 0.7,
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs text-white/70 mb-1">Card Number</p>
            <p className="font-mono tracking-wider">•••• •••• •••• 4242</p>
          </motion.div>

          <div className="flex justify-between">
            <motion.div
              animate={{
                y: isHovering ? -5 : 0,
                opacity: isHovering ? 1 : 0.7,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-xs text-white/70 mb-1">Name</p>
              <p className="font-medium">J. Smith</p>
            </motion.div>

            <motion.div
              animate={{
                y: isHovering ? -5 : 0,
                opacity: isHovering ? 1 : 0.7,
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-xs text-white/70 mb-1">Expires</p>
              <p className="font-medium">05/28</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transformStyle: "preserve-3d",
            transform: `translateZ(${40 + Math.random() * 20}px)`,
          }}
          animate={{
            opacity: isHovering ? [0, 0.7, 0] : 0,
            scale: isHovering ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Mouse follower highlight */}
      {isHovering && (
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-white/10 pointer-events-none"
          animate={{
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
            mixBlendMode: "plus-lighter",
          }}
        />
      )}
    </motion.div>
  )
}

