'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { revealFadeUp } from '@/lib/motion';

export function FinalCTA() {
  const image = PlaceHolderImages.find(img => img.id === 'IMG_FINALCTA_01');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.cta-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      return () => {
        fade?.scrollTrigger?.kill();
        fade?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="S14_CTA" ref={sectionRef} className="relative py-24 md:py-40 text-center overflow-hidden">
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
        <h2 className="cta-reveal font-headline text-4xl font-bold md:text-6xl">Ready to make the next season easier?</h2>
        <p className="cta-reveal mt-4 max-w-xl mx-auto text-lg text-foreground/80">
          Submit your request by role. Our Information Desk routes it properly and confirms delivery with a reference ID.
        </p>
        <div className="mt-8">
            <Button size="lg" className="cta-reveal bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => scrollTo('#S15_BOOKING')}>Book by role</Button>
        </div>
      </div>
    </section>
  );
}
