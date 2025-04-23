"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content:
      "This platform has completely transformed how we handle our workflow. The AI features are genuinely impressive, not just buzzwords.",
    author: "Emily Chen",
    role: "CTO at TechFlow",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    gradient: "from-pink-500/10 via-purple-500/10 to-indigo-500/10",
    company:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&fit=crop",
  },
  {
    content:
      "The attention to detail in the UI and the smoothness of the animations make this a joy to use. Our team adopted it instantly.",
    author: "Marcus Johnson",
    role: "Lead Designer at CreativeHub",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    gradient: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    company:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=80&h=80&fit=crop",
  },
  {
    content:
      "Security features are top-notch. As a fintech company, this was our primary concern, and this platform exceeded expectations.",
    author: "Sarah Williams",
    role: "Security Director at FinSecure",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    rating: 5,
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
    company:
      "https://images.unsplash.com/photo-1614680376408-16e6faf7d7b4?w=80&h=80&fit=crop",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const starVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

export function TestimonialsBlockTwo() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y, rotate }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
          >
            <MessageCircle className="h-10 w-10 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Loved by teams worldwide
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover why leading companies choose our platform for their
              critical operations.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl p-8",
                "bg-card/50 backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl",
                "before:absolute before:inset-0 before:bg-gradient-to-br",
                `before:${testimonial.gradient}`,
                "before:opacity-0 before:transition-opacity before:duration-300",
                "hover:before:opacity-100"
              )}
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        initial="initial"
                        animate="animate"
                        custom={i}
                      >
                        <Star className="h-5 w-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    src={testimonial.company}
                    alt="Company logo"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-8"
                >
                  <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/20 rotate-180" />
                  <p className="text-lg leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </motion.div>

                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-background">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-4 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent blur-2xl"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
