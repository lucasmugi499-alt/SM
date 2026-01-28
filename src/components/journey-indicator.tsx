export function JourneyIndicator() {
  const chapters = [
    'Training',
    'Mentorship',
    'Consultancy',
    'Youth Support',
    'Internships',
    'Proof',
    'Book',
  ];

  return (
    <section id="S2_JOURNEY" className="journey bg-primary/5 py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
              Scroll to explore our chapters.
            </p>
            <h3 className="mt-3 font-headline text-2xl font-semibold md:text-3xl">
              The journey unfolds as you move.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {chapters.map((chapter) => (
              <span
                key={chapter}
                className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70"
              >
                {chapter}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-border/60">
          <div className="h-full w-1/3 rounded-full bg-primary/70" />
        </div>
      </div>
    </section>
  );
}
