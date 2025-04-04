"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Tour } from "../tour";

const TourDemo: React.FC = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const steps = [
    {
      target: "#welcome-message",
      title: "Welcome Message",
      description: "This is the main welcome message of our application.",
      placement: "top" as const,
      offset: { y: 10 }, // Add some extra space below the title
    },
    {
      target: "#start-button",
      title: "Get Started",
      description: "Click this button to begin your journey.",
      placement: "bottom" as const,
      offset: { x: 5 }, // Slight offset from the button
    },
    {
      target: "#feature-section",
      title: "Features",
      description: "Explore all the amazing features we offer.",
      placement: "bottom" as const,
      offset: { y: -10 }, // Move slightly closer to the features
    },
  ];
  return (
    <div className="min-h- bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 id="welcome-message" className="text-4xl font-bold text-center">
          Welcome to Devsloka Ui
        </h1>

        <div className="text-center">
          <Button
            id="start-button"
            variant="default"
            onClick={() => setIsTourOpen(true)}
          >
            Start Tour
          </Button>
        </div>

        <div
          id="feature-section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <h3 className="font-semibold">Feature {i}</h3>
              <p className="text-sm text-muted-foreground">
                This is an amazing feature that you&apos;ll love.
              </p>
            </div>
          ))}
        </div>

        <Tour
          steps={steps}
          open={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onFinish={() => setIsTourOpen(false)}
        />
      </div>
    </div>
  );
};

export default TourDemo;
