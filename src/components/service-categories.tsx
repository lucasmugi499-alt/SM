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

  useEffect(() => {
    // isMobile can be undefined on first render, so we check for false
    if (isMobile === false) {
      gsap.registerPlugin(ScrollTrigger);
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const pin = gsap.to(containerRef.current, {
          x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
          },
        });
        return () => {
          pin.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      });

      return () => mm.revert();
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="bg-primary/5 py-16 md:overflow-hidden md:py-24">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Our Experiential Chapters
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            Scroll through our areas of expertise and discover how we can help you grow.
          </p>
        </div>
      </div>
      <div ref={containerRef} className="md:flex md:w-max md:gap-8 md:pl-[max(2rem,calc(50vw-550px))]">
          {/* Mobile: Native scroll */}
          <div className="relative flex w-full space-x-6 overflow-x-auto px-4 pb-8 scrollbar-thin scrollbar-thumb-accent scrollbar-track-accent/20 md:hidden">
            {services.map((service, index) => (
              <Card
                key={index}
                className="w-[300px] flex-shrink-0 bg-background/80 backdrop-blur-sm"
              >
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
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/5 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary/5 to-transparent" />
          </div>

          {/* Desktop: GSAP-powered scroll */}
          <div className="hidden md:flex md:gap-8">
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
        </div>
    </section>
  );
}
