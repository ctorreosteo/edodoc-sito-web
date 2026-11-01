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
    'Perdi peso mangiando cibo vero | Dr. Edoardo Bo · Metodo Bussola',
    'Perdi peso mangiando cibo vero, senza fame e senza contare calorie. Il Metodo Bussola è un affiancamento 1-1 di 6 mesi del Dr. Edoardo Bo, biologo nutrizionista e mental coach.',
    '/',
  )

  return (
    <>
      <Hero />
      <Marquee items={['Cibo vero', 'Niente calorie da contare', 'Niente fame da sopportare', 'Low-carb flessibile', 'Principio 80/20', 'Affiancamento 1-1']} />
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
