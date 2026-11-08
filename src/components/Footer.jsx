import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Dial, Needle } from './Compass'
import { Reveal } from './Kit'
import { SITE } from '../data/site'
import { EASE, prefersReducedMotion } from '../lib/motion'

const NORD = { heading: 0, label: 'Nord', note: 'La tua direzione' }

const ROTTE = [
  { heading: 30, label: 'Metodo Bussola', note: 'Il percorso 1-1', to: '/metodo-bussola' },
  { heading: 90, label: 'Chi sono', note: 'La mia storia', to: '/chi-sono' },
  { heading: 150, label: 'Testimonianze', note: 'Video e casi studio', to: '/testimonianze' },
  { heading: 210, label: 'Il libro', note: 'Gratuito', to: '/libro' },
  { heading: 270, label: 'Masterclass', note: 'Video lezione gratuita', to: '/masterclass' },
  { heading: 330, label: 'Consulenza', note: 'Gratuita · 30 minuti', to: '/consulenza-conoscitiva' },
]

const gradi = (n) => `${String(n).padStart(3, '0')}°`

// L'ago punta la rotta sotto il cursore e, senza rotta, torna a nord
const Footer = () => {
  const [rotta, setRotta] = useState(NORD)
  const last = useRef(0)
  const angle = useMotionValue(-140)
  const spring = useSpring(angle, { stiffness: 90, damping: 9, mass: 0.7 })
  const rotate = prefersReducedMotion() ? angle : spring

  const punta = (target) => {
    setRotta(target)
    // Sempre per la via più corta, anche passando da 330° a 30°
    const delta = ((target.heading - last.current + 540) % 360) - 180
    last.current += delta
    angle.set(last.current)
  }

  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div>
          <Reveal>
            <p className="foot__kicker">Scegli la tua direzione</p>
          </Reveal>
          <nav className="foot__rotte" aria-label="Pagine" onPointerLeave={() => punta(NORD)}>
            {ROTTE.map((r, i) => (
              <Reveal key={r.to} delay={i * 0.05} y={20}>
                <Link to={r.to} onPointerEnter={() => punta(r)} onFocus={() => punta(r)} onBlur={() => punta(NORD)}>
                  <small>{gradi(r.heading)}</small>
                  <span>{r.label}</span>
                  <ArrowUpRight size={24} strokeWidth={2} />
                </Link>
              </Reveal>
            ))}
          </nav>
        </div>

        <motion.div className="foot__compass" aria-hidden="true" onViewportEnter={() => punta(NORD)} viewport={{ once: true, amount: 0.4 }}>
          <div className="foot__halo" />
          <div className="foot__ring">
            <Dial ring="UN PASSO ALLA VOLTA · SENZA RINUNCE · SENZA DIETE RIGIDE · METODO BUSSOLA · " showCardinals={false} />
          </div>
          <Needle rotate={rotate} className="needle--short" />
          <div className="foot__core">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={rotta.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22, ease: EASE }}>
                <b>{gradi(rotta.heading)}</b>
                <span>{rotta.label}</span>
                <small>{rotta.note}</small>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="wrap foot__base">
        <Link to="/" className="foot__brand" aria-label="Torna alla home">
          <span className="logo" />
          <span>
            <b>{SITE.name}</b>
            {SITE.role}
          </span>
        </Link>
        <p className="foot__claim">Cambi chi sei quando mangi.</p>
        <div className="foot__links">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SITE.privacy} target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          <a href={SITE.cookie} target="_blank" rel="noopener noreferrer">
            Cookie
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
