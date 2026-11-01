import React from 'react'
import MagneticField from './MagneticField'
import { Kicker, MaskLines, Reveal } from './Kit'

const PageHero = ({ kicker, lines, lead, children, align = 0.25 }) => (
  <section className="phero">
    <MagneticField align={align} density={0.6} />
    <div className="wrap phero__in">
      {kicker && <Kicker>{kicker}</Kicker>}
      <h1 className="h h--xl">
        <MaskLines immediate delay={0.1} lines={lines} />
      </h1>
      {lead && (
        <Reveal delay={0.4}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
      {children}
    </div>
  </section>
)

export default PageHero
