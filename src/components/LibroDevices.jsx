import React, { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE, isTouch, prefersReducedMotion } from '../lib/motion'

const COVER = '/img/libro/copertina.webp'
const COVER_ALT = 'Copertina dell’ebook Togli la pancia senza rinunce del Dott. Edoardo Bo'

const Schermo = ({ children, className = '' }) => <div className={`dev__screen ${className}`}>{children}</div>

const Iphone = () => (
  <div className="dev dev--phone">
    <Schermo>
      <span className="dev__clock">9:41</span>
      <span className="dev__island" />
      <div className="dev__reader">
        <img className="dev__cover" src={COVER} alt={COVER_ALT} />
        <strong>Togli la pancia senza rinunce</strong>
        <small>Dott. Edoardo Bo</small>
      </div>
      <span className="dev__home" />
    </Schermo>
  </div>
)

const Ipad = () => (
  <div className="dev dev--pad">
    <Schermo>
      <img className="dev__cover dev__cover--full" src={COVER} alt="" aria-hidden="true" />
    </Schermo>
  </div>
)

const Macbook = () => (
  <div className="mac">
    <div className="dev dev--mac">
      <span className="mac__notch" />
      <Schermo className="dev__screen--mac">
        <img className="dev__cover" src={COVER} alt="" aria-hidden="true" />
        <div className="mac__info">
          <span>Ebook gratuito</span>
          <strong>Togli la pancia senza rinunce</strong>
          <em>Dieta Flessibile Animal-Based</em>
          <small>Dott. Edoardo Bo</small>
        </div>
      </Schermo>
    </div>
    <div className="mac__base" />
  </div>
)

// Un dispositivo della scena: arriva allo scroll o all'apertura, poi segue il cursore a seconda della profondità
const Elemento = ({ nome, depth, tilt, from, delay, progress, guidato, px, py, children }) => {
  const scrollX = useTransform(progress, [0, 1], [`${from.x}%`, '0%'])
  const scrollY = useTransform(progress, [0, 1], [`${from.y}%`, '0%'])
  const rotateY = useTransform(px, [-1, 1], [tilt - 7, tilt + 7])
  const rotateX = useTransform(py, [-1, 1], [5, -5])
  const x = useTransform(px, [-1, 1], [-depth, depth])
  const y = useTransform(py, [-1, 1], [-depth * 0.6, depth * 0.6])
  const glare = useTransform(px, [-1, 1], ['-22%', '22%'])

  return (
    <motion.div
      className={`scena__el scena__el--${nome}`}
      style={guidato ? { x: scrollX, y: scrollY } : undefined}
      initial={guidato ? { opacity: 0 } : { opacity: 0, x: `${from.x}%`, y: `${from.y}%` }}
      animate={guidato ? undefined : { opacity: 1, x: 0, y: 0 }}
      whileInView={guidato ? { opacity: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      <div className="scena__float" style={{ animationDelay: `${-delay * 4}s` }}>
        <motion.div className="scena__tilt" style={{ x, y, rotateX, rotateY }}>
          {children}
          <motion.span className="scena__glare" style={{ x: glare }} />
        </motion.div>
      </div>
      <span className="scena__ombra" />
    </motion.div>
  )
}

// Scena dei dispositivi. "hero": iPad e iPhone che entrano da soli; "full": anche il MacBook, composta dallo scroll
const LibroDevices = ({ variant = 'hero', label }) => {
  const ref = useRef(null)
  const full = variant === 'full'
  const guidato = full && !prefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 70, damping: 16 })
  const py = useSpring(rawY, { stiffness: 70, damping: 16 })

  const move = (e) => {
    if (isTouch() || prefersReducedMotion()) return
    const r = ref.current.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      className={`scena scena--${variant}`}
      role="img"
      aria-label={label}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {full && (
        <Elemento nome="mac" depth={8} tilt={0} from={{ x: 0, y: 26 }} delay={0} {...{ progress, guidato, px, py }}>
          <Macbook />
        </Elemento>
      )}
      <Elemento nome="ipad" depth={16} tilt={full ? 15 : 12} from={{ x: -34, y: 14 }} delay={0.15} {...{ progress, guidato, px, py }}>
        <Ipad />
      </Elemento>
      <Elemento nome="iphone" depth={26} tilt={-15} from={{ x: 46, y: 30 }} delay={0.32} {...{ progress, guidato, px, py }}>
        <Iphone />
      </Elemento>
    </div>
  )
}

export default LibroDevices
