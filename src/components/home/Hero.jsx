import React, { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import MagneticField from '../MagneticField'
import { Dial, Needle, useFindNorth } from '../Compass'
import { Btn, Counter, MaskLines } from '../Kit'
import { useIntroDone } from '../Layout'
import { STATS } from '../../data/site'
import { EASE } from '../../lib/motion'

const fadeUp = (play, delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: play ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 1, ease: EASE, delay },
})

const Hero = () => {
  const play = useIntroDone()
  const { scrollY } = useScroll()
  const north = useFindNorth(play)
  const align = useRef(0)
  useMotionValueEvent(scrollY, 'change', (y) => {
    align.current = Math.min(1, y / 900)
  })

  const dialY = useTransform(scrollY, [0, 900], [0, 110])
  const dialRotate = useTransform(scrollY, [0, 900], [0, 70])
  const copyY = useTransform(scrollY, [0, 900], [0, -70])

  return (
    <section className="hero">
      <MagneticField align={() => align.current} />
      <div className="hero__glow" aria-hidden="true" />

      <div className="wrap hero__grid">
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <motion.p className="kicker" {...fadeUp(play, 0.1)}>
            <span className="kicker__mark" />
            Hai ripreso peso? Non sei tu il problema: è il metodo.
          </motion.p>

          {play && (
            <h1 className="h h--hero">
              <MaskLines
                immediate
                delay={0.15}
                lines={[{ text: 'Perdi peso' }, { text: 'mangiando' }, { text: 'cibo vero.', className: 'serif accent' }]}
              />
            </h1>
          )}

          <motion.p className="lead hero__lead" {...fadeUp(play, 0.75)}>
            <strong>Niente fame, niente calorie da contare, niente ricadute da affrontare da solo.</strong> Le diete falliscono perché finiscono. Con il Metodo Bussola ti affianco 1-1 per 6 mesi: per tornare in forma, ritrovare energia e imparare a restarci, anche quando la vita si mette di traverso.
          </motion.p>

          <motion.div className="cta-row" {...fadeUp(play, 0.9)}>
            <Btn to="/consulenza-conoscitiva">Scopri se il percorso fa per te</Btn>
            <Btn to="/masterclass" variant="ghost">
              Guarda la masterclass gratuita
            </Btn>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__dial"
          style={{ y: dialY }}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
          onPointerMove={north.onPointerMove}
          onPointerLeave={north.onPointerLeave}
        >
          <motion.div className="hero__ring" style={{ rotate: dialRotate }}>
            <Dial ring="METODO BUSSOLA · NUTRIZIONE · MOVIMENTO · COACHING · 6 MESI DI AFFIANCAMENTO · " showCardinals={false} />
          </motion.div>
          <div className="hero__portrait">
            <img src="/img/edo/hero.webp" alt="Dr. Edoardo Bo, biologo nutrizionista" fetchPriority="high" />
          </div>
          <Needle rotate={north.rotate} className="needle--hero" />

          <motion.div
            className="chip chip--a"
            initial={{ opacity: 0, x: -24 }}
            animate={play ? { opacity: 1, x: 0, y: [0, -9, 0] } : undefined}
            transition={{ opacity: { delay: 1.1, duration: 0.8 }, x: { delay: 1.1, duration: 0.8, ease: EASE }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <b>
              <Counter to={STATS.percorsi} prefix="+" />
            </b>
            <span>Percorsi completati</span>
          </motion.div>
          <motion.div
            className="chip chip--b"
            initial={{ opacity: 0, x: 24 }}
            animate={play ? { opacity: 1, x: 0, y: [0, 9, 0] } : undefined}
            transition={{ opacity: { delay: 1.3, duration: 0.8 }, x: { delay: 1.3, duration: 0.8, ease: EASE }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <b>{STATS.mesi}</b>
            <span>Mesi di affiancamento</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.p className="hero__role" {...fadeUp(play, 1.2)}>
        <b>Dr. Edoardo Bo</b> Biologo Nutrizionista · Mental Coach Certificato
      </motion.p>
    </section>
  )
}

export default Hero
