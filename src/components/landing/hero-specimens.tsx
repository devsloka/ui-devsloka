"use client";

import { Blocks, Box, Heart, LayoutGrid, Shield, Star, Tag, Zap } from "lucide-react";
import { IconRadioGroup, IconRadioItem } from "@/registry/ui/icon-radio";
import { MorphingNav, type MorphingNavItem } from "@/registry/ui/morphing-nav";
import { RangeSliderWithHistogram } from "@/registry/ui/range-slider-with-histogram";

// Client wrappers for specimens whose props include functions or components,
// which a Server Component cannot pass across the boundary.

const NAV_ITEMS: MorphingNavItem[] = [
  { value: "components", label: "Components", icon: Box },
  { value: "blocks", label: "Blocks", icon: Blocks },
  { value: "templates", label: "Templates", icon: LayoutGrid },
  { value: "pro", label: "Pro", icon: Tag },
];

export function MorphingNavSpecimen() {
  return (
    <MorphingNav
      items={NAV_ITEMS}
      aria-label="Library sections"
      className="max-w-full min-w-0"
    />
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
      data={HISTOGRAM}
      min={0}
      max={4000}
      step={100}
      defaultValue={[800, 3000]}
      formatValue={formatPrice}
      className="max-w-md"
    />
  );
}

export function IconRadioSpecimen() {
  return (
    <IconRadioGroup defaultValue="favorite" aria-label="Collection">
      <IconRadioItem value="favorite" icon={Heart} label="Favorite" />
      <IconRadioItem value="popular" icon={Star} label="Popular" />
      <IconRadioItem value="trending" icon={Zap} label="Trending" />
      <IconRadioItem value="secure" icon={Shield} label="Secure" />
    </IconRadioGroup>
  );
}
