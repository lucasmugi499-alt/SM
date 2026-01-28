'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useIsMobile } from '@/hooks/use-mobile';
import { prefersReducedMotion, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

export function KeyholeSpotlight() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const image = PlaceHolderImages.find((img) => img.id === 'IMG_AGRI_GALLERY_01');

  useLayoutEffect(() => {
    if (isMobile === undefined) return;
    if (!sectionRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      const label = revealLabel(sectionRef.current?.querySelectorAll('.spotlight-label'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
      const headline = revealHeadline(sectionRef.current?.querySelectorAll('.spotlight-headline'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
      });
      const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.spotlight-copy'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      if (isMobile !== false || prefersReducedMotion()) {
        gsap.set(maskRef.current, { opacity: 0 });
        return () => {
          label.tween?.scrollTrigger?.kill();
          label.tween?.kill();
          headline.tween?.scrollTrigger?.kill();
          headline.tween?.kill();
          headline.revert?.();
          paragraphs.tween?.scrollTrigger?.kill();
          paragraphs.tween?.kill();
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
        label.tween?.scrollTrigger?.kill();
        label.tween?.kill();
        headline.tween?.scrollTrigger?.kill();
        headline.tween?.kill();
        headline.revert?.();
        paragraphs.tween?.scrollTrigger?.kill();
        paragraphs.tween?.kill();
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(maskRef.current, { clearProps: 'opacity' });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="S5_SPOTLIGHT" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div>
          <p className="spotlight-label text-xs uppercase tracking-[0.4em] text-primary/80">
            Spotlight
          </p>
          <h2 className="spotlight-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Focus on one field, then the full season.
          </h2>
          <div className="spotlight-copy mt-6 space-y-4 text-lg text-foreground/80">
            <p>
              We start with one decision—seed choice, soil readiness, irrigation timing—then widen the
              view until the whole season is visible.
            </p>
            <p>
              On mobile the story stays light and readable, letting imagery breathe without heavy masking.
            </p>
          </div>
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
