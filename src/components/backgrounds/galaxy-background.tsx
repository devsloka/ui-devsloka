"use client"
import { useEffect, useRef } from "react"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let dustParticles: DustParticle[] = []
    let galaxyAngle = 0
    let devicePixelRatio = window.devicePixelRatio || 1

    class Star {
      x: number
      y: number
      z: number
      size: number
      color: string
      twinkleSpeed: number
      twinklePhase: number

      constructor(canvas: HTMLCanvasElement) {
        this.x = (Math.random() - 0.5) * canvas.width * 3
        this.y = (Math.random() - 0.5) * canvas.height * 3
        this.z = Math.random() * 1000
        this.size = 0.5 + Math.random() * 1.5

        const colorRoll = Math.random()
        if (colorRoll > 0.9) {
          this.color = `hsl(${30 + Math.random() * 30}, 100%, 70%)`
        } else if (colorRoll > 0.8) {
          this.color = `hsl(${0 + Math.random() * 20}, 100%, 70%)`
        } else if (colorRoll > 0.6) {
          this.color = `hsl(${200 + Math.random() * 40}, 100%, 90%)`
        } else {
          this.color = `hsl(0, 0%, ${90 + Math.random() * 10}%)`
        }

        this.twinkleSpeed = 0.01 + Math.random() * 0.05
        this.twinklePhase = Math.random() * Math.PI * 2
      }

      update(speed: number, canvas: HTMLCanvasElement) {
        this.z -= speed
        if (this.z <= 0) {
          this.z = 1000
          this.x = (Math.random() - 0.5) * canvas.width * 3
          this.y = (Math.random() - 0.5) * canvas.height * 3
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number, canvas: HTMLCanvasElement) {
        const projectedX = (this.x / this.z) * 500 + canvas.width / 2
        const projectedY = (this.y / this.z) * 500 + canvas.height / 2

        if (
          projectedX < -100 ||
          projectedX > canvas.width + 100 ||
          projectedY < -100 ||
          projectedY > canvas.height + 100
        ) return

        const projectedSize = (this.size * (1000 - this.z)) / 1000
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.5 + 0.5

        ctx.beginPath()
        ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.5 + twinkle * 0.5
        ctx.fill()

        const gradient = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, projectedSize * 4)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(projectedX, projectedY, projectedSize * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.3 * twinkle
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    class DustParticle {
      distance: number
      angle: number
      yOffset: number
      size: number
      color: string
      speed: number

      constructor() {
        this.distance = 20 + Math.random() * 300
        this.angle = Math.random() * Math.PI * 2
        this.yOffset = (Math.random() - 0.5) * 50
        this.size = 0.5 + Math.random() * 2

        const hue = this.distance < 100 ? 60 + Math.random() * 30 : 220 + Math.random() * 60
        this.color = `hsl(${hue}, 80%, 70%)`
        this.speed = 0.002 / (1 + this.distance / 300)
      }

      update() {
        this.angle += this.speed
        if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, galaxyAngle: number) {
        const totalAngle = this.angle + galaxyAngle
        const spiralAngle = totalAngle + this.distance * 0.1
        const x = centerX + Math.cos(spiralAngle) * this.distance
        const y = centerY + Math.sin(spiralAngle) * this.distance * 0.6 + this.yOffset

        ctx.beginPath()
        ctx.arc(x, y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const resizeCanvas = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(devicePixelRatio, devicePixelRatio)
      initStars()
      initDustParticles()
    }

    const initStars = () => {
      stars = []
      const starCount = Math.min(500, Math.floor((canvas.width * canvas.height) / (2000 * devicePixelRatio)))
      for (let i = 0; i < starCount; i++) stars.push(new Star(canvas))
    }

    const initDustParticles = () => {
      dustParticles = []
      const particleCount = Math.min(2000, Math.floor((canvas.width * canvas.height) / (500 * devicePixelRatio)))
      for (let i = 0; i < particleCount; i++) dustParticles.push(new DustParticle())
    }

    let time = 0
    const animate = () => {
      time += 0.01
      galaxyAngle += 0.001
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#000000")
      gradient.addColorStop(0.5, "#050520")
      gradient.addColorStop(1, "#0a0a30")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Nebula
      drawNebula(ctx, canvas.width / 2, canvas.height / 2, time)

      // Stars
      stars.forEach(star => {
        star.update(0.5, canvas)
        star.draw(ctx, time, canvas)
      })

      // Galaxy center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150)
      centerGlow.addColorStop(0, "rgba(255, 255, 200, 0.3)")
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = centerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2)
      ctx.fill()

      // Dust particles
      dustParticles.forEach(particle => {
        particle.update()
        particle.draw(ctx, centerX, centerY, galaxyAngle)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const drawNebula = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      drawNebulaCloud(ctx, x - 100, y + 50, 300, "rgba(70, 0, 100, 0.1)", time)
      drawNebulaCloud(ctx, x + 150, y - 100, 250, "rgba(0, 50, 100, 0.1)", time * 0.7)
      drawNebulaCloud(ctx, x + 50, y + 150, 200, "rgba(100, 0, 50, 0.1)", time * 1.3)
    }

    const drawNebulaCloud = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      time: number
    ) => {
      ctx.beginPath()
      const segments = 20
      const radiusVariation = size * 0.3
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const radius = size +
          Math.sin(angle * 3 + time) * radiusVariation * 0.5 +
          Math.sin(angle * 5 - time * 0.7) * radiusVariation * 0.3 +
          Math.sin(angle * 7 + time * 1.3) * radiusVariation * 0.2
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius * 0.6
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

