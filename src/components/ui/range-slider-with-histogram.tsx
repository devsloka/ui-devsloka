"use client";
import React, { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Card } from "./card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface RangeSliderWithHistogramProps {
  min?: number;
  max?: number;
  step?: number;
  histogramData?: number[];
  onValueChange?: (values: [number, number]) => void;
  title?: string;
  formatValue?: (value: number) => string;
  minLabel?: string;
  maxLabel?: string;
  bufferPercentage?: number;
  inRangeClass?: string;
  outOfRangeClass?: string;
  className?: string;
  defaultValue?: [number, number];
  renderTooltip?: (count: number, value: number) => React.ReactNode;
}

const RangeSliderWithHistogram: React.FC<RangeSliderWithHistogramProps> = ({
  min = 50000,
  max = 5000000,
  step = 100000,
  histogramData,
  onValueChange,
  title = "Budget",
  formatValue = (value) => `₹${value.toLocaleString("en-IN")}`,
  minLabel = "Minimum",
  maxLabel = "Maximum",
  bufferPercentage = 0,
  inRangeClass = "bg-[#0A6EFF]",
  outOfRangeClass = "bg-gray-300",
  className,
  defaultValue = [min, max],
  renderTooltip,
}) => {
  const [minValue, setMinValue] = useState(defaultValue[0]);
  const [maxValue, setMaxValue] = useState(defaultValue[1]);

  const numBars = Math.ceil((max - min) / step);
  const defaultHistogramData = useMemo(
    () =>
      Array.from({ length: numBars }, () => Math.floor(Math.random() * 6000)),
    [numBars]
  );
  const histogramDataToUse = histogramData ?? defaultHistogramData;

  const maxCount = useMemo(() => {
    const maxVal = Math.max(...histogramDataToUse);
    return maxVal === 0 ? 1 : maxVal;
  }, [histogramDataToUse]);

  const bufferRange = (maxValue - minValue) * bufferPercentage;
  const viewMin = Math.max(min, minValue - bufferRange);
  const viewMax = Math.min(max, maxValue + bufferRange);

  return (
    <Card className={`p-8 rounded-lg shadow-lg w-full max-w-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex justify-between mb-2">
        <span className="text-primary text-xl">{formatValue(minValue)}</span>
        <span className="text-primary text-xl">{formatValue(maxValue)}</span>
      </div>

      <div className="relative h-32 overflow-hidden">
        <div className="flex items-end h-full">
          {histogramDataToUse.map((count, index) => {
            const currentValue = min + index * step;
            const isInRange =
              currentValue >= minValue && currentValue <= maxValue;
            const isInView = currentValue >= viewMin && currentValue <= viewMax;
            const barColor =
              isInRange || isInView ? inRangeClass : outOfRangeClass;

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`flex-1 mx-[1px] rounded-sm ${barColor}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(count / maxCount) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {renderTooltip ? (
                      renderTooltip(count, currentValue)
                    ) : (
                      <p>
                        Count: {count} <br />
                        {formatValue(currentValue)}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      <div className="relative -mt-5">
        <Slider
          defaultValue={[minValue, maxValue]}
          min={min}
          max={max}
          step={step}
          onValueChange={(values) => {
            const [newMin, newMax] = values;
            setMinValue(newMin);
            setMaxValue(newMax);
            onValueChange?.([newMin, newMax]);
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-gray-400">{minLabel}</span>
          <span className="text-gray-400">{maxLabel}</span>
        </div>
      </div>
    </Card>
  );
};

export default RangeSliderWithHistogram;
