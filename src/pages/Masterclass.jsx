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
  ['Perché il corpo si difende da ogni dieta restrittiva', 'e perché non è colpa tua'],
  ['I 3 loop che ti riportano sempre al punto di partenza', 'e come riconoscerli prima che scattino di nuovo'],
  ['Cosa deve cambiare davvero', 'per non ricominciare da capo a settembre'],
]

const Masterclass = () => {
  useSeo('Masterclass gratuita: scopri perché riprendi sempre il peso | Dr. Edoardo Bo', 'Non hai fallito tu, la dieta sì. Una video lezione gratuita per capire perché torni sempre al punto di partenza e cosa deve cambiare.', '/masterclass')

  return (
    <>
      <section className="mc mb-hero">
        <MagneticField align={0.3} density={0.7} />
        <div className="wrap mc__grid">
          <div>
            <Kicker>Masterclass gratuita</Kicker>
            <h1 className="h h--hero">
              <MaskLines immediate delay={0.1} lines={[{ text: 'Scopri perché' }, { text: 'riprendi' }, { text: 'sempre il peso.', className: 'serif accent' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">Non hai fallito tu: ha fallito la dieta. In questa video lezione gratuita capisci cosa è successo davvero le altre volte, così smetti di darti la colpa e sai cosa cambiare prima di ripartire.</p>
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
            <h2 className="h h--sm">Dove ti mando la lezione?</h2>
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
              Sono biologo nutrizionista e mental coach certificato. Ho seguito centinaia di persone che avevano già provato tutto e avevano smesso di crederci. Il Metodo Bussola esiste per loro.
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
