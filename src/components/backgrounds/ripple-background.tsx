"use client";

import { useEffect, useRef } from "react";

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let ripples: Ripple[] = [];
    let particles: Particle[] = [];
    let lastMouseMove = 0;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Modern color palette
    const colors = [
      { hue: 200, saturation: 80 }, // Blues
      { hue: 260, saturation: 80 }, // Purples
      { hue: 220, saturation: 80 }, // Cyans
    ];

    // Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;

      constructor(x: number, y: number, hue: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 1.5;
        this.color = `hsla(${hue}, 80%, 70%, ${Math.random() * 0.5})`;
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        };
        this.alpha = 1;
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
        return this.alpha > 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    // Ripple class
    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      color: string;
      lineWidth: number;
      speed: number;
      alpha: number;
      hue: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 150 + Math.random() * 200;
        const colorConfig = colors[Math.floor(Math.random() * colors.length)];
        this.hue = colorConfig.hue + Math.random() * 20;
        this.color = `hsla(${this.hue}, ${colorConfig.saturation}%, 70%, 0.3)`;
        this.lineWidth = 2 + Math.random() * 3;
        this.speed = 1.5 + Math.random() * 2;
        this.alpha = 0.5;
      }

      update() {
        this.radius += this.speed;
        this.lineWidth *= 0.97;
        this.alpha = Math.max(0, this.alpha - 0.005);

        // Add particles
        if (Math.random() < 0.3) {
          particles.push(
            new Particle(
              this.x + Math.cos(Math.random() * Math.PI * 2) * this.radius,
              this.y + Math.sin(Math.random() * Math.PI * 2) * this.radius,
              this.hue
            )
          );
        }

        return this.radius > this.maxRadius;
      }

      draw() {
        if (!ctx) return;

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.alpha * 0.2})`;
        ctx.fill();

        // Main circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.globalAlpha = this.alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Create ripple at mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMove > 50) {
        ripples.push(new Ripple(e.clientX, e.clientY));
        lastMouseMove = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw modern gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#0F172A"); // Deep navy
      gradient.addColorStop(1, "#1E293B"); // Dark slate
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create random ripples
      if (Math.random() < 0.02) {
        ripples.push(
          new Ripple(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      // Update and draw ripples
      ripples = ripples.filter((ripple) => {
        const shouldRemove = ripple.update();
        ripple.draw();
        return !shouldRemove;
      });

      // Update and draw particles
      particles = particles.filter((particle) => {
        const shouldRemove = !particle.update();
        particle.draw();
        return !shouldRemove;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
  );
}
