'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENTOR_ROLES } from '@/lib/constants';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';
import { useLenis } from '@/components/animations-provider';

export function MentorshipRouting() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(sectionRef.current);
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', (context) => {
      if (!context.scope) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: context.scope,
          start: 'top 55%',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.from('.role-card', {
        autoAlpha: 0,
        filter: 'blur(10px)',
        scale: 0.95,
        stagger: 0.08,
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.mentor-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.mentor-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.mentor-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.role-card'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    return () => {
      label.tween?.scrollTrigger?.kill();
      label.tween?.kill();
      headline.tween?.scrollTrigger?.kill();
      headline.tween?.kill();
      headline.revert?.();
      paragraphs.tween?.scrollTrigger?.kill();
      paragraphs.tween?.kill();
      cards.tween?.scrollTrigger?.kill();
      cards.tween?.kill();
    };
  }, []);

  const scrollTo = (selector: string) => {
    if (lenis) {
      lenis.scrollTo(selector, { duration: 1.2 });
      return;
    }
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="S8_MENTORSHIP" ref={sectionRef} className="py-24">
      <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mentor-label text-xs uppercase tracking-[0.4em] text-primary/70">
            Chapter · Mentorship routing
          </p>
          <h2 className="mentor-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            One request. Routed by role, not by name.
          </h2>
          <div className="mentor-copy mt-6 space-y-4 text-lg text-foreground/80">
            <p>
              Choose the title that fits your need and our Information Desk routes the request to the
              right mentor, trainer, or counselor.
            </p>
            <p>Every request receives a delivery confirmation and a unique reference ID.</p>
          </div>
          <Button size="lg" className="mt-8" onClick={() => scrollTo('#S15_BOOKING')}>
            Book by role
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {MENTOR_ROLES.map((role) => (
            <Card key={role} className="role-card flex items-center justify-center bg-secondary p-4 text-center">
              <h3 className="text-sm font-semibold md:text-base">{role}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
