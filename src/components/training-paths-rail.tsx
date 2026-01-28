'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { revealFadeUp, revealStagger } from '@/lib/motion';

const paths = [
  {
    title: 'Starter Track',
    for: 'For new growers building habits',
    outcomes: ['Soil prep and planting sequence', 'Basic irrigation and field routines', 'Simple seasonal planning'],
    imageId: 'IMG_PATH_STARTER_01',
    cta: 'Explore Starter Track',
  },
  {
    title: 'Growth Track',
    for: 'For growers ready to stabilize yield',
    outcomes: ['Improve consistency in crop care', 'Reduce losses through better handling', 'Strengthen weekly decision-making'],
    imageId: 'IMG_PATH_GROWTH_01',
    cta: 'Explore Growth Track',
  },
  {
    title: 'Pro Track',
    for: 'For teams leading bigger operations',
    outcomes: ['Build resilient farm systems', 'Improve profitability and risk planning', 'Develop long-term farm strategy'],
    imageId: 'IMG_PATH_PRO_01',
    cta: 'Explore Pro Track',
  },
];

export function TrainingPathsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.path-card');
        const pin = gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${containerRef.current!.offsetWidth * (cards.length - 1)}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      return () => pin.kill();
    });

    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.training-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const mobileGrid = sectionRef.current?.querySelector('.training-grid');
      const stagger = mobileGrid
        ? revealStagger(sectionRef.current?.querySelectorAll('.training-card'), {
            scrollTrigger: {
              trigger: mobileGrid,
              start: 'top 85%',
            },
          })
        : null;
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
    <section id="S7_TRAINING" ref={sectionRef} className="py-20 md:py-32 bg-secondary md:overflow-hidden">
      <div className="container mb-12">
        <h2 className="training-reveal font-headline text-4xl font-bold md:text-5xl">Choose your training path.</h2>
        <p className="training-reveal mt-4 text-lg text-foreground/80 max-w-2xl">
          Start where you are. Each track builds routines you can keep when weather, prices, and time pressure change.
        </p>
      </div>

      {/* Desktop: Horizontal Rail */}
      <div ref={containerRef} className="hidden md:flex md:h-[600px] md:w-full md:items-center">
        <div className="flex w-max gap-8 pl-[max(2rem,calc(50vw-550px))]">
          {paths.map((path) => {
            const image = PlaceHolderImages.find((img) => img.id === path.imageId);
            return (
              <Card key={path.title} className="training-card path-card w-[450px] flex-shrink-0 grid grid-rows-subgrid row-span-2 overflow-hidden">
                <CardHeader>
                  {image && (
                     <div className="relative aspect-video rounded-md overflow-hidden">
                        <Image src={image.imageUrl} alt={path.title} fill className="object-cover" data-ai-hint={image.imageHint} />
                     </div>
                  )}
                  <CardTitle className="font-headline text-2xl pt-4">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p className="font-semibold text-foreground/80">{path.for}</p>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {path.outcomes.map(o => <li key={o} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {o}</li>)}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">{path.cta}</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Mobile: Vertical Stack */}
      <div className="training-grid container grid gap-8 md:hidden">
      {paths.map((path) => {
            const image = PlaceHolderImages.find((img) => img.id === path.imageId);
            return (
              <Card key={path.title} className="training-card w-full flex-shrink-0 overflow-hidden">
                <CardHeader>
                  {image && (
                     <div className="relative aspect-video rounded-md overflow-hidden">
                        <Image src={image.imageUrl} alt={path.title} fill className="object-cover" data-ai-hint={image.imageHint} />
                     </div>
                  )}
                  <CardTitle className="font-headline text-2xl pt-4">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p className="font-semibold text-foreground/80">{path.for}</p>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {path.outcomes.map(o => <li key={o} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {o}</li>)}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">{path.cta}</Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </section>
  );
}
