"use client";

import { useState } from "react";
import {
  FuzzyMascot,
  MASCOT_GLASSES,
  MASCOT_HATS,
  MASCOT_SHADINGS,
  MASCOT_SHAPES,
  MASCOT_STATES,
  type MascotGlasses,
  type MascotHat,
  type MascotShading,
  type MascotState,
} from "@/registry/ui/fuzzy-mascot";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.625rem] font-medium tracking-wider text-white/40 uppercase">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={option === value}
            onClick={() => onChange(option)}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-1 text-xs capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0A6EFF]",
              option === value ? "bg-white text-neutral-900" : "bg-white/5 text-white/70 hover:bg-white/10"
            )}
          >
            {option === "crepe" ? "crêpe" : option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FuzzyMascotDemo() {
  const [state, setState] = useState<MascotState>("idle");
  const [shading, setShading] = useState<MascotShading>("fabric");
  const [hat, setHat] = useState<MascotHat>("none");
  const [glasses, setGlasses] = useState<MascotGlasses>("none");
  const [furLength, setFurLength] = useState(5);

  return (
    <div className="w-full max-w-5xl rounded-2xl bg-[#161616] p-6 text-white sm:p-8">
      <div className="grid grid-cols-1 gap-5 border-b border-white/10 pb-6 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto_1fr]">
        <Segmented label="State" options={MASCOT_STATES} value={state} onChange={setState} />
        <Segmented label="Shading" options={MASCOT_SHADINGS} value={shading} onChange={setShading} />
        <Segmented label="Hat" options={MASCOT_HATS} value={hat} onChange={setHat} />
        <Segmented label="Glasses" options={MASCOT_GLASSES} value={glasses} onChange={setGlasses} />
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.625rem] font-medium tracking-wider text-white/40 uppercase">
            Fur length · {furLength}
          </span>
          <input
            type="range"
            min={0}
            max={10}
            value={furLength}
            disabled={shading !== "fabric"}
            onChange={(event) => setFurLength(Number(event.target.value))}
            className="mt-1.5 accent-[#0A6EFF] disabled:opacity-40"
          />
        </label>
      </div>

      <p className="mt-6 text-xs text-white/40">Move your cursor around, then click any mascot.</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {MASCOT_SHAPES.map((shape) => (
          <li key={shape} className="flex flex-col items-center gap-3">
            <FuzzyMascot
              shape={shape}
              state={state}
              shading={shading}
              hat={hat}
              glasses={glasses}
              furLength={furLength}
              size={128}
            />
            <span className="text-sm text-white/50 capitalize">{shape}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
