'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'IMG_HERO_01');
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current || !h1Ref.current || !h2Ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(heroRef.current);

    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      (context) => {
        if(!context.scope) return;
        const h1Words = h1Ref.current!.innerText.split(' ');
        h1Ref.current!.innerHTML = h1Words
          .map((word) => `<span class="inline-block">${word}</span>`)
          .join(' ');
        
        const h2Words = h2Ref.current!.innerText.split(' ');
        h2Ref.current!.innerHTML = h2Words
            .map((word) => `<span class="inline-block">${word}</span>`)
            .join(' ');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: context.scope,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.from(h1Ref.current!.querySelectorAll('span'), {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
        })
        .from(h2Ref.current!.querySelectorAll('span'), {
            y: 50,
            opacity: 0,
            stagger: 0.05,
            ease: 'power3.out',
        }, '-=0.3')
        .from(
          context.scope.querySelectorAll('.hero-subcopy, .hero-cta, .hero-trust'),
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .to(
          '.hero-bg-image',
          {
            scale: 1.1,
            ease: 'none',
          },
          0
        );

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, []);

  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="S1_HERO" ref={heroRef} className="hero relative h-screen min-h-[700px] w-full overflow-hidden">
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
          <h1 ref={h1Ref} className="font-headline text-5xl font-bold md:text-7xl lg:text-8xl space-x-2 md:space-x-4">
            Spark Mentorship
          </h1>
          <h2 ref={h2Ref} className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl text-accent space-x-2 md:space-x-4 mt-2">
            Train. Build. Thrive.
          </h2>
          <p className="hero-subcopy mt-6 max-w-2xl text-lg text-background/80">
            Practical agriculture training, mentorship, business consultancy, youth and community support, and internship attachments—designed to build real skills and real outcomes.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => scrollTo('#S3_PILLARS')}>
              Explore the Journey
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground" onClick={() => scrollTo('#S14_BOOKING')}>
              Book a 1:1 Session
            </Button>
          </div>
          <p className="hero-trust mt-8 text-xs text-background/60 max-w-md">
            Requests are delivered to our <strong>Information Desk</strong> for proper routing. <strong>Telephone number is required.</strong> You’ll receive a delivery confirmation with a <strong>reference ID</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
