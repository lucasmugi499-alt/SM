import type { LucideIcon } from 'lucide-react';
import {
  Leaf,
  Briefcase,
  Users,
  HeartHandshake,
  Smile,
  HeartPulse,
  School,
} from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: 'Agricultural Training',
    description: 'Practical training built for consistency, resilience, and real-world outcomes.',
    icon: Leaf,
  },
  {
    title: 'Business Consultancy',
    description:
      'Financial literacy, digital marketing, taxation & returns filing, creativity & innovation, and operations support.',
    icon: Briefcase,
  },
  {
    title: 'Mentorship & Coaching',
    description: 'One-on-one and cohort guidance that turns goals into action.',
    icon: Users,
  },
  {
    title: 'Youth Mental Health Support',
    description: 'Respectful, supportive guidance centered on wellbeing.',
    icon: HeartHandshake,
  },
  {
    title: 'Teenage & Adolescent Counseling',
    description: 'Supportive conversations focused on growth and decision-making.',
    icon: Smile,
  },
  {
    title: 'Rehabilitation & Substance Addiction Counseling',
    description: 'Recovery-oriented counseling and support.',
    icon: HeartPulse,
  },
  {
    title: 'Internships & Apprenticeship Attachments',
    description: 'Structured attachments that build real-world skills and confidence.',
    icon: School,
  },
];

export const MENTOR_ROLES = [
  'Mentor',
  'Counselor',
  'Farmer Expert',
  'Psycho-social Expert',
  'Business Consultant',
  'Event Manager',
];
