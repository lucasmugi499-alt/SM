import { services } from '@/lib/constants';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ServiceCategories() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Our Experiential Chapters
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            Scroll through our areas of expertise and discover how we can help you grow.
          </p>
        </div>
        <div className="relative">
          <div className="flex w-full space-x-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-accent scrollbar-track-accent/20">
            {services.map((service, index) => (
              <Card
                key={index}
                className="w-[300px] flex-shrink-0 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4">
                    <service.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                  <CardDescription className="pt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary/5 to-transparent" />
        </div>
      </div>
    </section>
  );
}
