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
import { NON_PER_TE, PER_TE, STATS } from '../data/site'
import { useSeo } from '../lib/motion'

const CONFRONTO = [
  ['Ti consegna uno schema e ti saluta', 'Ti affianca uno a uno per 6 mesi'],
  ['Conti le calorie e pesi ogni grammo', 'Mangi cibo vero, senza bilancia e senza calcolatrice'],
  ['La fame è il prezzo da pagare', 'Cibi naturali e sazianti: la fame non è un requisito'],
  ['Grassi e carne da temere', 'Proteine animali di qualità e grassi non demonizzati'],
  ['Uno sgarro e salta tutto', 'Principio 80/20: i pasti liberi sono dentro il piano'],
  ['Lavora solo su cosa mangi', 'Lavora su cosa mangi e su chi sei quando mangi'],
  ['Finisce, e resti solo', 'Finisce quando sai orientarti da solo'],
]

const STRUMENTI = [
  { title: 'Correggi la rotta ogni settimana', text: 'Ogni settimana guardiamo i tuoi dati e adattiamo il piano. Non aspetti il controllo del mese dopo per scoprire che qualcosa non andava.', big: true },
  { title: 'Risposte quando ti servono', text: 'Audio e messaggi diretti. Perché le difficoltà non si presentano il giorno dell\'appuntamento.' },
  { title: 'Vedi i progressi ogni mese', text: 'La strada fatta e la prossima tappa, nero su bianco.' },
  { title: 'Un piano che segue la tua vita', text: 'Lavoro, viaggi, famiglia, cene: si piega lui, non tu.' },
  { title: 'Ti alleni senza stravolgere l\'agenda', text: "Un'attività mirata, costruita sul tuo punto di partenza. Niente allenamenti eroici da abbandonare dopo tre settimane." },
  { title: 'Reggi anche nei giorni storti', text: 'Abitudini, autosabotaggio, stress, fame nervosa: il punto esatto in cui ogni dieta si rompe. È qui che facciamo la differenza.' },
]

const ROTTA = [
  { title: 'Capisci cosa ti blocca', text: 'Una videochiamata gratuita di 30 minuti: analizzo la tua storia, individuo cosa ti blocca e ti dico con chiarezza se il percorso fa per te.' },
  { title: 'Ricevi un piano cucito su di te', text: 'Costruiamo alimentazione e movimento sui tuoi ritmi, senza stravolgere la tua vita.' },
  { title: 'Non resti mai solo', text: 'Check settimanali, chat privata e adattamenti continui. Nei momenti difficili non sei mai solo.' },
  { title: 'Sai orientarti senza di me', text: "Alla fine sai scegliere da solo, a casa e fuori casa. Non dipendi più da una dieta, né da me. È questo il vero obiettivo." },
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
                <h3 className="h h--md">Mangi bene e costruisci il risultato.</h3>
                <p className="body">La maggior parte dei tuoi pasti segue la base low-carb: cibi naturali e sazianti, costruiti sui tuoi ritmi.</p>
              </motion.div>
              <motion.div className="mb-num mb-num--free" style={{ opacity: b, y: by }}>
                <b>20%</b>
                <h3 className="h h--md">Vivi, senza sensi di colpa.</h3>
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
    'Metodo Bussola: dimagrisci senza vivere a dieta | Dr. Edoardo Bo',
    "Dimagrisci mangiando cibo vero, senza fame e senza contare calorie. Il Metodo Bussola è un affiancamento 1-1 di 6 mesi: low-carb flessibile con principio 80/20, check settimanali e coaching.",
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
              <MaskLines immediate delay={0.1} lines={[{ text: 'Dimagrisci' }, { text: 'senza vivere' }, { text: 'a dieta.', className: 'serif accent' }]} />
            </h1>
            <Reveal delay={0.4}>
              <p className="lead">
                <strong>{STATS.mesi} mesi di affiancamento 1-1 per perdere peso mangiando cibo vero, ritrovare energia e imparare a gestirti da solo.</strong> Niente fame da sopportare, niente calorie da contare: un'alimentazione low-carb flessibile con principio 80/20, dove la pizza con gli amici è già nel piano.
              </p>
            </Reveal>
            <Reveal delay={0.5} className="cta-row">
              <Btn to="/consulenza-conoscitiva">Scopri se il percorso fa per te</Btn>
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
            <MaskLines lines={[{ text: 'Smetti di ricominciare' }, { text: 'ogni lunedì.', className: 'serif accent' }]} />
          </h2>
          <Reveal>
            <p className="lead mb-lead">Ho sviluppato il Metodo Bussola dopo anni di lavoro con persone che avevano già provato tutto. Non mancava loro la forza di volontà. Mancava un metodo pensato per il giorno dopo la fine della dieta.</p>
          </Reveal>
          <div className="mb-vs" role="table" aria-label="Dieta classica e Metodo Bussola a confronto">
            <div className="mb-vs__head" role="row">
              <span role="columnheader">La dieta a termine</span>
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
            <MaskLines lines={[{ text: 'Non ricevi un piano.' }, { text: 'Ricevi qualcuno che resta.', className: 'serif accent' }]} />
          </h2>
          <Reveal>
            <p className="lead mb-lead">Hai già provato tutto, ma non hai mai avuto qualcuno che restasse con te per davvero. Per questo seguo ogni anno un numero fisso di persone: di più, e diventerebbe l'ennesimo schema.</p>
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
              <MaskLines lines={[{ text: 'Low-carb' }, { text: 'che ti sazia' }, { text: 'davvero.', className: 'serif accent-deep' }]} />
            </h2>
            <Reveal>
              <p className="body">Il cuore del metodo è un'alimentazione low-carb e animal based flessibile: cibi naturali e poco processati, proteine animali di qualità, grassi non demonizzati e una riduzione graduale dei carboidrati raffinati. Mangi bene, senza pesare ogni grammo e senza rinunciare al gusto o alla vita sociale.</p>
              <p className="body">Non è un modello uguale per tutti. Quantità, ritmi e scelte si costruiscono sulla tua storia e sulla tua giornata, e strumenti come il digiuno intermittente entrano solo se hanno senso per te.</p>
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
            <img src="/img/libro/libro-dispositivi.webp" alt="L'ebook Togli la pancia senza rinunce di Edoardo Bo su MacBook, iPad e iPhone" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <OttantaVenti />

      <section className="section section--deep">
        <div className="wrap">
          <Kicker>I tuoi 6 mesi</Kicker>
          <h2 className="h h--lg mb-rotta__title">
            <MaskLines lines={[{ text: 'Da «ricomincio lunedì»' }, { text: 'a «so cosa fare».', className: 'serif accent' }]} />
          </h2>
          <Rotta />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Kicker>Non è per tutti</Kicker>
          <h2 className="h h--lg">
            <MaskLines lines={[{ text: 'Sai subito' }, { text: 'se fa per te.', className: 'serif accent' }]} />
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
