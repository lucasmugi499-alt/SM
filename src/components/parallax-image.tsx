'use client';

import { useLayoutEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { parallaxMedia } from '@/lib/motion-system';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: StaticImageData | string;
  alt: string;
  intensity?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, intensity = 30, className }: ParallaxImageProps) {
  const isMobile = useIsMobile();
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    if (isMobile === false && imgEl) {
      const tween = parallaxMedia(imgEl, intensity);
      return () => {
        tween.tween?.scrollTrigger?.kill();
        tween.tween?.kill();
      };
    }
  }, [isMobile, intensity, imgEl]);

  return (
    <div className={cn('overflow-hidden', className)}>
      <Image onLoadingComplete={(img) => setImgEl(img)} src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
