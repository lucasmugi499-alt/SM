'use client';

import { useLayoutEffect, useRef } from 'react';
import { services } from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';
import { useLenis } from '@/components/animations-provider';

const consultancyService = services.find((service) => service.title === 'Business Consultancy');
const modules = consultancyService?.subItems || [];

export function ConsultancyModules() {
  const sectionRef = useRef<HTMLElement>(null);
  const image = PlaceHolderImages.find((img) => img.id === 'IMG_CONSULTANCY_01');
  const lenis = useLenis();

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

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.consultancy-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.consultancy-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.consultancy-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.consultancy-item'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.consultancy-items'), start: 'top 85%' },
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
    <section id="S9_CONSULTANCY" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <p className="consultancy-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Consultancy</p>
          <h2 className="consultancy-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Business clarity for working farms.
          </h2>
          <div className="consultancy-copy mt-6 space-y-4 text-lg text-foreground/80">
            <p>
              Translate day-to-day activity into decisions you can defend—records, pricing, marketing,
              and compliance that keep operations steady.
            </p>
            <p>Each module is built for real constraints: time, cash flow, and seasonal pressure.</p>
          </div>
          <Accordion type="single" collapsible className="consultancy-items w-full mt-8">
            {modules.map((item, index) => (
              <AccordionItem key={item.title} value={`item-${index + 1}`} className="consultancy-item">
                <AccordionTrigger className="text-lg font-semibold">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                  {item.title === 'Financial literacy (general)' &&
                    'Track cash in/out, price work accurately, and know what you can safely reinvest.'}
                  {item.title === 'Digital marketing' &&
                    'Show your work clearly, reach customers, and turn inquiries into repeat orders.'}
                  {item.title === 'Taxation & returns filing' &&
                    'Prepare the right records and filings without last-minute confusion.'}
                  {item.title === 'Creativity & innovation' &&
                    'Improve products, packaging, or workflows without losing reliability.'}
                  {item.title === 'Strategy & operations' &&
                    'Set realistic targets, allocate resources, and build routines that scale.'}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button size="lg" className="mt-8" onClick={() => scrollTo('#S15_BOOKING')}>
            Book a consultancy session
          </Button>
        </div>
        <div className="relative aspect-square max-h-[520px] w-full overflow-hidden rounded-2xl">
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </div>
    </section>
  );
}
