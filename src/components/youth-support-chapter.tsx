'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { services } from '@/lib/constants';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { revealFadeUp, revealStagger } from '@/lib/motion';

const youthService = services.find(s => s.title === 'Youth & Community Support');
const supportOptions = youthService?.subItems || [];
const supportDescriptions: Record<string, string> = {
  'Youth mental health support': 'Support for stress, overwhelm, and staying grounded during tough seasons.',
  'Teenage & adolescent counseling': 'Guidance for school pressure, identity shifts, and family communication.',
  'Rehab & substance addiction counseling': 'Recovery-oriented counseling that respects privacy and dignity.',
};

export function YouthSupportChapter() {
  const image = PlaceHolderImages.find(img => img.id === 'IMG_YOUTH_01');
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.youth-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const stagger = revealStagger(sectionRef.current?.querySelectorAll('.youth-card'), {
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.youth-cards'),
          start: 'top 85%',
        },
      });
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
    <section id="S10_YOUTH" ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="youth-reveal relative aspect-video lg:aspect-square max-h-[500px] w-full rounded-lg overflow-hidden order-last lg:order-first">
                {image && (
                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                )}
            </div>
            <div>
            <h2 className="youth-reveal font-headline text-4xl font-bold md:text-5xl">Support that protects dignity.</h2>
            <p className="youth-reveal mt-4 text-lg text-foreground/80">
                We offer safe, confidential support for young people and families—focused on stability, coping tools, and respectful recovery pathways.
            </p>
            <div className="youth-cards mt-8 grid gap-4">
                {supportOptions.map((option) => (
                    <Card key={option.title} className="youth-card bg-secondary">
                        <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-3">
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
            <p className="youth-reveal mt-6 text-sm text-foreground/60">
                We take a respectful, supportive approach. If someone is in immediate danger, contact local emergency services.
            </p>
            </div>
        </div>
      </div>
    </section>
  );
}
