import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const motionTokens = {
  eases: {
    textEase: 'power3.out',
    panelEase: 'power2.inOut',
    microEase: 'power1.out',
  },
  durations: {
    fast: 0.35,
    base: 0.75,
    slow: 1.2,
  },
  stagger: {
    base: 0.08,
    slow: 0.14,
  },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type RevealHandle = {
  tween: gsap.core.Tween | gsap.core.Timeline | null;
  revert?: () => void;
};

const splitWords = (element: HTMLElement) => {
  if (element.dataset.splitApplied === 'true') {
    return {
      words: Array.from(element.querySelectorAll<HTMLElement>('[data-word]')),
      revert: () => undefined,
    };
  }

  const originalText = element.textContent ?? '';
  const words = originalText.trim().split(/\s+/).filter(Boolean);

  const html = words
    .map((word, index) => {
      const spacer = index < words.length - 1 ? '&nbsp;' : '';
      return `<span data-word="${index}" class="split-word" style="display:inline-block; white-space:pre;">${word}${spacer}</span>`;
    })
    .join('');

  element.dataset.splitApplied = 'true';
  element.dataset.splitOriginal = originalText;
  element.setAttribute('aria-label', originalText);
  element.innerHTML = html;

  const wordElements = Array.from(element.querySelectorAll<HTMLElement>('[data-word]'));

  return {
    words: wordElements,
    revert: () => {
      element.innerHTML = originalText;
      element.dataset.splitApplied = 'false';
      delete element.dataset.splitOriginal;
    },
  };
};

const createScrollTrigger = (trigger: gsap.DOMTarget, options?: ScrollTrigger.Vars) =>
  options
    ? {
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options,
      }
    : undefined;

export const revealLabel = (elements: gsap.TweenTarget, options?: gsap.TweenVars): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return { tween: null };
  }

  const tween = gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: motionTokens.durations.fast,
      ease: motionTokens.eases.microEase,
      stagger: motionTokens.stagger.base,
      ...options,
      scrollTrigger: createScrollTrigger(options?.scrollTrigger as ScrollTrigger.Vars),
    }
  );

  return { tween };
};

export const revealHeadline = (elements: gsap.TweenTarget, options?: gsap.TweenVars): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return { tween: null };
  }

  const splitHandles: Array<() => void> = [];
  const targets = gsap.utils.toArray<HTMLElement>(elements);
  const words = targets.flatMap((element) => {
    const { words: wordElements, revert } = splitWords(element);
    splitHandles.push(revert);
    return wordElements;
  });

  const tween = gsap.fromTo(
    words,
    { autoAlpha: 0, yPercent: 30 },
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: motionTokens.durations.base,
      ease: motionTokens.eases.textEase,
      stagger: motionTokens.stagger.base,
      ...options,
      scrollTrigger: createScrollTrigger(options?.scrollTrigger as ScrollTrigger.Vars),
    }
  );

  return {
    tween,
    revert: () => splitHandles.forEach((revert) => revert()),
  };
};

export const revealParagraphChunks = (elements: gsap.TweenTarget, options?: gsap.TweenVars): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return { tween: null };
  }

  const tween = gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: motionTokens.durations.base,
      ease: motionTokens.eases.textEase,
      stagger: motionTokens.stagger.slow,
      ...options,
      scrollTrigger: createScrollTrigger(options?.scrollTrigger as ScrollTrigger.Vars),
    }
  );

  return { tween };
};

export const revealCards = (elements: gsap.TweenTarget, options?: gsap.TweenVars): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { autoAlpha: 1, y: 0, scale: 1 });
    return { tween: null };
  }

  const tween = gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 24, scale: 0.98 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: motionTokens.durations.base,
      ease: motionTokens.eases.panelEase,
      stagger: motionTokens.stagger.base,
      ...options,
      scrollTrigger: createScrollTrigger(options?.scrollTrigger as ScrollTrigger.Vars),
    }
  );

  return { tween };
};

export const parallaxMedia = (element: gsap.TweenTarget, intensity = 20): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(element, { yPercent: 0 });
    return { tween: null };
  }

  const tween = gsap.to(element, {
    yPercent: intensity,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
  });

  return { tween };
};

export const washTransition = (element: gsap.TweenTarget, options?: gsap.TweenVars): RevealHandle => {
  if (prefersReducedMotion()) {
    gsap.set(element, { autoAlpha: 1 });
    return { tween: null };
  }

  const tween = gsap.fromTo(
    element,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: motionTokens.durations.slow,
      ease: motionTokens.eases.panelEase,
      ...options,
      scrollTrigger: createScrollTrigger(options?.scrollTrigger as ScrollTrigger.Vars),
    }
  );

  return { tween };
};

export const pinnedChapter = (
  trigger: gsap.DOMTarget,
  duration: string | number,
  options?: ScrollTrigger.Vars
): gsap.core.Timeline | null => {
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
