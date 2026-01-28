'use client';

import { useLayoutEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { parallaxMedia } from '@/lib/motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParallaxImageProps {
  src: StaticImageData | string;
  alt: string;
  intensity?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, intensity = 30, className }: ParallaxImageProps) {
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (isMobile === false && imageRef.current) {
      const ctx = parallaxMedia(imageRef.current, intensity);
      return () => ctx.revert();
    }
  }, [isMobile, intensity]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <Image ref={imageRef} src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}
