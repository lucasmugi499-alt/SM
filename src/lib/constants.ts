import type { LucideIcon } from 'lucide-react';
import {
  Leaf,
  Briefcase,
  Landmark,
  Megaphone,
  Receipt,
  Lightbulb,
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
    description: 'Get expert advice to scale your business and navigate challenges.',
    icon: Briefcase,
  },
  {
    title: 'Financial Literacy',
    description: 'Learn to manage your money, invest wisely, and secure your future.',
    icon: Landmark,
  },
  {
    title: 'Digital Marketing',
    description: 'Expand your reach and connect with customers online.',
    icon: Megaphone,
  },
  {
    title: 'Taxation & Returns Filing',
    description: 'Stay compliant and optimize your tax strategy with our help.',
    icon: Receipt,
  },
  {
    title: 'Creativity & Innovation',
    description: 'Unlock your potential and turn brilliant ideas into reality.',
    icon: Lightbulb,
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
    title: 'Rehabilitation & Addiction Counseling',
    description: 'A supportive path to recovery and a new beginning.',
    icon: HeartPulse,
  },
  {
    title: 'Internships & Apprenticeships',
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
