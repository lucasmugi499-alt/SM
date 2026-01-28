'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useIsMobile } from '@/hooks/use-mobile';
import { prefersReducedMotion, revealFadeUp } from '@/lib/motion';

export function KeyholeSpotlight() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const image = PlaceHolderImages.find((img) => img.id === 'IMG_AGRI_GALLERY_01');

  useLayoutEffect(() => {
    if (isMobile === undefined) return;
    if (!sectionRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      const tween = revealFadeUp(sectionRef.current?.querySelectorAll('.spotlight-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      if (isMobile !== false || prefersReducedMotion()) {
        gsap.set(maskRef.current, { opacity: 0 });
        return () => {
          tween?.scrollTrigger?.kill();
          tween?.kill();
        };
      }

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: '+=120%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(maskRef.current, {
        '--spotlight-x': '70%',
        '--spotlight-y': '45%',
        '--spotlight-size': '26vmin',
        ease: 'none',
      })
        .to(maskRef.current, {
          '--spotlight-x': '50%',
          '--spotlight-y': '50%',
          '--spotlight-size': '70vmin',
          ease: 'none',
        })
        .to(maskRef.current, { opacity: 0, ease: 'none' }, 0.85);

      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(maskRef.current, { clearProps: 'opacity' });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="S5_SPOTLIGHT" ref={sectionRef} className="py-20 md:py-32 bg-secondary">
      <div className="container grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <p className="spotlight-reveal text-xs uppercase tracking-[0.4em] text-primary/80">
            Spotlight chapter
          </p>
          <h2 className="spotlight-reveal mt-4 font-headline text-4xl font-bold md:text-5xl">
            See the season through a smaller window.
          </h2>
          <p className="spotlight-reveal mt-6 text-lg text-foreground/80">
            We move focus step by step—from a single planting decision to a full field plan. Scroll to watch the
            spotlight expand as the story gets bigger.
          </p>
          <p className="spotlight-reveal mt-4 text-sm text-foreground/60">
            On mobile we keep it simple, letting the imagery breathe without heavy masking.
          </p>
        </div>

        <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-border">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          ) : null}
          <div
            ref={maskRef}
            className="keyhole-mask pointer-events-none absolute inset-0 bg-black/70 transition-opacity duration-500"
            style={{
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </section>
  );
}
