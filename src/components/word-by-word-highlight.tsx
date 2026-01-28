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
    // Early exit if the element isn't in the DOM
    if (!el || !el.isConnected) return;
  
    // Respect reduced motion
    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }
  
    gsap.registerPlugin(ScrollTrigger);
  
    let split: SplitType | null = null;
  
    const ctx = gsap.context(() => {
      const target = component.current;
      // Double-check target inside the GSAP context
      if (!target || !target.isConnected) return;
  
      split = new SplitType(target, { types: 'words' });
  
      // Paranoid hardening: ensure we have a clean array of actual elements.
      const words = (split.words || []).filter(
        (w): w is HTMLElement => w instanceof HTMLElement && w.isConnected
      );
      
      // Final safety check before passing to GSAP
      if (!words || words.length === 0) {
        return;
      }
  
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
