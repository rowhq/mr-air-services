import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';

export const metadata = {
  title: 'Project Documentation | Mr. Air Services',
  description: 'Everything you need to know about the Mr. Air Services website - what we built, how it works, and what needs your input.',
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
    sections: ['Hero', 'Why Choose Us', 'Services Overview', 'Testimonials', 'Areas Served', 'Final CTA'],
  },
  {
    iconKey: 'services',
    name: 'Services',
    path: '/services',
    children: [
      { name: 'AC Repair', path: '/services/air-conditioning-repair' },
      { name: 'CoolSaver Tune-Ups', path: '/services/air-conditioning-tune-ups' },
      { name: 'Heating', path: '/services/heating' },
    ],
  },
  { iconKey: 'financing', name: 'Financing & Payments', path: '/financing-payments' },
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
  { hash: '7e57b6a', message: 'Redesigned footer with improved 2-column structure and Veteran badge', type: 'feature' },
  { hash: '7b2056c', message: 'Redesigned How It Works section with premium card-based UI', type: 'feature' },
  { hash: 'fd4b2dc', message: 'Fixed mobile action bar positioning for Safari and Chrome', type: 'fix' },
  { hash: '2ed0668', message: 'Redesigned footer with Apple-style minimalism', type: 'improvement' },
  { hash: '6bb3e67', message: 'Improved hero image framing to show technician on mobile', type: 'fix' },
  { hash: '1248410', message: 'New financing page with real photos + invoice payment page', type: 'feature' },
  { hash: '4f9026c', message: 'Service pages UX improvements + unified color system', type: 'improvement' },
];

const keyFeatures = [
  {
    title: 'CoolSaver Program',
    description: 'Free AC tune-ups for qualifying homeowners. Featured prominently on the homepage with a quick qualification checker modal.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Dark Mode',
    description: 'Full dark mode support throughout the site. Respects system preference and persists user choice.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: 'Mobile Action Bar',
    description: 'Sticky Call Now / Book Online buttons at the bottom on mobile. Works correctly on Safari and Chrome.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Mega Menu',
    description: 'Full-width services menu with icons and descriptions. Emergency CTA always visible in the header.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Easy Financing',
    description: 'Integrated with SVC Finance. 5-minute application with instant decision. Premium "How It Works" section.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Trust Signals',
    description: 'Veteran Owned badge in footer, TX Licensed, EPA Certified, Fully Insured badges throughout the site.',
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
  { path: '/services/air-conditioning-tune-ups', name: 'CoolSaver Tune-Ups', status: 'live' },
  { path: '/services/heating', name: 'Heating', status: 'live' },
  { path: '/financing-payments', name: 'Financing & Payments', status: 'live' },
  { path: '/pay-invoice', name: 'Pay Invoice', status: 'live' },
  { path: '/contact', name: 'Contact', status: 'live' },
  { path: '/privacy-policy', name: 'Privacy Policy', status: 'live' },
  { path: '/terms-of-use', name: 'Terms of Use', status: 'live' },
  { path: '/docs', name: 'Documentation', status: 'live' },
];

const actionItems = [
  // CRITICAL
  {
    id: 1,
    title: 'Customer Testimonials',
    status: 'placeholder',
    priority: 'critical',
    question: 'The testimonials use placeholder initials. Do you have real Google reviews with customer names we can use?',
    currentData: [
      'MC - Missouri City: "They came out the same day..."',
      'HT - Houston: "Fair pricing, honest assessment..."',
      'SP - Spring: "The team was punctual..."',
    ],
  },
  {
    id: 2,
    title: 'License & Certification Numbers',
    status: 'missing',
    priority: 'critical',
    question: 'The site displays "TX Licensed" and "EPA Certified" badges. What are the actual numbers?',
    currentData: [
      'TDLR License #: (needed)',
      'EPA Certification #: (needed)',
    ],
  },
  {
    id: 3,
    title: 'Office Locations',
    status: 'needs-verification',
    priority: 'critical',
    question: 'Are these your current office addresses? Please confirm or correct:',
    currentData: [
      'Missouri City: Suite 183, 2601 D Cartwright Rd, 77459',
      'Spring: 4057 Riley Fuzzel Rd, Ste 500-103, 77386',
      'Houston: 14526 Old Katy Rd, 77079',
    ],
  },
  // HIGH
  {
    id: 4,
    title: 'Email Addresses',
    status: 'needs-verification',
    priority: 'high',
    question: 'The site uses 3 different email addresses. Which should be the primary contact?',
    currentData: [
      'coolsavertuneups@mrairservices.com (CoolSaver forms)',
      'info@mrairservices.com (Contact page)',
      'customerservice@mrairservices.com (Tune-ups page)',
    ],
  },
  {
    id: 5,
    title: 'Business Statistics',
    status: 'needs-verification',
    priority: 'high',
    question: 'Please verify these stats are accurate:',
    currentData: [
      '4.9 Google Rating',
      '15+ years experience',
      '25+ Houston cities served',
    ],
  },
  {
    id: 6,
    title: 'CoolSaver Qualification Criteria',
    status: 'needs-verification',
    priority: 'high',
    question: 'The CoolSaver modal asks about electric provider and home ownership. Are these the correct criteria?',
    currentData: [
      'Must have qualifying electric provider',
      'Must be homeowner (not renter)',
    ],
  },
  // MEDIUM
  {
    id: 7,
    title: 'Team & Work Photos',
    status: 'missing',
    priority: 'medium',
    question: 'Hero and other sections use stock photos. Do you have real photos of your team, trucks, or completed jobs?',
    currentData: null,
  },
  {
    id: 8,
    title: 'Phone Number',
    status: 'needs-verification',
    priority: 'medium',
    question: 'Is (832) 437-1000 the correct main phone number?',
    currentData: ['(832) 437-1000'],
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
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">v1.1</span>
            <span className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full">December 2025</span>
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Live
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Website Redesign
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Complete redesign of Mr. Air Services website. Strategy, architecture, and everything you need to know.
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
                <a href="#strategy" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Strategy
                </a>
                <a href="#overview" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Overview
                </a>
                <a href="#action-required" className="flex items-center gap-3 px-3 py-2 text-sm bg-primary/10 text-primary font-medium rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Action Required
                  <span className="ml-auto px-1.5 py-0.5 bg-primary text-white text-xs rounded">{actionItems.length}</span>
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
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-20">

            {/* Strategy - Why the Redesign */}
            <section id="strategy">
              <div className="mb-8">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Project Strategy
                </span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                Why This Redesign?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-3xl">
                Your website is your 24/7 salesperson. We rebuilt it from scratch to turn visitors into paying customers,
                establish trust instantly, and make it dead simple to contact you.
              </p>

              {/* Problems & Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border-l-4 border-neutral-400">
                  <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Previous Challenges
                  </h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-1">•</span>
                      <span>Outdated design that didn&apos;t reflect professional service quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-1">•</span>
                      <span>Poor mobile experience - most customers search on phones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-1">•</span>
                      <span>No clear call-to-action or conversion path</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-1">•</span>
                      <span>CoolSaver program not prominently featured</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-1">•</span>
                      <span>Missing trust signals and credibility indicators</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border-l-4 border-primary">
                  <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What We Built
                  </h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Modern, premium design that builds instant trust</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Mobile-first design with sticky action buttons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Clear CTAs: Call Now, Book Online, Get Quote on every page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>CoolSaver prominently featured with qualification modal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Veteran-owned badge, licensing, ratings throughout</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Information Architecture */}
              <div className="p-8 bg-neutral-50 dark:bg-neutral-800 rounded-3xl mb-12">
                <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">
                  Information Architecture
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  How we organized content to match how customers actually think:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <h4 className="font-semibold text-neutral-black dark:text-white">Awareness</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <strong>Homepage Hero:</strong> Immediately tells visitors what you do, where you serve, and why trust you (Veteran-owned, 15+ years).
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <h4 className="font-semibold text-neutral-black dark:text-white">Consideration</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <strong>Service Pages:</strong> Detailed info on each service with pricing transparency, what&apos;s included, and FAQs that answer real concerns.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                    <h4 className="font-semibold text-neutral-black dark:text-white">Conversion</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <strong>Multiple CTAs:</strong> Phone number always visible, sticky mobile bar, financing options, and CoolSaver free tune-up offer.
                    </p>
                  </div>
                </div>
              </div>

              {/* UX Decisions */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-neutral-black dark:text-white">
                  Key UX Decisions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">Mobile-First Sticky Bar</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      70%+ of HVAC searches happen on mobile. The sticky &quot;Call Now&quot; and &quot;Book Online&quot; buttons are always accessible without scrolling.
                    </p>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">Emergency CTA in Header</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      AC emergencies are stressful. The red emergency button stays visible on desktop so panicked customers can call immediately.
                    </p>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">CoolSaver Qualification Modal</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Instead of a form, a quick 2-question modal lets customers instantly know if they qualify - reducing friction and increasing conversions.
                    </p>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">Trust Above the Fold</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Veteran-owned, TX Licensed, EPA Certified badges visible immediately. Trust must be established in the first 3 seconds.
                    </p>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">Mega Menu with Icons</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Services dropdown shows all options with icons and descriptions. Customers can quickly find exactly what they need without hunting.
                    </p>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <h4 className="font-semibold text-neutral-black dark:text-white mb-2">Interactive Coverage Map</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Visual map showing all 3 locations and service areas. Customers can verify you serve their neighborhood at a glance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Design Philosophy */}
              <div className="mt-12 p-8 bg-neutral-900 dark:bg-neutral-950 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">Design Philosophy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-primary font-semibold mb-1">Clean & Professional</p>
                    <p className="text-sm text-neutral-400">
                      Minimal clutter, generous whitespace. Looks like a company that does quality work.
                    </p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold mb-1">Conversion-Focused</p>
                    <p className="text-sm text-neutral-400">
                      Every section pushes toward one action: contact you for service.
                    </p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold mb-1">Fast & Accessible</p>
                    <p className="text-sm text-neutral-400">
                      Optimized images, instant loads. Works perfectly on slow connections and all devices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Overview */}
            <section id="overview">
              <h2 className="text-3xl font-bold text-neutral-black dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                A complete website for Mr. Air Services, Houston&apos;s veteran-owned HVAC company. Built to convert visitors into service calls.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-primary mb-2">11</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Pages Built</div>
                </div>
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Mobile Optimized</div>
                </div>
                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Dark Mode Ready</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Business Info</h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Company:</strong> Mr. Air Services, LLC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Market:</strong> Greater Houston, TX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Differentiator:</strong> US Military Veteran Owned</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Star Program:</strong> CoolSaver Free Tune-Ups</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Contact Details</h3>
                  <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Phone:</strong> (832) 437-1000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Hours:</strong> Mon-Fri 8AM-5PM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Location:</strong> Houston, TX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Financing:</strong> SVC Finance Integration</span>
                    </li>
                  </ul>
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
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{actionItems.length} items need your input</p>
                </div>
              </div>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                These items need your confirmation or real data to replace placeholders.
              </p>

              <div className="space-y-4">
                {actionItems.map((item) => (
                  <div key={item.id} className={`p-6 rounded-2xl ${
                    item.priority === 'critical'
                      ? 'bg-neutral-900 dark:bg-neutral-800'
                      : 'bg-neutral-50 dark:bg-neutral-800'
                  }`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className={`text-lg font-semibold ${
                        item.priority === 'critical' ? 'text-white' : 'text-neutral-black dark:text-white'
                      }`}>{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'critical' ? 'bg-primary text-white' :
                          item.priority === 'high' ? 'bg-primary/20 text-primary' :
                          'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                        }`}>
                          {item.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.priority === 'critical'
                            ? 'bg-white/10 text-white/80'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                        }`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm mb-4 ${
                      item.priority === 'critical' ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-400'
                    }`}>{item.question}</p>
                    {item.currentData && (
                      <div className={`p-4 rounded-xl ${
                        item.priority === 'critical' ? 'bg-white/5' : 'bg-neutral-100 dark:bg-white/5'
                      }`}>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Current Data:</p>
                        <ul className="space-y-1">
                          {item.currentData.map((data, idx) => (
                            <li key={idx} className={`text-sm font-mono ${
                              item.priority === 'critical' ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'
                            }`}>{data}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                What makes this site work.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl hover:bg-primary/5 transition-colors">
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
                All pages and their organization.
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 md:p-8">
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

                      {item.sections && (
                        <div className="ml-9 flex flex-wrap gap-2">
                          {item.sections.map((section) => (
                            <span key={section} className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-400">
                              {section}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.children && (
                        <div className="ml-9 space-y-2">
                          {item.children.map((child) => (
                            <div key={child.name} className="flex items-center gap-3">
                              <span className="text-neutral-400">└</span>
                              <Link href={child.path} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                                {child.name}
                              </Link>
                              <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-500">
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
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Colors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0099CC]"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Primary (Cyan)</p>
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
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white border"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-black dark:text-white">Neutrals</p>
                        <code className="text-xs text-neutral-500">#0F172A → #FFFFFF</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Typography</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">Font</span>
                      <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">Plus Jakarta Sans</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">H1</span>
                      <span className="text-neutral-black dark:text-white">48px / 32px mobile</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">H2</span>
                      <span className="text-neutral-black dark:text-white">36px / 28px mobile</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">Body</span>
                      <span className="text-neutral-black dark:text-white">16px</span>
                    </div>
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
                  <div key={commit.hash} className="flex items-start gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
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
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Framework</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Next.js', version: '15.1.11' },
                      { name: 'React', version: '19' },
                      { name: 'TypeScript', version: '5.7' },
                      { name: 'Tailwind CSS', version: '4.0' },
                    ].map((lib) => (
                      <div key={lib.name} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{lib.name}</span>
                        <code className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">{lib.version}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-4">Infrastructure</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Hosting', value: 'Vercel' },
                      { label: 'Package Manager', value: 'pnpm' },
                      { label: 'Maps', value: 'Leaflet' },
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

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">Page</th>
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">URL</th>
                      <th className="text-left p-4 font-semibold text-neutral-black dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.path}>
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
