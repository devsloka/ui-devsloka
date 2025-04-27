"use client";

import React from "react";
import { motion } from "framer-motion";
import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  position: { x: number; y: number; rotate: number };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    quote:
      "These components have saved me countless hours. The integration was seamless!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    position: { x: -320, y: -180, rotate: -15 },
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    company: "StartupX",
    quote:
      "The best UI library I've used. Clean, modern, and highly customizable.",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    position: { x: -160, y: -280, rotate: 10 },
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UI/UX Designer",
    company: "DesignLab",
    quote: "Perfect blend of aesthetics and functionality. A designer's dream!",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    position: { x: 160, y: -280, rotate: -5 },
  },
  {
    id: 4,
    name: "Alex Rivera",
    role: "Software Architect",
    company: "TechGiant",
    quote: "The TypeScript support is exceptional. Documentation is top-notch!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    position: { x: 320, y: -180, rotate: 15 },
  },
  {
    id: 5,
    name: "Jessica Zhang",
    role: "Product Manager",
    company: "InnovateCo",
    quote:
      "Our development speed increased dramatically with these components.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    position: { x: -320, y: 180, rotate: 15 },
  },
  {
    id: 6,
    name: "David Kim",
    role: "Full Stack Developer",
    company: "DevStudio",
    quote:
      "The dark mode implementation is flawless. Great attention to detail!",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    position: { x: -160, y: 280, rotate: -10 },
  },
  {
    id: 7,
    name: "Laura Martinez",
    role: "Frontend Lead",
    company: "WebCraft",
    quote:
      "Accessibility features are built-in and work perfectly out of the box.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    position: { x: 160, y: 280, rotate: 5 },
  },
  {
    id: 8,
    name: "Tom Wilson",
    role: "Senior Developer",
    company: "CodeLabs",
    quote: "The animation system is powerful yet easy to use. Impressive work!",
    avatar: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg",
    position: { x: 320, y: 180, rotate: -15 },
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Decorative circles */}
          <div className="absolute inset-0">
            <div className="absolute w-[800px] h-[800px] border-2  rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[600px] h-[600px] border-2  rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Testimonial avatars */}
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: testimonial.position.x,
                y: testimonial.position.y,
                rotate: testimonial.position.rotate,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: testimonial.id * 0.15,
                type: "spring",
                stiffness: 100,
              }}
            >
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <motion.div
                    className="group relative"
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-50 to-zinc-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200" />
                    <button className="relative rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 object-cover"
                        width={64}
                        height={64}
                      />
                    </button>
                  </motion.div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    className="w-80 p-6 rounded-xl bg-background shadow-xl border  z-50"
                    sideOffset={5}
                  >
                    <div className="flex gap-4">
                      <Image
                        width={64}
                        height={64}
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-blue-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 italic">
                      {testimonial.quote}
                    </p>
                    <HoverCard.Arrow className="fill-white" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </motion.div>
          ))}

          {/* Central content */}
          <div className="relative z-10 text-center max-w-2xl">
            <Badge className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6">
              Testimonials
            </Badge>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Loved by thousands of people
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Here&apos;s what some of our users have to say about{" "}
              <span className="font-bold">Devsloka UI</span>.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
