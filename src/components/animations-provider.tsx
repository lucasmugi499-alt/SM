'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf);
    
    // Reduces motion if the user has a preference for it.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
        ScrollTrigger.getAll().forEach(st => st.disable());
        gsap.set('body', {
            scrollBehavior: 'auto',
        });
        lenis.stop();
    });

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
