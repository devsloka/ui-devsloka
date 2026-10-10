"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export type RangeSliderWithHistogramProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** Bar heights, spread evenly from `min` to `max`. */
  data: number[];
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  /** Called once when the user releases a thumb. */
  onValueCommit?: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  disabled?: boolean;
};

// An explicit locale keeps server and client output identical.
const defaultFormat = (value: number) => value.toLocaleString("en-US");

export function RangeSliderWithHistogram({
  data,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  formatValue = defaultFormat,
  disabled,
  className,
  ...props
}: RangeSliderWithHistogramProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<[number, number]>(
    defaultValue ?? [min, max]
  );
  const [low, high] = value ?? uncontrolledValue;
  const peak = Math.max(...data, 1);
  const barSpan = (max - min) / Math.max(data.length, 1);

  const handleChange = (next: number[]) => {
    const range: [number, number] = [next[0], next[1]];
    if (value === undefined) setUncontrolledValue(range);
    onValueChange?.(range);
  };

  return (
    <div data-slot="range-slider-with-histogram" className={cn("w-full", className)} {...props}>
      <div className="flex justify-between text-sm font-medium tabular-nums">
        <output aria-live="polite">{formatValue(low)}</output>
        <output aria-live="polite">{formatValue(high)}</output>
      </div>

      <div aria-hidden className="mt-3 flex h-24 items-end gap-px">
        {data.map((count, i) => {
          const center = min + barSpan * (i + 0.5);
          const inRange = center >= low && center <= high;
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t-[2px] transition-colors duration-200",
                inRange ? "bg-primary" : "bg-muted"
              )}
              style={{ height: `${Math.max((count / peak) * 100, 2)}%` }}
            />
          );
        })}
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={[low, high]}
        onValueChange={handleChange}
        onValueCommit={(next) => onValueCommit?.([next[0], next[1]])}
        minStepsBetweenThumbs={1}
        disabled={disabled}
        className="-mt-px"
      />
    </div>
  );
}
