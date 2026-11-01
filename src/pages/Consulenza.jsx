import React from 'react'
import { Check, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import FinalCta from '../components/FinalCta'
import Quotes from '../components/Quotes'
import { Btn, Kicker, MaskLines, Reveal } from '../components/Kit'
import { NON_PER_TE, PER_TE, POSTI, PROTOCOLLO, SITE } from '../data/site'
import { useSeo } from '../lib/motion'

const Consulenza = () => {
  useSeo('Consulenza gratuita: in 30 minuti sai cosa ti blocca | Dr. Edoardo Bo', '30 minuti gratuiti per capire perché le diete con te non hanno retto, dove sei bloccato e se il Metodo Bussola fa per te. Non accetto tutti.', '/consulenza-conoscitiva')
  const mese = POSTI.mese

  return (
    <>
      <PageHero
        kicker={POSTI.esauriti ? "Posti di quest'anno esauriti · Videochiamata gratuita, 30 minuti" : 'Videochiamata gratuita · 30 minuti'}
        lines={
          POSTI.esauriti
            ? [{ text: 'Assicurati' }, { text: 'il tuo posto' }, { text: `per ${mese}.`, className: 'serif accent' }]
            : [{ text: 'In 30 minuti' }, { text: 'sai se posso' }, { text: 'aiutarti.', className: 'serif accent' }]
        }
        lead={
          POSTI.esauriti
            ? `In 30 minuti gratuiti capisci perché le diete con te non hanno retto, dove sei bloccato e se ci sono i presupposti per lavorare insieme. Se ci sono, blocchi il tuo posto e parti al meglio dal primo giorno.`
            : 'In 30 minuti capisci perché le diete con te non hanno retto, dove sei bloccato e se ci sono i presupposti per lavorare insieme.'
        }
      >
        <Reveal delay={0.5} className="cta-row">
          <Btn href={SITE.booking} external>
            Blocca i tuoi 30 minuti gratuiti
          </Btn>
        </Reveal>
      </PageHero>

      {POSTI.esauriti && (
        <section className="section">
          <div className="wrap split">
            <div>
              <Kicker>Perché i posti sono pochi</Kicker>
              <h2 className="h h--lg">
                <MaskLines lines={[{ text: 'Pochi posti.' }, { text: 'Per seguirti davvero.', className: 'serif accent' }]} />
              </h2>
            </div>
            <Reveal>
              <p className="body">
                Seguo ogni anno un numero fisso di persone in affiancamento diretto. È l'unico modo per offrire un percorso cucito su misura invece di un piano scritto e lasciato lì. Per quest'anno quel numero l'ho raggiunto.
              </p>
              <p className="body">
                Se in videochiamata emergono i presupposti, riserviamo insieme uno dei posti di {mese}. I posti vanno a chi prenota prima, non a chi si presenta a {mese}: chi aspetta il momento giusto di solito lo aspetta anche l'anno dopo.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>È per te se</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Un percorso nato' }, { text: 'per persone come te.', className: 'serif accent' }]} />
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
          <h3 className="h h--md checks__title">Non è per te se</h3>
          <ul className="checks checks--no">
            {NON_PER_TE.map(([a, b], i) => (
              <Reveal as="li" key={a} delay={i * 0.08}>
                <i>
                  <X size={18} strokeWidth={3} />
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
          <Kicker>La tua videochiamata</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Cosa porti a casa' }, { text: 'in 30 minuti.', className: 'serif accent' }]} />
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
              È gratuita e senza impegno: nel peggiore dei casi te ne vai sapendo finalmente perché non ha funzionato.
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
