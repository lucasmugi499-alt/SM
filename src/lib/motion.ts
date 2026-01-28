import { gsap } from 'gsap';

// Easing
export const textEase = 'power4.inOut';
export const panelEase = 'power4.inOut';
export const microEase = 'power2.out';

// Durations
export const DURATION_FAST = 0.5;
export const DURATION_BASE = 0.8;
export const DURATION_SLOW = 1.2;

// Stagger
export const STAGGER_BASE = 0.07;

// Reveal Helpers
export const revealFadeUp = (elements: gsap.TweenTarget, options?: gsap.TweenVars) => {
  return gsap.fromTo(elements, {
    y: '100%',
    autoAlpha: 0,
  }, {
    y: '0%',
    autoAlpha: 1,
    ease: textEase,
    duration: DURATION_BASE,
    stagger: STAGGER_BASE,
    ...options,
    scrollTrigger: {
      trigger: elements as gsap.DOMTarget,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...options?.scrollTrigger,
    }
  });
};

export const revealStagger = (elements: gsap.TweenTarget, options?: gsap.TweenVars) => {
  return gsap.fromTo(elements, {
    autoAlpha: 0,
    y: 30,
  }, {
    autoAlpha: 1,
    y: 0,
    ease: panelEase,
    duration: DURATION_BASE,
    stagger: STAGGER_BASE,
    ...options,
    scrollTrigger: {
      trigger: elements as gsap.DOMTarget,
      start: 'top 90%',
      toggleActions: 'play none none none',
      ...options?.scrollTrigger,
    }
  });
};

export const parallaxMedia = (element: gsap.TweenTarget, intensity: number = 30) => {
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

export const createPinnedChapter = (trigger: gsap.DOMTarget, duration: string | number, options?: gsap.TweenVars) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: `+=${duration}`,
      anticipatePin: 1,
      ...options,
    }
  });
};

// Reduced Motion Check
gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
  gsap.globalTimeline.timeScale(0); // Effectively disables all animations
});
