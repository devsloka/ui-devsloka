"use client"

import { useEffect, useRef } from "react"

export default function FirefliesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let fireflies: Firefly[] = []
    let trees: Tree[] = []
    let time = 0

    // Class declarations moved to top
    class Firefly {
      x: number
      y: number
      size: number
      speed: number
      angle: number
      angleSpeed: number
      glowIntensity: number
      pulseSpeed: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height * 0.8
        this.size = 1 + Math.random() * 2
        this.speed = 0.2 + Math.random() * 0.8
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = 0.01 + Math.random() * 0.02
        this.glowIntensity = 0.5 + Math.random() * 0.5
        this.pulseSpeed = 0.01 + Math.random() * 0.05
        const hue = 50 + Math.random() * 20
        this.color = `hsl(${hue}, 100%, 70%)`
      }

      update(time: number) {
        this.angle += (Math.random() - 0.5) * this.angleSpeed
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        if (this.x < 0) this.x = canvas!.width
        if (this.x > canvas!.width) this.x = 0
        if (this.y < 0) this.y = canvas!.height
        if (this.y > canvas!.height) this.y = 0
        this.glowIntensity = 0.5 + Math.sin(time * this.pulseSpeed) * 0.5
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 10)
        gradient.addColorStop(0, `rgba(255, 255, 150, ${this.glowIntensity * 0.5})`)
        gradient.addColorStop(1, "rgba(255, 255, 150, 0)")

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 10, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    class Branch {
      startX: number
      startY: number
      endX: number
      endY: number
      width: number

      constructor(startX: number, startY: number, endX: number, endY: number, width: number) {
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.width = width
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(this.startX, this.startY)
        ctx.lineTo(this.endX, this.endY)
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = this.width
        ctx.stroke()
      }
    }

    class Tree {
      x: number
      height: number
      width: number
      branches: Branch[]

      constructor(x: number) {
        this.x = x
        this.height = canvas!.height * (0.5 + Math.random() * 0.3)
        this.width = 10 + Math.random() * 20
        this.branches = []
        this.generateBranches(this.x, canvas!.height, this.x, canvas!.height - this.height, this.width, 0, 3)
      }

      generateBranches(startX: number, startY: number, endX: number, endY: number, width: number, angle: number, depth: number) {
        this.branches.push(new Branch(startX, startY, endX, endY, width))
        if (depth <= 0) return

        const branchCount = 1 + Math.floor(Math.random() * 3)
        for (let i = 0; i < branchCount; i++) {
          const newAngle = angle + (Math.random() - 0.5) * Math.PI * 0.5
          const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * (0.5 + Math.random() * 0.3)
          const newEndX = endX + Math.cos(newAngle) * length
          const newEndY = endY + Math.sin(newAngle) * length
          this.generateBranches(endX, endY, newEndX, newEndY, width * 0.7, newAngle, depth - 1)
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        this.branches.forEach((branch) => branch.draw(ctx))
      }
    }

    // Initialization functions moved before their usage
    const initFireflies = () => {
      fireflies = []
      const fireflyCount = Math.min(150, Math.floor((canvas!.width * canvas!.height) / 5000))
      for (let i = 0; i < fireflyCount; i++) {
        fireflies.push(new Firefly())
      }
    }

    const initTrees = () => {
      trees = []
      const treeCount = Math.ceil(canvas!.width / 200)
      for (let i = 0; i < treeCount; i++) {
        const x = (canvas!.width / treeCount) * i + Math.random() * 100
        trees.push(new Tree(x))
      }
    }

    // Canvas setup
    const resizeCanvas = () => {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initFireflies()
      initTrees()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animation functions
    const drawStars = (ctx: CanvasRenderingContext2D, time: number) => {
      const starCount = 200
      for (let i = 0; i < starCount; i++) {
        const x = (i * 17) % canvas!.width
        const y = (i * 23) % (canvas!.height * 0.8)
        const twinkle = Math.sin(time * 0.05 + i * 0.3) * 0.5 + 0.5
        const size = 0.5 + Math.random() * 1 * twinkle
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + twinkle * 0.7})`
        ctx.fill()
      }
    }

    const drawMoon = (ctx: CanvasRenderingContext2D) => {
      const moonX = canvas!.width * 0.8
      const moonY = canvas!.height * 0.2
      const moonRadius = 40

      const gradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 3)
      gradient.addColorStop(0, "rgba(255, 255, 220, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 220, 0)")

      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 220, 1)"
      ctx.fill()
      drawMoonCraters(ctx, moonX, moonY, moonRadius)
    }

    const drawMoonCraters = (ctx: CanvasRenderingContext2D, moonX: number, moonY: number, moonRadius: number) => {
      const craterCount = 5
      for (let i = 0; i < craterCount; i++) {
        const angle = (i * Math.PI * 2) / craterCount
        const distance = moonRadius * 0.5 * Math.random()
        const x = moonX + Math.cos(angle) * distance
        const y = moonY + Math.sin(angle) * distance
        const size = moonRadius * (0.1 + Math.random() * 0.1)
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(200, 200, 180, 0.8)"
        ctx.fill()
      }
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas!.height)
      gradient.addColorStop(0, "#001030")
      gradient.addColorStop(1, "#000510")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas!.width, canvas!.height)

      drawStars(ctx, time)
      drawMoon(ctx)
      trees.forEach((tree) => tree.draw(ctx))

      ctx.fillStyle = "#000000"
      ctx.fillRect(0, canvas!.height * 0.9, canvas!.width, canvas!.height * 0.1)

      ctx.globalCompositeOperation = "lighter"
      fireflies.forEach((firefly) => {
        firefly.update(time)
        firefly.draw(ctx)
      })
      ctx.globalCompositeOperation = "source-over"

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

