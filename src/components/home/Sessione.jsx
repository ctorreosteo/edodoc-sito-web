import React from 'react'
import { Link } from 'react-router-dom'
import { Btn, Kicker, MaskLines, Reveal } from '../Kit'
import { POSTI, PROTOCOLLO, SITE } from '../../data/site'

const Sessione = () => (
  <section className="sessione">
    <div className="wrap">
      <div className="sessione__head">
        <div>
          <Kicker>Videochiamata gratuita · 30 minuti</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Cosa succede' }, { text: 'nella prima', className: '' }, { text: 'consulenza.', className: 'serif accent' }]} />
          </h2>
        </div>
        <Reveal className="sessione__note">
          <p className="body">Analizzeremo insieme le tue abitudini e i tuoi obiettivi. Ti aiuterò a capire cosa ti sta bloccando e come puoi iniziare a migliorare sin da subito.</p>
          {POSTI.esauriti && (
            <p className="tag-live">
              <i /> Posti di quest'anno esauriti · Prenotazioni aperte per {POSTI.mese}
            </p>
          )}
        </Reveal>
      </div>

      <ol className="steps">
        {PROTOCOLLO.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.1} className="step">
            <span className="step__n">{i + 1}</span>
            <h3 className="h h--sm">{s.title}</h3>
            <p className="body">{s.text}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="cta-row">
        <Btn href={SITE.booking} external>
          Prenota la videochiamata gratuita
        </Btn>
      </Reveal>
    </div>

    <div className="wrap risorse">
      <Reveal>
        <Link to="/masterclass" className="risorsa risorsa--mc">
          <span className="risorsa__tag">Video lezione gratuita</span>
          <h3 className="h h--md">Perché hai fallito ogni dieta, e cosa cambia davvero</h3>
          <span className="risorsa__go">Guarda la masterclass →</span>
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <Link to="/libro" className="risorsa risorsa--libro">
          <img src="/img/libro/libro.webp" alt="Copertina del libro Dieta Flessibile Animal Based" loading="lazy" />
          <span className="risorsa__tag">Libro gratuito</span>
          <h3 className="h h--md">Dieta Flessibile Animal Based</h3>
          <span className="risorsa__go">Scopri il libro →</span>
        </Link>
      </Reveal>
    </div>
  </section>
)

export default Sessione
