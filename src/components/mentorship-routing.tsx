import { Button } from '@/components/ui/button';

const roles = [
  'Mentors',
  'Counselors',
  'Farmer Experts',
  'Psycho-social Experts',
  'Business Consultants',
  'Event Managers',
];

export function MentorshipRouting() {
  return (
    <section id="S7_ROUTING" className="routing bg-primary/5 py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Mentorship routing
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            One request. Routed to the right expert.
          </h2>
          <p className="text-lg text-foreground/70">
            You don’t have to guess who to contact. Choose the role you need, submit your
            request, and our Information Desk routes it to the appropriate expert.
          </p>
          <p className="text-sm text-foreground/60">
            Telephone number is required. You receive a delivery confirmation with a unique
            reference ID.
          </p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#booking">Book by role</a>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <div
              key={role}
              className="rounded-2xl border border-border/60 bg-background/80 p-5 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70"
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
