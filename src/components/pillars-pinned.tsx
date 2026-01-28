'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';

const pillars = [
  {
    id: 'pillar-1',
    title: 'Agricultural Training',
    body: 'We teach the work in sequence: soil preparation, planting, irrigation, crop care, and post-harvest handling so every season builds on the last.',
    highlights: [
      'Seasonal planning & crop calendars',
      'Soil preparation & nutrient balance',
      'Irrigation routines & water care',
      'Field checks & pest response',
      'Post-harvest handling & storage',
    ],
    imageId: 'IMG_PILLAR_TRAIN_01',
  },
  {
    id: 'pillar-2',
    title: 'Mentorship & Coaching',
    body: 'Guidance that turns goals into weekly actions. We focus on accountability, decision-making, and the confidence to keep showing up.',
    highlights: [
      'Role-based 1:1 sessions',
      'Cohort mentorship circles',
      'Action planning & checkpoints',
      'Practical decision support',
      'Confidence and consistency',
    ],
    imageId: 'IMG_PILLAR_MENTOR_01',
  },
  {
    id: 'pillar-3',
    title: 'Business Consultancy',
    body: 'Clear records, clear pricing, clear marketing. We help you make decisions that keep work profitable and compliant.',
    highlights: [
      'Financial literacy (general)',
      'Digital marketing',
      'Taxation & returns filing',
      'Creativity & innovation',
      'Strategy & operations',
    ],
    imageId: 'IMG_PILLAR_CONSULT_01',
  },
  {
    id: 'pillar-4',
    title: 'Youth & Community Support',
    body: 'Support that respects people. We help youth and families find stability, build coping tools, and move forward with dignity.',
    highlights: [
      'Youth mental health support',
      'Teenage & adolescent counseling',
      'Recovery-oriented counseling for substance use',
    ],
    imageId: 'IMG_PILLAR_YOUTH_01',
  },
  {
    id: 'pillar-5',
    title: 'Internships & Apprenticeship Attachments',
    body: 'Learn by doing with structure. We place learners in attachments with clear goals, mentors, and practical milestones.',
    highlights: [
      'Placement & role matching',
      'Mentored check-ins',
      'Skills targets and evidence',
      'Work-ready routines',
    ],
    imageId: 'IMG_PILLAR_INTERNSHIP_01',
  },
];

export function PillarsPinned() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(sectionRef.current);

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', (context) => {
        if (!context.scope) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: context.scope,
          start: 'top top',
          end: `+=${pillars.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pillars.forEach((pillar, index) => {
        const pillarContent = `#${pillar.id}-content`;
        const pillarImage = `#${pillar.id}-image`;

        tl.fromTo(
          [pillarContent, pillarImage],
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.inOut' },
          index * 1
        );

        if (index < pillars.length - 1) {
          tl.to(
            [pillarContent, pillarImage],
            { autoAlpha: 0, y: -50, duration: 1, ease: 'power2.inOut' },
            (index + 1) * 1 - 0.25
          );
        }
      });
      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="S2_PILLARS" ref={sectionRef} className="relative min-h-screen bg-secondary lg:min-h-0 lg:h-screen lg:py-24">
      <div className="container grid h-full items-center gap-8 lg:grid-cols-2">
        {/* Text Content Area */}
        <div className="relative h-[450px] lg:h-full">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              id={`${pillar.id}-content`}
              className={`absolute inset-0 flex flex-col justify-center ${index > 0 ? 'opacity-0' : ''}`}
            >
              <h2 className="font-headline text-4xl font-bold md:text-5xl">{pillar.title}</h2>
              <p className="mt-4 text-lg text-foreground/80">{pillar.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {pillar.highlights.map((highlight) => (
                  <Badge key={highlight} variant="secondary">{highlight}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Image Content Area */}
        <div className="relative h-[300px] w-full lg:h-[80vh] lg:max-h-[700px]">
          {pillars.map((pillar, index) => {
            const image = PlaceHolderImages.find((img) => img.id === pillar.imageId);
            return image ? (
              <div
                key={pillar.id}
                id={`${pillar.id}-image`}
                className={`absolute inset-0 rounded-lg overflow-hidden ${index > 0 ? 'opacity-0' : ''}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}
