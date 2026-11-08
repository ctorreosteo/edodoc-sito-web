import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { CompassProgress, Dial, Needle } from './Compass'
import CookieBanner from './CookieBanner'
import Footer from './Footer'
import { Magnetic } from './Kit'
import { NAV } from '../data/site'
import { EASE, prefersReducedMotion } from '../lib/motion'

const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)

const seenIntro = () => {
  try {
    return window.sessionStorage.getItem('edo-intro') === '1'
  } catch {
    return false
  }
}

const markIntro = () => {
  try {
    window.sessionStorage.setItem('edo-intro', '1')
  } catch {
    // Storage bloccato: al massimo l'intro si rivede
  }
}

// Solo alla prima visita della sessione: l'ago trova il nord e la pagina si apre
const Intro = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div className="intro" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease: EASE }} aria-hidden="true">
      <div className="intro__dial">
        <Dial showCardinals={false} />
        <motion.div
          className="needle"
          initial={{ rotate: -300 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 42, damping: 7 }}
        >
          <svg viewBox="0 0 500 500">
            <path d="M250 30 L268 84 L232 84 Z" className="needle__tip" />
          </svg>
        </motion.div>
        <img src="/img/brand/logo-small.png" alt="" />
      </div>
    </motion.div>
  )
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', open)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`top ${scrolled ? 'is-scrolled' : ''}`}>
        {pathname !== '/masterclass' && (
          <Link to="/masterclass" className="top__bar">
            Perché riprendi peso? <span>→</span> Masterclass gratis
          </Link>
        )}
        <div className="top__nav">
          <Link to="/" className="top__logo" aria-label="Dr. Edoardo Bo, home" onClick={close}>
            <span className="logo" />
          </Link>
          <nav className="top__links" aria-label="Principale">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="top__link">
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Magnetic>
            <Link to="/consulenza-conoscitiva" className="top__cta">
              Consulenza <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
          <button className="top__burger" onClick={() => setOpen(!open)} aria-label={open ? 'Chiudi menu' : 'Apri menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Menu mobile">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: EASE }}>
                  <Link to={n.to} onClick={close}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link to="/consulenza-conoscitiva" className="btn btn--primary" onClick={close}>
              <span>Prenota la consulenza</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MobileDock = () => (
  <Link to="/consulenza-conoscitiva" className="dock">
    <span>
      <b>Scopri se fa per te</b>
      <small>Videochiamata gratuita · 30 minuti</small>
    </span>
    <i>
      <ArrowUpRight size={20} />
    </i>
  </Link>
)

const Layout = () => {
  const { pathname, hash } = useLocation()
  const lenis = useRef(null)
  const [intro, setIntro] = useState(() => !seenIntro() && !prefersReducedMotion())

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const l = new Lenis({ lerp: 0.11 })
    lenis.current = l
    let raf = requestAnimationFrame(function loop(t) {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  // Cambio pagina: in cima, oppure sull'ancora se c'è
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash)
        if (!el) return
        if (lenis.current) {
          // La pagina è appena cambiata: Lenis deve rileggere l'altezza prima di partire
          lenis.current.resize()
          lenis.current.scrollTo(el, { immediate: true, force: true })
        } else {
          el.scrollIntoView()
        }
      }, 120)
      return () => clearTimeout(t)
    }
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  const endIntro = () => {
    markIntro()
    setIntro(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!intro}>
        <AnimatePresence>{intro && <Intro onDone={endIntro} />}</AnimatePresence>
        <div className="app">
          <Header />
          <CompassProgress />
          <MobileDock />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <CookieBanner ready={!intro} />
      </IntroContext.Provider>
    </MotionConfig>
  )
}

export default Layout
