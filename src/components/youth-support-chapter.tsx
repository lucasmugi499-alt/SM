import { services } from '@/lib/constants';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const youthService = services.find(s => s.title === 'Youth & Community Support');
const supportOptions = youthService?.subItems || [];

export function YouthSupportChapter() {
  const image = PlaceHolderImages.find(img => img.id === 'IMG_YOUTH_01');

  return (
    <section id="S9_YOUTH" className="py-20 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video lg:aspect-square max-h-[500px] w-full rounded-lg overflow-hidden order-last lg:order-first">
                {image && (
                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                )}
            </div>
            <div>
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Support that respects people.</h2>
            <p className="mt-4 text-lg text-foreground/80">
                We provide supportive services that help youth and community members navigate challenges, build stability, and access guidance—centered on dignity and privacy.
            </p>
            <div className="mt-8 grid gap-4">
                {supportOptions.map((option) => (
                    <Card key={option.title} className="bg-secondary">
                        <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-3">
                            <option.icon className="h-6 w-6 text-primary" />
                            {option.title}
                        </CardTitle>
                        <CardDescription>Guidance, coping tools, and support planning.</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <p className="mt-6 text-sm text-foreground/60">
                We take a respectful, supportive approach. If someone is in immediate danger, contact local emergency services.
            </p>
            </div>
        </div>
      </div>
    </section>
  );
}
