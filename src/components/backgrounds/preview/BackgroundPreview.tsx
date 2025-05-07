"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";

interface BackgroundPreviewProps {
  backgroundComponent: ReactNode;
  title: string;
  description: string;
}

const BackgroundPreview: React.FC<BackgroundPreviewProps> = ({
  backgroundComponent,
  title,
  description,
}) => {
  const { theme } = useTheme();
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {backgroundComponent}

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-3xl px-4">
          <h1
            className={cn(
              "text-4xl md:text-6xl font-bold drop-shadow-md mb-4",
              title === "gradient bg" && theme === "light"
                ? "text-black"
                : "text-white"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-xl text-white/90 drop-shadow-md",
              title === "gradient bg" && theme === "light"
                ? "text-black"
                : "text-white"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundPreview;
