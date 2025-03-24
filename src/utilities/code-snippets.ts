export interface CodeSnippet {
  title: string;
  code: string;
  preview?: React.ReactNode;
}

export const componentsData: CodeSnippet[] = [
  {
    title: "BudgetSlider",
    code: `
    "use client";
import React, { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const generateHistogramData = (numBars: number) =>
  Array.from({ length: numBars }, () => Math.floor(Math.random() * 6000));

const BudgetSlider: React.FC = () => {
  const [minValue, setMinValue] = useState(50000);
  const [maxValue, setMaxValue] = useState(3000000);

  // Constants
  const stepValue = 100000;
  const maxPrice = 5000000;
  const minPrice = 50000;
  const numBars = Math.ceil((maxPrice - minPrice) / stepValue);

  const histogramData = useMemo(
    () => generateHistogramData(numBars),
    [numBars]
  );

  // Buffer for visual range (10%)
  const bufferPercentage = 0;
  const bufferRange = (maxValue - minValue) * bufferPercentage;
  const viewMin = Math.max(0, minValue - bufferRange);
  const viewMax = Math.min(maxPrice, maxValue + bufferRange);

  const formatCurrency = (value: number) => \`₹\${value.toLocaleString("en-IN")}\`;

  return (
    <Card
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      id="feature-section"
    >
      <h2 className="text-2xl font-bold mb-4">Budget</h2>

      <div className="flex justify-between mb-2">
        <span className="text-blue-600 text-xl">
          {formatCurrency(minValue)}
        </span>
        <span className="text-blue-600 text-xl">
          {formatCurrency(maxValue)}
        </span>
      </div>

      {/* Histogram */}
      <div className="relative h-32 overflow-hidden">
        <div className="flex items-end h-full">
          {histogramData.map((value, index) => {
            const currentPrice = minPrice + index * stepValue;
            const isInRange =
              currentPrice >= minValue && currentValue <= maxValue;
            const isInView = currentPrice >= viewMin && currentPrice <= viewMax;
            const barColor =
              isInRange || isInView ? "bg-orange-500" : "bg-gray-300";

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      key={index + 1}
                      className={\`flex-1 mx-[1px] rounded-sm \${barColor}\`}
                      initial={{ height: 0 }}
                      animate={{ height: \`\${(value / 6000) * 100}%\` }}
                      transition={{ duration: 0.3 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      cars : {value} <br /> {formatCurrency(currentPrice)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      {/* Slider */}
      <div className="relative -mt-5">
        <Slider
          defaultValue={[minValue, maxValue]}
          min={minPrice}
          max={maxPrice}
          step={stepValue}
          onValueChange={(values) => {
            setMinValue(values[0]);
            setMaxValue(values[1]);
          }}
          className="bg-blue-500 text-white"
        />
        <div className="flex justify-between mt-2">
          <span className="text-gray-400">Minimum</span>
          <span className="text-gray-400">Maximum</span>
        </div>
      </div>
    </Card>
  );
};

export default BudgetSlider;`,
  },
  {
    title: "ShowcaseSlider",
    code: `"use client";

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

export default function BackgroundShowcase() {
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
      {/* Background Animation */}
      {/* <div className="absolute inset-0 z-0">
        <CurrentBackground />
      </div> */}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-bold text-black drop-shadow-md sm:text-5xl md:text-6xl"
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
        <div className="bg-background/80 backdrop-blur-md fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2" id="showcase">
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
              <SelectContent className="h-64">
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
}`,
  },
];

export const backgroundsData: CodeSnippet[] = [
  {
    title: "Animated Gradient Background",
    code: `import { motion } from "framer-motion";

export const AnimatedBackground = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
    animate={{
      background: [
        "linear-gradient(to right, #3b82f6, #8b5cf6)",
        "linear-gradient(to right, #8b5cf6, #ec4899)",
        "linear-gradient(to right, #ec4899, #3b82f6)",
      ],
    }}
    transition={{ duration: 8, repeat: Infinity }}
  />
);`,
    preview: "Animated gradient background",
  },
  // Add more background entries here
];
