'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { parallaxMedia, revealFadeUp } from '@/lib/motion';
import { WordByWordHighlight } from '@/components/word-by-word-highlight';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'IMG_HERO_01');
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          // Parallax for the background image
          parallaxMedia('.hero-bg-image', -20);

          // Staggered fade-in for heading and other elements
          revealFadeUp([h1Ref.current, h2Ref.current, '.hero-cta, .hero-trust'], {
            stagger: 0.15,
          });
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="S1_HERO"
      ref={heroRef}
      className="hero relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="hero-bg-image object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 flex h-full flex-col justify-center text-background">
        <div className="max-w-3xl">
          <h1 ref={h1Ref} className="font-headline text-5xl font-bold md:text-7xl lg:text-8xl">
            Spark Mentorship
          </h1>
          <h2 ref={h2Ref} className="mt-2 font-headline text-4xl font-bold text-accent md:text-6xl lg:text-7xl">
            Train. Build. Thrive.
          </h2>
          <WordByWordHighlight
            text="Practical agriculture training, mentorship, business consultancy, youth and community support, and internship attachments—designed to build real skills and real outcomes."
            className="hero-subcopy mt-6 max-w-2xl text-lg text-background/80"
          />
          <div className="hero-cta mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => scrollTo('#S3_PILLARS')}
            >
              Explore the Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background text-background hover:bg-background hover:text-foreground"
              onClick={() => scrollTo('#S14_BOOKING')}
            >
              Book a 1:1 Session
            </Button>
          </div>
          <p className="hero-trust mt-8 max-w-md text-xs text-background/60">
            Requests are delivered to our <strong>Information Desk</strong> for proper routing.{' '}
            <strong>Telephone number is required.</strong> You’ll receive a delivery confirmation
            with a <strong>reference ID</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
