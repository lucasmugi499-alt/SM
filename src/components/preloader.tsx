'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Leaf } from 'lucide-react';

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    if (document.body) {
      document.body.style.overflow = 'hidden';
    }

    tl.fromTo(
      '.spark-line',
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 1.2, ease: 'power3.inOut' }
    )
    .fromTo(
      '.preloader-content',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.8'
    )
    .to(
      '.preloader-container',
      {
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.5,
        onComplete: () => {
          setIsLoaded(true);
          if (document.body) {
            document.body.style.overflow = 'auto';
          }
        },
      }
    );

    return () => {
      if (document.body) {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground">
      <div className="spark-line absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary"></div>
      <div className="preloader-content relative flex flex-col items-center gap-4 text-center">
        <Leaf className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-2xl">Spark Mentorship</h1>
        <p className="text-sm text-foreground/70">Preparing your journey...</p>
      </div>
    </div>
  );
}
