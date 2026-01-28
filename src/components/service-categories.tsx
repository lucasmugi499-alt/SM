'use client';

import { services } from '@/lib/constants';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

export function ServiceCategories() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useEffect(() => {
    if (isMobile !== false) return;
    if (!sectionRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    ctx.current = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        const tween = gsap.to(containerRef.current, {
          x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(containerRef.current, { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.current?.revert();
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.services-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.services-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.services-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.service-card'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.services-grid'), start: 'top 85%' },
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

  return (
    <section id="S6_CATEGORIES" ref={sectionRef} className="bg-primary/5 py-24 md:overflow-hidden">
      <div className="container">
        <div className="max-w-2xl">
          <p className="services-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Taxonomy</p>
          <h2 className="services-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Service chapters, organized with intent.
          </h2>
          <div className="services-copy mt-4 space-y-3 text-lg text-foreground/70">
            <p>Each chapter answers a real question and maps to clear outcomes.</p>
            <p>Training, consultancy, mentorship, and community support stay in one system.</p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="hidden md:flex md:w-max md:gap-8 md:pl-[max(2rem,calc(50vw-600px))]">
        {services.map((service, index) => (
          <Card key={index} className="service-card w-[420px] flex-shrink-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="h-full">
              <div className="mb-4">
                <service.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
              <CardDescription className="pt-2">{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="services-grid container mt-10 grid gap-8 md:hidden">
        {services.map((service, index) => (
          <Card key={index} className="service-card bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4">
                <service.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
              <CardDescription className="pt-2">{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
