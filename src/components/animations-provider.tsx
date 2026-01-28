'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    if (lenisRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const lenis = new Lenis({
      lerp: prefersReducedMotion.matches ? 1 : 0.1,
      duration: prefersReducedMotion.matches ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion.matches,
      smoothTouch: false,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    const scrollElement = document.documentElement

    ScrollTrigger.scrollerProxy(scrollElement, {
      scrollTop(value) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: scrollElement.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.defaults({ scroller: scrollElement })

    const handleRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', handleRefresh)

    const refreshAll = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refreshAll)
    window.addEventListener('load', refreshAll)

    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshAll)
    }

    const handleReducedMotion = () => {
      if (prefersReducedMotion.matches) {
        lenis.stop()
      } else {
        lenis.start()
      }
      ScrollTrigger.refresh()
    }

    prefersReducedMotion.addEventListener('change', handleReducedMotion)

    ScrollTrigger.refresh()

    return () => {
      prefersReducedMotion.removeEventListener('change', handleReducedMotion)
      window.removeEventListener('resize', refreshAll)
      window.removeEventListener('load', refreshAll)
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
