"use client";
import { useEffect, useRef } from "react";

export default function CirclesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const circles: Circle[] = [];
    let mousePos = { x: -100, y: -100 };

    class Circle {
      x: number;
      y: number;
      baseSize: number;
      size: number;
      speed: number;
      angle: number;
      targetSize: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = 3 + Math.random() * 7;
        this.size = this.baseSize;
        this.speed = 0.1 + Math.random() * 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.targetSize = this.baseSize;
        this.color = `hsla(${200 + Math.random() * 40}, 70%, 70%, 0.1)`; // Soft blue hues
      }

      update() {
        // Gentle floating movement
        this.angle += this.speed * 0.1;
        this.x += Math.cos(this.angle) * 0.5;
        this.y += Math.sin(this.angle) * 0.5;

        // Mouse interaction
        const dx = mousePos.x - this.x;
        const dy = mousePos.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.targetSize = this.baseSize * 3;
        } else {
          this.targetSize = this.baseSize;
        }

        this.size += (this.targetSize - this.size) * 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circles.length = 0;

      // Fewer circles for minimal look
      const circleCount = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < circleCount; i++) {
        circles.push(new Circle());
      }
    };

    const animate = () => {
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#300030");
      gradient.addColorStop(1, "#100020");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        circle.update();
        circle.draw();

        // Keep circles within bounds
        if (circle.x > canvas.width + circle.size) circle.x = -circle.size;
        if (circle.x < -circle.size) circle.x = canvas.width + circle.size;
        if (circle.y > canvas.height + circle.size) circle.y = -circle.size;
        if (circle.y < -circle.size) circle.y = canvas.height + circle.size;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    // Setup
    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
}
