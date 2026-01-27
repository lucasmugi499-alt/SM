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
    description: 'Master modern farming techniques and boost your yield.',
    icon: Leaf,
  },
  {
    title: 'Business Consultancy',
    description: 'Expert advice including financial literacy, digital marketing, taxation & returns filing, and creativity & innovation.',
    icon: Briefcase,
  },
  {
    title: 'Mentorship & Coaching',
    description: 'Connect with experienced mentors for personalized guidance.',
    icon: Users,
  },
  {
    title: 'Youth Mental Health Support',
    description: 'Confidential and compassionate support for young minds.',
    icon: HeartHandshake,
  },
  {
    title: 'Teenage & Adolescent Counseling',
    description: 'Navigating the challenges of growing up with a trusted guide.',
    icon: Smile,
  },
  {
    title: 'Rehabilitation & Substance Addiction Counseling',
    description: 'A supportive path to recovery and a new beginning.',
    icon: HeartPulse,
  },
  {
    title: 'Internships & Apprenticeship Attachments',
    description: 'Gain real-world experience and kickstart your career.',
    icon: School,
  },
];

export const MENTOR_ROLES = [
  'Agricultural Expert',
  'Business Strategist',
  'Financial Advisor',
  'Marketing Guru',
  'Tax Consultant',
  'Creative Director',
  'Life Coach',
  'Mental Health Professional',
  'Youth Counselor',
  'Addiction Specialist',
  'Career Mentor',
];
