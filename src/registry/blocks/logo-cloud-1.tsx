"use client";
import React, { useEffect, useRef } from "react";

import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LogoCloudCarousel } from "@/components/ui/logo-cloud-carousel";
const LogoCloudBlock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className="w-full py-10" ref={containerRef}>
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2
          className="text-3xl font-bold tracking-tight md:text-4xl"
          variants={titleVariants}
        >
          Powering the world&apos;s most innovative brands
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-muted-foreground"
          variants={titleVariants}
        >
          {
            "Join thousands of companies using our platform to build amazing products"
          }
        </motion.p>
        <motion.div
          className="mt-8"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          <Button asChild className="group">
            <a href={"#"}>
              {"Learn More"}
              <ArrowRight className=" h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
      <div className="w-full ">
        <LogoCloudCarousel logos={logos} />
      </div>
    </div>
  );
};

export default LogoCloudBlock;

const logos = [
  {
    name: "NVIDIA",
    url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=NVIDIA&foreground=%23ffffff&background=%23000000",
    description:
      "NVIDIA is a technology company that designs graphics processing units (GPUs) for gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market.",
  },
  {
    name: "GitHub",
    url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=GitHub&foreground=%23ffffff&background=%23000000",
    description:
      "GitHub is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management functionality of Git, plus its own features.",
  },
  {
    name: "Nike",
    url: "https://images.unsplash.com/photo-1617611413968-537a2ba4986d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=Nike&foreground=%23ffffff&background=%23000000",
    description:
      "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.",
  },
  {
    name: "OpenAI",
    url: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=OpenAI&foreground=%23ffffff&background=%23000000",
    description:
      "OpenAI is an artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc.",
  },
  {
    name: "Tailwind CSS",
    url: "https://images.unsplash.com/photo-1731937389219-0482470c099e?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=Tailwind&foreground=%23ffffff&background=%23000000",
    description:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need.",
  },
  {
    name: "Vercel",
    url: "https://images.ctfassets.net/q95r71b1uue1/CZM8YFlF9RPBFqn4IW1km/1b490ec8796f11dc4491fdc81fadcccd/Vercel_OG_Image.png",
    darkUrl:
      "/placeholder.svg?height=40&width=120&text=Vercel&foreground=%23ffffff&background=%23000000",
    description:
      "Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host websites and web services that deploy instantly and scale automatically.",
  },
];
