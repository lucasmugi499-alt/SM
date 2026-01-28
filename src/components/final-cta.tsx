'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function FinalCTA() {
  const image = PlaceHolderImages.find(img => img.id === 'IMG_FINALCTA_01');
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="S13_FINAL_CTA" className="relative py-24 md:py-40 text-center overflow-hidden">
        {image && (
            <Image 
                src={image.imageUrl} 
                alt={image.description} 
                fill 
                className="object-cover" 
                data-ai-hint={image.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-sm"></div>
      <div className="container relative z-10">
        <h2 className="font-headline text-4xl font-bold md:text-6xl">Ready to take the next step?</h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-foreground/80">
          Submit your request by role. Our Information Desk routes it properly. You’ll receive a delivery confirmation with a reference ID.
        </p>
        <div className="mt-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => scrollTo('#S14_BOOKING')}>Book a 1:1 Session</Button>
        </div>
      </div>
    </section>
  );
}
