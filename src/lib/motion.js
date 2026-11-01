import { useEffect, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

// Parallasse verticale di un elemento rispetto al suo passaggio nel viewport
export const useParallax = (range = 80) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])
  return [ref, y]
}

// Titolo, descrizione e canonical della pagina
export const useSeo = (title, description, path) => {
  useEffect(() => {
    document.title = title
    const set = (selector, attr, value, create) => {
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = create()
        document.head.appendChild(tag)
      }
      tag.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', description, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    })
    set('meta[property="og:title"]', 'content', title, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      return m
    })
    set('meta[property="og:description"]', 'content', description, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      return m
    })
    set('link[rel="canonical"]', 'href', `https://www.edodoc.it${path}`, () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    })
  }, [title, description, path])
}
