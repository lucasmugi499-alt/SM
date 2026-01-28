import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const motionEases = {
  textEase: 'power4.inOut',
  panelEase: 'power4.inOut',
  microEase: 'power2.out',
};

export const motionDurations = {
  fast: 0.45,
  base: 0.8,
  slow: 1.25,
};

export const motionStagger = {
  base: 0.08,
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const revealFadeUp = (elements: gsap.TweenTarget, options?: gsap.TweenVars) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    elements,
    { y: 24, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      ease: motionEases.textEase,
      duration: motionDurations.base,
      stagger: motionStagger.base,
      ...options,
      scrollTrigger: options?.scrollTrigger
        ? {
            start: 'top 85%',
            toggleActions: 'play none none none',
            ...options.scrollTrigger,
          }
        : undefined,
    }
  );
};

export const revealStagger = (elements: gsap.TweenTarget, options?: gsap.TweenVars) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      ease: motionEases.panelEase,
      duration: motionDurations.base,
      stagger: motionStagger.base,
      ...options,
      scrollTrigger: options?.scrollTrigger
        ? {
            start: 'top 90%',
            toggleActions: 'play none none none',
            ...options.scrollTrigger,
          }
        : undefined,
    }
  );
};

export const parallaxMedia = (element: gsap.TweenTarget, intensity: number = 30) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { yPercent: 0 });
    return null;
  }

  return gsap.to(element, {
    yPercent: intensity,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
  });
};

export const createPinnedChapter = (
  trigger: gsap.DOMTarget,
  duration: string | number,
  options?: gsap.TweenVars
) => {
  if (prefersReducedMotion()) {
    return null;
  }

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: `+=${duration}`,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      ...options,
    },
  });
};
