'use client';
import { useLayoutEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';
import { ParallaxImage } from '@/components/parallax-image';
import { revealHeadline, revealLabel, revealParagraphChunks, revealCards, washTransition } from '@/lib/motion-system';

const outcomes = [
  'Plan planting windows and input timing with confidence.',
  'Build irrigation routines that match daily life and labour.',
  'Reduce losses through better sorting, handling, and storage.',
  'Strengthen soil care and water conservation habits.',
  'Track results and adjust quickly for the next season.',
];

const galleryImageIds = [
  'IMG_AGRI_GALLERY_01',
  'IMG_AGRI_GALLERY_02',
  'IMG_AGRI_GALLERY_03',
  'IMG_AGRI_GALLERY_04',
  'IMG_AGRI_GALLERY_05',
  'IMG_AGRI_GALLERY_06',
];

export function AgricultureStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const galleryImages = PlaceHolderImages.filter((img) => galleryImageIds.includes(img.id));

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current.querySelectorAll('.agri-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current.querySelectorAll('.agri-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current.querySelectorAll('.agri-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current.querySelectorAll('.outcome-item'), {
      scrollTrigger: { trigger: sectionRef.current.querySelector('.outcomes-grid'), start: 'top 85%' },
    });
    const wash = washTransition(washRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
    });

    return () => {
      label.tween?.scrollTrigger?.kill();
      label.tween?.kill();
      headline.tween?.scrollTrigger?.kill();
      headline.tween?.kill();
      headline.revert?.();
      paragraphs.tween?.scrollTrigger?.kill();
      paragraphs.tween?.kill();
      cards.tween?.scrollTrigger?.kill();
      cards.tween?.kill();
      wash.tween?.scrollTrigger?.kill();
      wash.tween?.kill();
    };
  }, []);

  return (
    <section id="S4_AGRICULTURE" ref={sectionRef} className="relative py-24">
      <div className="container">
        <div className="max-w-3xl">
          <p className="agri-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Agriculture</p>
          <h2 className="agri-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Agriculture that works in real life.
          </h2>
          <div className="agri-copy mt-6 space-y-4 text-lg text-foreground/80">
            <p>
              We teach the work in the order it happens on the ground—soil preparation, planting,
              irrigation, crop care, then handling and storage. The plan is repeatable, not a one-off win.
            </p>
            <p>
              Every cohort leaves with routines they can execute in changing weather, shifting prices, and
              limited time. The goal is consistent harvests, not perfect conditions.
            </p>
          </div>
        </div>

        <div className="outcomes-grid mt-14 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {outcomes.map((outcome) => (
            <div key={outcome} className="outcome-item flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-base text-foreground/80">{outcome}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryImages.map((image, i) => (
            <ParallaxImage
              key={image.id}
              src={image.imageUrl}
              alt={image.description}
              className="relative aspect-[3/4] overflow-hidden rounded-xl"
              intensity={i % 2 === 0 ? 18 : -18}
            />
          ))}
        </div>
      </div>
      <div
        ref={washRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-background/40 to-background"
      />
    </section>
  );
}
