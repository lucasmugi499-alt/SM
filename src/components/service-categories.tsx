'use client';

import { services } from '@/lib/constants';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealFadeUp, revealStagger } from '@/lib/motion';

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
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.services-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const grid = sectionRef.current?.querySelector('.services-grid');
      const stagger = grid
        ? revealStagger(sectionRef.current?.querySelectorAll('.service-card'), {
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
            },
          })
        : null;
      return () => {
        fade?.scrollTrigger?.kill();
        fade?.kill();
        stagger?.scrollTrigger?.kill();
        stagger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="S6_CATEGORIES" ref={sectionRef} className="bg-primary/5 py-16 md:overflow-hidden md:py-24">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="services-reveal font-headline text-3xl font-bold md:text-4xl">
            Service chapters, organized with intent.
          </h2>
          <p className="services-reveal mt-4 max-w-2xl mx-auto text-foreground/70">
            Each chapter answers a real question—what to plant, how to handle the harvest, where to get guidance, and how to build stability for youth and families.
          </p>
        </div>
      </div>
      
      {/* Desktop: GSAP-powered horizontal scroll */}
      <div ref={containerRef} className="hidden md:flex md:w-max md:gap-8 md:pl-[max(2rem,calc(50vw-550px))]">
        {services.map((service, index) => (
          <Card key={index} className="service-card w-[400px] flex-shrink-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="h-full">
              <div className="mb-4">
                <service.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
              <CardDescription className="pt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Mobile: Stacked cards */}
      <div className="services-grid container grid gap-8 md:hidden">
        {services.map((service, index) => (
          <Card key={index} className="service-card bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4">
                <service.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
              <CardDescription className="pt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
