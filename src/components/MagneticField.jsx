import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const NORTH = -Math.PI / 2
const BLUE = [74, 163, 255]
const ORANGE = [255, 144, 64]

// Campo magnetico su canvas: particelle caotiche che si allineano verso nord.
// align (0-1, oppure funzione) dice quanto il campo è ordinato; vicino al cursore si ordina comunque.
const MagneticField = ({ align = 0, density = 1, className = '' }) => {
  const ref = useRef(null)
  const alignRef = useRef(align)

  useEffect(() => {
    alignRef.current = align
  }, [align])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = prefersReducedMotion()
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let parts = []
    const pointer = { x: -9999, y: -9999, on: 0 }

    const spawn = (p, anywhere) => {
      p.x = Math.random() * w
      p.y = anywhere ? Math.random() * h : h + Math.random() * 40
      p.life = 40 + Math.random() * 160
      p.age = 0
      p.speed = 0.7 + Math.random() * 1.5
      return p
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(1500, (w * h) / 900) * density)
      parts = Array.from({ length: count }, () => spawn({}, true))
    }

    const step = (t) => {
      const global = typeof alignRef.current === 'function' ? alignRef.current() : alignRef.current
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.075)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 1

      for (const p of parts) {
        const a =
          Math.sin(p.x * 0.0023 + t * 0.00017) * 2.4 +
          Math.cos(p.y * 0.0029 - t * 0.00013) * 2.2 +
          Math.sin((p.x + p.y) * 0.0012) * 1.8
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const near = Math.max(0, 1 - Math.hypot(dx, dy) / 260) * pointer.on
        const order = Math.min(1, global + near * 0.95)

        const vx = Math.cos(a) * (1 - order) + Math.cos(NORTH) * order
        const vy = Math.sin(a) * (1 - order) + Math.sin(NORTH) * order
        const px = p.x
        const py = p.y
        p.x += vx * p.speed * (1 + order)
        p.y += vy * p.speed * (1 + order)
        p.age += 1

        const fade = Math.sin((p.age / p.life) * Math.PI)
        const r = BLUE[0] + (ORANGE[0] - BLUE[0]) * order
        const g = BLUE[1] + (ORANGE[1] - BLUE[1]) * order
        const b = BLUE[2] + (ORANGE[2] - BLUE[2]) * order
        ctx.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${(0.1 + order * 0.34) * fade})`
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        if (p.age > p.life || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 50) spawn(p, true)
      }
    }

    const loop = (t) => {
      if (visible) step(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.on = 1
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    if (still) {
      for (let i = 0; i < 90; i += 1) step(i * 16)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [density])

  return <canvas ref={ref} className={`field ${className}`} aria-hidden="true" />
}

export default MagneticField
