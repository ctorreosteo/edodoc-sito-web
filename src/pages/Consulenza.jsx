import React from 'react'
import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import FinalCta from '../components/FinalCta'
import Quotes from '../components/Quotes'
import { Btn, Kicker, MaskLines, Reveal } from '../components/Kit'
import { PER_TE, POSTI, PROTOCOLLO, SITE } from '../data/site'
import { useSeo } from '../lib/motion'

const Consulenza = () => {
  useSeo('Consulenza conoscitiva | Dr. Edoardo Bo', 'Videochiamata gratuita di 30 minuti per capire dove sei bloccato, perché le diete non hanno funzionato e se il Metodo Bussola fa per te.', '/consulenza-conoscitiva')
  const mese = POSTI.mese

  return (
    <>
      <PageHero
        kicker="Videochiamata gratuita · 30 minuti"
        lines={
          POSTI.esauriti
            ? [{ text: 'I posti per' }, { text: "quest'anno sono" }, { text: 'esauriti.', className: 'serif accent' }]
            : [{ text: 'Prenota la tua' }, { text: 'consulenza', className: 'serif accent' }, { text: 'conoscitiva.' }]
        }
        lead={
          POSTI.esauriti
            ? `Una sessione clinica e diagnostica per capire dove sei bloccato, perché le diete non hanno funzionato e se ci sono i presupposti per il mio percorso di affiancamento. Se ci sono, puoi prenotare il tuo posto per iniziare con me da ${mese}.`
            : 'Una sessione clinica e diagnostica per capire dove sei bloccato, perché le diete non hanno funzionato e se ci sono i presupposti per il mio percorso di affiancamento.'
        }
      >
        <Reveal delay={0.5} className="cta-row">
          <Btn href={SITE.booking} external>
            Prenota la tua videochiamata gratuita
          </Btn>
        </Reveal>
      </PageHero>

      {POSTI.esauriti && (
        <section className="section">
          <div className="wrap split">
            <div>
              <Kicker>Il motivo</Kicker>
              <h2 className="h h--lg">
                <MaskLines lines={[{ text: 'Perché la lista' }, { text: "d'attesa.", className: 'serif accent' }]} />
              </h2>
            </div>
            <Reveal>
              <p className="body">
                Seguo ogni anno un numero fisso di persone in affiancamento diretto: è l'unico modo in cui riesco a garantire un percorso davvero cucito su misura, non un piano scritto e lasciato lì. A questo punto dell'anno ho già raggiunto quel numero.
              </p>
              <p className="body">
                Se durante la videochiamata emergono i presupposti per iniziare il percorso con me, riserviamo insieme uno dei posti disponibili per {mese}, così parti al meglio fin dal primo giorno. I posti si esauriscono in base a chi prenota, non a chi si presenta a {mese}.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>Questa videochiamata è per te se</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Ti riconosci', className: '' }, { text: 'in questo.', className: 'serif accent' }]} />
          </h2>
          <ul className="checks">
            {PER_TE.map(([a, b], i) => (
              <Reveal as="li" key={a} delay={i * 0.08}>
                <i>
                  <Check size={18} strokeWidth={3} />
                </i>
                <div>
                  <h3 className="h h--sm">{a}</h3>
                  <p className="body">{b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>Protocollo della sessione</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Cosa succede' }, { text: 'durante la call.', className: 'serif accent' }]} />
          </h2>
          <ol className="steps">
            {PROTOCOLLO.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="step">
                <span className="step__n">{i + 1}</span>
                <h3 className="h h--sm">{s.title}</h3>
                <p className="body">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="body note">
              La videochiamata è gratuita e senza impegno.
              {POSTI.esauriti && ` Se dalla call risulta che ci siamo, ti spiego come funziona la prenotazione e blocchi il tuo posto per ${mese}. Non c'è nulla da decidere prima di quel momento.`}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap">
          <Quotes />
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default Consulenza
