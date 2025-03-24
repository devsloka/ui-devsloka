"use client"

import { useEffect, useRef } from "react"

export default function LinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lines: Line[] = []
    let frame = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initLines()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Line class
    class Line {
      points: { x: number; y: number }[]
      color: string
      speed: number

      constructor(startX: number) {
        this.points = []

        // Create initial points
        const segments = 10
        for (let i = 0; i < segments; i++) {
          this.points.push({
            x: startX,
            y: (canvas.height / segments) * i,
          })
        }

        // Random color from a warm palette
        const hue = 180 + Math.random() * 60 // Blue to purple range
        this.color = `hsla(${hue}, 80%, 60%, 0.5)`
        this.speed = 1 + Math.random() * 2
      }

      update() {
        // Move the first point
        this.points[0].x += Math.sin(frame * 0.02 * this.speed) * 2

        // Update following points with delay
        for (let i = 1; i < this.points.length; i++) {
          const point = this.points[i]
          const prevPoint = this.points[i - 1]

          // Move current point towards previous point with some delay
          point.x += (prevPoint.x - point.x) * 0.1
        }
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        // Draw smooth curve through points
        for (let i = 1; i < this.points.length; i++) {
          const prevPoint = this.points[i - 1]
          const currentPoint = this.points[i]

          // Calculate control points for smooth curve
          const cpX = (prevPoint.x + currentPoint.x) / 2

          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, currentPoint.y)
        }

        ctx.strokeStyle = this.color
        ctx.lineWidth = 3
        ctx.stroke()
      }
    }

    // Initialize lines
    const initLines = () => {
      lines = []
      const lineCount = Math.floor(canvas.width / 30) // Adjust spacing

      for (let i = 0; i < lineCount; i++) {
        const x = (canvas.width / lineCount) * i
        lines.push(new Line(x))
      }
    }

    // Animation loop
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0f172a") // Dark blue
      gradient.addColorStop(1, "#1e293b") // Slightly lighter blue
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw lines
      lines.forEach((line) => {
        line.update()
        line.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

