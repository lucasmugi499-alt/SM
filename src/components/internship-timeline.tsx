import { Button } from '@/components/ui/button';

const milestones = [
  {
    title: 'Orientation',
    description: 'Goals, readiness, and expectations.',
  },
  {
    title: 'Placement',
    description: 'Matching learners to opportunities.',
  },
  {
    title: 'Mentored growth',
    description: 'Check-ins, feedback, and support.',
  },
  {
    title: 'Outcomes',
    description: 'Skills strengthened, next steps planned.',
  },
];

export function InternshipTimeline() {
  return (
    <section id="S10_INTERNSHIPS" className="internships bg-background py-20 md:py-32">
      <div className="container grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Internships & attachments
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Learn by doing—attachments that change outcomes.
          </h2>
          <p className="text-lg text-foreground/70">
            Internships and apprenticeship attachments help learners build confidence, gain
            real-world skills, and grow professional readiness—supported through mentorship
            and check-ins.
          </p>
          <div className="flex h-52 items-center justify-center rounded-3xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              IMG_INTERNSHIPS_01.webp
            </span>
          </div>
          <Button asChild variant="outline">
            <a href="#booking">Request an internship attachment</a>
          </Button>
        </div>
        <div className="relative space-y-6 border-l border-border/60 pl-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className="relative">
              <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border border-primary/50 bg-background" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
