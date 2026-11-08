import React from 'react'
import MagneticField from './MagneticField'
import { Btn, Kicker, MaskLines, Reveal } from './Kit'
import { POSTI, SITE } from '../data/site'

const FinalCta = () => (
  <section className="final">
    <MagneticField align={0.92} density={0.8} />
    <div className="wrap final__in">
      <Kicker>La scelta è tua</Kicker>
      <h2 className="h h--xl">
        <MaskLines
          lines={[
            { text: 'Questa può essere' },
            { text: "l'ultima volta" },
            { text: 'che ricominci.', className: 'serif accent' },
          ]}
        />
      </h2>
      <Reveal delay={0.2}>
        <p className="lead">
          Puoi ripartire lunedì con l'ennesimo schema, da solo/a, come le altre volte. Oppure puoi farti affiancare da chi lavora ogni giorno con persone che hanno già provato tutto. Bastano 30 minuti gratuiti per sapere se ha senso.
          {POSTI.esauriti && ` I posti di quest'anno sono esauriti: si riparte a ${POSTI.mese}.`}
        </p>
      </Reveal>
      <Reveal delay={0.3} className="cta-row cta-row--center">
        <Btn href={SITE.booking} external>
          Blocca i tuoi 30 minuti gratuiti
        </Btn>
        <Btn to="/consulenza-conoscitiva" variant="ghost">
          Cosa succede nella call
        </Btn>
      </Reveal>
    </div>
  </section>
)

export default FinalCta
