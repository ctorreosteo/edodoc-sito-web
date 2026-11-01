import React from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import FinalCta from '../components/FinalCta'
import { Counter, Kicker, MaskLines, Reveal } from '../components/Kit'
import { STATS } from '../data/site'
import { useParallax, useSeo } from '../lib/motion'

const MISSIONE = [
  { title: 'Ti libero dalle false promesse', text: 'Le false promesse: la dieta lampo, la colpa scaricata su chi non ce la fa, il cibo trattato come un nemico. Hanno convinto troppe persone di essere il problema.' },
  { title: 'Ti semplifico la vita', text: 'Poche abitudini giuste fanno quasi tutto il lavoro. Il benessere non si ottiene con la forza di volontà: si costruisce smettendo di lavorare contro di sé.' },
  { title: 'Ti seguo per intero', text: 'Uno a uno, sulla persona intera: cosa mangi, come ti muovi, cosa succede nella tua testa quando la giornata va storta. Con un metodo che regge fuori dallo studio.' },
]

const STUDI = [
  { title: 'Laurea magna cum laude in Scienze della Nutrizione', text: 'Per te significa un piano costruito sulle evidenze scientifiche, non sulla moda del momento.' },
  { title: 'Master in Nutrizione per la Performance', text: "Per te significa più energia e lucidità dove servono: in agenda, al lavoro, nella vita di tutti i giorni." },
  { title: 'Lifestyle Coach, Metodo Ongaro', text: 'Per te significa lavorare su abitudini, stress ed equilibrio emotivo, non solo su quello che hai nel piatto.' },
  { title: 'Laurea in Biological Sciences (U.P.O.)', text: 'Per te significa capire come funziona il tuo corpo, invece di subirlo a colpi di regole.' },
  { title: 'Personal Trainer, Project InVictus', text: 'Per te significa un allenamento che si integra con la nutrizione, senza estremismi e senza farti male.' },
]

const ChiSono = () => {
  useSeo('Dr. Edoardo Bo, il nutrizionista che resta al tuo fianco', 'Biologo nutrizionista e mental coach, ideatore del Metodo Bussola: scienza della nutrizione, lavoro sulla mente e affiancamento 1-1.', '/chi-sono')
  const [ref, y] = useParallax(50)

  return (
    <>
      <PageHero
        kicker="Dr. Edoardo Bo · Biologo Nutrizionista · Mental Coach Certificato"
        lines={[{ text: 'Il nutrizionista' }, { text: 'che resta' }, { text: 'al tuo fianco.', className: 'serif accent' }]}
        lead="Non hai bisogno dell'ennesima dieta. Hai bisogno del percorso che mancava: scienza della nutrizione, lavoro sulla mente e qualcuno con cui farlo."
      />

      <section className="storia">
        <div className="wrap storia__grid">
          <div ref={ref} className="storia__photo">
            <motion.img src="/img/edo/ritratto.webp" alt="Dr. Edoardo Bo in camice" style={{ y, scale: 1.18 }} />
          </div>
          <div className="storia__text">
            <Kicker light>La mia storia</Kicker>
            <h2 className="h h--lg">
              <MaskLines lines={[{ text: 'Corpo e mente' }, { text: 'insieme.' }, { text: 'Così il risultato regge.', className: 'serif accent-deep' }]} />
            </h2>
            <Reveal>
              <p className="body">Perché il benessere non è una questione estetica: è un equilibrio tra mente, corpo ed energia. Per questo mi sono specializzato sia come biologo nutrizionista sia come mental coach. Lavorare su uno solo dei due lati significa lasciare il lavoro a metà.</p>
              <p className="body">Troppe diete falliscono perché rigide, irrealistiche e lontane dalla vita reale. Il mio metodo fa il contrario: è flessibile, sostenibile e si infila nella tua giornata invece di stravolgerla.</p>
              <p className="body">Le persone che arrivano da me hanno quasi sempre già provato di tutto. Non hanno bisogno di un'altra lista di cibi permessi. Hanno bisogno di capire perché tornano sempre al punto di partenza, e di qualcuno che resti al loro fianco mentre cambiano.</p>
            </Reveal>
            <Reveal className="storia__stat">
              <b>
                <Counter to={STATS.percorsi} prefix="+" />
              </b>
              <span>percorsi completati. Non solo chili in meno: più energia, più lucidità, più fiducia in se stessi.</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>Cosa ottieni lavorando con me</Kicker>
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
            <MaskLines lines={[{ text: 'Hai la scienza' }, { text: 'dalla tua parte.', className: 'serif accent' }]} />
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
