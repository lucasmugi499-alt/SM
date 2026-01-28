'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pillarsData = [
  {
    title: 'Agricultural Training',
    body:
      'Learn practical methods you can apply immediately—built for consistency, resilience, and better results across seasons.',
    highlights: [
      'Crop fundamentals & seasonal planning',
      'Livestock basics & sustainable routines',
      'Soil and water stewardship',
      'Climate-smart practices',
      'Post-harvest handling & storage',
    ],
    media: 'IMG_PILLAR_TRAIN_01.webp',
  },
  {
    title: 'Mentorship & Coaching',
    body:
      'Get guidance that turns goals into action. We support planning, problem-solving, and confidence through 1:1 and group mentorship.',
    highlights: [
      'One-on-one sessions',
      'Cohort mentorship',
      'Goal setting & accountability',
      'Skills reinforcement',
      'Practical decision support',
    ],
    media: 'IMG_PILLAR_MENTOR_01.webp',
  },
  {
    title: 'Business Consultancy',
    body:
      'Build the thinking behind your growth—money clarity, marketing direction, compliance readiness, and innovation.',
    highlights: [
      'Financial literacy (general)',
      'Digital marketing',
      'Taxation & returns filing',
      'Creativity & innovation',
      'Strategy & operations',
    ],
    media: 'IMG_PILLAR_CONSULT_01.webp',
  },
  {
    title: 'Youth & Community Support',
    body:
      'Support that respects people. We offer guidance and counseling options designed to strengthen wellbeing and stability.',
    highlights: [
      'Youth mental health support',
      'Teenage & adolescent counseling',
      'Recovery-oriented substance addiction counseling',
    ],
    media: 'IMG_PILLAR_YOUTH_01.webp',
  },
  {
    title: 'Internships & Apprenticeship Attachments',
    body:
      'Learn by doing. We connect learners to structured attachments that build skill, readiness, and real-world confidence.',
    highlights: [
      'Placement support',
      'Mentored growth check-ins',
      'Skills development pathway',
      'Partner opportunities',
    ],
    media: 'IMG_PILLAR_INTERNSHIP_01.webp',
  },
];

export function PillarsPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillars = useMemo(() => pillarsData, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.pillar-panel');
      if (panels.length === 0) return;

      gsap.set(panels, { autoAlpha: 0, y: 30 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${panels.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) return;
        timeline.to(
          panels[index - 1],
          { autoAlpha: 0, y: -20, duration: 0.4, ease: 'power2.inOut' },
          index
        );
        timeline.fromTo(
          panel,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.inOut' },
          index
        );
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="S3_PILLARS" ref={sectionRef} className="pillars relative bg-background py-20 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Five pillars, one journey
          </p>
          <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
            The foundation of Spark Mentorship.
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Each chapter is designed to guide learners from skill-building to sustainable growth.
          </p>
        </div>
        <div className="relative min-h-[480px] md:min-h-[520px]">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-panel grid gap-8 rounded-3xl border border-border/60 bg-primary/5 p-8 md:absolute md:inset-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center"
            >
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-semibold md:text-3xl">{pillar.title}</h3>
                <p className="text-base text-foreground/70">{pillar.body}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/60"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
                  {pillar.media}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
