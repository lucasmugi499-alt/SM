import type { LucideIcon } from 'lucide-react';
import {
  Leaf,
  Briefcase,
  Users,
  HeartHandshake,
  Smile,
  HeartPulse,
  School,
  Banknote,
  Megaphone,
  FileText,
  Lightbulb,
  Factory,
  CalendarCheck,
} from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  subItems?: { title: string; icon: LucideIcon }[];
};

export const services: Service[] = [
  {
    title: 'Agricultural Training',
    description:
      'Hands-on field training in soil prep, planting, irrigation, crop care, and post-harvest handling.',
    icon: Leaf,
  },
  {
    title: 'Business Consultancy',
    description: 'Decision support for records, pricing, marketing, compliance, and practical innovation.',
    icon: Briefcase,
    subItems: [
      { title: 'Financial literacy (general)', icon: Banknote },
      { title: 'Digital marketing', icon: Megaphone },
      { title: 'Taxation & returns filing', icon: FileText },
      { title: 'Creativity & innovation', icon: Lightbulb },
      { title: 'Strategy & operations', icon: Factory },
    ],
  },
  {
    title: 'Mentorship & Coaching',
    description: 'Role-based mentorship that turns goals into weekly action and measurable progress.',
    icon: Users,
  },
  {
    title: 'Youth & Community Support',
    description: 'Confidential guidance for youth wellbeing, family stability, and recovery-oriented support.',
    icon: HeartHandshake,
    subItems: [
      { title: 'Youth mental health support', icon: HeartHandshake },
      { title: 'Teenage & adolescent counseling', icon: Smile },
      { title: 'Recovery-oriented substance counseling', icon: HeartPulse },
    ],
  },
  {
    title: 'Internships & Apprenticeship Attachments',
    description: 'Structured attachments with supervision, skills targets, and real-world practice.',
    icon: School,
  },
  {
    title: 'Events/Workshops',
    description: 'Focused sessions with practical outcomes for growers, founders, and community partners.',
    icon: CalendarCheck,
  },
];

export const MENTOR_ROLES = [
  'Agriculture Trainer',
  'Business Consultant',
  'Mentorship Coach',
  'Youth Support Counselor',
  'Internship Coordinator',
  'Events & Workshops Lead',
];
