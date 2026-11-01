import React from 'react'
import PageHero from '../components/PageHero'
import Quotes from '../components/Quotes'
import VideoFacade from '../components/VideoFacade'
import { Btn, Kicker, Reveal } from '../components/Kit'
import { SITE, STATS } from '../data/site'
import { useSeo } from '../lib/motion'

const CryoVis = () => {
  useSeo('Metodo Bussola · Accesso esclusivo CryoVis | Dr. Edoardo Bo', 'Accesso diretto a una videochiamata gratuita con il Dr. Edoardo Bo.', '/landing-cryovis')

  return (
    <>
      <PageHero
        kicker="Accesso esclusivo · CryoVis"
        lines={[{ text: 'Esci dal ciclo' }, { text: 'delle diete.' }, { text: 'E lo fai con me.', className: 'serif accent' }]}
        lead="Guarda il video qui sotto. Se ti riconosci in quello che vedi, tramite CryoVis puoi prenotare una videochiamata gratuita senza passare dai miei collaboratori: direttamente con me."
      >
        <Reveal delay={0.5} className="trio-stats">
          <p><b>+{STATS.percorsi}</b> Percorsi completati</p>
          <p><b>{STATS.mesi}</b> Mesi di affiancamento</p>
          <p><b>4</b> Posti al mese</p>
        </Reveal>
      </PageHero>

      <section className="section section--tight">
        <div className="wrap wrap--narrow">
          <VideoFacade id="KUULHbxsxjw" title="Il Metodo Bussola" poster="/img/edo/ritratto.webp" />
          <div className="cta-row cta-row--center">
            <Btn href={SITE.booking} external>
              Blocca i tuoi 30 minuti gratuiti
            </Btn>
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>Storie vere, con nome e volto</Kicker>
          <Quotes />
        </div>
      </section>

      <section className="section">
        <div className="wrap center">
          <Kicker>Accesso diretto</Kicker>
          <h2 className="h h--lg">In 30 minuti sai se fa per te.</h2>
          <p className="lead">Una chiamata gratuita direttamente con me, senza passaggi intermedi. Solo 4 nuove persone al mese possono iniziare il percorso.</p>
          <div className="cta-row cta-row--center">
            <Btn href={SITE.booking} external>
              Blocca i tuoi 30 minuti gratuiti
            </Btn>
          </div>
        </div>
      </section>
    </>
  )
}

export default CryoVis
