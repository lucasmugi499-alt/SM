export function AgricultureStory() {
  const bullets = [
    'Build a seasonal plan you can actually follow',
    'Improve consistency through simple, repeatable routines',
    'Reduce losses with better handling and storage',
    'Strengthen soil, water, and resilience practices',
    'Learn how to track progress and adjust quickly',
  ];

  const gallery = [
    'IMG_AGRI_GALLERY_01.webp',
    'IMG_AGRI_GALLERY_02.webp',
    'IMG_AGRI_GALLERY_03.webp',
    'IMG_AGRI_GALLERY_04.webp',
    'IMG_AGRI_GALLERY_05.webp',
    'IMG_AGRI_GALLERY_06.webp',
  ];

  return (
    <section id="S4_AGRI_STORY" className="agri-story bg-primary/5 py-20 md:py-32">
      <div className="container space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Agriculture story
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Agriculture that works in real life.
          </h2>
          <p className="text-lg text-foreground/70">
            We focus on outcomes: stronger routines, smarter planning, healthier systems, and
            better handling. Training is built to be practical—so learners can apply it
            immediately and improve with each season.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-border/60 bg-background/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/70">
                Outcome
              </p>
              <p className="mt-2 text-base text-foreground/70">{bullet}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {gallery.map((image) => (
            <div
              key={image}
              className="flex min-h-[180px] items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {image}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
