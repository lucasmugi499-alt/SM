# Dev Notes — Scroll + Motion

## Known pitfalls
- **Never kill ScrollTrigger globally.** Scope animations with `gsap.context` or `gsap.matchMedia()` and only kill local triggers/timelines on cleanup.
- **Wait for `useIsMobile` to resolve.** Desktop pinning and horizontal rails should only initialize when `isMobile === false`.
- **Lenis + ScrollTrigger must stay in sync.** Keep the scrollerProxy, RAF cleanup, and `ScrollTrigger.refresh()` calls in place. Avoid additional smooth-scroll libraries.
- **Reduced motion matters.** The motion helpers in `src/lib/motion.ts` automatically bail out; don’t wrap imports with try/catch.

## How to add a new ScrollTrigger section safely
1. **Create a local ref + gsap context.**
   ```ts
   const sectionRef = useRef<HTMLElement>(null);
   useLayoutEffect(() => {
     if (!sectionRef.current) return;
     const ctx = gsap.context(() => {
       // animations here
     }, sectionRef);
     return () => ctx.revert();
   }, []);
   ```
2. **Use motion helpers.** `revealFadeUp`, `revealStagger`, `parallaxMedia`, and `createPinnedChapter` already respect reduced motion.
3. **Pin only on desktop.** Wrap pinning in `gsap.matchMedia()` with `min-width` and `prefers-reduced-motion: no-preference`.
4. **Kill only local animations.** Store timelines/tweens and call `kill()` or `scrollTrigger?.kill()` in the cleanup returned by `gsap.context`.

## How to test
- Manual smoke test:
  - Desktop: scroll through pinned rails (Service Categories, Training Paths) and verify scroll stays responsive.
  - Resize desktop → mobile → desktop and confirm pins re-initialize cleanly.
  - Check word-by-word highlight and keyhole spotlight scrub in both directions.
- Run lint/typecheck if needed:
  - `npm run lint`
  - `npm run typecheck`
