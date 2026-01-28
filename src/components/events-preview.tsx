'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

const events = [
  {
    title: 'Crop Planning & Seasonal Strategy',
    description: 'Build a plan you can follow and adjust week by week.',
    imageId: 'IMG_EVENTS_01',
  },
  {
    title: 'Post-Harvest Handling & Storage',
    description: 'Reduce losses and protect the value you worked for.',
    imageId: 'IMG_EVENTS_02',
  },
  {
    title: 'Business Basics: Records + Marketing',
    description: 'Get clear on pricing, record keeping, and outreach.',
    imageId: 'IMG_EVENTS_03',
  },
];

export function EventsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.events-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.events-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.events-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.event-card'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.events-grid'), start: 'top 85%' },
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
    <section id="S12_EVENTS" ref={sectionRef} className="py-24">
      <div className="container">
        <div className="max-w-2xl">
          <p className="events-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Events</p>
          <h2 className="events-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Workshops with clear outcomes.
          </h2>
          <div className="events-copy mt-4 space-y-3 text-lg text-foreground/80">
            <p>Short, focused sessions that give you something usable by the end of the day.</p>
            <p>Each workshop ends with a plan, a checklist, or a template you can apply immediately.</p>
          </div>
        </div>
        <div className="events-grid mt-14 grid gap-8 md:grid-cols-3">
          {events.map((event) => {
            const image = PlaceHolderImages.find((img) => img.id === event.imageId);
            return (
              <Card key={event.title} className="event-card flex flex-col overflow-hidden">
                {image && (
                  <div className="relative aspect-video">
                    <Image
                      src={image.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader className="flex-grow">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    View session details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12">
          <Button className="events-copy">View all workshops</Button>
        </div>
      </div>
    </section>
  );
}
