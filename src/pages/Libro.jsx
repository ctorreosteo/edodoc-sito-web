import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import MagneticField from '../components/MagneticField'
import FinalCta from '../components/FinalCta'
import { Btn, Kicker, MaskLines, Reveal } from '../components/Kit'
import { SITE } from '../data/site'
import { useSeo } from '../lib/motion'

const DENTRO = [
  'Perché il tuo metabolismo sabota ogni dieta, e non è colpa tua',
  'I meccanismi che ti riportano sempre al punto di partenza',
  'Un approccio basato su cibi naturali e sazianti (carne, pesce, uova, frutta) che ti permette di mangiare bene senza pesare ogni grammo o rinunciare al gusto',
  'Come rendere questo stile di vita flessibile e sostenibile nel tempo, anche fuori casa',
  'Il primo passo concreto per uscire dal ciclo in modo definitivo',
]

const FAQ = [
  {
    q: 'Per chi è il libro?',
    a: 'Per tutte le persone stufe di sentirsi a dieta, che desiderano provare un approccio low-carb basato su cibi naturali e animali, senza rinunce al gusto e alla socialità, e vogliono tornare ad avere la forma fisica che meritano.',
  },
  {
    q: 'Perché questo libro è diverso?',
    a: 'Perché finalmente ti dice la verità: non devi mai più essere a dieta. Dieta Flessibile Animal-Based mette al centro la tua salute, i cibi naturali e i tuoi obiettivi. Non troverai restrizioni inutili, ma un sistema che ti permette di raggiungere il tuo potenziale fisico e mentale, senza rinunciare ai cibi che ami.',
  },
]

const Book3D = () => {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 120, damping: 14 })
  const sy = useSpring(ry, { stiffness: 120, damping: 14 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 26)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -20)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <div ref={ref} className="book" onPointerMove={move} onPointerLeave={reset}>
      <motion.img
        src="/img/libro/libro.webp"
        alt="Dieta Flessibile Animal Based, libro del Dott. Edoardo Bo"
        style={{ rotateX: sx, rotateY: sy }}
        initial={{ opacity: 0, y: 60, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.3, delay: 0.2 }}
      />
    </div>
  )
}

const Libro = () => {
  useSeo('Dieta Flessibile Animal Based, il libro gratuito | Dr. Edoardo Bo', 'Non è una dieta. È il primo passo per smettere di fallire. Scarica gratis il libro del Dr. Edoardo Bo.', '/libro')

  return (
    <>
      <section className="mc">
        <MagneticField align={0.35} density={0.7} />
        <div className="wrap mc__grid">
          <div>
            <Kicker>Libro gratuito · Accesso immediato</Kicker>
            <h1 className="h h--xl">
              <MaskLines immediate delay={0.1} lines={[{ text: 'Dieta' }, { text: 'Flessibile', className: 'serif accent' }, { text: 'Animal Based.' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">Non è una dieta. È il primo passo per smettere di fallire.</p>
              <p className="stars">★★★★★ <span>357 recensioni verificate</span></p>
            </Reveal>
            <Reveal delay={0.5} className="cta-row">
              <Btn href={SITE.libro} external>
                Scarica ora, è gratuito
              </Btn>
            </Reveal>
          </div>
          <Book3D />
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap split">
          <div>
            <Kicker>Perché è gratis</Kicker>
            <h2 className="h h--lg">
              <MaskLines lines={[{ text: 'Non sei tu' }, { text: 'il problema.', className: 'serif accent' }]} />
            </h2>
            <Reveal>
              <p className="body">Hai già provato tutto. Diete, nutrizionisti, app, piani alimentari. Ogni volta hai ricominciato da capo, convinto di essere tu il problema.</p>
              <p className="body">Questo libro è gratuito perché voglio che tu abbia almeno un punto di partenza reale, prima ancora di decidere se affidarti a qualcuno.</p>
            </Reveal>
          </div>
          <div>
            <h3 className="h h--sm split__sub">Cosa trovi dentro</h3>
            <ul className="checks checks--tight">
              {DENTRO.map((d, i) => (
                <Reveal as="li" key={d} delay={i * 0.06}>
                  <i>
                    <Check size={16} strokeWidth={3} />
                  </i>
                  <p className="body">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq">
          <Kicker>Hai domande?</Kicker>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className="body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default Libro
