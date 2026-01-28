'use client';

import { Button } from '@/components/ui/button';
import { useLenis } from '@/components/animations-provider';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  motionTokens,
  revealHeadline,
  revealLabel,
  revealParagraphChunks,
  washTransition,
  pinnedChapter,
} from '@/lib/motion-system';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = pinnedChapter(heroRef.current, '120%');
      if (tl && videoRef.current) {
        tl.fromTo(
          videoRef.current,
          { autoAlpha: 0, scale: 1.05 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: motionTokens.durations.slow,
            ease: motionTokens.eases.panelEase,
          }
        );
      }

      const label = revealLabel('.hero-label', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 85%',
        },
      });

      const headline = revealHeadline('.hero-headline', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
        },
      });

      const paragraph = revealParagraphChunks('.hero-copy', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 75%',
        },
      });

      const wash = washTransition(washRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 40%',
        },
      });

      return () => {
        label.tween?.scrollTrigger?.kill();
        label.tween?.kill();
        headline.tween?.scrollTrigger?.kill();
        headline.tween?.kill();
        headline.revert?.();
        paragraph.tween?.scrollTrigger?.kill();
        paragraph.tween?.kill();
        wash.tween?.scrollTrigger?.kill();
        wash.tween?.kill();
        tl?.scrollTrigger?.kill();
        tl?.kill();
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (selector: string) => {
    if (lenis) {
      lenis.scrollTo(selector, { duration: 1.4 });
      return;
    }
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="S1_HERO" ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/VID_HERO_01.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
      <div className="container relative z-10 flex min-h-screen items-center py-24">
        <div className="max-w-3xl">
          <p className="hero-label text-xs uppercase tracking-[0.4em] text-background/70">
            Spark mentorship · agricultural training
          </p>
          <h1 className="hero-headline mt-6 font-headline text-5xl font-semibold text-background md:text-7xl">
            A scroll-led journey for growers, builders, and future leaders.
          </h1>
          <div className="hero-copy mt-8 space-y-4 text-lg text-background/80">
            <p>
              We shape training, mentorship, and consultancy into a single, deliberate path—from the soil
              to the market, from the first season to resilient operations.
            </p>
            <p>
              Every request moves through our Information Desk, ensuring the right role responds with a
              confirmed reference ID and a clear next step.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => handleScrollTo('#S7_TRAINING')}
            >
              Begin the journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/70 text-background hover:bg-background hover:text-foreground"
              onClick={() => handleScrollTo('#S15_BOOKING')}
            >
              Book with the Info Desk
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-background/50">
            <span className="h-10 w-[1px] bg-background/40" />
            Scroll to enter
          </div>
        </div>
      </div>
      <div
        ref={washRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-background/40 to-background"
      />
    </section>
  );
}
