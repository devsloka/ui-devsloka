"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSplitReveal() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  {
    /* If you want to use scroll-based animations , uncomment the code below */
  }

  // Scroll-based animations
  //   const { scrollYProgress } = useScroll({
  //     target: containerRef,
  //     offset: ["start start", "end start"],
  //   });

  //   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  //   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  //   const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
      //   style={{ opacity, scale, y }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalLines"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke={
                  theme === "dark"
                    ? "rgba(124, 58, 237, 0.05)"
                    : "rgba(79, 70, 229, 0.05)"
                }
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      {/* Split Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center py-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Revolutionary UI Library
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Split Reveal
              </motion.span>
              <motion.span
                className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Animation
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-xl mb-8 text-xl text-muted-foreground"
            >
              Create stunning interfaces with our modern component library
              featuring split-screen layouts and scroll-based reveal animations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2 text-lg">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="text-lg">
                  Documentation
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-16"
            >
              {[
                { label: "Components", value: "150+" },
                { label: "Downloads", value: "10k+" },
                { label: "Satisfaction", value: "99%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-3xl font-bold text-foreground"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center py-12"
          >
            {/* Animated Code Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative w-full max-w-md"
            >
              <motion.div
                className="p-6 overflow-hidden rounded-lg bg-card border shadow-xl"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="px-2 py-1 text-xs rounded bg-muted">
                    component.tsx
                  </div>
                </div>

                <div className="font-mono text-sm">
                  <div className="text-muted-foreground">
                    <span className="text-green-500">import</span> {"{"}
                    <span className="text-blue-500"> motion </span>
                    {"}"} <span className="text-green-500">from</span>{" "}
                    <span className="text-orange-400">framer-motion&apos;</span>
                  </div>
                  <div className="mt-2 text-muted-foreground">
                    <span className="text-purple-500">
                      export default function
                    </span>{" "}
                    <span className="text-blue-500">Component</span>() {"{"}
                  </div>
                  <div className="mt-1 text-muted-foreground pl-4">
                    <span className="text-purple-500">return</span> (
                  </div>
                  <div className="mt-1 text-muted-foreground pl-8">
                    &lt;<span className="text-blue-500">motion.div</span>
                  </div>
                  <div className="mt-1 text-muted-foreground pl-12">
                    <span className="text-green-500">initial</span>={"{"}
                    {"{"} <span className="text-orange-400">opacity: 0</span>{" "}
                    {"}"}
                    {"}"}
                  </div>
                  <div className="mt-1 text-muted-foreground pl-12">
                    <span className="text-green-500">animate</span>={"{"}
                    {"{"} <span className="text-orange-400">opacity: 1</span>{" "}
                    {"}"}
                    {"}"}
                  </div>
                  <div className="mt-1 text-muted-foreground pl-8">&gt;</div>
                  <div className="mt-1 text-muted-foreground pl-12">
                    <span className="text-foreground">Your content here</span>
                  </div>
                  <div className="mt-1 text-muted-foreground pl-8">
                    &lt;/<span className="text-blue-500">motion.div</span>&gt;
                  </div>
                  <div className="mt-1 text-muted-foreground pl-4">)</div>
                  <div className="mt-1 text-muted-foreground">{"}"}</div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -z-10 -top-6 -left-6 w-24 h-24 rounded-lg bg-primary/10"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 rounded-lg bg-purple-500/10"
                animate={{
                  rotate: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>

            {/* Floating elements */}
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  theme === "dark" ? "bg-purple-500/10" : "bg-indigo-500/10"
                }`}
                style={{
                  width: `${Math.random() * 100 + 20}px`,
                  height: `${Math.random() * 100 + 20}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, Math.random() * 30 - 15, 0],
                  y: [0, Math.random() * 30 - 15, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </motion.div>
  );
}
