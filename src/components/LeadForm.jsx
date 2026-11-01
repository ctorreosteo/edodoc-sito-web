import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SITE } from '../data/site'

// Iscrizione MailerLite. La risposta è opaca (no-cors): senza errore di rete la diamo per riuscita
const LeadForm = ({ action = SITE.masterclassForm, cta = 'Mandami la lezione gratuita' }) => {
  const [state, setState] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    data.set('ml-submit', '1')
    data.set('anticsrf', 'true')
    data.set('ajax', '1')
    setState('sending')
    try {
      await fetch(action, { method: 'POST', body: data, mode: 'no-cors' })
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="form__done">
        <i>
          <Check size={22} />
        </i>
        <h3 className="h h--sm">Perfetto, controlla la tua email!</h3>
        <p className="body">
          Ti ho appena mandato un'email con il link alla lezione gratuita. Se non la vedi, controlla la cartella spam o promozioni e spostala in arrivo.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>
        <span>Nome</span>
        <input type="text" name="fields[name]" autoComplete="given-name" required />
      </label>
      <label>
        <span>Cognome</span>
        <input type="text" name="fields[last_name]" autoComplete="family-name" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="fields[email]" autoComplete="email" required />
      </label>
      <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
        <span>{state === 'sending' ? 'Invio in corso…' : cta}</span>
        <span className="btn__icon">
          <ArrowRight size={18} strokeWidth={2.4} />
        </span>
      </button>
      {state === 'error' && <p className="form__error">Invio non riuscito. Controlla la connessione e riprova.</p>}
      <p className="form__legal">
        Inviando accetti la nostra{' '}
        <a href={SITE.privacy} target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}

export default LeadForm
