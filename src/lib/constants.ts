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
    description: 'Master modern farming techniques and boost your yield.',
    icon: Leaf,
  },
  {
    title: 'Business Consultancy',
    description: 'Build the thinking behind your growth—money clarity, marketing direction, compliance readiness, and innovation.',
    icon: Briefcase,
    subItems: [
        { title: 'Financial literacy', icon: Banknote },
        { title: 'Digital marketing', icon: Megaphone },
        { title: 'Taxation & returns filing', icon: FileText },
        { title: 'Creativity & innovation', icon: Lightbulb },
        { title: 'Strategy & operations', icon: Factory },
    ]
  },
  {
    title: 'Mentorship & Coaching',
    description: 'Connect with experienced mentors for personalized guidance.',
    icon: Users,
  },
  {
    title: 'Youth & Community Support',
    description: 'Confidential and compassionate support for young minds, teens, and those on a path to recovery.',
    icon: HeartHandshake,
    subItems: [
        { title: 'Youth mental health support', icon: HeartHandshake },
        { title: 'Teenage & adolescent counseling', icon: Smile },
        { title: 'Rehabilitation & substance addiction counseling', icon: HeartPulse },
    ]
  },
  {
    title: 'Internships & Apprenticeship Attachments',
    description: 'Gain real-world experience and kickstart your career.',
    icon: School,
  },
];

export const MENTOR_ROLES = [
  'Mentors',
  'Counselors',
  'Farmer Experts',
  'Psycho-social Experts',
  'Business Consultants',
  'Event Managers',
];
