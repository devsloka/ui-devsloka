"use client";

import { useState } from "react";
import { Blocks, Box, LayoutGrid, Tag } from "lucide-react";
import { MorphingNav } from "@/components/ui/morphing-nav";
import RangeSliderWithHistogram from "@/components/ui/range-slider-with-histogram";

// Client wrappers for specimens whose props include functions or components,
// which a Server Component cannot pass across the boundary.

const NAV_ITEMS = [
  { id: "components", label: "Components", icon: Box, href: "#" },
  { id: "blocks", label: "Blocks", icon: Blocks, href: "#" },
  { id: "templates", label: "Templates", icon: LayoutGrid, href: "#" },
  { id: "pro", label: "Pro", icon: Tag, href: "#" },
];

export function MorphingNavSpecimen() {
  const [active, setActive] = useState(NAV_ITEMS[0].id);

  return (
    // MorphingNav renders links; cancel navigation so the specimen stays a demo.
    <div
      className="max-w-full min-w-0"
      onClickCapture={(event) => event.preventDefault()}
    >
      <MorphingNav
        items={NAV_ITEMS}
        value={active}
        onValueChange={setActive}
        className="rounded-none border-border shadow-none"
        activeClass="bg-foreground"
      />
    </div>
  );
}

// Deterministic bell curve, so server and client render the same bars.
const HISTOGRAM = Array.from({ length: 40 }, (_, i) => {
  const distance = Math.abs(i - 19.5) / 19.5;
  const wobble = ((i * 37) % 11) / 11;
  return Math.round(600 + 5000 * (1 - distance ** 2) * (0.75 + wobble * 0.25));
});

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

export function BudgetSliderSpecimen() {
  return (
    <RangeSliderWithHistogram
      min={0}
      max={4000}
      step={100}
      defaultValue={[800, 3000]}
      histogramData={HISTOGRAM}
      title="Price range"
      formatValue={formatPrice}
      inRangeClass="bg-[#0A6EFF]"
      outOfRangeClass="bg-foreground/15"
      className="w-full rounded-none border-0 bg-transparent p-0 shadow-none"
    />
  );
}
