'use client';

import { useLayoutEffect, useRef } from 'react';
import { services } from '@/lib/constants';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

const youthService = services.find((service) => service.title === 'Youth & Community Support');
const supportOptions = youthService?.subItems || [];
const supportDescriptions: Record<string, string> = {
  'Youth mental health support': 'Support for stress, overwhelm, and staying grounded during tough seasons.',
  'Teenage & adolescent counseling': 'Guidance for school pressure, identity shifts, and family communication.',
  'Recovery-oriented substance counseling': 'Respectful counseling focused on recovery, privacy, and long-term stability.',
};

export function YouthSupportChapter() {
  const image = PlaceHolderImages.find((img) => img.id === 'IMG_YOUTH_01');
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.youth-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.youth-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.youth-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.youth-card'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.youth-cards'), start: 'top 85%' },
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
    };
  }, []);

  return (
    <section id="S10_YOUTH" ref={sectionRef} className="py-24">
      <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="relative aspect-video max-h-[520px] w-full overflow-hidden rounded-2xl lg:order-first">
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
        <div>
          <p className="youth-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Youth & community</p>
          <h2 className="youth-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Support that protects dignity.
          </h2>
          <div className="youth-copy mt-6 space-y-4 text-lg text-foreground/80">
            <p>
              We offer safe, confidential support for young people and families—focused on stability,
              coping tools, and respectful recovery pathways.
            </p>
            <p>Care is trauma-informed, practical, and anchored in community.</p>
          </div>
          <div className="youth-cards mt-8 grid gap-4">
            {supportOptions.map((option) => (
              <Card key={option.title} className="youth-card bg-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <option.icon className="h-6 w-6 text-primary" />
                    {option.title}
                  </CardTitle>
                  <CardDescription>
                    {supportDescriptions[option.title] ?? 'Guidance, coping tools, and support planning.'}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <p className="youth-copy mt-6 text-sm text-foreground/60">
            If someone is in immediate danger, contact local emergency services.
          </p>
        </div>
      </div>
    </section>
  );
}
