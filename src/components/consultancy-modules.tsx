import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const modules = [
  {
    title: 'Financial literacy',
    description: 'Build practical confidence with budgeting, planning, and basic records.',
  },
  {
    title: 'Digital marketing',
    description: 'Learn how to present your work, reach customers, and communicate clearly.',
  },
  {
    title: 'Taxation & returns filing',
    description: 'Support to understand requirements, prepare documents, and file returns properly.',
  },
  {
    title: 'Creativity & innovation',
    description: 'Problem-solving frameworks that help you adapt and create better solutions.',
  },
  {
    title: 'Business strategy & operations',
    description: 'Strengthen planning, workflows, and sustainability.',
  },
];

export function ConsultancyModules() {
  return (
    <section id="S8_CONSULTANCY" className="consultancy bg-background py-20 md:py-32">
      <div className="container grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
            Business consultancy
          </p>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            From skills to strategy.
          </h2>
          <p className="text-lg text-foreground/70">
            Training becomes impact when your decisions get sharper—money, marketing,
            compliance, and innovation.
          </p>
          <div className="flex h-56 items-center justify-center rounded-3xl border border-border/60 bg-gradient-to-br from-background via-primary/10 to-accent/10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              IMG_CONSULTANCY_01.webp
            </span>
          </div>
          <Button asChild variant="outline">
            <a href="#booking">Book a consultancy session</a>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem key={module.title} value={`module-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {module.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/70">
                {module.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
