import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SITE } from '../data/site'
import { EASE } from '../lib/motion'

// La scelta vale 6 mesi, poi il banner si ripresenta (linee guida Garante 2021)
const KEY = 'edo-cookie'
const DURATA = 1000 * 60 * 60 * 24 * 180
export const OPEN_EVENT = 'edo-cookie-open'

const leggiScelta = () => {
  try {
    const s = JSON.parse(window.localStorage.getItem(KEY))
    if (s && Date.now() - s.data < DURATA) return s.scelta
  } catch {
    // Storage bloccato o valore rovinato: si richiede il consenso
  }
  return null
}

const salvaScelta = (scelta) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ scelta, data: Date.now() }))
  } catch {
    // Storage bloccato: il banner ricomparirà alla prossima visita
  }
}

export const consensoCookie = () => leggiScelta() === 'accettati'

// Per il link "Preferenze cookie" nel footer
export const apriPreferenzeCookie = () => window.dispatchEvent(new Event(OPEN_EVENT))

const CookieBanner = ({ ready = true }) => {
  const [open, setOpen] = useState(() => leggiScelta() === null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  const scegli = (scelta) => {
    salvaScelta(scelta)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && ready && (
        <motion.div
          className="cookie"
          role="dialog"
          aria-live="polite"
          aria-label="Informativa sui cookie"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Chiudere con la X equivale a rifiutare */}
          <button className="cookie__close" onClick={() => scegli('rifiutati')} aria-label="Chiudi e rifiuta">
            <X size={18} />
          </button>
          <p>
            Questo sito usa cookie tecnici, necessari al funzionamento. Con il tuo consenso potremmo usare anche cookie di terze parti
            per misurare le visite e mostrarti contenuti esterni. Leggi la{' '}
            <a href={SITE.cookie} target="_blank" rel="noopener noreferrer">
              cookie policy
            </a>
            .
          </p>
          <div className="cookie__actions">
            <button className="cookie__btn" onClick={() => scegli('rifiutati')}>
              Rifiuta
            </button>
            <button className="cookie__btn" onClick={() => scegli('accettati')}>
              Accetta
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
