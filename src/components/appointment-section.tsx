'use client';

import { useLayoutEffect, useRef } from 'react';
import { AppointmentForm } from '@/components/appointment-form';
import { revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

export function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.booking-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.booking-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.booking-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });

    return () => {
      label.tween?.scrollTrigger?.kill();
      label.tween?.kill();
      headline.tween?.scrollTrigger?.kill();
      headline.tween?.kill();
      headline.revert?.();
      paragraphs.tween?.scrollTrigger?.kill();
      paragraphs.tween?.kill();
    };
  }, []);

  return (
    <section id="S15_BOOKING" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container max-w-3xl">
        <p className="booking-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Booking</p>
        <h2 className="booking-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
          Book an appointment through the Information Desk.
        </h2>
        <div className="booking-copy mt-4 space-y-3 text-lg text-foreground/80">
          <p>Choose the role you need. Booking is by title only—no individual names.</p>
          <p>
            Telephone number is mandatory. You will receive delivery confirmation and a unique reference ID.
          </p>
        </div>
        <div className="booking-copy mt-10">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
