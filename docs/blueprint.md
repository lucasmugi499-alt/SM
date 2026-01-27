# **App Name**: Spark Mentorship

## Core Features:

- Appointment Booking System: Allow users to book appointments based on role/title, requiring a telephone number. Route submissions to the Information Desk. Send an automatic delivery confirmation with a unique reference ID. Confirmation messaging explicitly states that the request has been delivered to the Spark Mentorship Information Desk.
- Service Category Architecture: Present service categories as distinct experiential chapters including Agricultural Training, Business Consultancy, Financial literacy, Digital marketing, Taxation & returns filing, Creativity & innovation, Mentorship & Coaching, Youth Mental Health Support, Teenage & Adolescent Counseling, Rehabilitation & Substance Addiction Counseling, and Internships & Apprenticeship Attachments. Each category must have a clear narrative purpose, animate into view using scroll-based progression and funnel users toward booking or exploration.
- Firebase Admin Dashboard: Develop a role-restricted admin dashboard for the Information Desk using Firestore. Capabilities include a central ticket queue, ticket statuses, category-based filtering, internal assignment, and notes and activity timeline per ticket. This dashboard is operational infrastructure.
- Ticket Intelligence & Automation: Cloud Functions trigger on new ticket creation to generate a reference ID, send a delivery confirmation email, and flag urgency where applicable. An LLM may be used as a classification assistant to identify urgency indicators and suggest routing priority. The LLM must never directly contact users or override human assignment.
- GSAP ScrollTrigger Integration: Implement pinned sections, split-text headline reveals, staggered content entrances, horizontal scroll rails controlled by vertical scroll, and section-to-section transitions using GSAP ScrollTrigger. All motion must be performance-optimized, GPU-friendly, and disabled or reduced when prefers-reduced-motion is enabled.
- Lenis Smooth Scrolling: Integrate Lenis to control global scroll behavior. Scroll inertia tuned to feel weighted and premium. Separate configuration for mobile vs desktop. ScrollTrigger must be properly synced using scrollerProxy.
- Magnetic CTA Interactions: Design primary CTAs to subtly attract cursor proximity. Hover state should feel elastic. CTA motion should pause scrolling briefly to emphasize intent.

## Style Guidelines:

- Primary color: Forest Green #388E3C to evoke growth, stability, and agriculture.
- Background color: Light Beige #F5F5DC to provide a calm, breathable canvas.
- Accent color: Golden Yellow #FFC107 for energy, highlights, and calls-to-action. Use contrast carefully.
- Headline font: Playfair (serif) with large scale and editorial spacing. Body font: PT Sans (sans-serif) with high readability and calm rhythm. Typography must work with motion.
- Use a nature-inspired, consistent icon set. Icons should animate subtly on entry. Avoid excessive illustration.
- Employ a motion-driven layout inspired by Ribbit.dk, utilizing GSAP ScrollTrigger for pinned sections and horizontal scrolling to guide the user.
- Integrate performance-optimized animations for a cinematic and engaging user experience. Lazy-load heavy media and avoid over-pinning on mobile. Respect prefers-reduced-motion, keyboard navigation, and screen reader semantics. Maintain fast initial paint.