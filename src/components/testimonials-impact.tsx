import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const testimonials = [
    "I finally understood how to plan my season and follow through.",
    "The mentorship kept me consistent when I would normally quit.",
    "The business session made budgeting and planning feel simple.",
    "I learned how to reduce losses after harvest—huge difference."
];

const impactMetrics = [
    { value: '150+', label: 'Learners Trained' },
    { value: '500+', label: '1:1 Sessions Delivered' },
    { value: '40+', label: 'Workshops Hosted' },
    { value: '25+', label: 'Partners Supported' }
];

export function TestimonialsImpact() {
  return (
    <section id="S12_PROOF" className="py-20 md:py-32 bg-secondary">
        <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-headline text-4xl font-bold md:text-5xl">Real stories. Real growth.</h2>
            </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="flex">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Quote className="h-8 w-8 text-primary flex-shrink-0" />
                            <p className="italic text-foreground/80">{testimonial}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {impactMetrics.map(metric => (
                    <div key={metric.label}>
                        <p className="font-headline text-5xl font-bold text-primary">{metric.value}</p>
                        <p className="mt-2 text-sm text-foreground/70 uppercase tracking-wider">{metric.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
