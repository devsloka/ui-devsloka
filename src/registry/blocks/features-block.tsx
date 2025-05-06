"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  Clock,
  Compass,
  Layers,
  Lightbulb,
  Zap,
} from "lucide-react";

export default function FeaturesBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Modular Components",
      description:
        "Build your application with reusable, modular components that can be easily customized.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Optimized Performance",
      description:
        "Our platform is optimized for speed and efficiency, ensuring your application runs smoothly.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Gain insights into your application's performance with detailed analytics and reporting.",
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Intuitive Navigation",
      description:
        "User-friendly navigation makes it easy for users to find what they're looking for.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Smart Suggestions",
      description:
        "AI-powered suggestions help users discover new features and content.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Updates",
      description:
        "Stay up-to-date with real-time notifications and updates on your application's status.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to build modern applications
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides all the tools and features you need to
              create powerful, scalable applications.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 pt-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md"
              >
                <div className="rounded-full border border-primary/20 bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
