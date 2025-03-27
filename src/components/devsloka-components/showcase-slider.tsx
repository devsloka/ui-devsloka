"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const backgrounds = [
  {
    name: "Aurora",
    component: "AuroraBackground",
    description: "Smooth, flowing aurora-like effects",
  },
  {
    name: "Beam",
    component: "BeamBackground",
    description: "Light beams scanning across the screen",
  },
  {
    name: "Stars",
    component: "StarsBackground",
    description: "Twinkling stars in a night sky",
  },
];

export default function ShowcaseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const CurrentBackground = backgrounds[currentIndex].component;

  const nextBackground = () => {
    setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const prevBackground = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + backgrounds.length) % backgrounds.length
    );
  };

  const handleSelectChange = (value: string) => {
    const index = backgrounds.findIndex((bg) => bg.name === value);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-bold text-primary drop-shadow-md sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {backgrounds[currentIndex].name}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-muted-foreground sm:text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {backgrounds[currentIndex].description}
          </motion.p>
        </div>

        {/* Controls */}
        <div className="bg-background/80 backdrop-blur-md rounded-full p-2 border border-primary/10 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevBackground}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Select
              value={backgrounds[currentIndex].name}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {backgrounds.map((bg) => (
                  <SelectItem key={bg.name} value={bg.name}>
                    {bg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{backgrounds[currentIndex].description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="outline"
              size="icon"
              onClick={nextBackground}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
