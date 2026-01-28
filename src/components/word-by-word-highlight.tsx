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
    // Only run on desktop once breakpoint is known
    if (isMobile !== false) return;
    if (!component.current) return;

    // Reduced motion: no splitting, just ensure visible
    if (prefersReducedMotion()) {
      component.current.style.opacity = '1';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      const el = component.current;
      if (!el) return;

      split = new SplitType(el, { types: 'words' });

      // Normalize targets safely (SplitType can return nullish/odd shapes sometimes)
      const words = (split.words ?? [])
        .filter((w): w is HTMLElement => !!w && w instanceof HTMLElement);

      if (!words.length) return;

      gsap.set(words, {
        color: 'hsl(var(--word-muted))',
        opacity: 0.35,
        y: 8,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: '+=120%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }).to(words, {
        color: 'hsl(var(--word-active))',
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: 'none',
      });
    }, component);

    return () => {
      // Revert split first, then GSAP context
      split?.revert();
      ctx.revert();
    };
  }, [isMobile, text]);

  return (
    <p ref={component} className={className}>
      {text}
    </p>
  );
}
