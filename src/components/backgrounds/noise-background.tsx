"use client"

import { useEffect, useRef } from "react"

export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let noiseData: Uint8ClampedArray
    let frame = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Recreate noise data when canvas size changes
      noiseData = new Uint8ClampedArray(canvas.width * canvas.height * 4)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create image data
    const imageData = ctx.createImageData(canvas.width, canvas.height)

    // Animation loop
    const animate = () => {
      frame++

      // Generate noise
      for (let i = 0; i < noiseData.length; i += 4) {
        // Calculate position
        const x = (i / 4) % canvas.width
        const y = Math.floor(i / 4 / canvas.width)

        // Generate noise value (0-255)
        const noise = Math.random() * 50

        // Add some patterns based on position and time
        const pattern = (Math.sin(x * 0.01 + frame * 0.01) + Math.cos(y * 0.01 + frame * 0.005)) * 20

        // Combine noise and pattern
        const value = Math.max(0, Math.min(255, noise + pattern))

        // Set RGBA values
        const baseColor = [30, 30, 50] // Dark blue-ish base

        imageData.data[i] = baseColor[0] + value * 0.2 // R
        imageData.data[i + 1] = baseColor[1] + value * 0.2 // G
        imageData.data[i + 2] = baseColor[2] + value * 0.4 // B
        imageData.data[i + 3] = 255 // A (fully opaque)
      }

      // Put image data to canvas
      ctx.putImageData(imageData, 0, 0)

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

