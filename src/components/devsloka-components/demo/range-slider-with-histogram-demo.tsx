"use client";

import { useState } from "react";
import { RangeSliderWithHistogram } from "@/registry/ui/range-slider-with-histogram";

// A fixed bell-shaped distribution; random data would differ between server and client.
const PRICES = Array.from({ length: 50 }, (_, i) => {
  const distance = Math.abs(i - 24.5) / 24.5;
  return Math.round(800 + 6000 * (1 - distance ** 2) * (0.7 + ((i * 37) % 11) / 33));
});

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

export default function RangeSliderWithHistogramDemo() {
  const [range, setRange] = useState<[number, number]>([2000, 7500]);

  return (
    <div className="w-full max-w-md">
      <p className="mb-4 text-sm font-medium">Price range</p>
      <RangeSliderWithHistogram
        data={PRICES}
        min={0}
        max={10000}
        step={100}
        value={range}
        onValueChange={setRange}
        formatValue={formatPrice}
      />
    </div>
  );
}
