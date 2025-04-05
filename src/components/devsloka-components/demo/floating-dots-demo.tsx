import React from "react";
import { FloatingDots } from "../floating-dots";

const FloatingDotsDemo = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden">
        <FloatingDots className="w-full" maxRadius={0.5} />
      </div>

      {/* Example with custom props */}
      <div className="relative w-full h-80 bg-blue-950 rounded-lg overflow-hidden mt-8">
        <FloatingDots
          count={100}
          color="rgba(255, 255, 255, 0.7)"
          minRadius={1}
          maxRadius={4}
          minSpeed={0.3}
          maxSpeed={1.5}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white">Customized Dots</h1>
        </div>
      </div>
    </main>
  );
};

export default FloatingDotsDemo;
