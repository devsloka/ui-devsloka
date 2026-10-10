"use client";

import { useState } from "react";
import {
  TEXT_EFFECTS,
  TextEffect,
  type TextEffectName,
} from "@/registry/ui/text-effect";
import { cn } from "@/lib/utils";

const WORDS = ["Innovative", "Creative", "Dynamic", "Powerful", "Elegant"];

export const TextEffectDemo = () => {
  const [effect, setEffect] = useState<TextEffectName>("flip");

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <p className="text-4xl font-semibold tracking-tight">
        We create{" "}
        <TextEffect words={WORDS} effect={effect} className="text-primary" />
        <br />
        websites
      </p>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Effect">
        {TEXT_EFFECTS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setEffect(name)}
            aria-pressed={effect === name}
            className={cn(
              "cursor-pointer rounded-md border px-3 py-1.5 text-sm capitalize transition-colors",
              effect === name
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
