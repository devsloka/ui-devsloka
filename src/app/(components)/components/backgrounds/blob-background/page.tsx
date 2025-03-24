"use client";

import React from "react";

import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import HeroSection from "@/components/home/HeroSection";

const BlobBackgroundPage = () => {
  return (
    <div>
      <AdvancedCodeBlock
        code={`"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <motion.div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 relative">
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
          animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center space-y-4 z-10 h-[400px]"
        >
          <h1 className="text-4xl font-bold text-center">
            Create Eye-Catching Experiences <br /> With{" "}
            <span className="text-[#0A6EFF] font-bold">Devsloka UI</span>
          </h1>
          <p className="text-lg text-center text-zinc-400">
            Learn to build unique, stunning interfaces that set you apart from
            the
            <span className="text-[#0A6EFF] font-bold">
              {" "}
              copy-paste
            </span> <br /> crowd. you &apos;ll master the art of crafting user
            experiences that attract more users and <br /> leave a lasting
            impression.
          </p>
          <Button className="rounded-full bg-[#0A6EFF] hover:bg-[#0459d4]">
            Explore Components
          </Button>
        </motion.div>
      </motion.div>
      <div className="flex flex-col items-center justify-center">
        Components
      </div>
    </div>
  );
};

export default HeroSection;
`}
        preview={<HeroSection />}
      />
    </div>
  );
};

export default BlobBackgroundPage;
