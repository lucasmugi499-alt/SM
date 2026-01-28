'use client';

import { useLayoutEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { revealCards, revealHeadline, revealLabel } from '@/lib/motion-system';

const testimonials = [
  'I finally built a planting plan that matched my time and budget.',
  'Mentorship kept me steady when the season got hard.',
  'The business session helped me price work and track costs.',
  'Post-harvest handling reduced losses more than I expected.',
];

const impactMetrics = [
  { value: '150+', label: 'Learners trained' },
  { value: '500+', label: '1:1 sessions delivered' },
  { value: '40+', label: 'Workshops hosted' },
  { value: '25+', label: 'Partners supported' },
];

export function TestimonialsImpact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.proof-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.proof-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.proof-card'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.proof-grid'), start: 'top 85%' },
    });
    const metrics = revealCards(sectionRef.current?.querySelectorAll('.proof-metric'), {
      scrollTrigger: { trigger: sectionRef.current?.querySelector('.proof-metrics'), start: 'top 85%' },
    });

    return () => {
      label.tween?.scrollTrigger?.kill();
      label.tween?.kill();
      headline.tween?.scrollTrigger?.kill();
      headline.tween?.kill();
      headline.revert?.();
      cards.tween?.scrollTrigger?.kill();
      cards.tween?.kill();
      metrics.tween?.scrollTrigger?.kill();
      metrics.tween?.kill();
    };
  }, []);

  return (
    <section id="S13_PROOF" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container">
        <div className="max-w-2xl">
          <p className="proof-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Proof</p>
          <h2 className="proof-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            Proof you can measure.
          </h2>
        </div>

        <div className="proof-grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="proof-card flex">
              <CardContent className="flex items-center gap-4 p-6">
                <Quote className="h-8 w-8 flex-shrink-0 text-primary" />
                <p className="text-sm italic text-foreground/80">{testimonial}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="proof-metrics mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="proof-metric rounded-xl border border-border/60 bg-background/70 p-6">
              <p className="font-headline text-4xl font-semibold text-primary">{metric.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
