"use client"

import { useEffect, useRef } from "react"

export default function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animation loop
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient mesh
      const cellSize = 100
      const cols = Math.ceil(canvas.width / cellSize) + 1
      const rows = Math.ceil(canvas.height / cellSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize
          const y = j * cellSize

          // Calculate color based on position and time
          const hue1 = (i * 10 + time * 20) % 360
          const hue2 = (j * 10 + time * 15) % 360
          const hue = (hue1 + hue2) / 2

          // Create gradient for each cell
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, cellSize * 1.5)

          gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.5)`)
          gradient.addColorStop(1, `hsla(${(hue + 60) % 360}, 80%, 60%, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, cellSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Add overlay gradient for depth
      const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height)
      overlay.addColorStop(0, "rgba(20, 30, 60, 0.8)")
      overlay.addColorStop(1, "rgba(10, 20, 40, 0.9)")

      ctx.fillStyle = overlay
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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

