import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import CaseCard from '../components/CaseCard'
import FinalCta from '../components/FinalCta'
import casi from '../data/casi-index.json'
import { EASE, useSeo } from '../lib/motion'

const FILTERS = ['Tutti', 'Dimagrimento', 'Massa muscolare', 'Imprenditori e manager', 'Mentalità e autostima', 'Salute ed energia']

const Testimonianze = () => {
  useSeo('Testimonianze e casi studio | Dr. Edoardo Bo', 'Video testimonianze e casi studio dei percorsi con il Metodo Bussola: situazione di partenza, percorso effettuato e risultati ottenuti.', '/testimonianze')
  const [filter, setFilter] = useState('Tutti')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return casi.filter((c) => (filter === 'Tutti' || c.tags.includes(filter)) && (!q || c.title.toLowerCase().includes(q)))
  }, [filter, query])

  return (
    <>
      <PageHero
        kicker={`${casi.length} video testimonianze e casi studio`}
        lines={[{ text: 'Chi ha già' }, { text: 'cambiato tutto.', className: 'serif accent' }]}
        lead="Persone vere, storie vere: dove erano, cosa hanno fatto, dove sono arrivate."
      />

      <section className="section section--tight">
        <div className="wrap">
          <div className="filters">
            <div className="filters__pills" role="group" aria-label="Filtra per obiettivo">
              {FILTERS.map((f) => (
                <button key={f} className={f === filter ? 'is-on' : ''} onClick={() => setFilter(f)} aria-pressed={f === filter}>
                  {f}
                </button>
              ))}
            </div>
            <label className="filters__search">
              <Search size={16} />
              <input type="search" placeholder="Cerca un nome" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Cerca un nome" />
            </label>
          </div>

          <motion.div layout className="cases">
            <AnimatePresence mode="popLayout">
              {list.map((c) => (
                <motion.div key={c.slug} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.5, ease: EASE }}>
                  <CaseCard caso={c} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="body cases__empty">Nessun caso studio trovato.</p>}
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default Testimonianze
