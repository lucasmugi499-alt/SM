const testimonials = [
  '“I finally understood how to plan my season and follow through.”',
  '“The mentorship kept me consistent when I would normally quit.”',
  '“The business session made budgeting and planning feel simple.”',
  '“I learned how to reduce losses after harvest—huge difference.”',
  '“The guidance helped me take the next step with confidence.”',
];

const metrics = [
  { label: 'Learners trained', value: '###' },
  { label: '1:1 sessions delivered', value: '###' },
  { label: 'Workshops hosted', value: '###' },
  { label: 'Partners supported', value: '###' },
];

export function TestimonialsImpact() {
  return (
    <section id="S12_PROOF" className="proof bg-background py-20 md:py-32">
      <div className="container grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Proof of impact
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Real stories. Real growth.
          </h2>
          <div className="space-y-4">
            {testimonials.map((quote) => (
              <blockquote
                key={quote}
                className="rounded-2xl border border-border/60 bg-primary/5 p-4 text-sm text-foreground/70"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex h-40 items-center justify-center rounded-3xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              IMG_PROOF_01.webp
            </span>
          </div>
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border/60 bg-background/80 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/50">
                  {metric.label}
                </p>
                <p className="mt-3 text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
