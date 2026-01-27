import { AppointmentForm } from '@/components/appointment-form';

export function AppointmentSection() {
  return (
    <section id="booking" className="py-20 md:py-32">
      <div className="container max-w-2xl text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Book Your Session
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Take the next step. Fill out the form below and we'll connect you with
          the right mentor.
        </p>
        <div className="mt-12 text-left">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
