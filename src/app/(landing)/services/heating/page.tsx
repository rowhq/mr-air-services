import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, SectionNav } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';
import type { FAQ } from '@/types/database';

// Types for CMS content
interface HeatingService {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

interface InspectionPhase {
  phase: string;
  items: string[];
}

interface WarningSign {
  title: string;
  description: string;
  icon: string;
}

interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  services: HeatingService[];
  inspectionPhases: InspectionPhase[];
  warningSigns: WarningSign[];
}

// Fetch page content from CMS
async function getPageContent(): Promise<PageContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/config?key=heating_page`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.value as PageContent;
  } catch {
    return null;
  }
}

// Fetch FAQs from CMS
async function getFAQs(): Promise<FAQ[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/faqs?page=heating`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

const sectionNavItems = [
  { id: 'services', label: 'Services' },
  { id: 'tune-up', label: 'Tune-Up' },
  { id: 'warnings', label: 'Warning Signs' },
  { id: 'faq', label: 'FAQ' },
];

export const metadata = {
  title: 'Heating | Mr. Air Services - Houston Furnace & Heat Pump Experts',
  description: 'Professional heating services in Houston. Furnace repair, heat pump installation, and heating maintenance. Stay warm this winter. Call (832) 437-1000.',
};

// Default content (fallback)
const defaultContent: PageContent = {
  hero: {
    title: "Heat Out? We're On It.",
    subtitle: "Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.",
    backgroundImage: "/images/services/heating-services.webp",
  },
  services: [
    { title: 'Heating Repair', description: "We fix furnaces, heat pumps, all brands. Same-day emergency service available.", stat: '24/7', statLabel: 'emergency', icon: 'repair' },
    { title: 'New Installation', description: "Need a new system? We help you pick the right size for your home. Financing available.", stat: 'Free', statLabel: 'estimates', icon: 'install' },
  ],
  inspectionPhases: [
    { phase: 'Safety', items: ['We make sure all safety switches actually work', 'We look for dangerous gas leaks', 'Carbon monoxide detector test', 'Gas lines and vents inspection'] },
    { phase: 'Performance', items: ['We test all electrical connections', 'We verify it heats properly', 'We adjust the flame and fan', 'We clean the burners'] },
    { phase: 'Efficiency', items: ['Thermostat accuracy check', 'Filter replacement if needed', 'Efficiency rating assessment', 'Personalized recommendations'] },
  ],
  warningSigns: [
    { title: 'Yellow Pilot Light', description: 'Should be blue. Yellow means incomplete combustion—schedule a checkup.', icon: 'flame' },
    { title: 'Strange Sounds', description: 'Banging, squealing, or rattling usually means parts are wearing out.', icon: 'sound' },
    { title: 'Short Cycling', description: 'Turns on and off constantly? Could be the thermostat or a dirty filter.', icon: 'cycle' },
    { title: 'Higher Bills', description: 'Sudden spike in energy costs? Your system may be losing efficiency.', icon: 'bills' },
  ],
};

// Default FAQs (fallback if CMS is empty)
const defaultFaqs = [
  {
    question: 'How often do I need to service my heater?',
    answer: "Once a year, before winter. Prevents breakdowns, carbon monoxide leaks, and inefficiency. Think of it like an oil change—skip it and pay later.",
  },
  {
    question: "Furnace or heat pump—what's the difference?",
    answer: "Furnaces burn fuel to make heat. Heat pumps move heat from outside air. For Houston's mild winters, heat pumps are usually cheaper to run. We'll help you pick.",
  },
  {
    question: 'How long will my heater last?',
    answer: "Furnaces: 15-20 years. Heat pumps: 10-15 years. With maintenance. Without it? Less. We can look at yours and tell you if it's worth fixing or time to replace.",
  },
  {
    question: 'Can I finance a new system?',
    answer: "Yep. We've got flexible financing so you don't have to choose between heat and groceries. Ask us about payment plans when we give you a quote.",
  },
];

// Icon components
function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    repair: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    install: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons.repair}</>;
}

function PhaseIcon({ index }: { index: number }) {
  const icons = [
    <svg key="safety" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="performance" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="efficiency" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

function WarningIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    flame: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    sound: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
      </svg>
    ),
    cycle: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    bills: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons.flame}</>;
}

export default async function HeatingPage() {
  const [cmsContent, cmsFaqs] = await Promise.all([
    getPageContent(),
    getFAQs(),
  ]);

  const content = cmsContent || defaultContent;
  const faqs = cmsFaqs.length > 0
    ? cmsFaqs.map(f => ({ question: f.question, answer: f.answer }))
    : defaultFaqs;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Heating' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidthMobile>
                  Schedule Heating Service
                </Button>
              </Link>
              <a href="tel:+18324371000" className="w-full sm:w-auto">
                <Button variant="outline-inverse" size="lg" fullWidthMobile>
                  Call (832) 437-1000
                </Button>
              </a>
            </div>
            <TrustSignals className="mt-6" variant="dark" />
          </div>
        </div>
      </section>

      <SectionNav items={sectionNavItems} />

      {/* Services */}
      <section id="services" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              Heating Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              Everything Heating
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              From &quot;won&apos;t turn on&quot; to &quot;smells weird&quot; to &quot;I need a whole new system.&quot; We handle it.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {content.services.map((service) => (
              <div
                key={service.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 flex flex-col"
              >
                {/* Icon + Stat row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{service.stat}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{service.statLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12-Point Furnace Tune-Up */}
      <section id="tune-up" className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              12-Point Furnace Inspection
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Our inspection covers Safety, Performance, and Efficiency—the three pillars of a healthy heating system.
            </p>
          </div>

          {/* 3 Phase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {content.inspectionPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                    <PhaseIcon index={idx} />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Phase {idx + 1}</div>
                    <div className="text-lg font-bold text-neutral-black dark:text-white">{phase.phase}</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Safety Callout */}
          <div className="max-w-3xl mx-auto bg-neutral-900 dark:bg-neutral-950 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Carbon Monoxide: The Silent Killer</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  A cracked heat exchanger can leak odorless, invisible CO into your home. 430+ Americans die from CO poisoning annually—most cases are preventable with regular inspections. Don&apos;t skip your yearly tune-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section id="warnings" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Know the Signs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              Is Your Heater Asking for Help?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Your heating system gives you clues before it fails. Here are the 4 most important signs.
            </p>
          </div>

          {/* Emergency Banner */}
          <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Smell Gas? Get Out Now.</h3>
                  <p className="text-white/80 text-sm">Leave immediately. Don&apos;t flip switches. Call from outside.</p>
                </div>
              </div>
              <a href="tel:+18324371000" className="inline-flex items-center justify-center gap-2 bg-white text-secondary font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (832) 437-1000
              </a>
            </div>
          </div>

          {/* Warning Signs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.warningSigns.map((sign, idx) => (
              <div key={sign.title} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                <div className={`w-12 h-12 rounded-xl ${idx === 0 ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary' : 'bg-primary/10 dark:bg-primary/20 text-primary'} flex items-center justify-center mb-4`}>
                  <WarningIcon icon={sign.icon} />
                </div>
                <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-2">{sign.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{sign.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div id="faq" className="scroll-mt-20">
        <FAQSection
          subtitle="Everything you need to know about heating services."
          items={faqs}
        />
      </div>

      <FinalCTA />
    </>
  );
}
