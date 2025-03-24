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

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

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
              currentPrice >= minValue && currentPrice <= maxValue;
            const isInView = currentPrice >= viewMin && currentPrice <= viewMax;
            const barColor =
              isInRange || isInView ? "bg-orange-500" : "bg-gray-300";

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      key={index + 1}
                      className={`flex-1 mx-[1px] rounded-sm ${barColor}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 6000) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {" "}
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

export default BudgetSlider;
