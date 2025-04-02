"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

export interface FloatingDotsProps {
  /**
   * Number of dots to render
   * @default 50
   */
  count?: number;
  /**
   * Color of the dots
   * @default "white"
   */
  color?: string;
  /**
   * Minimum radius of dots in pixels
   * @default 1
   */
  minRadius?: number;
  /**
   * Maximum radius of dots in pixels
   * @default 3
   */
  maxRadius?: number;
  /**
   * Minimum speed of dots
   * @default 0.5
   */
  minSpeed?: number;
  /**
   * Maximum speed of dots
   * @default 2
   */
  maxSpeed?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function FloatingDots({
  count = 50,
  color = "white",
  minRadius = 1,
  maxRadius = 3,
  minSpeed = 0.5,
  maxSpeed = 2,
  className = "",
}: FloatingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number | null>(null);

  // Initialize dots
  const initDots = (width: number, height: number) => {
    const dots: Dot[] = [];
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      });
    }
    return dots;
  };

  // Draw dots on canvas
  const drawDots = (
    ctx: CanvasRenderingContext2D,
    dots: Dot[],
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;

    dots.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Update dots position
  const updateDots = (dots: Dot[], width: number, height: number) => {
    return dots.map((dot) => {
      const y = dot.y - dot.speed;

      // Reset position when dot goes off the top
      if (y < -dot.radius * 2) {
        return {
          ...dot,
          x: Math.random() * width,
          y: height + dot.radius,
        };
      }

      return {
        ...dot,
        y,
      };
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    dotsRef.current = updateDots(dotsRef.current, width, height);
    drawDots(ctx, dotsRef.current, width, height);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    // Reinitialize dots with new dimensions
    dotsRef.current = initDots(width, height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    handleResize();

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [count, color, minRadius, maxRadius, minSpeed, maxSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
