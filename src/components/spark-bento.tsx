'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Leaf,
  Users,
  Briefcase,
  HeartHandshake,
  School,
  CalendarCheck,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { revealCards, revealHeadline, revealLabel, revealParagraphChunks } from '@/lib/motion-system';

const tiles = [
  {
    title: 'Agricultural Training',
    description: 'Seasonal field routines, soil preparation, irrigation, crop care, and post-harvest handling.',
    icon: Leaf,
    className: 'md:col-span-6',
    imageId: 'IMG_AGRI_GALLERY_02',
  },
  {
    title: 'Mentorship & Coaching',
    description: 'Weekly actions and accountability routed by role, not by individual names.',
    icon: Users,
    className: 'md:col-span-3',
  },
  {
    title: 'Business Consultancy',
    description: 'Financial literacy, digital marketing, taxation, innovation, and strategy.',
    icon: Briefcase,
    className: 'md:col-span-3',
  },
  {
    title: 'Youth mental health support',
    description: 'Confidential support and coping tools for youth and families.',
    icon: HeartHandshake,
    className: 'md:col-span-4',
  },
  {
    title: 'Teenage & adolescent counseling',
    description: 'Respectful counseling with recovery-oriented language.',
    icon: Sprout,
    className: 'md:col-span-4',
  },
  {
    title: 'Internship & apprenticeship attachments',
    description: 'Structured placements with mentors, targets, and documented outcomes.',
    icon: School,
    className: 'md:col-span-4',
  },
  {
    title: 'Events & workshops',
    description: 'Short, focused sessions that deliver immediate, practical skills.',
    icon: CalendarCheck,
    className: 'md:col-span-4',
  },
  {
    title: 'Info Desk Promise',
    description: 'Every request is routed through the Spark Mentorship Information Desk with a reference ID.',
    icon: ShieldCheck,
    className: 'md:col-span-8',
    featured: true,
    imageId: 'IMG_CONSULTANCY_01',
  },
];

export function SparkBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredImage = PlaceHolderImages.find((img) => img.id === 'IMG_CONSULTANCY_01');

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const label = revealLabel(sectionRef.current?.querySelectorAll('.bento-label'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
    const headline = revealHeadline(sectionRef.current?.querySelectorAll('.bento-headline'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
    const paragraphs = revealParagraphChunks(sectionRef.current?.querySelectorAll('.bento-copy'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    const cards = revealCards(sectionRef.current?.querySelectorAll('.bento-tile'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
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
    <section id="S3_BENTO" ref={sectionRef} className="py-24">
      <div className="container">
        <div className="max-w-3xl">
          <p className="bento-label text-xs uppercase tracking-[0.4em] text-primary/70">Chapter · Scope</p>
          <h2 className="bento-headline mt-4 font-headline text-4xl font-semibold md:text-5xl">
            A bento view of the full mandate.
          </h2>
          <div className="bento-copy mt-4 space-y-3 text-lg text-foreground/80">
            <p>Every tile is a chapter with outcomes, not marketing filler.</p>
            <p>Training, mentorship, consultancy, and youth support move as one system.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12 md:grid-rows-2">
          {tiles.map((tile) => {
            const image = PlaceHolderImages.find((img) => img.id === tile.imageId);
            const Icon = tile.icon;

            return (
              <article
                key={tile.title}
                className={cn(
                  'bento-tile group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg',
                  tile.className
                )}
              >
                {tile.featured && featuredImage ? (
                  <div className="absolute inset-0">
                    <Image
                      src={featuredImage.imageUrl}
                      alt={featuredImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={featuredImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
                    <div className="pointer-events-none absolute inset-0 keyhole-mask bg-black/70 opacity-80 transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="pointer-events-none absolute inset-0 keyhole-mask bg-black/60 opacity-70 transition-all duration-700 group-hover:[--spotlight-size:50vmin] group-hover:[--spotlight-x:65%] group-hover:[--spotlight-y:40%]" />
                  </div>
                ) : null}

                {image && !tile.featured ? (
                  <div className="absolute inset-0 opacity-15">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : null}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="h-6 w-6" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                      Chapter
                    </p>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{tile.title}</h3>
                  <p className="mt-3 text-sm text-foreground/70">{tile.description}</p>
                </div>

                <div className="relative z-10 mt-6 text-xs uppercase tracking-[0.2em] text-foreground/40">
                  Spark Mentorship
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
