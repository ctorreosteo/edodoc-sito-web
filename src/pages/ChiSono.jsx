import React from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import FinalCta from '../components/FinalCta'
import { Counter, Kicker, MaskLines, Reveal } from '../components/Kit'
import { STATS } from '../data/site'
import { useParallax, useSeo } from '../lib/motion'

const MISSIONE = [
  { title: 'Il mio sogno', text: 'Liberare le persone dalle false promesse delle diete, insegnando loro a nutrirsi con consapevolezza per vivere con energia, vitalità e soddisfazione.' },
  { title: 'Il mio obiettivo', text: 'Essere il punto di riferimento per chi desidera un benessere autentico, ispirando uno stile di vita sano e bilanciato tra corpo e mente.' },
  { title: 'Come lo faccio', text: 'Trasformando il rapporto con il cibo: niente più rinunce, solo energia, salute e risultati concreti, grazie a un metodo cucito su misura e sostenibile nel tempo.' },
]

const STUDI = [
  { title: 'Laurea magna cum laude in Scienze della Nutrizione', text: 'Grazie a una formazione scientifica di eccellenza, creo piani nutrizionali personalizzati, basati su evidenze scientifiche per garantirti risultati concreti e duraturi.' },
  { title: 'Master in Nutrizione per la Performance', text: "Ti aiuto a migliorare le tue prestazioni fisiche e mentali con un'alimentazione e un'integrazione ottimizzata, per raggiungere il tuo massimo potenziale nella vita quotidiana e professionale." },
  { title: 'Lifestyle Coach, Metodo Ongaro', text: 'Ti guido nella trasformazione del tuo stile di vita con un approccio che promuove salute fisica, benessere mentale ed equilibrio emotivo, per una qualità di vita migliore.' },
  { title: 'Laurea in Biological Sciences (U.P.O.)', text: 'Con una conoscenza avanzata della biologia umana, applico strategie nutrizionali innovative, adattate ai meccanismi specifici del tuo corpo.' },
  { title: 'Personal Trainer, Project InVictus', text: 'Unisco nutrizione e allenamento per aiutarti a costruire un corpo più forte, tonico e resiliente, prevenendo infortuni e migliorando la tua energia quotidiana.' },
]

const ChiSono = () => {
  useSeo('Chi sono | Dr. Edoardo Bo', 'Biologo nutrizionista e mental coach: la storia, la missione e gli studi del Dr. Edoardo Bo, ideatore del Metodo Bussola.', '/chi-sono')
  const [ref, y] = useParallax(50)

  return (
    <>
      <PageHero
        kicker="Biologo Nutrizionista · Mental Coach Certificato"
        lines={[{ text: 'Dr. Edoardo' }, { text: 'Bo.', className: 'serif accent' }]}
        lead="Ho sempre creduto che il benessere non sia solo una questione estetica, ma il risultato di un equilibrio tra mente, corpo ed energia."
      />

      <section className="storia">
        <div className="wrap storia__grid">
          <div ref={ref} className="storia__photo">
            <motion.img src="/img/edo/ritratto.webp" alt="Dr. Edoardo Bo in camice" style={{ y, scale: 1.18 }} />
          </div>
          <div className="storia__text">
            <Kicker light>La mia storia</Kicker>
            <h2 className="h h--lg">
              <MaskLines lines={[{ text: 'Un metodo' }, { text: 'diverso.', className: 'serif accent-deep' }]} />
            </h2>
            <Reveal>
              <p className="body">Questa convinzione mi ha portato a specializzarmi come biologo nutrizionista e mental coach, con l'obiettivo di aiutare le persone a riscoprire il loro potenziale fisico e mentale.</p>
              <p className="body">Troppe diete falliscono perché rigide, irrealistiche e lontane dalla vita reale. Per questo ho creato un metodo diverso: flessibile, sostenibile e integrato nella quotidianità, senza stravolgimenti.</p>
              <p className="body">La mia missione è trasformare il benessere dei miei clienti, unendo nutrizione, coaching e strategie di gestione dello stress per ottenere risultati concreti e duraturi. Ogni giorno lavoro per sfatare i falsi miti sulla salute e costruire percorsi su misura.</p>
            </Reveal>
            <Reveal className="storia__stat">
              <b>
                <Counter to={STATS.percorsi} prefix="+" />
              </b>
              <span>percorsi completati. Non si tratta solo di perdere peso, ma di sentirti meglio ogni giorno, senza rinunce impossibili o metodi che non funzionano.</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>La mia missione</Kicker>
          <div className="trio">
            {MISSIONE.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1} className="trio__item">
                <span>0{i + 1}</span>
                <h3 className="h h--md">{m.title}</h3>
                <p className="body">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>I miei studi</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Scienza prima,' }, { text: 'poi metodo.', className: 'serif accent' }]} />
          </h2>
          <ul className="studi">
            {STUDI.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h h--sm">{s.title}</h3>
                <p className="body">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default ChiSono
