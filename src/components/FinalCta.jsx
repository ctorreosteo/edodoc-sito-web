import React from 'react'
import MagneticField from './MagneticField'
import { Btn, Kicker, MaskLines, Reveal } from './Kit'
import { POSTI, SITE } from '../data/site'

const FinalCta = () => (
  <section className="final">
    <MagneticField align={0.92} density={0.8} />
    <div className="wrap final__in">
      <Kicker>Ora, una domanda per te</Kicker>
      <h2 className="h h--xl">
        <MaskLines
          lines={[
            { text: 'Pronto a uscire' },
            { text: 'dal ciclo delle' },
            { text: 'diete yo-yo?', className: 'serif accent' },
          ]}
        />
      </h2>
      <Reveal delay={0.2}>
        <p className="lead">
          Prenota la tua consulenza conoscitiva e scopri come posso aiutarti, passo dopo passo, a raggiungere i tuoi obiettivi con un metodo cucito sulla tua persona.
          {POSTI.esauriti && ` I posti per quest'anno sono esauriti: si riparte da ${POSTI.mese}.`}
        </p>
      </Reveal>
      <Reveal delay={0.3} className="cta-row cta-row--center">
        <Btn href={SITE.booking} external>
          Prenota la videochiamata gratuita
        </Btn>
        <Btn to="/consulenza-conoscitiva" variant="ghost">
          Come funziona
        </Btn>
      </Reveal>
    </div>
  </section>
)

export default FinalCta
