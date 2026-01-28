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
    if (isMobile !== false) return;

    const el = component.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      const target = component.current;
      if (!target) return;
      if (!target.isConnected) return; // extra safety in dev StrictMode

      split = new SplitType(target, { types: 'words' });

      // ✅ sanitize targets: remove null/undefined/non-elements
      const words = (split.words ?? []).filter(
        (w): w is HTMLElement => w instanceof HTMLElement
      );

      if (!words.length) return;

      gsap.set(words, {
        color: 'hsl(var(--word-muted))',
        opacity: 0.35,
        y: 8,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: target,
            start: 'top 70%',
            end: '+=120%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(words, {
          color: 'hsl(var(--word-active))',
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'none',
        });
    }, component);

    return () => {
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
