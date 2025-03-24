"use client"

import { useEffect, useRef } from "react"

export default function SpotlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize spotlight position
      targetX = canvas.width / 2
      targetY = canvas.height / 2
      mouseX = targetX
      mouseY = targetY
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      time += 0.01

      // Smooth follow for spotlight
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dark background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw multiple spotlights
      drawSpotlight(mouseX, mouseY, 300, "rgba(100, 50, 255, 0.3)") // Purple
      drawSpotlight(mouseX + Math.sin(time) * 100, mouseY + Math.cos(time) * 100, 200, "rgba(50, 200, 255, 0.2)") // Blue
      drawSpotlight(
        mouseX - Math.cos(time * 0.7) * 150,
        mouseY - Math.sin(time * 0.7) * 150,
        250,
        "rgba(255, 50, 150, 0.2)",
      ) // Pink

      // Draw subtle grid
      drawGrid()

      animationFrameId = requestAnimationFrame(animate)
    }

    // Draw spotlight function
    const drawSpotlight = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw grid function
    const drawGrid = () => {
      const spacing = 50
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i <= cols; i++) {
        const x = i * spacing

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let j = 0; j <= rows; j++) {
        const y = j * spacing

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
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

