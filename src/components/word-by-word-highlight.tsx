'use client';

import { useRef } from 'react';

interface WordByWordHighlightProps {
  text: string;
  className?: string;
}

export function WordByWordHighlight({
  text,
  className,
}: WordByWordHighlightProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  // Render words as spans (no SplitType = no DOM mutation)
  const parts = text.trim().split(/\s+/);

  return (
    <p ref={rootRef} className={className}>
      {parts.map((w, i) => (
        <span key={`${w}-${i}`} data-word="true" style={{ display: 'inline-block' }}>
          {w}
          {i < parts.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  );
}
