'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AppointmentForm } from '@/components/appointment-form';
import { revealFadeUp } from '@/lib/motion';

export function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.booking-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      return () => {
        fade?.scrollTrigger?.kill();
        fade?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="S15_BOOKING" ref={sectionRef} className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-2xl text-center">
        <h2 className="booking-reveal font-headline text-3xl font-bold md:text-4xl">
          Book a session by role.
        </h2>
        <p className="booking-reveal mt-4 text-lg text-foreground/80">
          Choose the role you need. Your request is delivered to our Information Desk for routing. <strong>Telephone number is required.</strong> You receive a confirmation and reference ID.
        </p>
        <div className="booking-reveal mt-12 text-left">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
