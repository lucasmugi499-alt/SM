import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section id="S13_FINAL_CTA" className="final-cta bg-primary/5 py-20 md:py-28">
      <div className="container grid gap-8 rounded-3xl border border-border/60 bg-background/80 px-8 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            The spark completes
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Ready to take the next step?
          </h2>
          <p className="text-lg text-foreground/70">
            Submit your request by role. Our Information Desk routes it properly. You’ll
            receive a delivery confirmation with a reference ID.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
            <span>Explore Training Paths</span>
            <span>•</span>
            <span>Explore Services</span>
            <span>•</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex h-40 items-center justify-center rounded-3xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              VID_TRANSITION_GRAIN_01.mp4
            </span>
          </div>
          <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#booking">Book a 1:1 Session</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
