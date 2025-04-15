"use client";

import { useTheme } from "next-themes";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, Github } from "lucide-react";

export default function HeroGradientMesh() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Update the mouse position values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Create smooth spring animations for the gradient movement
  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform the mouse position to gradient position
  const gradientX = useTransform(
    smoothMouseX,
    [0, window.innerWidth],
    ["0%", "100%"]
  );
  const gradientY = useTransform(
    smoothMouseY,
    [0, window.innerHeight],
    ["0%", "100%"]
  );

  if (!mounted) return null;

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Interactive Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            theme === "dark"
              ? `radial-gradient(circle at ${gradientX.get()} ${gradientY.get()}, rgba(124, 58, 237, 0.15) 0%, rgba(17, 24, 39, 0) 70%)`
              : `radial-gradient(circle at ${gradientX.get()} ${gradientY.get()}, rgba(79, 70, 229, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      {/* Mesh Grid */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={
                  theme === "dark"
                    ? "rgba(124, 58, 237, 0.1)"
                    : "rgba(79, 70, 229, 0.1)"
                }
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 mx-auto sm:py-32 md:py-40">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Revolutionary Design System
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6"
            >
              <span className="block">Interactive</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">
                Gradient Mesh
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-xl mb-8 text-xl text-muted-foreground"
            >
              Experience the next generation of UI components with interactive
              backgrounds and fluid animations. Perfect for creating immersive
              user experiences.
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
                  Explore Library <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="gap-2 text-lg">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-primary/80"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1,000+</span>{" "}
                developers are already using our library
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Component Preview */}
            <div className="relative p-1 overflow-hidden border rounded-xl bg-background/50 backdrop-blur-sm shadow-xl">
              <div className="p-4 rounded-lg bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="h-6 w-24 rounded-md bg-muted" />
                </div>

                <div className="space-y-4">
                  <div className="h-8 w-3/4 rounded-md bg-muted" />
                  <div className="h-24 rounded-md bg-muted" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 rounded-md bg-muted" />
                    <div className="h-12 rounded-md bg-muted" />
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -z-10 -top-10 -right-10 w-40 h-40"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill={
                    theme === "dark"
                      ? "rgba(124, 58, 237, 0.1)"
                      : "rgba(79, 70, 229, 0.1)"
                  }
                  d="M45.3,-51.2C58.3,-40.9,68.7,-25.9,71.9,-9.2C75,7.5,71,25.8,60.9,39.6C50.8,53.3,34.7,62.5,16.9,67.2C-0.9,71.8,-20.3,71.8,-36.2,64.1C-52.1,56.4,-64.5,41,-69.7,23.8C-74.9,6.7,-73,-12.3,-65.1,-27.4C-57.2,-42.5,-43.3,-53.7,-28.5,-63.2C-13.7,-72.7,2,-80.5,15.8,-76.9C29.7,-73.3,32.3,-61.4,45.3,-51.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -z-10 -bottom-10 -left-10 w-40 h-40"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill={
                    theme === "dark"
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(99, 102, 241, 0.1)"
                  }
                  d="M42.8,-65.2C54.9,-56.3,63.6,-43.3,68.5,-29.1C73.4,-14.9,74.4,0.5,71.1,15.1C67.8,29.7,60.2,43.5,48.5,52.4C36.8,61.3,21.1,65.3,4.6,69.1C-11.9,72.9,-29.2,76.5,-41.7,70.1C-54.2,63.7,-61.9,47.3,-67.8,30.8C-73.7,14.3,-77.8,-2.3,-74.2,-17.2C-70.6,-32.1,-59.3,-45.3,-45.8,-53.8C-32.3,-62.3,-16.1,-66.1,-0.2,-65.8C15.8,-65.5,30.7,-74.1,42.8,-65.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
