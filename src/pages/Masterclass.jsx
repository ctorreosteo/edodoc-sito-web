import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import MagneticField from '../components/MagneticField'
import LeadForm from '../components/LeadForm'
import Quotes from '../components/Quotes'
import { Kicker, MaskLines, Reveal } from '../components/Kit'
import { STATS } from '../data/site'
import { useSeo } from '../lib/motion'

const PUNTI = [
  ['Perché il tuo metabolismo sabota ogni dieta', 'e non è colpa tua'],
  ['I 3 loop che ti riportano sempre al punto di partenza', 'e come riconoscerli prima che ti blocchino ancora'],
  ['Cosa serve davvero per uscirne', 'in modo stabile e definitivo'],
]

const Masterclass = () => {
  useSeo('Masterclass gratuita | Dr. Edoardo Bo', 'Una video lezione gratuita per chi ha già provato tanti approcci e vuole capire cosa non ha funzionato davvero.', '/masterclass')

  return (
    <>
      <section className="mc">
        <MagneticField align={0.3} density={0.7} />
        <div className="wrap mc__grid">
          <div>
            <Kicker>Masterclass gratuita</Kicker>
            <h1 className="h h--xl">
              <MaskLines immediate delay={0.1} lines={[{ text: 'Perché hai' }, { text: 'fallito ogni', className: '' }, { text: 'dieta.', className: 'serif accent' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">Una video lezione gratuita per chi ha già provato tanti approcci e vuole capire cosa non ha funzionato davvero, e cosa cambia davvero.</p>
            </Reveal>
            <ul className="checks checks--tight">
              {PUNTI.map(([a, b], i) => (
                <Reveal as="li" key={a} delay={0.5 + i * 0.08}>
                  <i>
                    <Check size={16} strokeWidth={3} />
                  </i>
                  <p className="body">
                    <strong>{a}</strong>, {b}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.3} className="mc__card">
            <h2 className="h h--sm">Inserisci nome e email. Accedi subito.</h2>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap mc__bio">
          <img src="/img/edo/ritratto.webp" alt="Dr. Edoardo Bo" loading="lazy" />
          <div>
            <Kicker>Dr. Edoardo Bo</Kicker>
            <p className="lead">
              Sono Biologo, Nutrizionista e Mental Coach Certificato. Ho seguito centinaia di persone che avevano già provato tutto e avevano smesso di credere che potesse funzionare. Ho sviluppato il Metodo Bussola esattamente per loro.
            </p>
            <p className="storia__stat storia__stat--dark">
              <b>+{STATS.percorsi}</b>
              <span>persone con percorsi completati</span>
            </p>
            <Link to="/testimonianze" className="link">
              Guarda tutte le video testimonianze e i casi studio →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Quotes />
        </div>
      </section>
    </>
  )
}

export default Masterclass
