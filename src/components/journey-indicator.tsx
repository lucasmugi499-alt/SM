'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/animations-provider';

const chapters = [
  { id: '#S7_TRAINING', label: 'Training' },
  { id: '#S8_MENTORSHIP', label: 'Mentorship' },
  { id: '#S9_CONSULTANCY', label: 'Consultancy' },
  { id: '#S10_YOUTH', label: 'Youth Support' },
  { id: '#S11_INTERNSHIPS', label: 'Internships' },
  { id: '#S13_PROOF', label: 'Proof' },
  { id: '#S15_BOOKING', label: 'Book' },
];

export function JourneyIndicator() {
  const component = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const links = component.current?.querySelectorAll('button');
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

  const handleScrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={component}
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 text-sm font-medium md:flex"
    >
      <div className="absolute left-[7px] top-1 h-full w-px bg-border" />
      {chapters.map((chapter) => (
        <button
          type="button"
          key={chapter.id}
          onClick={() => handleScrollTo(chapter.id)}
          className="relative flex items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-accent"
        >
          <span className="h-2 w-2 rounded-full bg-accent/40" />
          {chapter.label}
        </button>
      ))}
    </div>
  );
}
