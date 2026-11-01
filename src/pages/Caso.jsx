import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FinalCta from '../components/FinalCta'
import VideoFacade from '../components/VideoFacade'
import { Kicker, MaskLines, Reveal } from '../components/Kit'
import index from '../data/casi-index.json'
import NotFound from './NotFound'
import { useSeo } from '../lib/motion'

const Blocks = ({ blocks }) =>
  blocks.map((b, i) => {
    if (b.k === 'p' && b.lead && !b.text) return <h4 key={i}>{b.lead}</h4>
    if (b.k === 'li') {
      return (
        <p key={i} className={`caso__li caso__li--${Math.min(b.d, 2)}`}>
          {b.lead && <b>{b.lead}{b.text ? ': ' : ''}</b>}
          {b.text}
        </p>
      )
    }
    return (
      <p key={i} className="caso__p">
        {b.lead && <b>{b.lead} </b>}
        {b.text}
      </p>
    )
  })

const Caso = () => {
  const { slug } = useParams()
  const pos = index.findIndex((c) => c.slug === slug)
  const meta = index[pos]
  const [full, setFull] = useState(null)
  const line = useRef(null)
  const { scrollYProgress } = useScroll({ target: line, offset: ['start 70%', 'end 70%'] })

  useSeo(meta ? `${meta.title} | Dr. Edoardo Bo` : 'Pagina non trovata | Dr. Edoardo Bo', meta?.excerpt ?? '', `/testimonianze/${slug}`)

  useEffect(() => {
    let alive = true
    import('../data/casi.json').then((m) => {
      if (alive) setFull(m.default.find((c) => c.slug === slug) ?? null)
    })
    return () => {
      alive = false
    }
  }, [slug])

  if (!meta) return <NotFound />

  const prev = index[(pos - 1 + index.length) % index.length]
  const next = index[(pos + 1) % index.length]

  return (
    <>
      <section className="caso-hero">
        <div className="wrap caso-hero__grid">
          <div>
            <Link to="/testimonianze" className="back">
              <ArrowLeft size={16} /> Tutti i casi studio
            </Link>
            <Kicker>Caso studio</Kicker>
            <h1 className="h h--xl" key={slug}>
              <MaskLines immediate lines={[{ text: `${meta.name}.`, className: 'serif accent' }]} />
            </h1>
            <p className="caso-hero__label">{meta.metric ? meta.label.replace(/^[-+]\s?\d+\s?kg[,]?\s*(e\s)?/i, '') || meta.label : meta.label}</p>
            {meta.metric && <p className="caso-hero__metric">{meta.metric}</p>}
          </div>
          <VideoFacade key={meta.video} id={meta.video} title={meta.title} poster={`/img/casi/${meta.slug}.webp`} />
        </div>
      </section>

      <section className="section">
        <div className="wrap caso-body" ref={line}>
          <div className="caso-rail" aria-hidden="true">
            <motion.span style={{ scaleY: scrollYProgress }} />
          </div>
          {full?.sections.map((s, i) => {
            const feel = /come si sente/i.test(s.title)
            return (
              <Reveal key={s.title} className={`caso-sec ${feel ? 'caso-sec--feel' : ''}`}>
                <span className="caso-sec__dot">{i + 1}</span>
                <h2 className="h h--md">{s.title}</h2>
                <Blocks blocks={s.blocks} />
              </Reveal>
            )
          })}
        </div>
      </section>

      <nav className="wrap pager" aria-label="Altri casi studio">
        <Link to={`/testimonianze/${prev.slug}`}>
          <ArrowLeft size={18} />
          <img src={`/img/casi/${prev.slug}.webp`} alt="" loading="lazy" />
          <span>
            <small>Precedente</small>
            {prev.name}
          </span>
        </Link>
        <Link to={`/testimonianze/${next.slug}`}>
          <span>
            <small>Successivo</small>
            {next.name}
          </span>
          <img src={`/img/casi/${next.slug}.webp`} alt="" loading="lazy" />
          <ArrowRight size={18} />
        </Link>
      </nav>

      <FinalCta />
    </>
  )
}

export default Caso
