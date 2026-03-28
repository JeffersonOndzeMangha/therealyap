/**
 * YAP – Animated 3-D background
 * Canvas particle constellation with depth simulation + floating CSS orbs.
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
  const DARK_BLUE_RGB = '26,53,96'

  const COUNT = 70
  const MAX_DIST = 160

  class Particle {
    constructor() {
      this.spawn()
    }

    spawn() {
      this.x = Math.random() * window.innerWidth
      this.y = Math.random() * window.innerHeight
      // z represents depth: lower = farther away, higher = closer to viewer
      this.z = Math.random() * 1.5 + 0.3
      this.vx = (Math.random() - 0.5) * 0.35 / this.z
      this.vy = (Math.random() - 0.5) * 0.35 / this.z
      this.r = (0.5 + Math.random() * 1.5) * this.z
      this.isAccent = Math.random() < 0.18
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      // Wrap around edges for seamless effect
      if (this.x < 0) this.x = canvas.width
      else if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      else if (this.y > canvas.height) this.y = 0
    }

    draw() {
      // Closer particles are brighter
      const alpha = 0.1 + 0.4 * (this.z / 1.8)
      const rgb = this.isAccent ? ACCENT_RGB : BLUE_RGB
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(2)})`
      ctx.fill()
    }
  }

  const particles = Array.from({ length: COUNT }, () => new Particle())

  function drawEdges() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.hypot(dx, dy)
        if (dist < MAX_DIST) {
          const alpha = ((1 - dist / MAX_DIST) * 0.15).toFixed(3)
          ctx.strokeStyle = `rgba(${DARK_BLUE_RGB},${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  let rafId
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => { p.update(); p.draw() })
    drawEdges()
    rafId = requestAnimationFrame(tick)
  }

  // Respect reduced-motion preference — still clean up resize listener on return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => window.removeEventListener('resize', resize)
  }
  tick()

  return () => cancelAnimationFrame(rafId)
}
