'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const chapters = [
  { id: '#S1_HERO', label: 'Intro' },
  { id: '#S2_PILLARS', label: 'Pillars' },
  { id: '#S3_AGRICULTURE', label: 'Agriculture' },
  { id: '#S4_CATEGORIES', label: 'Services' },
  { id: '#S5_TRAINING', label: 'Training' },
  { id: '#S6_MENTORSHIP', label: 'Mentorship' },
  { id: '#S7_CONSULTANCY', label: 'Consultancy' },
  { id: '#S8_YOUTH', label: 'Youth Support' },
  { id: '#S9_INTERNSHIPS', label: 'Internships' },
  { id: '#S10_EVENTS', label: 'Events' },
  { id: '#S11_TESTIMONIALS', label: 'Proof' },
  { id: '#S12_CTA', label: 'Book' },
];

export function JourneyIndicator() {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter.id,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => {
            if (self.isActive) {
              gsap.to(component.current?.querySelectorAll('a'), {
                color: '#9CA3AF', // gray-400
              });
              gsap.to(component.current?.querySelectorAll('a')[index], {
                color: '#F97316', // orange-500
              });
            }
          }
        });
      });
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
