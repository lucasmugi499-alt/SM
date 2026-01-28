import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ServiceCategories } from '@/components/service-categories';
import { AppointmentSection } from '@/components/appointment-section';
import { Footer } from '@/components/footer';
import { JourneyIndicator } from '@/components/journey-indicator';
import { PillarsPinned } from '@/components/pillars-pinned';
import { AgricultureStory } from '@/components/agriculture-story';
import { TrainingPathsRail } from '@/components/training-paths-rail';
import { MentorshipRouting } from '@/components/mentorship-routing';
import { ConsultancyModules } from '@/components/consultancy-modules';
import { YouthSupportChapter } from '@/components/youth-support-chapter';
import { InternshipTimeline } from '@/components/internship-timeline';
import { EventsPreview } from '@/components/events-preview';
import { TestimonialsImpact } from '@/components/testimonials-impact';
import { FinalCTA } from '@/components/final-cta';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <JourneyIndicator />
        <PillarsPinned />
        <AgricultureStory />
        <ServiceCategories />
        <TrainingPathsRail />
        <MentorshipRouting />
        <ConsultancyModules />
        <YouthSupportChapter />
        <InternshipTimeline />
        <EventsPreview />
        <TestimonialsImpact />
        <FinalCTA />
        <AppointmentSection />
      </main>
      <Footer />
    </div>
  );
}
