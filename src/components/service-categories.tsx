'use client';

import { services } from '@/lib/constants';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ServiceCategories() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  useEffect(() => {
    if (isMobile === false) {
      ctx.current = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
          const pin = gsap.to(containerRef.current, {
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
        });
      }, sectionRef);
    }

    return () => ctx.current?.revert();

  }, [isMobile]);

  return (
    <section id="S5_SERVICE_CHAPTERS" ref={sectionRef} className="bg-primary/5 py-16 md:overflow-hidden md:py-24">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Explore our chapters.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            Scroll through our services like a story. Each chapter explains what we do—and leads you to the right next step.
          </p>
        </div>
      </div>
      
      {/* Desktop: GSAP-powered horizontal scroll */}
      <div ref={containerRef} className="hidden md:flex md:w-max md:gap-8 md:pl-[max(2rem,calc(50vw-550px))]">
        {services.map((service, index) => (
          <Card key={index} className="w-[400px] flex-shrink-0 bg-background/80 backdrop-blur-sm">
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
      <div className="container grid gap-8 md:hidden">
        {services.map((service, index) => (
          <Card key={index} className="bg-background/80 backdrop-blur-sm">
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
