'use client';
import { useLayoutEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';
import { revealStagger } from '@/lib/motion';
import { ParallaxImage } from '@/components/parallax-image';

const outcomes = [
  'Build a seasonal plan you can actually follow',
  'Improve consistency through simple, repeatable routines',
  'Reduce losses with better handling and storage',
  'Strengthen soil, water, and resilience practices',
  'Learn how to track progress and adjust quickly',
];

const galleryImageIds = [
  'IMG_AGRI_GALLERY_01',
  'IMG_AGRI_GALLERY_02',
  'IMG_AGRI_GALLERY_03',
  'IMG_AGRI_GALLERY_04',
];

export function AgricultureStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryImages = PlaceHolderImages.filter((img) => galleryImageIds.includes(img.id));

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = revealStagger(sectionRef.current.querySelectorAll('.outcome-item'), {
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.outcomes-grid'),
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="S4_AGRI_STORY" ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            Agriculture that works in real life.
          </h2>
          <p className="mt-6 text-lg text-foreground/80">
            We focus on outcomes: stronger routines, smarter planning, healthier systems, and better handling. Training is built to be practical—so learners can apply it immediately and improve with each season.
          </p>
        </div>

        <div className="outcomes-grid mt-16 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {outcomes.map((outcome) => (
            <div key={outcome} className="outcome-item flex items-start gap-3">
              <Check className="h-6 w-6 flex-shrink-0 text-primary mt-1" />
              <p className="text-lg">{outcome}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {galleryImages.map((image, i) => (
            <ParallaxImage
              key={image.id}
              src={image.imageUrl}
              alt={image.description}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
              intensity={i % 2 === 0 ? 20 : -20} // Alternate intensity
            />
          ))}
        </div>
      </div>
    </section>
  );
}
