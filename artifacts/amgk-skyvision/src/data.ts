import type { LucideIcon } from 'lucide-react';
import {
  Aperture, Camera, Clapperboard, ChartNoAxesCombined, CirclePlay,
  Compass, Film, Lightbulb, ScanLine, Target,
} from 'lucide-react';

export const business = {
  name: 'AMGK SkyVision',
  contactName: 'KuhAn',
  phoneDisplay: '011-3582 8706',
  instagramHandle: '@amgk.skyvision',
  tiktokHandle: '@amgk.skyvision',
  // Add a verified international number only after the business confirms it.
  verifiedWhatsAppInternational: '',
  verifiedInstagramUrl: '',
  verifiedTikTokUrl: '',
  verifiedPortfolioUrl: '',
  verifiedEmail: '',
  enquiryEndpoint: '',
  tagline: 'Automotive content / Social media / Growth',
  description: 'Automotive video production and social content for used-car dealerships.',
};

export type Service = {
  number: string; title: string; summary: string; detail: string;
  deliverables: string[]; icon: LucideIcon;
};

export const services: Service[] = [
  {
    number: '01', title: 'Content Planning',
    summary: 'A considered monthly plan built around your available inventory and dealership priorities.',
    detail: 'We shape a practical content direction around the vehicles you have, current promotions, your audience and the formats you want to test.',
    deliverables: ['Monthly content direction', 'Inventory-led planning', 'Promotion and audience alignment', 'Format recommendations'],
    icon: Compass,
  },
  {
    number: '02', title: 'Script & Concept',
    summary: 'Clear hooks and creative ideas that give each vehicle a reason to keep watching.',
    detail: 'From presenter-led walkarounds to focused feature stories, concepts are developed to suit the vehicle, platform and agreed production plan.',
    deliverables: ['Creative concepts', 'Video hooks', 'Scriptwriting', 'Talent-led ideas where applicable'],
    icon: Lightbulb,
  },
  {
    number: '03', title: 'Video Production',
    summary: 'Professional vehicle filming, detailed B-roll and drone footage where suitable.',
    detail: 'Production captures the details buyers want to see: exterior lines, interior condition, useful features and the overall character of each car.',
    deliverables: ['Professional videography', 'Interior and exterior B-roll', 'Vehicle detail shots', 'Drone footage where suitable'],
    icon: Camera,
  },
  {
    number: '04', title: 'Video Editing',
    summary: 'Polished short-form edits designed for clear, social-ready viewing.',
    detail: 'Footage is shaped into concise videos with considered pacing, captions and music, using motion graphics where suitable.',
    deliverables: ['Short-form editing', 'Music and transitions', 'Captions and subtitles', 'Motion graphics where suitable'],
    icon: Clapperboard,
  },
  {
    number: '05', title: 'Social Media Content',
    summary: 'Content prepared for TikTok, Instagram Reels and Facebook Reels.',
    detail: 'Depending on the selected package, content can be supplied ready to publish or include posting and management. The exact arrangement is confirmed in the proposal.',
    deliverables: ['Platform-ready formatting', 'TikTok content', 'Instagram Reels content', 'Facebook Reels content'],
    icon: Film,
  },
  {
    number: '06', title: 'Monitor & Engage',
    summary: 'Observe available performance data and audience engagement to inform next steps.',
    detail: 'Available metrics and audience signals are reviewed over the campaign. Any conclusions depend on the data access and platform insights available.',
    deliverables: ['Engagement monitoring', 'Available performance metrics', 'Top-content observation', 'Three-month analysis where included'],
    icon: ChartNoAxesCombined,
  },
];

export type PackageInfo = {
  slug: string; name: string; rate: number; period: string; total?: number;
  volume: string; note?: string; bestValue?: boolean; items: string[];
};

export const packages: PackageInfo[] = [
  {
    slug: 'premium', name: 'Premium', rate: 2800, period: 'per month', total: 8400,
    volume: '12 short-form videos', bestValue: true,
    items: ['Content strategy and planning', 'Creative concepts and scriptwriting', 'Freelance talent included', 'Professional videography', 'Interior and exterior vehicle B-roll', 'Premium video editing', 'Motion graphics where suitable', 'Captions and subtitles', 'Content posting and management', 'Engagement monitoring', 'Performance monitoring', 'Three-month performance analysis'],
  },
  {
    slug: 'standard', name: 'Standard', rate: 2000, period: 'per month', total: 6000,
    volume: '12 short-form videos',
    items: ['Content planning', 'Scriptwriting', 'Freelance talent included', 'Professional videography', 'Interior and exterior B-roll', 'Standard video editing', 'Captions and subtitles', 'Content posting', 'Engagement monitoring', 'Performance monitoring', 'Three-month performance analysis'],
  },
  {
    slug: 'car-b-roll', name: 'Car B-Roll', rate: 1500, period: 'per month', total: 4500,
    volume: '10 edited videos',
    items: ['One video per vehicle', 'Exterior and interior B-roll', 'Vehicle feature and detail shots', 'Professional editing', 'Music and vehicle specifications', 'Social-media-ready delivery', 'Performance monitoring', 'Three-month performance analysis'],
  },
  {
    slug: 'single-car', name: 'Single Car', rate: 250, period: 'one-time',
    volume: 'One vehicle shoot · one edited short-form video', note: 'ONE-TIME — NO SUBSCRIPTION',
    items: ['Exterior and interior B-roll', 'One edited short-form video', 'Vehicle information text', 'Social-media-ready delivery'],
  },
];

export type Project = { id: string; title: string; category: string; image: string; description: string; playable: boolean };
export const categories = ['All Work', 'Car Walkarounds', 'Vehicle Features', 'Interior B-Roll', 'Drone Footage', 'Promotions', 'Presenter-Led Videos'];

// Concept imagery only. These are not verified AMGK client projects.
export const projects: Project[] = [
  { id: 'walkaround', title: 'The considered walkaround', category: 'Car Walkarounds', image: '/skyvision-hero.jpg', description: 'Illustrative concept showing a cinematic vehicle introduction.', playable: false },
  { id: 'feature', title: 'Details that matter', category: 'Vehicle Features', image: '/skyvision-detail.jpg', description: 'Illustrative concept focused on vehicle details.', playable: false },
  { id: 'interior', title: 'Inside the cabin', category: 'Interior B-Roll', image: '/skyvision-interior.jpg', description: 'Illustrative interior B-roll concept.', playable: false },
  { id: 'drone', title: 'A wider perspective', category: 'Drone Footage', image: '/skyvision-suv.jpg', description: 'Illustrative composition; not actual drone footage.', playable: false },
  { id: 'promotion', title: 'Inventory in focus', category: 'Promotions', image: '/skyvision-hero.jpg', description: 'Illustrative dealership promotion concept.', playable: false },
  { id: 'presenter', title: 'A guided introduction', category: 'Presenter-Led Videos', image: '/skyvision-suv.jpg', description: 'Illustrative presenter-led format concept. No presenter shown.', playable: false },
];

export const faqs = [
  { question: 'What types of dealerships do you work with?', answer: 'AMGK SkyVision primarily serves used-car dealerships. Content direction is shaped around the dealership’s inventory, audience and goals.' },
  { question: 'What is included in each package?', answer: 'Each package has a distinct production and support scope. Review the package details and comparison table; final arrangements are confirmed during the campaign proposal.' },
  { question: 'How does the three-month campaign work?', answer: 'Month 1 focuses on setup and building; Month 2 optimizes creative formats based on available performance; Month 3 continues the agreed plan and prepares analysis and next-step strategy.' },
  { question: 'Is filming included?', answer: 'Professional videography is included in Premium and Standard. Car B-Roll and Single Car include vehicle filming as described in their deliverables.' },
  { question: 'Which platforms are supported?', answer: 'Content is prepared for TikTok, Instagram Reels and Facebook Reels. Posting and account management depend on the selected package.' },
  { question: 'Can we request a single-car video?', answer: 'Yes. The Single Car package is RM 250 one-time and includes one vehicle shoot and one edited short-form video.' },
  { question: 'How do we get a campaign proposal?', answer: 'Share your dealership details and campaign needs through the enquiry form. This demo does not transmit the form; contact integration must be configured before production.' },
  { question: 'Are travel and additional production costs included?', answer: 'This is confirmed during the campaign proposal.' },
];

export const valuePoints = [
  { icon: Target, label: 'Vehicle Storytelling' },
  { icon: Aperture, label: 'Cinematic Production' },
  { icon: CirclePlay, label: 'Short-Form Content' },
  { icon: ScanLine, label: 'Performance Insights' },
];

export const challenges = [
  ['Unremarkable vehicle listings', 'Engaging vehicle presentation shaped around each car.'],
  ['Inconsistent posting', 'Planned short-form content with a considered cadence.'],
  ['Repetitive videos', 'A varied mix of vehicle features, walkarounds and creative formats.'],
  ['Unclear content performance', 'Monitoring of available metrics and audience response.'],
  ['Untracked social enquiries', 'Enquiry tracking when reliable data is available.'],
];

export const campaignMonths = [
  { month: 'MONTH 01', title: 'SET UP & BUILD', text: 'Understand the dealership, plan content, publish initial content, and study the initial audience response.' },
  { month: 'MONTH 02', title: 'OPTIMIZE & GROW', text: 'Adjust creative formats based on performance, test content styles, and focus on strong-performing content.' },
  { month: 'MONTH 03', title: 'ANALYZE & IMPROVE', text: 'Continue the agreed content plan, collect available performance data, and prepare a three-month analysis and next-step strategy.' },
];

export const processSteps = [
  ['01', 'Discovery & dealership goals', 'Understand your inventory, audience, current content and priorities.'],
  ['02', 'Content planning & creative concepts', 'Build a practical direction and develop vehicle-specific ideas.'],
  ['03', 'Production & editing', 'Film and shape the agreed content into polished short-form assets.'],
  ['04', 'Publishing & performance monitoring', 'Publish where included and observe available performance signals.'],
  ['05', 'Reporting & next-step strategy', 'Review available campaign data and prepare the next-step direction.'],
];

export const reportMetrics = ['Video views', 'Reach & impressions', 'Engagement', 'Follower growth', 'Profile visits', 'Enquiries & messages', 'Top-performing content'];
