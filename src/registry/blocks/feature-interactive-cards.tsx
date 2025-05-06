"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layers, Sparkles } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

export function FeatureInteractiveCards() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4" variant="outline">
              Interactive Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stunning Interactive Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground mt-4 md:text-xl">
              Explore our collection of beautifully designed interactive
              components with subtle 3D effects.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            title="Responsive Design"
            description="Fully responsive components that look great on any device, from mobile to desktop."
            icon={<Layers className="h-6 w-6" />}
            color="bg-gradient-to-br from-pink-500 to-orange-400"
            index={0}
          />
          <FeatureCard
            title="Modern Animations"
            description="Smooth, performant animations that enhance the user experience without being distracting."
            icon={<Sparkles className="h-6 w-6" />}
            color="bg-gradient-to-br from-violet-500 to-purple-500"
            index={1}
          />
          <FeatureCard
            title="Clean Code"
            description="Well-structured, maintainable code that follows best practices and is easy to customize."
            icon={<Code className="h-6 w-6" />}
            color="bg-gradient-to-br from-cyan-500 to-blue-500"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  color,
  index,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation values
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Handle mouse move on card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (values from -0.5 to 0.5)
    const xPos = (e.clientX - rect.left) / width - 0.5;
    const yPos = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", damping: 20 }}
        className="h-full"
      >
        <Card className="h-full border-2 border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden group">
          <CardHeader className="pb-2">
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3",
                color
              )}
            >
              {icon}
            </div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="group/button mt-2">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </CardFooter>

          {/* Shine effect */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.15) 0%, transparent 50%)",
              x: useMotionValue("50%"),
              y: useMotionValue("50%"),
              opacity: isHovered ? 1 : 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
            animate={
              {
                "--x": `${(mouseX.get() + 0.5) * 100}%`,
                "--y": `${(mouseY.get() + 0.5) * 100}%`,
              } as const
            }
            transition={{ type: "spring", damping: 20 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
