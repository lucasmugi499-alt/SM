import { AppointmentForm } from '@/components/appointment-form';

export function AppointmentSection() {
  return (
    <section id="S14_BOOKING" className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-2xl text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Book a session by role.
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Choose the type of support you need. Your request is delivered to our Information Desk for proper routing. <strong>Telephone number is required.</strong> You receive a confirmation and reference ID.
        </p>
        <div className="mt-12 text-left">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
