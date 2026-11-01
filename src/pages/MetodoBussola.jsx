import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check, X } from 'lucide-react'
import MagneticField from '../components/MagneticField'
import FinalCta from '../components/FinalCta'
import Quotes from '../components/Quotes'
import { Dial, Needle, useFindNorth } from '../components/Compass'
import { Btn, Kicker, MaskLines, Reveal } from '../components/Kit'
import { useIntroDone } from '../components/Layout'
import { PER_TE, STATS } from '../data/site'
import { useSeo } from '../lib/motion'

const CONFRONTO = [
  ['Un piano scritto e lasciato lì', 'Ti seguo io, uno a uno, per 6 mesi'],
  ['Conti le calorie e pesi ogni grammo', 'Cibi naturali e sazianti, senza convivere con la fame'],
  ['Regole rigide: o tutto o niente', 'Principio 80/20: la flessibilità è parte del piano'],
  ['Finita la dieta, riprendi il peso', 'Impari a gestirti in autonomia'],
]

const STRUMENTI = [
  { title: 'Check ogni settimana', text: 'Analizziamo insieme i progressi e adattiamo il piano. Non aspetti mesi per capire se sta funzionando.', big: true },
  { title: 'Chat privata', text: 'Audio e messaggi diretti, per affrontare le difficoltà nel momento in cui arrivano.' },
  { title: 'Report mensili', text: 'Ogni mese guardiamo la strada fatta e decidiamo la prossima.' },
  { title: 'Piano che si adatta', text: 'Lavoro, viaggi, famiglia, cene: il piano si modifica sulla tua vita, non il contrario.' },
  { title: 'Movimento', text: "Un'attività mirata e sostenibile, costruita sul tuo punto di partenza." },
  { title: 'Coaching', text: 'Lavoriamo su abitudini, autosabotaggio e stress: la parte che nessun piano dietetico ha mai affrontato.' },
]

const ROTTA = [
  { title: 'Consulenza conoscitiva', text: 'Una videochiamata gratuita di 30 minuti: analizzo la tua storia, individuo cosa ti blocca e ti dico con chiarezza se il percorso fa per te.' },
  { title: 'Il piano cucito su di te', text: 'Costruiamo alimentazione e movimento sui tuoi ritmi, senza stravolgere la tua vita.' },
  { title: 'Sei mesi fianco a fianco', text: 'Check settimanali, chat privata e adattamenti continui. Nei momenti difficili non sei mai solo.' },
  { title: 'La tua bussola', text: "Alla fine hai gli strumenti per scegliere da solo, a casa e fuori casa. Non dipendi più da una dieta, né da me." },
]

const CIBI = ['Carne', 'Pesce', 'Uova', 'Frutta']

const GIORNI = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const LIBERI = { 13: 'Ristorante', 16: 'Aperitivo', 18: 'Pizza', 19: 'Compleanno' }
const PASTI = Array.from({ length: 21 }, (_, i) => i)
const LIBERI_INDICI = Object.keys(LIBERI).map(Number)

const Pasto = ({ i, progress }) => {
  // I pasti sono per riga (colazione, pranzo, cena) ma si riempiono giorno per giorno
  const day = i % 7
  const start = 0.04 + (day / 7) * 0.32 + (Math.floor(i / 7) / 3) * 0.04
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1])
  const scale = useTransform(progress, [start, start + 0.05], [0.6, 1])
  const free = LIBERI_INDICI.indexOf(i)
  const flipAt = 0.58 + Math.max(free, 0) * 0.05
  const freeOpacity = useTransform(progress, [flipAt, flipAt + 0.04], [0, 1])
  return (
    <motion.div className="mb-pasto" style={{ opacity, scale }}>
      {free >= 0 && (
        <motion.span className="mb-pasto__free" style={{ opacity: freeOpacity }}>
          {LIBERI[i]}
        </motion.span>
      )}
    </motion.div>
  )
}

// Una settimana da 21 pasti: 17 seguono la base low-carb, 4 sono liberi
const OttantaVenti = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const a = useTransform(progress, [0, 0.03, 0.5, 0.56], [1, 1, 1, 0])
  const b = useTransform(progress, [0.5, 0.56, 1], [0, 1, 1])
  const ay = useTransform(progress, [0.5, 0.56], [0, -40])
  const by = useTransform(progress, [0.5, 0.56], [40, 0])

  return (
    <section ref={ref} className="mb-8020">
      <div className="mb-8020__stick">
        <div className="wrap mb-8020__grid">
          <div className="mb-8020__copy">
            <Kicker>Il principio 80/20</Kicker>
            <div className="mb-8020__stage">
              <motion.div className="mb-num" style={{ opacity: a, y: ay }}>
                <b>80%</b>
                <h3 className="h h--md">La tua base low-carb.</h3>
                <p className="body">La maggior parte dei tuoi pasti segue il piano: cibi naturali e sazianti, costruiti sui tuoi ritmi. È qui che si costruisce il risultato.</p>
              </motion.div>
              <motion.div className="mb-num mb-num--free" style={{ opacity: b, y: by }}>
                <b>20%</b>
                <h3 className="h h--md">La tua vita.</h3>
                <p className="body">La pizza, il ristorante, il compleanno. I pasti liberi sono previsti dal piano, non sono uno sgarro da espiare. E se esci dalla rotta, sai come rientrare subito, senza sensi di colpa.</p>
              </motion.div>
            </div>
          </div>

          <div className="mb-week">
            <div className="mb-week__days">
              {GIORNI.map((g) => (
                <span key={g}>{g}</span>
              ))}
            </div>
            <div className="mb-week__grid">
              {PASTI.map((i) => (
                <Pasto key={i} i={i} progress={progress} />
              ))}
            </div>
            <p className="mb-week__legend">
              <span>
                <i /> Pasto del piano
              </span>
              <span>
                <i className="is-free" /> Pasto libero
              </span>
            </p>
            <p className="mb-week__note">Esempio di una settimana da 21 pasti. Il piano reale è costruito su di te.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const Rotta = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  return (
    <ol ref={ref} className="mb-rotta">
      <span className="caso-rail" aria-hidden="true">
        <motion.span style={{ scaleY: scrollYProgress }} />
      </span>
      {ROTTA.map((r, i) => (
        <Reveal as="li" key={r.title} className="caso-sec">
          <span className="caso-sec__dot">{i + 1}</span>
          <h3 className="h h--md">{r.title}</h3>
          <p>{r.text}</p>
        </Reveal>
      ))}
    </ol>
  )
}

const MetodoBussola = () => {
  useSeo(
    'Metodo Bussola: il percorso 1-1 low-carb flessibile | Dr. Edoardo Bo',
    "Il Metodo Bussola è un percorso di affiancamento 1-1 di 6 mesi: alimentazione low-carb flessibile con principio 80/20, check settimanali e coaching. Senza rinunce, senza diete rigide.",
    '/metodo-bussola',
  )
  const play = useIntroDone()
  const north = useFindNorth(play)

  return (
    <>
      <section className="mc mb-hero">
        <MagneticField align={0.4} density={0.7} />
        <div className="wrap mc__grid">
          <div>
            <Kicker>Percorso di affiancamento 1-1 · {STATS.mesi} mesi</Kicker>
            <h1 className="h h--hero">
              <MaskLines immediate delay={0.1} lines={[{ text: 'Non è' }, { text: 'una dieta.' }, { text: 'È una bussola.', className: 'serif accent' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">
                <strong>Una dieta ti dice cosa mangiare finché dura.</strong> Il Metodo Bussola è il percorso con cui ti seguo personalmente, uno a uno, per {STATS.mesi} mesi: un'alimentazione low-carb flessibile con principio 80/20, e il lavoro sulle abitudini che ti riportavano sempre al punto di partenza.
              </p>
            </Reveal>
            <Reveal delay={0.5} className="cta-row">
              <Btn to="/consulenza-conoscitiva">Prenota la consulenza conoscitiva</Btn>
            </Reveal>
          </div>
          <div className="mb-dial" onPointerMove={north.onPointerMove} onPointerLeave={north.onPointerLeave} aria-hidden="true">
            <Dial ring="UNO A UNO · LOW-CARB FLESSIBILE · PRINCIPIO 80/20 · 6 MESI DI AFFIANCAMENTO · " showCardinals={false} />
            <Needle rotate={north.rotate} className="needle--short" />
            <div className="mb-core">
              <b>1-1</b>
              <span>Sempre con te</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>Cos'è</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Quello che manca' }, { text: 'a ogni dieta.', className: 'serif accent' }]} />
          </h2>
          <Reveal>
            <p className="lead mb-lead">Ho sviluppato il Metodo Bussola dopo anni di lavoro su persone che avevano già provato tutto. Il problema non era la loro forza di volontà: era un metodo fatto per durare poche settimane.</p>
          </Reveal>
          <div className="mb-vs" role="table" aria-label="Dieta classica e Metodo Bussola a confronto">
            <div className="mb-vs__head" role="row">
              <span role="columnheader">La dieta classica</span>
              <span role="columnheader">Il Metodo Bussola</span>
            </div>
            {CONFRONTO.map(([a, b], i) => (
              <Reveal key={a} delay={i * 0.06} className="mb-vs__row">
                <p>
                  <X size={18} /> {a}
                </p>
                <p>
                  <Check size={18} strokeWidth={3} /> {b}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>Affiancamento 1-1</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Non ricevi un piano.' }, { text: 'Ricevi me.', className: 'serif accent' }]} />
          </h2>
          <Reveal>
            <p className="lead mb-lead">Seguo ogni anno un numero fisso di persone in affiancamento diretto: è l'unico modo per garantire un percorso davvero cucito su misura.</p>
          </Reveal>
          <div className="mb-bento">
            {STRUMENTI.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.07} className={s.big ? 'mb-tool mb-tool--big' : 'mb-tool'}>
                <h3 className="h h--sm">{s.title}</h3>
                <p className="body">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-lowcarb">
        <div className="wrap mb-lowcarb__grid">
          <div>
            <Kicker light>L'alimentazione</Kicker>
            <h2 className="h h--lg">
              <MaskLines lines={[{ text: 'Low-carb,' }, { text: 'senza vivere', className: '' }, { text: 'a dieta.', className: 'serif accent-deep' }]} />
            </h2>
            <Reveal>
              <p className="body">Il cuore del metodo è un approccio low-carb basato su cibi naturali e sazianti, con una riduzione graduale dei carboidrati e proteine di qualità. Mangi bene, senza pesare ogni grammo e senza rinunciare al gusto o alla vita sociale.</p>
              <p className="body">Non è un modello uguale per tutti: quantità, ritmi e scelte vengono costruiti sulla tua storia, sui tuoi obiettivi e sulla tua giornata.</p>
            </Reveal>
            <Reveal className="mb-cibi">
              {CIBI.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </Reveal>
            <Reveal>
              <Link to="/libro" className="link link--deep">
                Approfondisci nel libro gratuito →
              </Link>
            </Reveal>
          </div>
          <Reveal className="mb-lowcarb__photo">
            <img src="/img/libro/libro-tessuto.webp" alt="Il libro Dieta Flessibile Animal Based di Edoardo Bo" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <OttantaVenti />

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>Come funziona</Kicker>
          <h2 className="h h--lg mb-rotta__title">
            <MaskLines lines={[{ text: 'La rotta' }, { text: 'dei 6 mesi.', className: 'serif accent' }]} />
          </h2>
          <Rotta />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>Per chi è</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Ti riconosci' }, { text: 'in questo?', className: 'serif accent' }]} />
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

      <section className="section section--deep">
        <div className="wrap">
          <Quotes />
          <p className="mb-disclaimer">I risultati variano da persona a persona. I contenuti di questa pagina sono informativi e non sostituiscono il parere del medico.</p>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default MetodoBussola
