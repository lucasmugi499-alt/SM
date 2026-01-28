'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const chapters = [
  { id: '#S1_HERO', label: 'Intro' },
  { id: '#S2_PILLARS', label: 'Pillars' },
  { id: '#S3_BENTO', label: 'Bento' },
  { id: '#S4_AGRICULTURE', label: 'Agriculture' },
  { id: '#S5_SPOTLIGHT', label: 'Spotlight' },
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const links = component.current?.querySelectorAll('a');
      const triggers = chapters.map((chapter, index) =>
        ScrollTrigger.create({
          trigger: chapter.id,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(links, {
                color: '#9CA3AF',
                overwrite: true,
              });
              gsap.to(links?.[index], {
                color: '#F97316',
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

  return (
    <div ref={component} className="fixed top-1/2 right-4 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 text-sm font-medium">
      {chapters.map(chapter => (
        <a href={chapter.id} key={chapter.id} className="text-gray-400 hover:text-orange-500 transition-colors duration-300">{chapter.label}</a>
      ))}
    </div>
  )
}
