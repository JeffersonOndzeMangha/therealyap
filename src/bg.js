/**
 * YAP – Animated 3-D background
 * Canvas particle constellation with depth simulation, planets, and scroll parallax.
 */
export function initBackground() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Site palette (matching CSS variables)
  const ACCENT_RGB = '255,85,51'
  const BLUE_RGB = '90,122,154'
  const BRIGHT_RGB = '200,220,255'
  const DARK_BLUE_RGB = '26,53,96'

  // --- Stars ---
  const STAR_COUNT = 120
  const CLOSE_STAR_COUNT = 20
  const MAX_DIST = 160

  // Scroll offset for parallax
  let scrollY = 0
  window.addEventListener('scroll', () => { scrollY = window.scrollY })

  class Star {
    constructor(close) {
      this.close = close || false
      this.spawn()
    }

    spawn() {
      this.x = Math.random() * window.innerWidth
      this.y = Math.random() * window.innerHeight
      if (this.close) {
        // Foreground stars: large, bright, fast
        this.z = 1.8 + Math.random() * 1.2
        this.vx = (Math.random() - 0.5) * 0.9
        this.vy = (Math.random() - 0.5) * 0.9
        this.r = 1.5 + Math.random() * 2.5
        this.isAccent = Math.random() < 0.3
        this.twinkleSpeed = 0.02 + Math.random() * 0.03
        this.twinklePhase = Math.random() * Math.PI * 2
      } else {
        // Background stars: smaller, dimmer
        this.z = Math.random() * 1.5 + 0.3
        this.vx = (Math.random() - 0.5) * 0.6 / this.z
        this.vy = (Math.random() - 0.5) * 0.6 / this.z
        this.r = (0.6 + Math.random() * 1.8) * this.z
        this.isAccent = Math.random() < 0.18
        this.twinkleSpeed = 0.01 + Math.random() * 0.02
        this.twinklePhase = Math.random() * Math.PI * 2
      }
      this.parallaxFactor = this.close ? 0.12 : 0.04 * this.z
    }

    update(time) {
      this.x += this.vx
      this.y += this.vy
      this.twinkle = 0.6 + 0.4 * Math.sin(time * this.twinkleSpeed + this.twinklePhase)
      if (this.x < 0) this.x = canvas.width
      else if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      else if (this.y > canvas.height) this.y = 0
    }

    draw() {
      const py = this.y - scrollY * this.parallaxFactor
      const baseAlpha = this.close
        ? 0.5 + 0.4 * (this.z / 3)
        : 0.15 + 0.45 * (this.z / 1.8)
      const alpha = baseAlpha * this.twinkle
      const rgb = this.isAccent ? ACCENT_RGB : (this.close ? BRIGHT_RGB : BLUE_RGB)
      ctx.beginPath()
      ctx.arc(this.x, py, this.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(2)})`
      ctx.fill()
      // Add a subtle glow to close stars
      if (this.close && this.r > 2) {
        ctx.beginPath()
        ctx.arc(this.x, py, this.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${(alpha * 0.12).toFixed(3)})`
        ctx.fill()
      }
    }
  }

  // --- Planets ---
  const planets = [
    {
      x: 0.15, y: 0.25,
      radius: 18,
      color: 'rgba(60,90,140,0.35)',
      highlightColor: 'rgba(60,90,140,0.6)',
      ring: false,
      glowColor: 'rgba(40,70,120,0.15)',
      parallaxFactor: 0.06,
    },
    {
      x: 0.82, y: 0.55,
      radius: 28,
      color: 'rgba(140,90,60,0.3)',
      highlightColor: 'rgba(140,90,60,0.6)',
      ring: true,
      ringColor: 'rgba(180,140,100,0.18)',
      glowColor: 'rgba(120,70,40,0.12)',
      parallaxFactor: 0.08,
    },
    {
      x: 0.6, y: 0.85,
      radius: 12,
      color: 'rgba(90,160,200,0.25)',
      highlightColor: 'rgba(90,160,200,0.5)',
      ring: false,
      glowColor: 'rgba(70,140,180,0.1)',
      parallaxFactor: 0.04,
    },
    {
      x: 0.35, y: 0.65,
      radius: 8,
      color: 'rgba(180,120,180,0.2)',
      highlightColor: 'rgba(180,120,180,0.4)',
      ring: false,
      glowColor: 'rgba(150,90,150,0.08)',
      parallaxFactor: 0.03,
    },
  ]

  function drawPlanets() {
    for (const p of planets) {
      const px = p.x * canvas.width
      const py = p.y * canvas.height - scrollY * p.parallaxFactor

      // Outer glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3)
      glow.addColorStop(0, p.glowColor)
      glow.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(px, py, p.radius * 3, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // Planet body
      const grad = ctx.createRadialGradient(
        px - p.radius * 0.3, py - p.radius * 0.3, p.radius * 0.1,
        px, py, p.radius
      )
      grad.addColorStop(0, p.highlightColor)
      grad.addColorStop(1, p.color)
      ctx.beginPath()
      ctx.arc(px, py, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Ring (for Saturn-like planet)
      if (p.ring) {
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(px, py, p.radius * 2, p.radius * 0.35, -0.3, 0, Math.PI * 2)
        ctx.strokeStyle = p.ringColor
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  const stars = [
    ...Array.from({ length: STAR_COUNT }, () => new Star(false)),
    ...Array.from({ length: CLOSE_STAR_COUNT }, () => new Star(true)),
  ]

  function drawEdges() {
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].close) continue
      for (let j = i + 1; j < stars.length; j++) {
        if (stars[j].close) continue
        const dx = stars[i].x - stars[j].x
        const dy = stars[i].y - stars[j].y
        const dist = Math.hypot(dx, dy)
        if (dist < MAX_DIST) {
          const alpha = ((1 - dist / MAX_DIST) * 0.15).toFixed(3)
          ctx.strokeStyle = `rgba(${DARK_BLUE_RGB},${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(stars[i].x, stars[i].y - scrollY * stars[i].parallaxFactor)
          ctx.lineTo(stars[j].x, stars[j].y - scrollY * stars[j].parallaxFactor)
          ctx.stroke()
        }
      }
    }
  }

  let rafId
  let time = 0
  function tick() {
    time++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlanets()
    stars.forEach(s => { s.update(time); s.draw() })
    drawEdges()
    rafId = requestAnimationFrame(tick)
  }

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => window.removeEventListener('resize', resize)
  }
  tick()

  return () => cancelAnimationFrame(rafId)
}
