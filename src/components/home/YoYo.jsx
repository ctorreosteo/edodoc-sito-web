import React, { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Kicker } from '../Kit'
import { PROBLEMI } from '../../data/site'

const LOOP =
  'M0 170 C60 170 90 300 150 300 C215 300 235 130 300 130 C360 130 390 275 450 275 C515 275 535 90 600 90 C660 90 690 250 750 250 C810 250 825 50 880 50 C950 50 965 215 1040 215 C1100 215 1140 215 1200 215'

const WINDOWS = [
  [0.02, 0.08, 0.26, 0.32],
  [0.32, 0.38, 0.54, 0.6],
  [0.6, 0.66, 0.78, 0.82],
]

const Pain = ({ item, index, progress }) => {
  const w = WINDOWS[index]
  const opacity = useTransform(progress, w, [0, 1, 1, 0])
  const y = useTransform(progress, w, [40, 0, 0, -40])
  return (
    <motion.article className="pain" style={{ opacity, y }}>
      <span className="pain__n">{index + 1}/3</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </motion.article>
  )
}

// Il grafico si disegna con lo scroll: il peso sale e scende, poi la linea esce dal loop
const YoYo = () => {
  const ref = useRef(null)
  const path = useRef(null)
  const dot = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 })
  const pathLength = useTransform(progress, [0.02, 0.97], [0, 1])
  const exitOpacity = useTransform(progress, [0.8, 0.86], [0, 1])
  const exitY = useTransform(progress, [0.8, 0.86], [40, 0])
  const titleOpacity = useTransform(progress, [0.8, 0.86], [1, 0.25])
  // Su telefono il grafico è più largo dello schermo e la vista segue la linea
  const [narrow] = useState(() => window.matchMedia('(max-width: 800px)').matches)
  const chartX = useTransform(progress, [0.05, 0.95], narrow ? ['0%', '-53%'] : ['0%', '0%'])

  useMotionValueEvent(pathLength, 'change', (v) => {
    if (!path.current || !dot.current) return
    const total = path.current.getTotalLength()
    const p = path.current.getPointAtLength(Math.max(0, Math.min(1, v)) * total)
    dot.current.setAttribute('cx', p.x)
    dot.current.setAttribute('cy', p.y)
  })

  return (
    <section ref={ref} className="yoyo">
      <div className="yoyo__stick">
        <div className="wrap yoyo__head">
          <Kicker>Il ciclo yo-yo</Kicker>
          <motion.h2 className="h h--lg" style={{ opacity: titleOpacity }}>
            Sempre la <span className="serif accent">stessa storia.</span>
          </motion.h2>
        </div>

        <div className="yoyo__chart">
          <motion.svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ x: chartX }}>
            <defs>
              <linearGradient id="yoyo-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
                <stop offset="0" stopColor="#4aa3ff" />
                <stop offset="0.7" stopColor="#ff5e62" />
                <stop offset="0.82" stopColor="#ff9040" />
                <stop offset="1" stopColor="#ff9040" />
              </linearGradient>
              <filter id="yoyo-glow" x="-10%" y="-30%" width="120%" height="160%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <path d={LOOP} className="yoyo__ghost" />
            <motion.path d={LOOP} className="yoyo__blur" filter="url(#yoyo-glow)" style={{ pathLength }} stroke="url(#yoyo-line)" />
            <motion.path ref={path} d={LOOP} className="yoyo__line" style={{ pathLength }} stroke="url(#yoyo-line)" />
            <circle ref={dot} cx="0" cy="170" r="8" className="yoyo__dot" />
            <text x="150" y="330" textAnchor="middle" className="yoyo__tag">perdi peso</text>
            <text x="300" y="112" textAnchor="middle" className="yoyo__tag">lo riprendi</text>
            <text x="450" y="305" textAnchor="middle" className="yoyo__tag">ricominci</text>
            <motion.text x="1120" y="186" textAnchor="end" className="yoyo__tag yoyo__tag--on" style={{ opacity: exitOpacity }}>
              Metodo Bussola
            </motion.text>
          </motion.svg>
        </div>

        <div className="wrap yoyo__foot">
          {PROBLEMI.map((p, i) => (
            <Pain key={p.title} item={p} index={i} progress={progress} />
          ))}
          <motion.div className="yoyo__exit" style={{ opacity: exitOpacity, y: exitY }}>
            <p className="h h--md">
              Il ciclo yo-yo non è un problema di forza di volontà, <span className="accent">ma di metodo.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default YoYo
