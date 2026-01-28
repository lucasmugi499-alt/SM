'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/animations-provider';

const chapters = [
  { id: '#S1_HERO', label: 'Intro' },
  { id: '#S2_PILLARS', label: 'Pillars' },
  { id: '#S4_AGRICULTURE', label: 'Agriculture' },
  { id: '#S6_CATEGORIES', label: 'Services' },
  { id: '#S7_TRAINING', label: 'Training' },
  { id: '#S8_MENTORSHIP', label: 'Mentorship' },
  { id: '#S9_CONSULTANCY', label: 'Consultancy' },
  { id: '#S10_YOUTH', label: 'Youth Support' },
  { id: '#S11_INTERNSHIPS', label: 'Internships' },
  { id: '#S12_EVENTS', label: 'Events' },
  { id: '#S13_PROOF', label: 'Proof' },
  { id: '#S15_BOOKING', label: 'Book' },
];

export function JourneyIndicator() {
  const component = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const links = component.current?.querySelectorAll('a');
      if (!links) return;

      const triggers = chapters.map((chapter, index) =>
        ScrollTrigger.create({
          trigger: chapter.id,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(links, {
                color: 'hsl(var(--muted-foreground))',
                overwrite: true,
              });
              gsap.to(links?.[index], {
                color: 'hsl(var(--accent))',
                overwrite: true,
              });
            }
          },
        })
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    }, component);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      });
    }
  };

  return (
    <div ref={component} className="fixed top-1/2 right-4 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 text-sm font-medium">
      {chapters.map(chapter => (
        <a 
          href={chapter.id} 
          key={chapter.id} 
          onClick={(e) => handleScrollTo(e, chapter.id)}
          className="text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          {chapter.label}
        </a>
      ))}
    </div>
  )
}
