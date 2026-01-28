'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function AnimationsProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const newLenis = new Lenis({
      lerp: prefersReducedMotion.matches ? 1 : 0.1,
      duration: prefersReducedMotion.matches ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion.matches,
      smoothTouch: false,
    });
    setLenis(newLenis);

    const raf = (time: number) => {
      newLenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    
    newLenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
        newLenis.raf(time * 1000)
    })

    const handleRefresh = () => {
        newLenis.resize();
        ScrollTrigger.refresh(true);
    };

    window.addEventListener('resize', handleRefresh);

    const handleReducedMotion = () => {
      if (prefersReducedMotion.matches) {
        newLenis.stop();
      } else {
        newLenis.start();
      }
      ScrollTrigger.refresh();
    };

    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    ScrollTrigger.refresh();

    return () => {
      prefersReducedMotion.removeEventListener('change', handleReducedMotion);
      window.removeEventListener('resize', handleRefresh);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      newLenis.destroy();
      isInitialized.current = false;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
