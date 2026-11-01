import React from 'react'
import Hero from '../components/home/Hero'
import YoYo from '../components/home/YoYo'
import Manifesto from '../components/home/Manifesto'
import Metodo from '../components/home/Metodo'
import Muro from '../components/home/Muro'
import Edo from '../components/home/Edo'
import Sessione from '../components/home/Sessione'
import FinalCta from '../components/FinalCta'
import { Marquee } from '../components/Kit'
import { useSeo } from '../lib/motion'

const Home = () => {
  useSeo(
    'Dr. Edoardo Bo | Biologo Nutrizionista e Mental Coach · Metodo Bussola',
    'Hai perso e ripreso peso più volte? Non sei tu il problema, è il metodo. Il Metodo Bussola è un percorso di affiancamento di 6 mesi: senza rinunce, senza diete rigide.',
    '/',
  )

  return (
    <>
      <Hero />
      <Marquee items={['Senza rinunce', 'Senza diete rigide', 'Nutrizione', 'Movimento', 'Coaching', 'Metodo cucito su misura']} />
      <YoYo />
      <Manifesto />
      <Metodo />
      <Muro />
      <Edo />
      <Sessione />
      <FinalCta />
    </>
  )
}

export default Home
