'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
import { revealFadeUp, revealStagger } from '@/lib/motion';

const consultancyService = services.find(s => s.title === 'Business Consultancy');
const modules = consultancyService?.subItems || [];

export function ConsultancyModules() {
    const sectionRef = useRef<HTMLElement>(null);
    const image = PlaceHolderImages.find(img => img.id === 'IMG_CONSULTANCY_01');
    const scrollTo = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.consultancy-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const stagger = revealStagger(sectionRef.current?.querySelectorAll('.consultancy-item'), {
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.consultancy-items'),
          start: 'top 85%',
        },
      });
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
    <section id="S9_CONSULTANCY" ref={sectionRef} className="py-20 md:py-32 bg-secondary">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="consultancy-reveal font-headline text-4xl font-bold md:text-5xl">From skills to business clarity.</h2>
          <p className="consultancy-reveal mt-4 text-lg text-foreground/80">
            We translate day-to-day work into decisions you can defend—records, pricing, marketing, and compliance that keep your operation steady.
          </p>
          <Accordion type="single" collapsible className="consultancy-items w-full mt-8">
            {modules.map((item, index) => (
              <AccordionItem key={item.title} value={`item-${index + 1}`} className="consultancy-item">
                <AccordionTrigger className="text-lg font-semibold">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                    {item.title === 'Financial literacy (general)' && 'Track cash in/out, price work accurately, and know what you can safely reinvest.'}
                    {item.title === 'Digital marketing' && 'Show your work clearly, reach customers, and turn inquiries into repeat orders.'}
                    {item.title === 'Taxation & returns filing' && 'Prepare the right records and filings without last-minute confusion.'}
                    {item.title === 'Creativity & innovation' && 'Improve products, packaging, or workflows without losing reliability.'}
                    {item.title === 'Strategy & operations' && 'Set realistic targets, allocate resources, and build routines that scale.'}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button size="lg" className="consultancy-reveal mt-8" onClick={() => scrollTo('#S15_BOOKING')}>Book a consultancy session →</Button>
        </div>
        <div className="consultancy-reveal relative aspect-square max-h-[500px] w-full rounded-lg overflow-hidden">
            {image && (
                <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
            )}
        </div>
      </div>
    </section>
  );
}
