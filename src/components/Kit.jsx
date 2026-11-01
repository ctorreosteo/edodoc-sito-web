import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { EASE, isTouch } from '../lib/motion'

// Righe di titolo che salgono da sotto una maschera
export const MaskLines = ({ lines, delay = 0, immediate = false, stagger = 0.11 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const show = immediate || inView
  return (
    <span ref={ref} className="mask">
      {lines.map((line, i) => (
        <span key={i} className="mask__line">
          <motion.span
            className={`mask__in ${line.className || ''}`}
            initial={{ y: '112%' }}
            animate={show ? { y: 0 } : undefined}
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * stagger }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export const Reveal = ({ children, delay = 0, y = 34, className, as = 'div' }) => {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

export const Kicker = ({ children, light }) => (
  <p className={`kicker ${light ? 'kicker--light' : ''}`}>
    <span className="kicker__mark" />
    {children}
  </p>
)

// Bottone che si lascia attrarre dal cursore
export const Magnetic = ({ children, strength = 0.28 }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14 })
  const sy = useSpring(y, { stiffness: 180, damping: 14 })
  const move = (e) => {
    if (isTouch()) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span className="magnetic" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}

export const Btn = ({ to, href, children, variant = 'primary', external, icon = true }) => {
  const cls = `btn btn--${variant}`
  const Icon = external ? ArrowUpRight : ArrowRight
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="btn__icon">
          <Icon size={18} strokeWidth={2.4} />
        </span>
      )}
    </>
  )
  return (
    <Magnetic>
      {href ? (
        <a className={cls} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          {inner}
        </a>
      ) : (
        <Link className={cls} to={to}>
          {inner}
        </Link>
      )}
    </Magnetic>
  )
}

export const Marquee = ({ items, reverse, speed = 40, tone = 'orange' }) => (
  <div className={`ribbon ribbon--${tone}`} aria-hidden="true">
    {[0, 1].map((copy) => (
      <div key={copy} className={`ribbon__track ${reverse ? 'is-rev' : ''}`} style={{ '--speed': `${speed}s` }}>
        {items.map((t) => (
          <span key={t} className="ribbon__item">
            {t}
            <svg viewBox="0 0 20 20" width="14" height="14">
              <path d="M10 1 L14 19 L10 15 L6 19 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    ))}
  </div>
)

export const Counter = ({ to, prefix = '', suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return undefined
    const c = animate(0, to, { duration: 2, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
