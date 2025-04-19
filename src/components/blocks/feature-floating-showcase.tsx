"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Database,
  Lock,
  Smartphone,
} from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: string;
  delay: number;
}

const featuresData: FeatureItemProps[] = [
  {
    title: "Responsive",
    description: "Looks great on any device",
    icon: <Smartphone className="h-5 w-5" />,
    color: "bg-pink-500/90 dark:bg-pink-600/90",
    position: "left-[2%] top-[10%] sm:left-[5%] md:top-[20%]",
    delay: 0.1,
  },
  {
    title: "Secure",
    description: "Built with security in mind",
    icon: <Lock className="h-5 w-5" />,
    color: "bg-violet-500/90 dark:bg-violet-600/90",
    position: "right-[2%] top-[25%] sm:right-[5%] md:top-[15%]",
    delay: 0.2,
  },
  {
    title: "Fast",
    description: "Optimized for performance",
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-blue-500/90 dark:bg-blue-600/90",
    position: "left-[2%] bottom-[25%] sm:left-[15%] md:bottom-[20%]",
    delay: 0.3,
  },
  {
    title: "Data-Driven",
    description: "Seamless data integration",
    icon: <Database className="h-5 w-5" />,
    color: "bg-emerald-500/90 dark:bg-emerald-600/90",
    position: "right-[2%] bottom-[20%] sm:right-[5%] md:bottom-[25%]",
    delay: 0.4,
  },
  {
    title: "Analytics",
    description: "Built-in analytics support",
    icon: <BarChart3 className="h-5 w-5" />,
    color: "bg-amber-500/90 dark:bg-amber-600/90",
    position:
      "left-[50%] -translate-x-1/2 bottom-[5%] md:left-[40%] md:bottom-[10%]",
    delay: 0.5,
  },
];

export function FloatingFeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={containerRef}
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <motion.div
        style={{ y: bgY1 }}
        className="absolute -top-1/2 -left-1/4 w-1/2 h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl opacity-70 dark:opacity-40"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full rounded-full bg-gradient-to-tl from-secondary/20 to-secondary/5 blur-3xl opacity-70 dark:opacity-40"
      />

      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:20px_20px] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4" variant="outline">
              Innovative Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Cutting-Edge UI Components
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground mt-4 md:text-xl">
              Elevate your applications with our beautifully designed, highly
              interactive components.
            </p>
          </motion.div>
        </div>

        <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center"
          >
            <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-background border border-border/50 shadow-lg flex items-center justify-center p-6 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-lg md:text-2xl font-bold mb-2">
                  UI Library
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  Modern, accessible, and beautiful components
                </p>
                <Button size="sm" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          {featuresData.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="outline" className="group">
              View Documentation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  title,
  description,
  icon,
  color,
  position,
  delay,
}: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn("absolute z-10", position)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-start gap-3 bg-background/80 backdrop-blur-sm border border-border/50 p-3 rounded-lg shadow-lg max-w-[150px] md:max-w-[200px]"
      >
        <div
          className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0",
            color
          )}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-xs md:text-sm">{title}</h4>
          <p className="text-[0.7rem] md:text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
