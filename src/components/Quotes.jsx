import React from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './Kit'
import { CITAZIONI } from '../data/site'

const Quotes = () => (
  <div className="quotes">
    {CITAZIONI.map((q, i) => (
      <Reveal key={q.slug} delay={i * 0.1} className="quote-wrap">
        <Link to={`/testimonianze/${q.slug}`} className="quote">
          <img src={`/img/casi/${q.slug}.webp`} alt={q.who} loading="lazy" />
          <blockquote>{q.text}</blockquote>
          <footer>
            <b>{q.who}</b> {q.job}
          </footer>
        </Link>
      </Reveal>
    ))}
  </div>
)

export default Quotes
