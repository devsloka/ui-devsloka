"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { FloatingDots } from "../ui/floating-dots";
import { useTheme } from "next-themes";
import { Tour } from "../ui/tour";
import SuccessResult from "../ui/success-result";
import RangeSliderWithHistogram from "../ui/range-slider-with-histogram";
import MorphingNavDemo from "../devsloka-components/demo/morphing-nav-demo";
import Link from "next/link";
import { TextEffect } from "@/components/ui/text-effect";

const HeroSection = () => {
  const { theme } = useTheme();
  const [isTourOpen, setIsTourOpen] = React.useState(false);
  const steps = [
    {
      target: "#head-title",
      placement: "bottom" as const,
      title: "Welcome to Devsloka UI",
      description:
        "Welcome to Devsloka UI, your gateway to stunning interfaces.",
      offset: { y: 0 }, // Add some extra space below the title
    },
    {
      target: "#description",
      title: "Description",
      description:
        "Learn to build unique, stunning interfaces that set you apart from the copy-paste crowd.",
      placement: "right" as const,
      offset: { x: -5 }, // Slight offset from the button
    },
    {
      target: "#explore-button",
      title: "Explore Components",
      description:
        "Click this button to explore all the amazing components we offer.",
      placement: "bottom" as const,
      offset: { y: -10 }, // Move slightly closer to the features
    },
    {
      target: "#components-showcase",
      title: "Components Showcase",
      description: "This is the Components Showcase section.",
      placement: "left" as const,
      offset: { y: -10 }, // Move slightly closer to the features
    },
  ];
  return (
    <motion.div
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[70dvh] mt-20 gap-10"
      initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
      animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <FloatingDots
        className="w-full h-full"
        color={theme === "dark" ? "white" : "#0A6EFF"}
        maxRadius={0.1}
        maxSpeed={0.8}
        minSpeed={0.1}
      />
      <div className="min-h-[400px] flex flex-col items-start justify-center space-y-4 relative">
        <div className="flex flex-col items-center lg:items-start justify-center space-y-4 z-10 ">
          <h1 className="text-5xl lg:text-6xl font-bold" id="head-title">
            Create{" "}
            <TextEffect
              words={["Intractive", "Awesome", "Better"]}
              duration={3000}
              effect="blur"
              className="-mb-[15px] -ml-5 text-[#0A6EFF] font-bold"
            />
            <br />
            Websites With <br />
            <span className="text-[#0A6EFF] font-bold">Devsloka UI</span>
          </h1>
          <p className="text-lg text-zinc-400" id="description">
            Empower your React, Next.js or Remix apps with 20+ plug-and-play
            components, stunning backgrounds, custom hooks, and templates—build
            unique, high-performance interfaces in seconds.
          </p>
          <Link href={"/components"}>
            <Button
              className="rounded-full bg-[#0A6EFF] hover:bg-[#0459d4] text-white cursor-pointer"
              id="explore-button"
            >
              Explore Components
            </Button>
          </Link>
        </div>
      </div>
      <div
        className="hidden lg:flex flex-col items-center justify-center space-y-2 relative"
        id="components-showcase"
      >
        <div className="flex items-center justify-center w-full space-x-1">
          <div className="flex items-center justify-center space-x-4  border border-dashed rounded-lg w-full h-full p-1">
            <Button onClick={() => setIsTourOpen(true)}>Start Tour</Button>
          </div>
          <div className="relative w-full h-20 bg-black rounded-lg overflow-hidden border border-dashed p-1 flex items-center justify-center">
            <p className="text-white">Floating Dots</p>
            <FloatingDots className="w-full" maxRadius={0.5} />
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center border border-dashed rounded-lg p-1">
          <MorphingNavDemo />
        </div>
        <div className="w-full flex items-center justify-center rounded-lg p-1 space-x-1">
          <RangeSliderWithHistogram />
          <div className="w-full h-full">
            <SuccessResult />
          </div>
        </div>
      </div>

      <Tour
        steps={steps}
        open={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onFinish={() => setIsTourOpen(false)}
      />
    </motion.div>
  );
};

export default HeroSection;
