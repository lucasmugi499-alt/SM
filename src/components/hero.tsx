'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const headlineWords = useMemo(() => ['Spark', 'Mentorship'], []);
  const sublineWords = useMemo(() => ['Train.', 'Build.', 'Thrive.'], []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(
          '.hero-word',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.08, ease: 'power3.out' },
          0
        )
        .fromTo(
          '.hero-subword',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.08, ease: 'power3.out' },
          0.1
        )
        .fromTo(
          '.hero-copy',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power3.out' },
          0.2
        )
        .fromTo(
          '.hero-cta',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power3.out' },
          0.25
        )
        .fromTo(
          '.hero-trust',
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power3.out' },
          0.3
        );

      if (mediaRef.current) {
        gsap.to(mediaRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="S1_HERO"
      ref={sectionRef}
      className="hero relative overflow-hidden bg-background py-20 md:py-32"
    >
      <div className="container grid items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6 text-left">
          <div className="space-y-3">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {headlineWords.map((word) => (
                <span key={word} className="hero-word mr-3 inline-block">
                  {word}
                </span>
              ))}
            </h1>
            <h2 className="font-headline text-2xl font-semibold text-foreground/80 md:text-3xl">
              {sublineWords.map((word) => (
                <span key={word} className="hero-subword mr-2 inline-block">
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <p className="hero-copy max-w-xl text-lg text-foreground/75">
            Practical agriculture training, mentorship, business consultancy, youth and
            community support, and internship attachments — designed to build real skills
            and real outcomes.
          </p>
          <div className="hero-cta flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="#S3_PILLARS">Explore the Journey</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#booking">Book a 1:1 Session</a>
            </Button>
          </div>
          <p className="hero-trust text-sm text-foreground/60">
            Requests are delivered to our Information Desk for proper routing. Telephone
            number required. You’ll receive a confirmation with a reference ID.
          </p>
        </div>
        <div
          ref={mediaRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-lg"
        >
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
            Hero Media Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
