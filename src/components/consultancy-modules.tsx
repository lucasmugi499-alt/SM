'use client';

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

const consultancyService = services.find(s => s.title === 'Business Consultancy');
const modules = consultancyService?.subItems || [];

export function ConsultancyModules() {
    const image = PlaceHolderImages.find(img => img.id === 'IMG_CONSULTANCY_01');
    const scrollTo = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section id="S8_CONSULTANCY" className="py-20 md:py-32 bg-secondary">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-4xl font-bold md:text-5xl">From skills to strategy.</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Training becomes impact when your decisions get sharper—money, marketing, compliance, and innovation.
          </p>
          <Accordion type="single" collapsible className="w-full mt-8">
            {modules.map((item, index) => (
              <AccordionItem key={item.title} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg font-semibold">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                    Learn how to present your work, reach customers, and communicate clearly.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button size="lg" className="mt-8" onClick={() => scrollTo('#S14_BOOKING')}>Book a consultancy session →</Button>
        </div>
        <div className="relative aspect-square max-h-[500px] w-full rounded-lg overflow-hidden">
            {image && (
                <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
            )}
        </div>
      </div>
    </section>
  );
}
