import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Your Growth, Guided.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80">
          Spark Mentorship connects you with industry experts and compassionate
          counselors to nurture your personal and professional journey. Find your
          path, today.
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="#booking">Book an Appointment</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
