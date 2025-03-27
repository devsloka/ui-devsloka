"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Cloud, Sun, Droplets } from "lucide-react"

export function FloatingCard() {
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full aspect-[3/4] perspective-1000">
      <motion.div
        ref={cardRef}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={{
          y: isHovering ? -20 : 0,
          rotateZ: isHovering ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          y: { type: "spring", stiffness: 300, damping: 20 },
          rotateZ: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "mirror",
          },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Sky background */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-100"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Sun */}
        <motion.div
          className="absolute top-6 right-6 w-16 h-16 rounded-full bg-yellow-300 shadow-lg"
          animate={{
            scale: isHovering ? [1, 1.1, 1] : 1,
            opacity: isHovering ? [0.8, 1, 0.8] : 0.8,
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
            boxShadow: "0 0 40px rgba(253, 224, 71, 0.6)",
          }}
        >
          <Sun className="w-full h-full text-yellow-100 p-3" />
        </motion.div>

        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 10}%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(${30 + i * 5}px)`,
            }}
            animate={{
              x: isHovering ? [0, i % 2 === 0 ? 20 : -20, 0] : 0,
              y: isHovering ? [0, i % 2 === 0 ? -5 : 5, 0] : 0,
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          >
            <Cloud className={`w-${8 + i * 2} h-${8 + i * 2} text-white`} />
          </motion.div>
        ))}

        {/* Island */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-full"
          animate={{
            y: isHovering ? [0, -5, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
        />

        {/* Trees */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-[30%] w-6 h-12"
            style={{
              left: `${10 + i * 20}%`,
              transformStyle: "preserve-3d",
              transform: `translateZ(${40 + (i % 3) * 10}px)`,
            }}
            animate={{
              y: isHovering ? [0, -3, 0] : 0,
              rotateZ: isHovering ? [0, i % 2 === 0 ? 3 : -3, 0] : 0,
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              delay: i * 0.2,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-800 mx-auto" />
            <div className="w-2 h-6 bg-brown-600 mx-auto" />
          </motion.div>
        ))}

        {/* Water */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/4 bg-blue-500/80"
          animate={{
            y: isHovering ? [0, 5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(5px)",
          }}
        >
          {/* Water ripples */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transformStyle: "preserve-3d",
                transform: "translateZ(5px)",
              }}
              animate={{
                opacity: isHovering ? [0, 0.7, 0] : 0,
                scale: isHovering ? [0, 1, 2] : 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              <Droplets className="text-white/30" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-end"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(50px)",
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-md p-4 rounded-lg text-white shadow-lg"
            animate={{
              y: isHovering ? -10 : 0,
              opacity: isHovering ? 1 : 0.9,
            }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">Tropical Paradise</h2>
            <p className="text-sm mb-4">Escape to a floating island of tranquility and adventure.</p>
            <motion.button
              className="bg-white/30 hover:bg-white/40 text-white py-2 px-4 rounded-full w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Island
            </motion.button>
          </motion.div>
        </div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 rounded-full blur-md"
          animate={{
            width: isHovering ? "80%" : "90%",
            opacity: isHovering ? 0.15 : 0.2,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  )
}

