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
  
    const el = component.current;
    if (!el) return;
  
    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }
  
    gsap.registerPlugin(ScrollTrigger);
  
    let split: SplitType | null = null;
  
    const ctx = gsap.context(() => {
      // Capture element inside the context (stable ref)
      const target = component.current;
      if (!target) return;
      if (!target.isConnected) return;
  
      split = new SplitType(target, { types: 'words' });
  
      // ✅ HARDEN: Convert to a clean HTMLElement[] (no nulls)
      const raw = split.words ?? [];
      const words = raw.filter((w): w is HTMLElement => w instanceof HTMLElement);
  
      // If no valid words, bail safely
      if (!words.length) return;
  
      gsap.set(words, {
        color: 'hsl(var(--word-muted))',
        opacity: 0.35,
        y: 8,
      });
  
      gsap
        .timeline({
          scrollTrigger: {
            trigger: target,          // ✅ never null
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
      // Revert split first, then GSAP context cleanup
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
