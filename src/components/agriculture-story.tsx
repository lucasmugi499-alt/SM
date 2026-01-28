'use client';
import { useLayoutEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';
import { revealFadeUp, revealStagger } from '@/lib/motion';
import { ParallaxImage } from '@/components/parallax-image';

const outcomes = [
  'Plan planting windows and input timing with confidence',
  'Set simple irrigation routines that fit daily life',
  'Reduce losses through better sorting and storage',
  'Strengthen soil care and water conservation habits',
  'Track results and adjust quickly for the next season',
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
    const fade = revealFadeUp(sectionRef.current.querySelectorAll('.agri-reveal'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
    const tween = revealStagger(sectionRef.current.querySelectorAll('.outcome-item'), {
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.outcomes-grid'),
      },
    });
    return () => {
      fade?.scrollTrigger?.kill();
      fade?.kill();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <section id="S4_AGRICULTURE" ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="agri-reveal font-headline text-4xl font-bold md:text-5xl">
            Agriculture that survives the real season.
          </h2>
          <p className="agri-reveal mt-6 text-lg text-foreground/80">
            We teach the work in the same order it happens on the ground—soil prep, planting, irrigation, crop care, then handling and storage. The goal is a plan you can repeat, not a one-off success.
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

        <div className="agri-reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
