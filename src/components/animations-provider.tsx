'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const newLenis = new Lenis({
      lerp: prefersReducedMotion.matches ? 1 : 0.08,
      duration: prefersReducedMotion.matches ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion.matches,
      smoothTouch: false,
    });

    setLenis(newLenis);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (typeof value === 'number') {
          newLenis.scrollTo(value, { immediate: true });
        }
        return newLenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });
    newLenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);
    tickerRef.current = (time: number) => {
      newLenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerRef.current);

    const handleRefresh = () => {
      newLenis.resize();
      ScrollTrigger.refresh();
    };

    const handleReducedMotion = () => {
      if (prefersReducedMotion.matches) {
        newLenis.stop();
      } else {
        newLenis.start();
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleRefresh);
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    ScrollTrigger.refresh();

    return () => {
      prefersReducedMotion.removeEventListener('change', handleReducedMotion);
      window.removeEventListener('resize', handleRefresh);
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }
      newLenis.destroy();
      isInitialized.current = false;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
