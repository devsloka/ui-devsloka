"use client";

import { useId, useState } from "react";
import {
  TEXT_EFFECTS,
  TextEffect,
  type TextEffectName,
} from "@/registry/ui/text-effect";
import { cn } from "@/lib/utils";

const WORDS = ["calm", "precise", "alive", "yours"];

export function TextEffectPlayground() {
  const [effect, setEffect] = useState<TextEffectName>("flip");
  const [duration, setDuration] = useState(2500);
  const durationId = useId();

  const code = `<TextEffect
  words={${JSON.stringify(WORDS)}}
  effect="${effect}"
  interval={${duration}}
/>`;

  return (
    <div className="grid grid-cols-1 border border-border lg:grid-cols-12">
      <div className="flex min-h-80 items-center justify-center border-b border-border px-6 py-16 lg:col-span-8 lg:border-r lg:border-b-0">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
          <span>Interfaces that feel</span>
          <TextEffect
            words={WORDS}
            effect={effect}
            interval={duration}
            className="text-[#0A6EFF]"
          />
        </div>
      </div>

      <div className="flex flex-col font-mono text-xs lg:col-span-4">
        <fieldset className="border-b border-border p-5">
          <legend className="sr-only">Effect</legend>
          <p className="mb-3 uppercase tracking-wider text-muted-foreground">
            effect
          </p>
          <div className="grid grid-cols-4 gap-px bg-border">
            {TEXT_EFFECTS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setEffect(name)}
                aria-pressed={effect === name}
                className={cn(
                  "cursor-pointer bg-background px-2 py-2.5 transition-colors",
                  effect === name
                    ? "bg-foreground text-background"
                    : "hover:bg-muted"
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="border-b border-border p-5">
          <label
            htmlFor={durationId}
            className="mb-3 flex justify-between uppercase tracking-wider text-muted-foreground"
          >
            <span>interval</span>
            <span className="text-foreground">{duration}ms</span>
          </label>
          <input
            id={durationId}
            type="range"
            min={1500}
            max={5000}
            step={250}
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
            className="w-full cursor-pointer accent-[#0A6EFF]"
          />
        </div>

        <pre className="flex-1 overflow-x-auto p-5 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
