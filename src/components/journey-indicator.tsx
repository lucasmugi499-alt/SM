'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const chapters = ['Training', 'Mentorship', 'Consultancy', 'Youth Support', 'Internships', 'Proof', 'Book'];

export function JourneyIndicator() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: true,
        },
      });

      tl.from('.journey-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
      }).from(
        '.journey-chapter',
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="S2_JOURNEY" ref={sectionRef} className="py-12 md:py-20">
      <div className="container relative max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-border/50 journey-line md:left-1/2 md:-translate-x-1/2"></div>
        <div className="text-center mb-12">
            <h3 className="font-headline text-2xl">Scroll to explore our chapters.</h3>
        </div>
        <div className="relative flex flex-col items-start gap-12 md:items-center">
          {chapters.map((chapter, index) => (
            <div key={chapter} className="journey-chapter relative flex items-center md:w-full">
              <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'} md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
                <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                </div>
                <h4 className="font-bold text-lg md:text-xl text-foreground/80">{chapter}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
