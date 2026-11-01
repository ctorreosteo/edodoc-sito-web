import React from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

const CaseCard = ({ caso }) => (
  <Link to={`/testimonianze/${caso.slug}`} className="case">
    <span className="case__media">
      <img src={`/img/casi/${caso.slug}.webp`} alt={`${caso.name}, caso studio`} loading="lazy" decoding="async" />
    </span>
    {caso.metric && <span className="case__metric">{caso.metric}</span>}
    <span className="case__play">
      <Play size={15} fill="currentColor" />
    </span>
    <span className="case__body">
      <b>{caso.name}</b>
      <small>{caso.label}</small>
    </span>
  </Link>
)

export default CaseCard
