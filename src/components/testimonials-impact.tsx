'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { revealFadeUp, revealStagger } from '@/lib/motion';

const testimonials = [
    "I finally built a planting plan that matched my time and budget.",
    "Mentorship kept me steady when the season got hard.",
    "The business session helped me price work and track costs.",
    "Post-harvest handling reduced losses more than I expected."
];

const impactMetrics = [
    { value: '150+', label: 'Learners Trained' },
    { value: '500+', label: '1:1 Sessions Delivered' },
    { value: '40+', label: 'Workshops Hosted' },
    { value: '25+', label: 'Partners Supported' }
];

export function TestimonialsImpact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.proof-reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      const stagger = revealStagger(sectionRef.current?.querySelectorAll('.proof-card'), {
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.proof-grid'),
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
    <section id="S13_PROOF" ref={sectionRef} className="py-20 md:py-32 bg-secondary">
        <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="proof-reveal font-headline text-4xl font-bold md:text-5xl">Proof you can measure.</h2>
            </div>

            <div className="proof-grid mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="proof-card flex">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Quote className="h-8 w-8 text-primary flex-shrink-0" />
                            <p className="italic text-foreground/80">{testimonial}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="proof-reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {impactMetrics.map(metric => (
                    <div key={metric.label}>
                        <p className="font-headline text-5xl font-bold text-primary">{metric.value}</p>
                        <p className="mt-2 text-sm text-foreground/70 uppercase tracking-wider">{metric.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
