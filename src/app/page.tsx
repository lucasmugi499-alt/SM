import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ServiceCategories } from '@/components/service-categories';
import { AppointmentSection } from '@/components/appointment-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceCategories />
        <AppointmentSection />
      </main>
      <Footer />
    </div>
  );
}
