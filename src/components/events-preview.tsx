'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { revealFadeUp, revealStagger } from '@/lib/motion';

const events = [
    { title: 'Crop Planning & Seasonal Strategy', description: 'Build a plan you can follow and adjust week by week.', imageId: 'IMG_EVENTS_01' },
    { title: 'Post-Harvest Handling & Storage', description: 'Reduce losses and protect the value you worked for.', imageId: 'IMG_EVENTS_02' },
    { title: 'Business Basics: Records + Marketing', description: 'Get clear on pricing, record keeping, and outreach.', imageId: 'IMG_EVENTS_03' }
];

export function EventsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.events-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const stagger = revealStagger(sectionRef.current?.querySelectorAll('.event-card'), {
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.events-grid'),
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
    <section id="S12_EVENTS" ref={sectionRef} className="py-20 md:py-32">
        <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="events-reveal font-headline text-4xl font-bold md:text-5xl">Workshops with clear outcomes.</h2>
                <p className="events-reveal mt-4 text-lg text-foreground/80">Short, focused sessions that give you something usable by the end of the day.</p>
            </div>
            <div className="events-grid mt-16 grid md:grid-cols-3 gap-8">
                {events.map(event => {
                    const image = PlaceHolderImages.find(img => img.id === event.imageId);
                    return (
                        <Card key={event.title} className="event-card overflow-hidden flex flex-col">
                            {image && (
                                <div className="relative aspect-video">
                                    <Image src={image.imageUrl} alt={event.title} fill className="object-cover" data-ai-hint={image.imageHint} />
                                </div>
                            )}
                            <CardHeader className="flex-grow">
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{event.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button variant="secondary" className="w-full">View session details</Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
            <div className="text-center mt-12">
                <Button className="events-reveal">View all workshops</Button>
            </div>
        </div>
    </section>
  );
}
