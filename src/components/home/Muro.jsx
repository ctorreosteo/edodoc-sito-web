import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Btn, Counter, Kicker, MaskLines } from '../Kit'
import Quotes from '../Quotes'
import casi from '../../data/casi-index.json'
import { STATS } from '../../data/site'

const COLUMNS = 6
const columns = Array.from({ length: COLUMNS }, (_, c) => casi.filter((_, i) => i % COLUMNS === c))

const Column = ({ items, progress, speed }) => {
  const y = useTransform(progress, [0, 1], [speed > 0 ? -speed : 0, speed > 0 ? 0 : speed])
  return (
    <motion.div className="muro__col" style={{ y }}>
      {items.map((c) => (
        <Link key={c.slug} to={`/testimonianze/${c.slug}`} className="face" aria-label={`Caso studio di ${c.name}`}>
          <img src={`/img/casi/${c.slug}.webp`} alt="" loading="lazy" decoding="async" />
          <span>
            <b>{c.name}</b>
            {c.metric && <i>{c.metric}</i>}
          </span>
        </Link>
      ))}
    </motion.div>
  )
}

const Muro = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const speeds = [-260, 200, -340, 280, -210, 320]

  return (
    <section className="muro-section">
      <div ref={ref} className="muro">
        <div className="muro__grid">
          {columns.map((items, i) => (
            <Column key={i} items={items} progress={scrollYProgress} speed={speeds[i]} />
          ))}
        </div>
        <div className="muro__veil" />
        <div className="muro__center">
          <Kicker>Storie vere, con nome e volto</Kicker>
          <h2 className="h h--xl">
            <MaskLines lines={[{ text: 'Hanno smesso' }, { text: 'di ricominciare.' }, { text: 'Ora tocca a te.', className: 'serif accent' }]} />
          </h2>
          <p className="muro__count">
            <Counter to={STATS.percorsi} prefix="+" /> <small>percorsi completati</small>
          </p>
          <Btn to="/testimonianze">Guarda come ne sono usciti</Btn>
        </div>
      </div>

      <div className="wrap">
        <Quotes />
        <p className="mb-disclaimer">I risultati variano da persona a persona.</p>
      </div>
    </section>
  )
}

export default Muro
