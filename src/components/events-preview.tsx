import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const events = [
    { title: 'Crop Planning & Seasonal Strategy', description: 'Build a plan you can follow and adjust.', imageId: 'IMG_EVENTS_01' },
    { title: 'Post-Harvest Handling & Storage', description: 'Reduce losses and protect value.', imageId: 'IMG_EVENTS_02' },
    { title: 'Business Basics: Records + Marketing', description: 'Make decisions with clarity and confidence.', imageId: 'IMG_EVENTS_03' }
];

export function EventsPreview() {
  return (
    <section id="S11_EVENTS" className="py-20 md:py-32">
        <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-headline text-4xl font-bold md:text-5xl">Workshops and community sessions.</h2>
                <p className="mt-4 text-lg text-foreground/80">Short, focused sessions designed for practical learning and momentum.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
                {events.map(event => {
                    const image = PlaceHolderImages.find(img => img.id === event.imageId);
                    return (
                        <Card key={event.title} className="overflow-hidden flex flex-col">
                            {image && (
                                <div className="relative aspect-video">
                                    <Image src={image.imageUrl} alt={event.title} fill className="object-cover" data-ai-hint={image.imageHint} />
                                </div>
                            )}
                            <CardHeader className="flex-grow">
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{event.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button variant="secondary" className="w-full">View Details</Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
            <div className="text-center mt-12">
                <Button>View All Events</Button>
            </div>
        </div>
    </section>
  );
}
