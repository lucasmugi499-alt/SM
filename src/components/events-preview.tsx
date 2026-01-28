import { Button } from '@/components/ui/button';

const events = [
  {
    title: 'Crop Planning & Seasonal Strategy',
    description: 'Build a plan you can follow and adjust.',
    media: 'IMG_EVENTS_01.webp',
  },
  {
    title: 'Post-Harvest Handling & Storage',
    description: 'Reduce losses and protect value.',
    media: 'IMG_EVENTS_02.webp',
  },
  {
    title: 'Business Basics: Records + Marketing',
    description: 'Make decisions with clarity and confidence.',
    media: 'IMG_EVENTS_03.webp',
  },
];

export function EventsPreview() {
  return (
    <section id="S11_EVENTS" className="events bg-primary/5 py-20 md:py-28">
      <div className="container space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
              Events & workshops
            </p>
            <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">
              Workshops and community sessions.
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Short, focused sessions designed for practical learning and momentum.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">View events</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request a workshop
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6"
            >
              <div className="flex h-36 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
                  {event.media}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
