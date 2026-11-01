import React from 'react'
import PageHero from '../components/PageHero'
import { Btn } from '../components/Kit'
import { useSeo } from '../lib/motion'

const NotFound = () => {
  useSeo('Pagina non trovata | Dr. Edoardo Bo', 'La pagina che cerchi non esiste.', '/404')
  return (
    <PageHero kicker="Errore 404" lines={[{ text: 'Fuori' }, { text: 'rotta.', className: 'serif accent' }]} lead="Questa pagina non esiste. Riprendiamo la direzione giusta." align={0}>
      <div className="cta-row">
        <Btn to="/">Torna alla home</Btn>
      </div>
    </PageHero>
  )
}

export default NotFound
