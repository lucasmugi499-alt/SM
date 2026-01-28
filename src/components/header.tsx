import { Leaf, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Spark</p>
            <p className="font-headline text-lg font-semibold">Mentorship</p>
          </div>
        </div>
        <nav className="hidden items-center gap-3 text-sm text-muted-foreground md:flex">
          <a className="transition-colors hover:text-foreground" href="#S7_TRAINING">
            Training
          </a>
          <a className="transition-colors hover:text-foreground" href="#S9_CONSULTANCY">
            Consultancy
          </a>
          <a className="transition-colors hover:text-foreground" href="#S12_EVENTS">
            Events
          </a>
        </nav>
        <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <a href="#S15_BOOKING" className="inline-flex items-center gap-2">
            <Sparkle className="h-4 w-4" />
            Book via Info Desk
          </a>
        </Button>
      </div>
    </header>
  );
}
