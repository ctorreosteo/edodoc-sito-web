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
            <MaskLines lines={[{ text: 'In 30 minuti' }, { text: 'sai cosa' }, { text: 'ti blocca.', className: 'serif accent' }]} />
          </h2>
        </div>
        <Reveal className="sessione__note">
          <p className="body">Esci dalla chiamata con una risposta chiara: cosa non ha funzionato finora, e se posso aiutarti. Se non posso te lo dico, e hai comunque guadagnato 30 minuti di chiarezza.</p>
          {POSTI.esauriti && (
            <p className="tag-live">
              <i /> Posti di quest'anno esauriti · Si riparte a {POSTI.mese}
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
          Blocca i tuoi 30 minuti gratuiti
        </Btn>
      </Reveal>
    </div>

    <div className="wrap risorse">
      <Reveal>
        <Link to="/masterclass" className="risorsa risorsa--mc">
          <span className="risorsa__tag">Non sei pronto a parlarne? Inizia da qui</span>
          <h3 className="h h--md">Scopri perché riprendi sempre il peso</h3>
          <span className="risorsa__go">Guarda la lezione gratuita →</span>
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <Link to="/libro" className="risorsa risorsa--libro">
          <img src="/img/libro/libro-mockup.webp" alt="L'ebook Togli la pancia senza rinunce su iPad e iPhone" loading="lazy" />
          <span className="risorsa__tag">Il libro gratuito</span>
          <h3 className="h h--md">Impara a mangiare bene senza bilancia</h3>
          <span className="risorsa__go">{SITE.libro ? 'Scaricalo gratis →' : 'Scopri il libro →'}</span>
        </Link>
      </Reveal>
    </div>
  </section>
)

export default Sessione
