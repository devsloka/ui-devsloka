"use client";

import RangeSliderWithHistogram from "@/components/ui/range-slider-with-histogram";

const generateHistogramData = () => {
  const min = 0;
  const max = 10000;
  const step = 100;
  const numBars = (max - min) / step;
  const midPoint = (max - min) / 2;
  const maxHeight = 6000;

  return Array.from({ length: numBars }, (_, i) => {
    const currentValue = min + i * step;
    // Create a bell curve distribution with some randomness
    const distanceFromMid = Math.abs(currentValue - midPoint);
    const baseHeight = Math.max(
      maxHeight * (1 - Math.pow(distanceFromMid / midPoint, 2)),
      maxHeight * 0.2
    );

    // Add some random variation
    return Math.floor(baseHeight * (0.8 + Math.random() * 0.4));
  });
};

const RangeSliderWithHistogramDemo = () => {
  const histogramData = generateHistogramData();

  return (
    <div className="p-8 w-full max-w-2xl mx-auto">
      <RangeSliderWithHistogram
        min={0}
        max={10000}
        step={100}
        histogramData={histogramData}
        title="Property Price Range"
        formatValue={(value) => `$${value.toLocaleString()}`}
        minLabel="Min price"
        maxLabel="Max price"
        inRangeClass="bg-blue-500"
        outOfRangeClass="bg-gray-200"
        bufferPercentage={0}
        renderTooltip={(count, value) => (
          <div className="text-center p-2">
            <div className="font-bold">${value.toLocaleString()}</div>
            <div className="text-sm text-gray-600">{count} properties</div>
          </div>
        )}
        className="shadow-xl rounded-xl"
      />
    </div>
  );
};

export default RangeSliderWithHistogramDemo;
