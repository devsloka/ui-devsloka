"use client"

import { useEffect, useRef } from "react"

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let ripples: Ripple[] = []
    let lastRippleTime = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Ripple class
    class Ripple {
      x: number
      y: number
      radius: number
      maxRadius: number
      color: string
      lineWidth: number
      speed: number

      constructor(x: number, y: number) {
        this.x = x || Math.random() * canvas.width
        this.y = y || Math.random() * canvas.height
        this.radius = 0
        this.maxRadius = 100 + Math.random() * 200

        // Color with transparency
        const hue = 200 + Math.random() * 40 // Blue range
        this.color = `hsla(${hue}, 80%, 60%, 0.3)`

        this.lineWidth = 1 + Math.random() * 2
        this.speed = 1 + Math.random() * 3
      }

      update() {
        this.radius += this.speed
        this.lineWidth *= 0.99 // Gradually thin the line

        // Return true if ripple should be removed
        return this.radius > this.maxRadius
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.lineWidth
        ctx.stroke()
      }
    }

    // Create ripple at random position
    const createRandomRipple = () => {
      ripples.push(new Ripple(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    // Create ripple at mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastRippleTime > 100) {
        // Limit ripple creation rate
        ripples.push(new Ripple(e.clientX, e.clientY))
        lastRippleTime = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0c4a6e") // Light blue
      gradient.addColorStop(1, "#082f49") // Dark blue
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Randomly create new ripples
      if (Math.random() < 0.03) {
        createRandomRipple()
      }

      // Update and draw ripples
      ripples = ripples.filter((ripple) => {
        const shouldRemove = ripple.update()
        ripple.draw()
        return !shouldRemove
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

