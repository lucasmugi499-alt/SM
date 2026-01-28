import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ServiceCategories } from '@/components/service-categories';
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
        <section id="S1_HERO"><Hero /></section>
        <JourneyIndicator />
        <section id="S2_PILLARS"><PillarsPinned /></section>
        <section id="S3_AGRICULTURE"><AgricultureStory /></section>
        <section id="S4_CATEGORIES"><ServiceCategories /></section>
        <section id="S5_TRAINING"><TrainingPathsRail /></section>
        <section id="S6_MENTORSHIP"><MentorshipRouting /></section>
        <section id="S7_CONSULTANCY"><ConsultancyModules /></section>
        <section id="S8_YOUTH"><YouthSupportChapter /></section>
        <section id="S9_INTERNSHIPS"><InternshipTimeline /></section>
        <section id="S10_EVENTS"><EventsPreview /></section>
        <section id="S11_TESTIMONIALS"><TestimonialsImpact /></section>
        <section id="S12_CTA"><FinalCTA /></section>
      </main>
      <Footer />
    </div>
  );
}
