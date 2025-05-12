"use client";

import { useState } from "react";
import {
  AnimatedMultiSelect,
  type Option,
} from "@/components/ui/animated-multi-select";

const sampleOptions: Option[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
];

export default function AnimatedMultiSelectDemo() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Animated Multi-Select Demo</h1>
          <p className="text-muted-foreground">
            Search and select multiple options with animations
          </p>
        </div>

        <AnimatedMultiSelect
          options={sampleOptions}
          placeholder="Search frameworks..."
          onChange={setSelectedOptions}
        />

        <div className="p-4 mt-8 border rounded-lg bg-muted/30">
          <h2 className="mb-2 font-medium">Selected options:</h2>
          {selectedOptions.length > 0 ? (
            <pre className="p-2 overflow-auto text-sm bg-muted rounded-md">
              {JSON.stringify(selectedOptions, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">No options selected</p>
          )}
        </div>
      </div>
    </main>
  );
}
