'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useIsMobile } from '@/hooks/use-mobile';

interface WordByWordHighlightProps {
  text: string;
  className?: string;
}

export function WordByWordHighlight({ text, className }: WordByWordHighlightProps) {
  const isMobile = useIsMobile();
  const component = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isMobile === false && component.current) {
      const split = new SplitType(component.current, { types: 'words' });
      const words = split.words;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
          markers: false, // Set to true for debugging
        },
      });

      tl.to(words, {
        color: '#FFF',
        stagger: 0.2,
        ease: 'none',
      });

      return () => {
        split.revert();
        tl.kill();
      };
    }
  }, [isMobile, text]);

  return (
    <p ref={component} className={className}>
      {text}
    </p>
  );
}
