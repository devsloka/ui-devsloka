"use client";

import { useState } from "react";
import {
  AnimatedMultiSelect,
  type Option,
} from "@/registry/ui/animated-multi-select";

const frameworks: Option[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik", disabled: true },
];

export default function AnimatedMultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>(["react", "nextjs"]);

  return (
    <div className="mx-auto w-full max-w-md space-y-3 p-6">
      <AnimatedMultiSelect
        options={frameworks}
        value={selected}
        onValueChange={setSelected}
        placeholder="Search frameworks..."
        emptyText="No frameworks found."
        maxCount={4}
      />
      <p className="text-sm text-muted-foreground">
        {selected.length > 0
          ? `Selected: ${selected.join(", ")}`
          : "Nothing selected"}
      </p>
    </div>
  );
}
