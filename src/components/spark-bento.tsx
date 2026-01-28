'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import {
  Leaf,
  Users,
  Briefcase,
  HeartHandshake,
  School,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { revealStagger } from '@/lib/motion';

const tiles = [
  {
    title: 'Agriculture Training',
    description: 'Soil prep, planting, irrigation, crop care, and post-harvest handling in the right order.',
    icon: Leaf,
    className: 'md:col-span-6',
    imageId: 'IMG_AGRI_GALLERY_02',
  },
  {
    title: 'Mentorship',
    description: 'Weekly actions, accountability, and decision support from the right role.',
    icon: Users,
    className: 'md:col-span-3',
  },
  {
    title: 'Business Consultancy',
    description: 'Records, pricing, marketing, compliance, and practical innovation.',
    icon: Briefcase,
    className: 'md:col-span-3',
  },
  {
    title: 'Youth Support',
    description: 'Confidential guidance, coping tools, and respectful recovery pathways.',
    icon: HeartHandshake,
    className: 'md:col-span-4',
  },
  {
    title: 'Internships',
    description: 'Structured attachments with supervision, targets, and real work.',
    icon: School,
    className: 'md:col-span-4',
  },
  {
    title: 'Events & Workshops',
    description: 'Focused sessions that deliver practical outcomes in one day.',
    icon: CalendarCheck,
    className: 'md:col-span-4',
  },
  {
    title: 'Info Desk Promise',
    description: 'Book by role only. Every request is routed by our Information Desk and delivered with a reference ID.',
    icon: ShieldCheck,
    className: 'md:col-span-12',
    featured: true,
    imageId: 'IMG_CONSULTANCY_01',
  },
];

export function SparkBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredImage = PlaceHolderImages.find((img) => img.id === 'IMG_CONSULTANCY_01');

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tween = revealStagger(sectionRef.current?.querySelectorAll('.bento-tile'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="S3_BENTO" ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">Spark Bento</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A dense view of the work: training, mentorship, consultancy, and community support—each tile is a chapter with clear outcomes.
          </p>
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
