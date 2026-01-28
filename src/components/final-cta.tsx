'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';
import { useLenis } from '@/components/animations-provider';

export function FinalCTA() {
  const image = PlaceHolderImages.find((img) => img.id === 'IMG_FINALCTA_01');
  const sectionRef = useRef<HTMLElement>(null);
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
    const label = revealLabel(sectionRef.current?.querySelectorAll('.cta-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.cta-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.cta-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });

    return () => {
      label.tween?.scrollTrigger?.kill();
      label.tween?.kill();
      headline.tween?.scrollTrigger?.kill();
      headline.tween?.kill();
      headline.revert?.();
      paragraphs.tween?.scrollTrigger?.kill();
      paragraphs.tween?.kill();
    };
  }, []);

  return (
    <section id="S14_CTA" ref={sectionRef} className="relative overflow-hidden py-24">
      {image && (
        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
      )}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <p className="cta-label text-xs uppercase tracking-[0.4em] text-primary/70">Final step</p>
          <h2 className="cta-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Ready to make the next season easier?
          </h2>
          <div className="cta-copy mt-4 space-y-3 text-lg text-foreground/80">
            <p>
              Submit your request by role. Our Information Desk routes it properly and confirms delivery with a
              reference ID.
            </p>
            <p>Telephone numbers are mandatory so we can confirm next steps quickly.</p>
          </div>
          <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => scrollTo('#S15_BOOKING')}>
            Book by role
          </Button>
        </div>
      </div>
    </section>
  );
}
