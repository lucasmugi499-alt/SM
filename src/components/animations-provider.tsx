'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (!lenis.current) {
      lenis.current = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      });

      lenis.current.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && lenis.current) {
            lenis.current.scrollTo(value, { duration: 0, immediate: true });
          }
          return lenis.current?.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);
      
      // Refresh ScrollTrigger after a short delay to ensure everything is loaded
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (lenis.current) {
        lenis.current.stop();
      }
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (lenis.current) {
        lenis.current.start();
      }
    });

    return () => {
      lenis.current?.destroy();
      lenis.current = null;
      // Remove the resize listener
      window.removeEventListener('resize', () => {
        ScrollTrigger.refresh();
      });
      // It's better to let each component manage its own ScrollTriggers
      // and use gsap.context for cleanup.
    }
  }, []);

  return <>{children}</>
}
