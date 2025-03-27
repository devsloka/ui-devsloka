"use client";
import { useState, useEffect } from "react";

export const useAnimation = (
  duration: number = 300
): [boolean, (isAnimating: boolean) => void] => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration]);

  return [isAnimating, setIsAnimating];
};
