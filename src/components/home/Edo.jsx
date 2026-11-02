import React from 'react'
import { motion } from 'framer-motion'
import { Btn, Kicker, MaskLines, Reveal } from '../Kit'
import { useParallax } from '../../lib/motion'

const TITOLI = ['Laurea magna cum laude in Scienze della Nutrizione', 'Master in Nutrizione per la Performance', 'Lifestyle Coach, Metodo Ongaro', 'Personal Trainer, Project InVictus']

const Edo = () => {
  const [ref, y] = useParallax(50)
  return (
    <section className="edo">
      <div className="wrap edo__grid">
        <div ref={ref} className="edo__photo">
          <motion.img src="/img/edo/studio.webp" alt="Dr. Edoardo Bo in camice, nel suo studio" loading="lazy" style={{ y, scale: 1.2 }} />
        </div>
        <div>
          <Kicker light>Chi sono</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Finalmente' }, { text: 'qualcuno che' }, { text: 'resta.', className: 'serif accent-deep' }]} />
          </h2>
          <Reveal>
            <p className="body">
              Hai già provato tutto? È esattamente di te che mi occupo. Non consegno diete: sono biologo nutrizionista e mental coach certificato, e unisco nutrizione, fisiologia e coaching comportamentale per un motivo semplice: la persona che vuoi tornare a essere c'è già, si è solo spenta. Il lavoro è toglierle di dosso quello che la copre, un'abitudine alla volta.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="edo__list">
              {TITOLI.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <Btn to="/chi-sono" variant="dark">
              Scopri chi ti affianca
            </Btn>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Edo
