'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useIsMobile } from '@/hooks/use-mobile';
import { prefersReducedMotion } from '@/lib/motion';

interface WordByWordHighlightProps {
  text: string;
  className?: string;
}

export function WordByWordHighlight({ text, className }: WordByWordHighlightProps) {
  const isMobile = useIsMobile();
  const component = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isMobile !== false || !component.current) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const split = new SplitType(component.current!, { types: 'words' });
      const words = split.words;

      gsap.set(words, {
        color: 'hsl(var(--word-muted))',
        opacity: 0.35,
        y: 8,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top 70%',
          end: '+=120%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(words, {
        color: 'hsl(var(--word-active))',
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: 'none',
      });

      return () => split.revert();
    }, component);

    return () => ctx.revert();
  }, [isMobile, text]);

  return (
    <p ref={component} className={className}>
      {text}
    </p>
  );
}
