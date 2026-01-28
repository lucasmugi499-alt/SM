const youthOptions = [
  {
    title: 'Youth mental health support',
    description: 'Guidance, coping tools, and support planning.',
  },
  {
    title: 'Teenage & adolescent counseling',
    description: 'Supportive conversations focused on growth and decision-making.',
  },
  {
    title: 'Rehabilitation and counseling for drug and substance addiction',
    description: 'Recovery-oriented support and guidance.',
  },
];

export function YouthSupportChapter() {
  return (
    <section id="S9_YOUTH" className="youth bg-primary/5 py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Youth & community support
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Support that respects people.
          </h2>
          <p className="text-lg text-foreground/70">
            We provide supportive services that help youth and community members navigate
            challenges, build stability, and access guidance—centered on dignity and privacy.
          </p>
          <p className="text-sm text-foreground/60">
            We take a respectful, supportive approach. If someone is in immediate danger,
            contact local emergency services.
          </p>
        </div>
        <div className="space-y-4">
          {youthOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-border/60 bg-background/80 p-5"
            >
              <h3 className="text-base font-semibold">{option.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{option.description}</p>
            </div>
          ))}
          <div className="flex h-40 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              IMG_YOUTH_01.webp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
