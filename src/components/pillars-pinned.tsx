'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';
import { motionTokens, pinnedChapter, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

const pillars = [
  {
    id: 'pillar-1',
    label: 'Training',
    title: 'Agricultural Training',
    body: 'Work through the season in sequence—soil preparation, planting, irrigation, crop care, and post-harvest handling—so every step builds the next.',
    highlights: [
      'Seasonal calendars & planting windows',
      'Soil prep and nutrient balance',
      'Irrigation routines that stick',
      'Pest response & field checks',
      'Post-harvest handling & storage',
    ],
    imageId: 'IMG_PILLAR_TRAIN_01',
  },
  {
    id: 'pillar-2',
    label: 'Mentorship',
    title: 'Mentorship & Coaching',
    body: 'Role-based guidance with weekly actions, accountability, and decision support for growers, leaders, and youth advocates.',
    highlights: [
      'Role-based 1:1 sessions',
      'Cohort mentorship circles',
      'Weekly action planning',
      'Decision support & confidence',
    ],
    imageId: 'IMG_PILLAR_MENTOR_01',
  },
  {
    id: 'pillar-3',
    label: 'Consultancy',
    title: 'Business Consultancy',
    body: 'Make the numbers, marketing, and compliance as clear as your field plan. Decisions stay grounded and defensible.',
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
    label: 'Community',
    title: 'Youth & Community Support',
    body: 'Respectful, recovery-oriented support for young people and families—care that protects dignity and builds stability.',
    highlights: [
      'Youth mental health support',
      'Teenage & adolescent counseling',
      'Recovery-oriented substance counseling',
    ],
    imageId: 'IMG_PILLAR_YOUTH_01',
  },
  {
    id: 'pillar-5',
    label: 'Internships',
    title: 'Internships & Apprenticeship Attachments',
    body: 'Structured placements with mentors, targets, and real-world outcomes that turn learning into readiness.',
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
      const tl = pinnedChapter(context.scope, `${pillars.length * 120}%`, {
        start: 'top top',
      });

      if (tl) {
        pillars.forEach((pillar, index) => {
          const pillarContent = `#${pillar.id}-content`;
          const pillarImage = `#${pillar.id}-image`;

          tl.fromTo(
            [pillarContent, pillarImage],
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: motionTokens.durations.base,
              ease: motionTokens.eases.panelEase,
            },
            index * 1
          );

          if (index < pillars.length - 1) {
            tl.to(
              [pillarContent, pillarImage],
              { autoAlpha: 0, y: -40, duration: motionTokens.durations.base, ease: motionTokens.eases.panelEase },
              (index + 1) * 1 - 0.2
            );
          }
        });
      }

      return () => tl?.kill();
    });

    mm.add('(max-width: 1023px)', () => {
      const label = revealLabel(sectionRef.current?.querySelectorAll('.pillar-label'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      const headline = revealHeadline(sectionRef.current?.querySelectorAll('.pillar-headline'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.pillar-body'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
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
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="S2_PILLARS" ref={sectionRef} className="relative bg-secondary py-24 lg:h-screen lg:py-24">
      <div className="container grid h-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative h-[520px] lg:h-full">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              id={`${pillar.id}-content`}
              className={`absolute inset-0 flex flex-col justify-center ${index > 0 ? 'opacity-0' : ''}`}
            >
              <p className="pillar-label text-xs uppercase tracking-[0.4em] text-primary/70">{pillar.label}</p>
              <h2 className="pillar-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
                {pillar.title}
              </h2>
              <p className="pillar-body mt-4 text-lg text-foreground/80">{pillar.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {pillar.highlights.map((highlight) => (
                  <Badge key={highlight} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[80vh] lg:max-h-[700px]">
          {pillars.map((pillar, index) => {
            const image = PlaceHolderImages.find((img) => img.id === pillar.imageId);
            return image ? (
              <div
                key={pillar.id}
                id={`${pillar.id}-image`}
                className={`absolute inset-0 overflow-hidden rounded-2xl ${index > 0 ? 'opacity-0' : ''}`}
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
