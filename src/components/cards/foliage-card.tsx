"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

export function FoliageCard() {
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
  const rotateX = isHovering ? (mousePosition.y / cardRef.current?.offsetHeight! - 0.5) * 15 : 0
  const rotateY = isHovering ? -(mousePosition.x / cardRef.current?.offsetWidth! - 0.5) * 15 : 0

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
          src="/images/forest.jpg"
          alt="Lush forest"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isHovering ? "brightness(0.9) saturate(1.2)" : "brightness(0.8)",
          }}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovering ? 0.8 : 0.6 }}
        />
      </div>

      {/* Animated vines */}
      <div
        className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}
      >
        {/* Left vine */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[30%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
            opacity: 0.8,
          }}
          animate={{
            x: isHovering ? 0 : -50,
            opacity: isHovering ? 0.8 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/vine.gif"
            alt="Animated vine"
            className="h-full object-cover object-right"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        {/* Right vine */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[30%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
            opacity: 0.8,
          }}
          animate={{
            x: isHovering ? 0 : 50,
            opacity: isHovering ? 0.8 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/vine.gif"
            alt="Animated vine"
            className="h-full object-cover object-left scale-x-[-1]"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>
      </div>

      {/* Falling leaves */}
      {isHovering &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `-10%`,
              left: `${Math.random() * 100}%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(${30 + Math.random() * 20}px) rotate(${Math.random() * 360}deg)`,
              color: `hsl(${100 + Math.random() * 40}, 70%, ${50 + Math.random() * 20}%)`,
            }}
            animate={{
              y: [0, 500],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360 + Math.random() * 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <Leaf className="w-4 h-4" />
          </motion.div>
        ))}

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-end text-white"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(40px)",
        }}
      >
        <motion.div
          className="absolute top-6 left-6 bg-green-800/30 backdrop-blur-sm p-3 rounded-full"
          animate={{
            y: isHovering ? [0, -5, 0] : 0,
            rotate: isHovering ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            y: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Leaf className="w-6 h-6 text-green-200" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-2"
          animate={{ y: isHovering ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Ancient Forest
        </motion.h2>

        <motion.p
          className="text-sm text-green-100 mb-4 max-w-[80%]"
          animate={{ y: isHovering ? -5 : 0, opacity: isHovering ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Wander through the lush canopy of an ancient forest teeming with life and mystery.
        </motion.p>

        <motion.button
          className="bg-green-700/40 backdrop-blur-sm text-white py-2 px-4 rounded-full w-fit border border-green-600/30 hover:bg-green-700/50 transition-colors"
          animate={{
            y: isHovering ? -5 : 0,
            opacity: isHovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore Forest
        </motion.button>
      </div>

      {/* Light rays */}
      {isHovering &&
        [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-[2px] bg-yellow-100/30 blur-[2px]"
            style={{
              height: `${50 + Math.random() * 50}%`,
              left: `${10 + i * 20}%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(5px) rotate(${-5 + Math.random() * 10}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />
        ))}
    </motion.div>
  )
}

