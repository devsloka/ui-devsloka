"use client";

import { useState } from "react";
import { AnimationEffect, TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";

export const TextEffectDemo = () => {
  const [currentEffect, setCurrentEffect] = useState<AnimationEffect>("flip");

  const words = ["Innovative", "Creative", "Dynamic", "Powerful", "Elegant"];

  const effects = [
    { name: "Flip", value: "flip" },
    { name: "Fade", value: "fade" },
    { name: "Slide", value: "slide" },
    { name: "Scale", value: "scale" },
    { name: "Rotate", value: "rotate" },
    { name: "Bounce", value: "bounce" },
    { name: "morph", value: "morph" },
    { name: "blur", value: "blur" },
  ] as const;

  return (
    <div className="min-h-[400px] w-full bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl mb-4 font-bold">We create</p>
        <div className="flex flex-col lg:flex-row items-center justify-center text-4xl font-bold">
          <TextEffect
            words={words}
            className="rounded-lg "
            textClassName="font-bold"
            effect={currentEffect}
            duration={3000}
          />
          <span className="">Websites</span>
        </div>
        <p className=" mt-8 max-w-md mx-auto">
          Experience the smooth text effects that adds a dynamic and engaging
          element to your web applications.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-8">
          {effects.map((effect) => (
            <Button
              key={effect.value}
              onClick={() => setCurrentEffect(effect.value)}
              className={`cursor-pointer
                  ${
                    currentEffect === effect.value
                      ? "bg-foreground text-primary-foreground"
                      : "bg-foreground/35 hover:bg-foreground/40 text-white"
                  }`}
            >
              {effect.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
