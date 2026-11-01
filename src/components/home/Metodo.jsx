import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Dial, Needle } from '../Compass'
import { Btn, Kicker } from '../Kit'
import { PILASTRI, STATS } from '../../data/site'

const PANELS = [
  [-0.1, -0.05, 0.28, 0.36],
  [0.3, 0.38, 0.6, 0.68],
  [0.62, 0.7, 1.05, 1.1],
]

const Panel = ({ item, index, progress }) => {
  const w = PANELS[index]
  const opacity = useTransform(progress, w, [0, 1, 1, 0])
  const y = useTransform(progress, w, [60, 0, 0, -60])
  return (
    <motion.article className="pillar" style={{ opacity, y }}>
      <span className="pillar__n">
        0{index + 1} · {item.title}
      </span>
      <h3 className="h h--lg">{item.headline}</h3>
      <p className="body">{item.text}</p>
      <p className="pillar__strong">{item.strong}</p>
    </motion.article>
  )
}

// Tre pilastri, una bussola: lo scroll sposta l'ago da uno all'altro
const Metodo = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const rotate = useTransform(progress, [0, 0.28, 0.38, 0.6, 0.7, 1], [-60, -60, 60, 60, 180, 180])

  return (
    <section ref={ref} id="metodo" className="metodo">
      <div className="metodo__stick">
        <div className="wrap metodo__grid">
          <div className="metodo__left">
            <Kicker>Metodo Bussola</Kicker>
            <p className="metodo__intro">Mangi meglio, ti muovi meglio, reggi meglio.</p>
            <div className="metodo__dial">
              <Dial labels={PILASTRI.map((p) => ({ label: p.title, angle: p.angle }))} showCardinals={false} />
              <Needle rotate={rotate} className="needle--long" />
              <div className="metodo__core">
                <b>{STATS.mesi}</b>
                <span>mesi</span>
              </div>
            </div>
          </div>
          <div className="metodo__right">
            <div className="metodo__panels">
              {PILASTRI.map((p, i) => (
                <Panel key={p.key} item={p} index={i} progress={progress} />
              ))}
            </div>
            <Btn to="/metodo-bussola">Scopri il Metodo Bussola</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Metodo
