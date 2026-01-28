'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENTOR_ROLES } from '@/lib/constants';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function MentorshipRouting() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(sectionRef.current);
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      if(!context.scope) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: context.scope,
          start: 'top 50%',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.from('.role-card', {
        autoAlpha: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        stagger: 0.1,
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);
  
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="S7_ROUTING" ref={sectionRef} className="py-20 md:py-40">
      <div className="container text-center">
        <h2 className="font-headline text-4xl font-bold md:text-5xl">
          One request. Routed to the right expert.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          You don’t have to guess who to contact. Choose the role you need, submit your request, and our <strong>Information Desk</strong> routes it to the appropriate expert.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {MENTOR_ROLES.map((role) => (
            <Card key={role} className="role-card p-4 md:p-6 bg-secondary">
              <h3 className="font-semibold text-base md:text-lg">{role}</h3>
            </Card>
          ))}
        </div>

        <div className="mt-12">
            <Button size="lg" onClick={() => scrollTo('#S14_BOOKING')}>Book by Role →</Button>
        </div>
      </div>
    </section>
  );
}
