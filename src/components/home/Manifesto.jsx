import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LINES = [
  { words: ['Non', 'cambi', 'cosa', 'mangi.'], offset: 0 },
  { words: ['Cambi', 'chi', 'sei', 'quando', 'mangi.'], offset: 4, em: true },
]
const COUNT = 9

const Word = ({ children, index, progress }) => {
  const start = 0.08 + (index / COUNT) * 0.74
  const opacity = useTransform(progress, [start, start + 0.08], [0.08, 1])
  const y = useTransform(progress, [start, start + 0.08], [18, 0])
  return <motion.span style={{ opacity, y }}>{children}</motion.span>
}

const Manifesto = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section ref={ref} className="manifesto">
      <div className="manifesto__stick">
        <p className="manifesto__text">
          {LINES.map((line) => (
            <span key={line.words[0]} className={`manifesto__line ${line.em ? 'serif' : ''}`}>
              {line.words.map((w, i) => (
                <Word key={`${w}-${i}`} index={line.offset + i} progress={scrollYProgress}>
                  {w}
                </Word>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default Manifesto
