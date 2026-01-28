'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { revealFadeUp } from '@/lib/motion';

const timelineSteps = [
    { num: 1, title: 'Orientation', description: 'Goals, readiness, and expectations' },
    { num: 2, title: 'Placement', description: 'Role matching and schedule planning' },
    { num: 3, title: 'Mentored growth', description: 'Check-ins, feedback, and guidance' },
    { num: 4, title: 'Outcomes', description: 'Skills evidence and next-step planning' }
];

export function InternshipTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const image = PlaceHolderImages.find(img => img.id === 'IMG_INTERNSHIPS_01');
    const scrollTo = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia(sectionRef.current);
        mm.add('(prefers-reduced-motion: no-preference)', (context) => {
            if(!context.scope) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: context.scope.querySelector('.timeline-container'),
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 1,
                }
            });

            tl.from('.timeline-line', { scaleY: 0, transformOrigin: 'top' })
              .from('.timeline-step', { opacity: 0, y: 30, stagger: 0.25 }, '-=0.5');
            
            return () => tl.kill();
        });

        return () => mm.revert();
    }, []);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const fade = revealFadeUp(sectionRef.current?.querySelectorAll('.internship-reveal'), {
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
        <section id="S11_INTERNSHIPS" ref={sectionRef} className="py-20 md:py-32 bg-secondary">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="internship-reveal font-headline text-4xl font-bold md:text-5xl">Learn by doing with structured attachments.</h2>
                    <p className="internship-reveal mt-4 text-lg text-foreground/80">
                        We set clear skills targets, place learners in supervised roles, and run check-ins so the experience turns into real capability—not just time served.
                    </p>
                    <div className="timeline-container relative mt-12 pl-12">
                        <div className="timeline-line absolute left-4 top-0 h-full w-0.5 bg-border"></div>
                        {timelineSteps.map(step => (
                            <div key={step.num} className="timeline-step relative mb-8">
                                <div className="absolute -left-8 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-xl">{step.title}</h3>
                                <p className="text-foreground/70">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <Button size="lg" className="internship-reveal mt-8" onClick={() => scrollTo('#S15_BOOKING')}>Request an internship attachment →</Button>
                </div>
                <div className="internship-reveal relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                    {image && (
                        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                    )}
                </div>
            </div>
        </section>
    );
}
