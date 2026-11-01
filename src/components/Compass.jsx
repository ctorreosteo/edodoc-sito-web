import React, { useEffect, useId } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/motion'

const TICKS = Array.from({ length: 120 }, (_, i) => i)
const CARDINALS = [
  { label: 'N', angle: 0 },
  { label: 'E', angle: 90 },
  { label: 'S', angle: 180 },
  { label: 'O', angle: 270 },
]

const polar = (angle, r) => {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: 250 + r * Math.cos(rad), y: 250 + r * Math.sin(rad) }
}

// Quadrante: tacche, punti cardinali ed etichette opzionali
export const Dial = ({ ring, labels, showCardinals = true }) => {
  const id = useId()
  return (
    <svg className="dial" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <path id={id} d="M250,250 m-226,0 a226,226 0 1,1 452,0 a226,226 0 1,1 -452,0" />
      </defs>
      <circle cx="250" cy="250" r="246" className="dial__rim" />
      <circle cx="250" cy="250" r="204" className="dial__rim dial__rim--in" />
      {TICKS.map((i) => {
        const major = i % 10 === 0
        const a = polar(i * 3, major ? 188 : 194)
        const b = polar(i * 3, 204)
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={major ? 'dial__tick dial__tick--major' : 'dial__tick'} />
      })}
      {ring && (
        <text className="dial__ring">
          <textPath href={`#${id}`} textLength="1415" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      )}
      {showCardinals &&
        CARDINALS.map((c) => {
          const p = polar(c.angle, 170)
          return (
            <text key={c.label} x={p.x} y={p.y} className={`dial__cardinal ${c.label === 'N' ? 'is-north' : ''}`} textAnchor="middle" dominantBaseline="central">
              {c.label}
            </text>
          )
        })}
      {labels?.map((l) => {
        const p = polar(l.angle, 160)
        return (
          <text key={l.label} x={p.x} y={p.y} className="dial__label" textAnchor="middle" dominantBaseline="central">
            {l.label}
          </text>
        )
      })}
    </svg>
  )
}

// L'ago richiama il triangolo nella D del logo
export const Needle = ({ rotate, className = '' }) => (
  <motion.div className={`needle ${className}`} style={{ rotate }} aria-hidden="true">
    <svg viewBox="0 0 500 500">
      <path d="M250 30 L268 84 L232 84 Z" className="needle__tip" />
    </svg>
  </motion.div>
)

// Ago che impazzisce, si ferma a nord e poi vibra appena; il cursore lo devia un po'
export const useFindNorth = (play = true) => {
  const angle = useMotionValue(prefersReducedMotion() ? 0 : -230)
  const pull = useMotionValue(0)
  const smooth = useSpring(pull, { stiffness: 60, damping: 12 })
  const rotate = useTransform([angle, smooth], ([a, p]) => a + p)

  useEffect(() => {
    if (!play || prefersReducedMotion()) return undefined
    const c = animate(angle, [-230, 140, -95, 62, -34, 18, -8, 3, 0], {
      duration: 3.6,
      ease: 'easeInOut',
      delay: 0.3,
    })
    return () => c.stop()
  }, [play, angle])

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    pull.set(Math.max(-1, Math.min(1, dx / r.width)) * 40)
  }
  const onPointerLeave = () => pull.set(0)

  return { rotate, onPointerMove, onPointerLeave }
}

// Bussola fissa: indica la rotta di lettura. In cima l'ago è impazzito, in fondo è a nord
export const CompassProgress = () => {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.5 })
  const rotate = useTransform(progress, (p) => Math.sin(p * 46) * (1 - p) ** 1.5 * 150)
  const percent = useMotionValue('0%')
  useMotionValueEvent(progress, 'change', (p) => percent.set(`${Math.round(Math.min(1, p) * 100)}%`))

  return (
    <Link to="/consulenza-conoscitiva" className="cprog" aria-label="Prenota la consulenza conoscitiva">
      <span className="cprog__dial">
        <Dial showCardinals={false} />
        <Needle rotate={rotate} />
      </span>
      <span className="cprog__meta">
        <motion.b>{percent}</motion.b>
        <small>rotta</small>
      </span>
    </Link>
  )
}
