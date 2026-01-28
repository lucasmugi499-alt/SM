'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

const paths = [
  {
    title: 'Starter Track',
    description: 'For beginners building foundations.',
    outcomes: [
      'Understand core farming principles',
      'Build basic routines and consistency',
      'Learn simple planning and inputs',
    ],
    media: 'IMG_PATH_STARTER_01.webp',
  },
  {
    title: 'Growth Track',
    description: 'For learners ready to level up.',
    outcomes: [
      'Improve process and yield consistency',
      'Reduce losses through better handling',
      'Strengthen decision-making',
    ],
    media: 'IMG_PATH_GROWTH_01.webp',
  },
  {
    title: 'Pro Track',
    description: 'For advanced planning and leadership.',
    outcomes: [
      'Build resilient farm systems',
      'Improve profitability and risk planning',
      'Develop long-term strategy',
    ],
    media: 'IMG_PATH_PRO_01.webp',
  },
];

export function TrainingPathsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      if (!railRef.current || !sectionRef.current) return;

      const tween = gsap.to(railRef.current, {
        x: () => -(railRef.current!.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${railRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="S6_PATHS" ref={sectionRef} className="paths bg-background py-20 md:py-32 md:overflow-hidden">
      <div className="container mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Training paths
          </p>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            Choose your training path.
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Pick where you are now. We’ll help you move forward with structure, mentorship,
            and practical learning.
          </p>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
          Scroll to explore
        </p>
      </div>
      <div ref={railRef} className="flex gap-6 overflow-x-auto px-6 pb-6 md:w-max md:gap-8 md:pl-[max(2rem,calc(50vw-550px))]">
        {paths.map((path) => (
          <div
            key={path.title}
            className="flex w-[320px] flex-shrink-0 flex-col gap-4 rounded-3xl border border-border/60 bg-primary/5 p-6 md:w-[380px]"
          >
            <div className="flex h-40 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {path.media}
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-2xl font-semibold">{path.title}</h3>
              <p className="text-sm text-foreground/70">{path.description}</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                {path.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
            </div>
            <Button variant="outline" className="mt-auto">
              Explore this path
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
