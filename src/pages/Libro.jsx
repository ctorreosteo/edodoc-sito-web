import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import MagneticField from '../components/MagneticField'
import FinalCta from '../components/FinalCta'
import { Btn, Kicker, MaskLines, Reveal } from '../components/Kit'
import { SITE } from '../data/site'
import { useSeo } from '../lib/motion'

const DENTRO = [
  'Perché il corpo si difende da ogni dieta restrittiva, e non è colpa tua',
  'I meccanismi che ti riportano sempre al punto di partenza',
  'Un approccio basato su cibi naturali e sazianti (carne, pesce, uova, frutta) che ti permette di mangiare bene senza pesare ogni grammo o rinunciare al gusto',
  'Come rendere questo stile di vita flessibile e sostenibile nel tempo, anche fuori casa',
  'Il primo passo concreto per uscire dal ciclo yo-yo',
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
  useSeo('Mangia bene, dimagrisci senza bilancia: il libro gratuito | Dr. Edoardo Bo', 'Dieta Flessibile Animal Based, il libro gratuito del Dr. Edoardo Bo: cibi naturali e sazianti, senza pesare ogni grammo.', '/libro')

  return (
    <>
      <section className="mc mb-hero">
        <MagneticField align={0.35} density={0.7} />
        <div className="wrap mc__grid">
          <div>
            <Kicker>Il libro gratuito · Dieta Flessibile Animal Based</Kicker>
            <h1 className="h h--hero">
              <MaskLines immediate delay={0.1} lines={[{ text: 'Mangia bene.' }, { text: 'Dimagrisci' }, { text: 'senza bilancia.', className: 'serif accent' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">Per chi è stufo di sentirsi a dieta: carne, pesce, uova, frutta. Impari a saziarti con cibi naturali, senza pesare ogni grammo e senza rinunciare al gusto, anche fuori casa.</p>
              <p className="stars">★★★★★ <span>357 recensioni verificate</span></p>
            </Reveal>
            <Reveal delay={0.5} className="cta-row">
              <Btn href={SITE.libro} external>
                Scaricalo gratis
              </Btn>
            </Reveal>
          </div>
          <Book3D />
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap split">
          <div>
            <Kicker>Perché è gratuito</Kicker>
            <h2 className="h h--lg">
              <MaskLines lines={[{ text: 'Il punto' }, { text: 'di partenza' }, { text: 'che ti mancava.', className: 'serif accent' }]} />
            </h2>
            <Reveal>
              <p className="body">Hai già provato tutto. Diete, nutrizionisti, app, piani alimentari. Ogni volta hai ricominciato da capo, convinto di essere tu il problema.</p>
              <p className="body">Questo libro è gratuito perché voglio che tu abbia almeno un punto di partenza reale, prima ancora di decidere se affidarti a qualcuno.</p>
            </Reveal>
          </div>
          <div>
            <h3 className="h h--sm split__sub">Cosa impari</h3>
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
