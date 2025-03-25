"use client";

import { useEffect, useRef } from "react";

export default function BubblesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];

    // Class declaration moved to top
    class Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      color: string;
      wobble: number;
      wobbleSpeed: number;

      constructor() {
        this.radius = 5 + Math.random() * 30;
        this.x =
          Math.random() * (canvas!.width - this.radius * 2) + this.radius;
        this.y = canvas!.height + this.radius;
        this.speed = 0.5 + Math.random() * 2;
        const hue = 180 + Math.random() * 40;
        this.color = `hsla(${hue}, 80%, 70%, ${0.2 + Math.random() * 0.3})`;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.03 + Math.random() * 0.03;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.wobble) * 0.5;
        this.wobble += this.wobbleSpeed;

        if (this.y < -this.radius * 2) {
          this.y = canvas!.height + this.radius;
          this.x =
            Math.random() * (canvas!.width - this.radius * 2) + this.radius;
        }
      }

      draw() {
        // Bubble gradient
        const gradient = ctx!.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.2, this.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");

        // Draw bubble
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Draw highlight
        ctx!.beginPath();
        ctx!.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx!.fill();
      }
    }

    // Initialization function moved before resizeCanvas
    const initBubbles = () => {
      bubbles = [];
      const bubbleCount = Math.floor((canvas!.width * canvas!.height) / 10000);
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
      }
    };

    // Canvas setup
    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      initBubbles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Animation loop
    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Background gradient
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas!.height);
      gradient.addColorStop(0, "#0c4a6e");
      gradient.addColorStop(1, "#082f49");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
