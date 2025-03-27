"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export function GlitchCard() {
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [glitchActive, setGlitchActive] = useState(false)

  // Trigger random glitch effects
  useEffect(() => {
    if (!isHovering) return

    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200)
      },
      1000 + Math.random() * 2000,
    )

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div className="relative w-full aspect-[3/4] perspective-1000">
      <motion.div
        ref={cardRef}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={{
          x: glitchActive ? [0, -5, 5, -2, 0] : 0,
          y: glitchActive ? [0, 2, -2, 1, 0] : 0,
          rotateZ: isHovering ? 2 : 0,
        }}
        transition={{
          x: { duration: 0.2, ease: "easeInOut" },
          y: { duration: 0.2, ease: "easeInOut" },
          rotateZ: { duration: 0.5, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black" style={{ transformStyle: "preserve-3d" }} />

        {/* Grid lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-cyan-500/30"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: isHovering ? [0.3, 0.5, 0.3] : 0.3,
                scaleX: glitchActive && i % 3 === 0 ? [1, 0.7, 1.2, 1] : 1,
                x: glitchActive && i % 5 === 0 ? [0, 10, -5, 0] : 0,
              }}
              transition={{
                opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                scaleX: { duration: 0.2 },
                x: { duration: 0.2 },
              }}
            />
          ))}

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-cyan-500/30"
              style={{ left: `${i * 10}%` }}
              animate={{
                opacity: isHovering ? [0.3, 0.5, 0.3] : 0.3,
                scaleY: glitchActive && i % 2 === 0 ? [1, 0.9, 1.1, 1] : 1,
                y: glitchActive && i % 3 === 0 ? [0, 5, -10, 0] : 0,
              }}
              transition={{
                opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 },
                scaleY: { duration: 0.2 },
                y: { duration: 0.2 },
              }}
            />
          ))}
        </div>

        {/* Glitch layers */}
        <motion.div
          className="absolute inset-0 bg-cyan-900/20"
          animate={{
            opacity: glitchActive ? [0, 0.5, 0] : 0,
            x: glitchActive ? [0, 5, 0] : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute inset-0 bg-red-900/20"
          animate={{
            opacity: glitchActive ? [0, 0.5, 0] : 0,
            x: glitchActive ? [0, -5, 0] : 0,
          }}
          transition={{ duration: 0.2, delay: 0.05 }}
        />

        {/* Content */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          <div className="flex justify-between items-start">
            <motion.div
              className="bg-cyan-500/20 p-2 rounded"
              animate={{
                x: glitchActive ? [0, 3, -2, 0] : 0,
                opacity: glitchActive ? [1, 0.8, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-6 h-6 text-cyan-400" />
            </motion.div>

            <motion.div
              className="text-right"
              animate={{
                x: glitchActive ? [0, -3, 2, 0] : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.p
                className="text-xs text-cyan-400"
                animate={{
                  y: isHovering ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                SYSTEM.SYS
              </motion.p>
              <motion.h3
                className="text-lg font-mono text-white"
                animate={{
                  y: isHovering ? -5 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                CYBER_CARD
              </motion.h3>
            </motion.div>
          </div>

          <div>
            <motion.div
              className="mb-6 relative overflow-hidden"
              animate={{
                y: isHovering ? -10 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-cyan-500/10"
                animate={{
                  height: glitchActive ? ["0%", "100%", "0%"] : "0%",
                }}
                transition={{ duration: 0.2 }}
              />

              <p className="font-mono text-cyan-400 text-xs mb-1">TERMINAL_ACCESS</p>
              <p className="font-mono text-white text-sm">
                {isHovering ? (
                  <>
                    <span className="text-green-400">root@cyber:</span>
                    <span className="text-white">~$ </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    >
                      _
                    </motion.span>
                  </>
                ) : (
                  "SYSTEM LOCKED"
                )}
              </p>
            </motion.div>

            <motion.button
              className="w-full bg-cyan-900/50 hover:bg-cyan-800/50 border border-cyan-500/30 text-cyan-400 py-2 font-mono text-sm rounded"
              animate={{
                y: isHovering ? -5 : 0,
                opacity: glitchActive ? [1, 0.7, 1] : 1,
              }}
              transition={{
                y: { duration: 0.4, delay: 0.2 },
                opacity: { duration: 0.1 },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              INITIALIZE_SEQUENCE
            </motion.button>
          </div>
        </div>

        {/* Scan line */}
        {isHovering && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-cyan-400/30 pointer-events-none"
            animate={{
              top: ["0%", "100%"],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              top: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
          />
        )}

        {/* Random glitch blocks */}
        {isHovering &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-400/20 pointer-events-none"
              style={{
                width: `${5 + Math.random() * 20}%`,
                height: `${2 + Math.random() * 5}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: glitchActive ? 0.7 : 0,
                left: glitchActive ? `${Math.random() * 80}%` : "50%",
                top: glitchActive ? `${Math.random() * 90}%` : "50%",
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
      </motion.div>
    </div>
  )
}

