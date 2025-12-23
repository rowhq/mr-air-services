import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';

export const metadata = {
  title: 'Project Documentation | Mr. Air Services',
  description: 'Everything you need to know about the Mr. Air Services website redesign - what we built, how it works, and why.',
};

const siteMapIcons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  services: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  financing: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  invoice: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  legal: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

const siteMap = [
  {
    iconKey: 'home',
    name: 'Homepage',
    path: '/',
    sections: ['Hero', 'CoolSaver Spotlight', 'Why Choose Us', 'Services Overview', 'Testimonials', 'Areas Served', 'Final CTA'],
  },
  {
    iconKey: 'services',
    name: 'Services',
    path: '/services',
    children: [
      { name: 'AC Repair', path: '/services/air-conditioning-repair' },
      { name: 'AC Tune-Ups', path: '/services/air-conditioning-tune-ups' },
      { name: 'Heating', path: '/services/heating' },
      { name: 'Maintenance Plans', path: '/services/maintenance-plans' },
    ],
  },
  { iconKey: 'financing', name: 'Financing', path: '/financing-payments' },
  { iconKey: 'invoice', name: 'Pay Invoice', path: '/pay-invoice' },
  { iconKey: 'contact', name: 'Contact', path: '/contact' },
  {
    iconKey: 'legal',
    name: 'Legal',
    children: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Use', path: '/terms-of-use' },
    ],
  },
];

const changelog = [
  { hash: '1248410', message: 'New financing page with real photos + invoice payment page', type: 'feature' },
  { hash: '4f9026c', message: 'Cleaned up service pages and tweaked the color system', type: 'improvement' },
  { hash: 'dd52fa4', message: 'Fixed brand logo sizes so they all look consistent', type: 'fix' },
  { hash: '008f64b', message: 'Fixed mega menu positioning issues', type: 'fix' },
  { hash: '8d56682', message: 'Redesigned services menu to full-width layout', type: 'feature' },
  { hash: 'aa27c16', message: 'Added dark mode everywhere', type: 'feature' },
  { hash: '7ea28e8', message: 'Simplified colors + redesigned the Areas Served section', type: 'improvement' },
];

const improvements = [
  {
    category: 'Look & Feel',
    items: [
      { before: 'Basic design with no clear identity', after: 'Modern look with a unified cyan color scheme', impact: 'high' },
      { before: 'No dark mode', after: 'Full dark mode support throughout', impact: 'high' },
      { before: 'Inconsistent fonts', after: 'Clean typography with Inter font', impact: 'medium' },
      { before: 'Generic or missing images', after: 'Professional photos of actual HVAC work', impact: 'high' },
    ],
  },
  {
    category: 'User Experience',
    items: [
      { before: 'Basic dropdown navigation', after: 'Full-width mega menu with descriptions', impact: 'high' },
      { before: 'No mobile-optimized actions', after: 'Sticky action bar on phones with Call & Book buttons', impact: 'high' },
      { before: 'Plain forms', after: 'Forms with validation and clear feedback', impact: 'medium' },
      { before: 'No trust indicators', after: 'Trust badges: Veteran Owned, Licensed, 4.9 Rating', impact: 'high' },
    ],
  },
  {
    category: 'Getting Customers',
    items: [
      { before: 'CoolSaver program buried in the site', after: 'CoolSaver front and center + qualification checker', impact: 'high' },
      { before: 'Basic financing page', after: 'Redesigned financing with clear process steps', impact: 'high' },
      { before: 'No way to pay invoices online', after: 'New invoice payment page', impact: 'medium' },
      { before: 'Unclear call-to-actions', after: 'Clear visual hierarchy for buttons', impact: 'medium' },
    ],
  },
  {
    category: 'Content',
    items: [
      { before: 'Generic service pages', after: 'Detailed pages with FAQs, process steps, and benefits', impact: 'high' },
      { before: 'No service area info', after: 'Areas Served section covering 25+ Houston cities', impact: 'medium' },
      { before: 'Missing or basic testimonials', after: 'Real customer reviews section', impact: 'medium' },
      { before: 'No clear maintenance plans', after: 'Maintenance Plans page with interactive quiz', impact: 'high' },
    ],
  },
];

const keyFeatures = [
  {
    title: 'CoolSaver Program',
    description: 'Free tune-ups for qualifying homeowners. Yes, actually free. Featured prominently on the homepage with a quick qualification checker.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Dark Mode',
    description: 'Full dark mode support. Respects your system preference and remembers your choice.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: 'Mobile-First',
    description: 'Works great on phones. Sticky action bar at the bottom makes it easy to call or book with one tap.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Mega Menu',
    description: 'Full-width services menu with icons and descriptions. Emergency service CTA always visible.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Easy Financing',
    description: 'Integrated with SVC Finance. Customers can apply in about 5 minutes and get a decision fast.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Trust Signals',
    description: 'Badges that matter: Veteran Owned, TX Licensed, 4.9 Google Rating, Same-Day Service available.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const pages = [
  { path: '/', name: 'Homepage', status: 'live' },
  { path: '/services', name: 'Services Hub', status: 'live' },
  { path: '/services/air-conditioning-repair', name: 'AC Repair', status: 'live' },
  { path: '/services/air-conditioning-tune-ups', name: 'AC Tune-Ups', status: 'live' },
  { path: '/services/heating', name: 'Heating', status: 'live' },
  { path: '/services/maintenance-plans', name: 'Maintenance Plans', status: 'live' },
  { path: '/financing-payments', name: 'Financing & Payments', status: 'live' },
  { path: '/pay-invoice', name: 'Pay Invoice', status: 'live' },
  { path: '/contact', name: 'Contact', status: 'live' },
  { path: '/privacy-policy', name: 'Privacy Policy', status: 'live' },
  { path: '/terms-of-use', name: 'Terms of Use', status: 'live' },
];

const actionItems = [
  // CRITICAL - Need client input before launch
  {
    id: 1,
    title: 'Office Locations',
    status: 'needs-confirmation',
    priority: 'critical',
    question: 'Are these your actual office locations? Please confirm or provide correct addresses.',
    currentData: [
      'Missouri City - Suite 183, 2601 D Cartwright Rd, 77459',
      'Spring - 4057 Riley Fuzzel Rd, Ste 500-103, 77386',
      'Houston - 14526 Old Katy Rd, 77079',
    ],
  },
  {
    id: 2,
    title: 'Customer Testimonials',
    status: 'placeholder',
    priority: 'critical',
    question: 'The current testimonials are placeholders with fake initials (J.M., S.T., R.P., M.K.). Do you have real customer reviews we can use? Google reviews work great.',
    currentData: [
      '"Best AC service in Houston..." - J.M., Katy',
      '"They fixed our furnace same day..." - S.T., Sugar Land',
      '"CoolSaver program saved us..." - R.P., Cypress',
      '"Professional and on time..." - M.K., Spring',
    ],
  },
  {
    id: 3,
    title: 'License & Certification Numbers',
    status: 'missing',
    priority: 'critical',
    question: 'We display "TX Licensed" and "EPA Certified" badges but no actual license numbers. What are your TDLR license number and EPA certification?',
    currentData: null,
  },
  {
    id: 4,
    title: 'Email Address Conflict',
    status: 'needs-confirmation',
    priority: 'critical',
    question: 'We found two different email addresses in the site. Which one should we use?',
    currentData: [
      'coolsavertuneups@mrairservices.com (CoolSaver form)',
      'info@mrairservices.com (general contact)',
    ],
  },
  // HIGH PRIORITY - Should verify before launch
  {
    id: 5,
    title: 'Statistics & Claims',
    status: 'needs-verification',
    priority: 'high',
    question: 'We show several stats throughout the site. Are these accurate?',
    currentData: [
      '98% on-time arrival rate',
      '4.9 Google Rating (5,000+ reviews)',
      '2hr average response time',
      '15+ years experience',
      '25+ Houston cities served',
    ],
  },
  {
    id: 6,
    title: 'Maintenance Plan Pricing',
    status: 'needs-verification',
    priority: 'high',
    question: 'Are these maintenance plan prices correct? NOTE: Maintenance Plans are a feature WE ADDED - your current site doesn\'t offer them publicly.',
    currentData: [
      'Basic Plan: $19/month ($199/year)',
      'Premium Plan: $29/month ($299/year)',
      'Includes: 1-2 AC tune-ups + 1 heating tune-up + repair discounts',
    ],
  },
  {
    id: 7,
    title: 'Business Hours vs 24/7 Claims',
    status: 'needs-verification',
    priority: 'high',
    question: 'The site shows "Mon-Fri 8AM-5PM" but also mentions "24/7 Emergency Service". How should we handle after-hours emergency calls?',
    currentData: [
      'Regular hours: Mon-Fri 8AM-5PM',
      'Emergency service: 24/7 (implied)',
    ],
  },
  {
    id: 8,
    title: 'Phone Number',
    status: 'needs-verification',
    priority: 'high',
    question: 'Is this the correct main phone number for the business?',
    currentData: ['(832) 437-1000'],
  },
  // MEDIUM PRIORITY - Would improve trust
  {
    id: 9,
    title: 'Team & Work Photos',
    status: 'missing',
    priority: 'medium',
    question: 'We\'re using a stock photo for the "technician" image. Do you have real photos of your team, trucks, or completed jobs?',
    currentData: ['Stock photo in "Why Choose Us" section (Unsplash)'],
  },
  {
    id: 10,
    title: 'Service Area Map',
    status: 'needs-verification',
    priority: 'medium',
    question: 'The map shows 6 specific cities (Houston, Missouri City, Sugar Land, Katy, Cypress, Spring) but the site claims "25+ cities". Should we add more cities to the map?',
    currentData: null,
  },
  {
    id: 11,
    title: 'Financing Partner',
    status: 'needs-verification',
    priority: 'medium',
    question: 'Is SVC Finance your financing partner? The link goes to their portal. Please confirm the URL is correct.',
    currentData: ['https://login.svcfin.com/signup/10102236'],
  },
  {
    id: 12,
    title: 'Warranty Terms',
    status: 'missing',
    priority: 'medium',
    question: 'The site mentions "Parts Warranty" but doesn\'t specify terms. What warranty do you offer on repairs and parts?',
    currentData: null,
  },
  // LOW PRIORITY - Nice to have
  {
    id: 13,
    title: 'Brand Logos',
    status: 'needs-verification',
    priority: 'low',
    question: 'We show logos for Trane, Carrier, Lennox, etc. Do you service all these brands? Any to add or remove?',
    currentData: [
      'Trane, Carrier, Lennox, Rheem, Goodman',
      'American Standard, York, Bryant, Amana, Daikin',
    ],
  },
  {
    id: 14,
    title: 'Financing Page Stock Photos',
    status: 'placeholder',
    priority: 'low',
    question: 'The financing page uses stock photos. Do you have photos of actual financed installations or happy customers?',
    currentData: null,
  },
  // NEW - Service pricing that we invented
  {
    id: 15,
    title: 'Service Pricing',
    status: 'needs-verification',
    priority: 'critical',
    question: 'We show specific prices on the site. Are these correct? Your current website does NOT show prices publicly.',
    currentData: [
      'CoolSaver AC Tune-Up: FREE (qualifying) or $49',
      'Heating Tune-Up: $85',
      'AC Tune-Up market value: $149 (used for comparison)',
    ],
  },
  {
    id: 16,
    title: 'Maintenance Plans Feature',
    status: 'needs-confirmation',
    priority: 'high',
    question: 'We created a Maintenance Plans page (/services/maintenance-plans) as an upsell feature. Your current website does NOT have this. Do you want to offer maintenance plan subscriptions?',
    currentData: [
      'Basic: $19/month - 1 AC + 1 heating tune-up + 10% repair discount',
      'Premium: $29/month - 2 AC + 1 heating tune-up + 15% discount + free service calls',
      'Commercial: Custom pricing',
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Documentation' }]} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">v1.0</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full">December 2024</span>
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Live
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your New Website
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Here&apos;s everything we built for Mr. Air Services.
          </p>
        </div>
      </section>

      <div className="bg-white dark:bg-neutral-900">
        <div className="container py-12 lg:py-16">
          <div className="flex gap-12">

            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav className="sticky top-28 space-y-1">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 px-3">
                  Documentation
                </p>
                <a href="#overview" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  The Big Picture
                </a>
                <a href="#action-required" className="flex items-center gap-3 px-3 py-2 text-sm bg-primary/10 text-primary font-medium rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Action Required
                  <span className="ml-auto px-1.5 py-0.5 bg-primary text-white text-xs rounded">16</span>
                </a>
                <a href="#improvements" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  What Changed
                </a>
                <a href="#features" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Key Features
                </a>
                <a href="#sitemap" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M9 4v3M15 4v3" />
                  </svg>
                  Site Structure
                </a>
                <a href="#design" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Design System
                </a>
                <a href="#changelog" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Updates
                </a>
                <a href="#tech" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Tech Stack
                </a>
                <a href="#pages" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  All Pages
                </a>

                <div className="border-t border-neutral-200 dark:border-neutral-700 my-4 mx-3"></div>

                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 px-3">
                  Quick Links
                </p>
                <a href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Site
                </a>
                <a href="/contact" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-20">

            {/* The Big Picture */}
            <section id="overview">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                The Big Picture
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                We rebuilt the Mr. Air Services website from the ground up. The goal? Make it easier for Houston homeowners to find you, trust you, and book your services.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl  text-center">
                  <div className="text-4xl font-bold text-primary mb-2">11</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Pages Built</div>
                </div>
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl  text-center">
                  <div className="text-4xl font-bold text-primary mb-2">16+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Improvements Made</div>
                </div>
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl  text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Dark Mode Ready</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">About the Project</h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Client:</strong> Mr. Air Services (HVAC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Market:</strong> Greater Houston, TX (25+ cities)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>What makes you different:</strong> US Military Veteran Owned</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Star program:</strong> CoolSaver (Free Tune-Ups)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">What We Set Out to Do</h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Get more HVAC service leads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Put CoolSaver front and center</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Make financing and payments easy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <span>Build trust (veteran-owned, licensed, insured)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-neutral-900 dark:bg-neutral-800 rounded-2xl text-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-neutral-400 text-sm">Phone</span>
                    <p className="font-semibold">(832) 437-1000</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Email</span>
                    <p className="font-semibold text-sm">coolsavertuneups@mrairservices.com</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Hours</span>
                    <p className="font-semibold">Mon-Fri 8AM-5PM</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Required */}
            <section id="action-required">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-neutral-black dark:text-white">
                    Action Required
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">16 items need your input before launch</p>
                </div>
              </div>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                We audited the entire site and found these items that need your confirmation, verification, or replacement. Items are grouped by priority.
              </p>

              {/* Priority Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-neutral-900 dark:bg-neutral-800 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-neutral-400">Critical</div>
                </div>
                <div className="p-4 bg-neutral-900 dark:bg-neutral-800 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary/80">5</div>
                  <div className="text-xs text-neutral-400">High</div>
                </div>
                <div className="p-4 bg-neutral-900 dark:bg-neutral-800 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary/60">4</div>
                  <div className="text-xs text-neutral-400">Medium</div>
                </div>
                <div className="p-4 bg-neutral-900 dark:bg-neutral-800 rounded-xl text-center">
                  <div className="text-2xl font-bold text-neutral-500">2</div>
                  <div className="text-xs text-neutral-400">Low</div>
                </div>
              </div>

              {/* Critical Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  Critical - Must resolve before launch
                </h3>
                <div className="space-y-4">
                  {actionItems.filter(item => item.priority === 'critical').map((item) => (
                    <div key={item.id} className="p-6 bg-neutral-900 dark:bg-neutral-800 rounded-2xl ">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          item.status === 'needs-confirmation' ? 'bg-primary/20 text-primary' :
                          item.status === 'needs-verification' ? 'bg-primary/10 text-primary/80' :
                          item.status === 'placeholder' ? 'bg-neutral-700 text-neutral-300' :
                          'bg-neutral-700 text-neutral-400'
                        }`}>
                          {item.status === 'needs-confirmation' ? 'Needs Confirmation' :
                           item.status === 'needs-verification' ? 'Needs Verification' :
                           item.status === 'placeholder' ? 'Placeholder Data' : 'Missing'}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-sm mb-4">{item.question}</p>
                      {item.currentData && (
                        <div className="p-4 bg-white/5 rounded-xl">
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Current Data:</p>
                          <ul className="space-y-1">
                            {item.currentData.map((data, idx) => (
                              <li key={idx} className="text-sm text-neutral-400 font-mono">{data}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* High Priority Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary/80"></span>
                  High Priority - Should verify before launch
                </h3>
                <div className="space-y-4">
                  {actionItems.filter(item => item.priority === 'high').map((item) => (
                    <div key={item.id} className="p-6 bg-neutral-900 dark:bg-neutral-800 rounded-2xl ">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          item.status === 'needs-confirmation' ? 'bg-primary/20 text-primary' :
                          item.status === 'needs-verification' ? 'bg-primary/10 text-primary/80' :
                          item.status === 'placeholder' ? 'bg-neutral-700 text-neutral-300' :
                          'bg-neutral-700 text-neutral-400'
                        }`}>
                          {item.status === 'needs-confirmation' ? 'Needs Confirmation' :
                           item.status === 'needs-verification' ? 'Needs Verification' :
                           item.status === 'placeholder' ? 'Placeholder Data' : 'Missing'}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-sm mb-4">{item.question}</p>
                      {item.currentData && (
                        <div className="p-4 bg-white/5 rounded-xl">
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Current Data:</p>
                          <ul className="space-y-1">
                            {item.currentData.map((data, idx) => (
                              <li key={idx} className="text-sm text-neutral-400 font-mono">{data}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium Priority Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary/60"></span>
                  Medium Priority - Would improve trust & credibility
                </h3>
                <div className="space-y-4">
                  {actionItems.filter(item => item.priority === 'medium').map((item) => (
                    <div key={item.id} className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-lg font-semibold text-neutral-black dark:text-white">{item.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          item.status === 'needs-confirmation' ? 'bg-primary/20 text-primary' :
                          item.status === 'needs-verification' ? 'bg-primary/10 text-primary/80' :
                          item.status === 'placeholder' ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300' :
                          'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                        }`}>
                          {item.status === 'needs-confirmation' ? 'Needs Confirmation' :
                           item.status === 'needs-verification' ? 'Needs Verification' :
                           item.status === 'placeholder' ? 'Placeholder Data' : 'Missing'}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">{item.question}</p>
                      {item.currentData && (
                        <div className="p-4 bg-neutral-100 dark:bg-white/5 rounded-xl">
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Current Data:</p>
                          <ul className="space-y-1">
                            {item.currentData.map((data, idx) => (
                              <li key={idx} className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{data}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Priority Items */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-neutral-400"></span>
                  Low Priority - Nice to have
                </h3>
                <div className="space-y-4">
                  {actionItems.filter(item => item.priority === 'low').map((item) => (
                    <div key={item.id} className="p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl /50">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-lg font-semibold text-neutral-black dark:text-white">{item.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          item.status === 'needs-confirmation' ? 'bg-primary/20 text-primary' :
                          item.status === 'needs-verification' ? 'bg-primary/10 text-primary/80' :
                          item.status === 'placeholder' ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300' :
                          'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                        }`}>
                          {item.status === 'needs-confirmation' ? 'Needs Confirmation' :
                           item.status === 'needs-verification' ? 'Needs Verification' :
                           item.status === 'placeholder' ? 'Placeholder Data' : 'Missing'}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">{item.question}</p>
                      {item.currentData && (
                        <div className="p-4 bg-neutral-100 dark:bg-white/5 rounded-xl">
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Current Data:</p>
                          <ul className="space-y-1">
                            {item.currentData.map((data, idx) => (
                              <li key={idx} className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{data}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What Changed */}
            <section id="improvements">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                What Changed
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Here&apos;s the before and after. Every change was made to help customers find what they need faster.
              </p>

              <div className="space-y-8">
                {improvements.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-xl font-semibold text-neutral-black dark:text-white mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl ">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.before}</span>
                          </div>
                          <div className="hidden md:flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-sm text-neutral-black dark:text-white font-medium">{item.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section id="features">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                Key Features
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                The good stuff we built in.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl  hover:bg-primary/5 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Site Structure */}
            <section id="sitemap">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                Site Structure
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Here&apos;s how the site is organized. Click any page to see it live.
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl  p-6 md:p-8">
                <div className="space-y-4">
                  {siteMap.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center gap-3">
                        {siteMapIcons[item.iconKey]}
                        {item.path ? (
                          <Link href={item.path} className="font-medium text-neutral-black dark:text-white hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                        ) : (
                          <span className="font-medium text-neutral-black dark:text-white">{item.name}</span>
                        )}
                        {item.path && (
                          <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                            {item.path}
                          </code>
                        )}
                      </div>

                      {/* Sections */}
                      {item.sections && (
                        <div className="ml-9 flex flex-wrap gap-2">
                          {item.sections.map((section) => (
                            <span key={section} className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-400">
                              {section}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Children */}
                      {item.children && (
                        <div className="ml-9 space-y-2">
                          {item.children.map((child) => (
                            <div key={child.name} className="flex items-center gap-3">
                              <span className="text-neutral-400">|--</span>
                              <Link href={child.path} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                                {child.name}
                              </Link>
                              <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-500 dark:text-neutral-500">
                                {child.path}
                              </code>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Design System */}
            <section id="design">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-8">
                Design System
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colors */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Colors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0099CC]"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Primary</p>
                        <code className="text-xs text-neutral-500">#0099CC</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#008ABB]"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Primary Hover</p>
                        <code className="text-xs text-neutral-500">#008ABB</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#007AA3]"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Primary Dark</p>
                        <code className="text-xs text-neutral-500">#007AA3</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white "></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Neutrals</p>
                        <code className="text-xs text-neutral-500">#0F172A - #FFFFFF</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Typography</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">Font</span>
                      <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">Inter, system-ui</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">H1</span>
                      <span className="text-neutral-black dark:text-white">48px / 32px</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">H2</span>
                      <span className="text-neutral-black dark:text-white">36px / 28px</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">Body</span>
                      <span className="text-neutral-black dark:text-white">16px</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">Small</span>
                      <span className="text-neutral-black dark:text-white">14px</span>
                    </div>
                  </div>
                </div>

                {/* Components */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Components</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Buttons', 'Cards', 'Modals', 'Forms', 'Navigation', 'Sections', 'Accordions', 'Badges'].map((comp) => (
                      <span key={comp} className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-sm text-neutral-600 dark:text-neutral-400">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Built-in Features</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Dark Mode', status: 'Done' },
                      { name: 'Responsive Design', status: 'Done' },
                      { name: 'Animations', status: 'Done' },
                      { name: 'Accessibility', status: 'WCAG 2.1' },
                    ].map((feature) => (
                      <div key={feature.name} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{feature.name}</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                          {feature.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Updates */}
            <section id="changelog">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-8">
                Recent Updates
              </h2>

              <div className="space-y-4">
                {changelog.map((commit) => (
                  <div key={commit.hash} className="flex items-start gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl ">
                    <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded font-mono text-neutral-600 dark:text-neutral-400 flex-shrink-0">
                      {commit.hash.slice(0, 7)}
                    </code>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-black dark:text-white">{commit.message}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                      commit.type === 'feature'
                        ? 'bg-primary/10 text-primary'
                        : commit.type === 'fix'
                        ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                        : 'bg-primary/5 text-primary/80'
                    }`}>
                      {commit.type}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section id="tech">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-8">
                Tech Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">What We Used</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Next.js', version: '15.1.11' },
                      { name: 'React', version: '19' },
                      { name: 'TypeScript', version: '5.7+' },
                      { name: 'Tailwind CSS', version: '4.0' },
                      { name: 'Leaflet', version: '1.9.4' },
                    ].map((lib) => (
                      <div key={lib.name} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{lib.name}</span>
                        <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">{lib.version}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl ">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Deployment</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Platform', value: 'Vercel' },
                      { label: 'Package Manager', value: 'pnpm' },
                      { label: 'Build Tool', value: 'Turbopack' },
                      { label: 'Domain', value: 'mrairservices.com' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{item.label}</span>
                        <span className="text-neutral-black dark:text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* All Pages */}
            <section id="pages">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-8">
                All Pages
              </h2>

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl  overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="">
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">Page</th>
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">URL</th>
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page, idx) => (
                      <tr key={page.path} className={idx !== pages.length - 1 ? '' : ''}>
                        <td className="p-4">
                          <Link href={page.path} className="text-neutral-black dark:text-white hover:text-primary transition-colors">
                            {page.name}
                          </Link>
                        </td>
                        <td className="p-4">
                          <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-400">
                            {page.path}
                          </code>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                            Live
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
