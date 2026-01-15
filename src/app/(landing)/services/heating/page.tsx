import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, SectionNav } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

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

// Config interface for CMS-editable fields
interface HeatingPageConfig {
  [key: string]: unknown;
  hero: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  services: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      stat: string;
      statLabel: string;
    }>;
  };
  inspection: {
    title: string;
    description: string;
    phases: Array<{
      name: string;
      items: string[];
    }>;
  };
  safetyCallout: {
    title: string;
    description: string;
  };
  warnings: {
    badge: string;
    title: string;
    description: string;
    emergencyTitle: string;
    emergencySubtitle: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

// Default values (current hardcoded text)
const defaultConfig: HeatingPageConfig = {
  hero: {
    title: "Heat Out? We're On It.",
    description: "Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.",
    primaryButton: "Schedule Heating Service",
    secondaryButton: "Call (832) 437-1000",
  },
  services: {
    badge: "Heating Services",
    title: "Everything Heating",
    description: "From \"won't turn on\" to \"smells weird\" to \"I need a whole new system.\" We handle it.",
    items: [
      {
        title: "Heating Repair",
        description: "We fix furnaces, heat pumps, all brands. Same-day emergency service available.",
        stat: "24/7",
        statLabel: "emergency",
      },
      {
        title: "New Installation",
        description: "Need a new system? We help you pick the right size for your home. Financing available.",
        stat: "Free",
        statLabel: "estimates",
      },
    ],
  },
  inspection: {
    title: "12-Point Furnace Inspection",
    description: "Our inspection covers Safety, Performance, and Efficiency—the three pillars of a healthy heating system.",
    phases: [
      {
        name: "Safety",
        items: [
          "We make sure all safety switches actually work",
          "We look for dangerous gas leaks",
          "Carbon monoxide detector test",
          "Gas lines and vents inspection",
        ],
      },
      {
        name: "Performance",
        items: [
          "We test all electrical connections",
          "We verify it heats properly",
          "We adjust the flame and fan",
          "We clean the burners",
        ],
      },
      {
        name: "Efficiency",
        items: [
          "Thermostat accuracy check",
          "Filter replacement if needed",
          "Efficiency rating assessment",
          "Personalized recommendations",
        ],
      },
    ],
  },
  safetyCallout: {
    title: "Carbon Monoxide: The Silent Killer",
    description: "A cracked heat exchanger can leak odorless, invisible CO into your home. 430+ Americans die from CO poisoning annually—most cases are preventable with regular inspections. Don't skip your yearly tune-up.",
  },
  warnings: {
    badge: "Know the Signs",
    title: "Is Your Heater Asking for Help?",
    description: "Your heating system gives you clues before it fails. Here are the 4 most important signs.",
    emergencyTitle: "Smell Gas? Get Out Now.",
    emergencySubtitle: "Leave immediately. Don't flip switches. Call from outside.",
    cards: [
      {
        title: "Yellow Pilot Light",
        description: "Should be blue. Yellow means incomplete combustion—schedule a checkup.",
      },
      {
        title: "Strange Sounds",
        description: "Banging, squealing, or rattling usually means parts are wearing out.",
      },
      {
        title: "Short Cycling",
        description: "Turns on and off constantly? Could be the thermostat or a dirty filter.",
      },
      {
        title: "Higher Bills",
        description: "Sudden spike in energy costs? Your system may be losing efficiency.",
      },
    ],
  },
  faq: {
    subtitle: "Everything you need to know about heating services.",
    items: [
      {
        question: "How often do I need to service my heater?",
        answer: "Once a year, before winter. Prevents breakdowns, carbon monoxide leaks, and inefficiency. Think of it like an oil change—skip it and pay later.",
      },
      {
        question: "Furnace or heat pump—what's the difference?",
        answer: "Furnaces burn fuel to make heat. Heat pumps move heat from outside air. For Houston's mild winters, heat pumps are usually cheaper to run. We'll help you pick.",
      },
      {
        question: "How long will my heater last?",
        answer: "Furnaces: 15-20 years. Heat pumps: 10-15 years. With maintenance. Without it? Less. We can look at yours and tell you if it's worth fixing or time to replace.",
      },
      {
        question: "Can I finance a new system?",
        answer: "Yep. We've got flexible financing so you don't have to choose between heat and groceries. Ask us about payment plans when we give you a quote.",
      },
    ],
  },
};

// Icons kept hardcoded (part of design)
const serviceIcons = [
  <svg key="repair" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="install" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>,
];

const phaseIcons = [
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

const warningIcons = [
  <svg key="flame" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>,
  <svg key="sound" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
  </svg>,
  <svg key="cycle" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
  <svg key="bills" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

// Fetch config from CMS
async function getHeatingPageConfig(): Promise<Partial<HeatingPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      // Hero
      'heating_page_hero_title',
      'heating_page_hero_description',
      'heating_page_hero_primary_button',
      'heating_page_hero_secondary_button',
      // Services section
      'heating_page_services_badge',
      'heating_page_services_title',
      'heating_page_services_description',
      // Service 1
      'heating_page_service_1_title',
      'heating_page_service_1_description',
      'heating_page_service_1_stat',
      'heating_page_service_1_stat_label',
      // Service 2
      'heating_page_service_2_title',
      'heating_page_service_2_description',
      'heating_page_service_2_stat',
      'heating_page_service_2_stat_label',
      // Inspection section
      'heating_page_inspection_title',
      'heating_page_inspection_description',
      // Phase 1
      'heating_page_phase_1_name',
      'heating_page_phase_1_item_1',
      'heating_page_phase_1_item_2',
      'heating_page_phase_1_item_3',
      'heating_page_phase_1_item_4',
      // Phase 2
      'heating_page_phase_2_name',
      'heating_page_phase_2_item_1',
      'heating_page_phase_2_item_2',
      'heating_page_phase_2_item_3',
      'heating_page_phase_2_item_4',
      // Phase 3
      'heating_page_phase_3_name',
      'heating_page_phase_3_item_1',
      'heating_page_phase_3_item_2',
      'heating_page_phase_3_item_3',
      'heating_page_phase_3_item_4',
      // Safety callout
      'heating_page_safety_title',
      'heating_page_safety_description',
      // Warnings section
      'heating_page_warnings_badge',
      'heating_page_warnings_title',
      'heating_page_warnings_description',
      'heating_page_emergency_title',
      'heating_page_emergency_subtitle',
      // Warning cards
      'heating_page_warning_1_title',
      'heating_page_warning_1_description',
      'heating_page_warning_2_title',
      'heating_page_warning_2_description',
      'heating_page_warning_3_title',
      'heating_page_warning_3_description',
      'heating_page_warning_4_title',
      'heating_page_warning_4_description',
      // FAQ
      'heating_page_faq_subtitle',
      'heating_page_faq_1_question',
      'heating_page_faq_1_answer',
      'heating_page_faq_2_question',
      'heating_page_faq_2_answer',
      'heating_page_faq_3_question',
      'heating_page_faq_3_answer',
      'heating_page_faq_4_question',
      'heating_page_faq_4_answer',
    ];

    const responses = await Promise.all(
      configKeys.map(key =>
        fetch(`${baseUrl}/api/cms/config?key=${key}`, {
          next: { revalidate: 60 },
          cache: 'force-cache',
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );

    const configMap: Record<string, string | null> = {};
    configKeys.forEach((key, index) => {
      configMap[key] = responses[index]?.value || null;
    });

    const hasValues = Object.values(configMap).some(v => v !== null);
    if (!hasValues) {
      return null;
    }

    return {
      hero: {
        title: configMap['heating_page_hero_title'] || undefined,
        description: configMap['heating_page_hero_description'] || undefined,
        primaryButton: configMap['heating_page_hero_primary_button'] || undefined,
        secondaryButton: configMap['heating_page_hero_secondary_button'] || undefined,
      },
      services: {
        badge: configMap['heating_page_services_badge'] || undefined,
        title: configMap['heating_page_services_title'] || undefined,
        description: configMap['heating_page_services_description'] || undefined,
        items: [
          {
            title: configMap['heating_page_service_1_title'] || undefined,
            description: configMap['heating_page_service_1_description'] || undefined,
            stat: configMap['heating_page_service_1_stat'] || undefined,
            statLabel: configMap['heating_page_service_1_stat_label'] || undefined,
          },
          {
            title: configMap['heating_page_service_2_title'] || undefined,
            description: configMap['heating_page_service_2_description'] || undefined,
            stat: configMap['heating_page_service_2_stat'] || undefined,
            statLabel: configMap['heating_page_service_2_stat_label'] || undefined,
          },
        ],
      },
      inspection: {
        title: configMap['heating_page_inspection_title'] || undefined,
        description: configMap['heating_page_inspection_description'] || undefined,
        phases: [
          {
            name: configMap['heating_page_phase_1_name'] || undefined,
            items: [
              configMap['heating_page_phase_1_item_1'],
              configMap['heating_page_phase_1_item_2'],
              configMap['heating_page_phase_1_item_3'],
              configMap['heating_page_phase_1_item_4'],
            ].filter(Boolean) as string[],
          },
          {
            name: configMap['heating_page_phase_2_name'] || undefined,
            items: [
              configMap['heating_page_phase_2_item_1'],
              configMap['heating_page_phase_2_item_2'],
              configMap['heating_page_phase_2_item_3'],
              configMap['heating_page_phase_2_item_4'],
            ].filter(Boolean) as string[],
          },
          {
            name: configMap['heating_page_phase_3_name'] || undefined,
            items: [
              configMap['heating_page_phase_3_item_1'],
              configMap['heating_page_phase_3_item_2'],
              configMap['heating_page_phase_3_item_3'],
              configMap['heating_page_phase_3_item_4'],
            ].filter(Boolean) as string[],
          },
        ],
      },
      safetyCallout: {
        title: configMap['heating_page_safety_title'] || undefined,
        description: configMap['heating_page_safety_description'] || undefined,
      },
      warnings: {
        badge: configMap['heating_page_warnings_badge'] || undefined,
        title: configMap['heating_page_warnings_title'] || undefined,
        description: configMap['heating_page_warnings_description'] || undefined,
        emergencyTitle: configMap['heating_page_emergency_title'] || undefined,
        emergencySubtitle: configMap['heating_page_emergency_subtitle'] || undefined,
        cards: [
          {
            title: configMap['heating_page_warning_1_title'] || undefined,
            description: configMap['heating_page_warning_1_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_2_title'] || undefined,
            description: configMap['heating_page_warning_2_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_3_title'] || undefined,
            description: configMap['heating_page_warning_3_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_4_title'] || undefined,
            description: configMap['heating_page_warning_4_description'] || undefined,
          },
        ],
      },
      faq: {
        subtitle: configMap['heating_page_faq_subtitle'] || undefined,
        items: [
          {
            question: configMap['heating_page_faq_1_question'] || undefined,
            answer: configMap['heating_page_faq_1_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_2_question'] || undefined,
            answer: configMap['heating_page_faq_2_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_3_question'] || undefined,
            answer: configMap['heating_page_faq_3_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_4_question'] || undefined,
            answer: configMap['heating_page_faq_4_answer'] || undefined,
          },
        ],
      },
    } as Partial<HeatingPageConfig>;
  } catch {
    return null;
  }
}

// Deep merge helper for nested objects
function deepMerge<T extends Record<string, unknown>>(defaults: T, overrides: Partial<T> | null | undefined): T {
  if (!overrides) return defaults;

  const result = { ...defaults };

  for (const key in overrides) {
    const overrideValue = overrides[key];
    const defaultValue = defaults[key];

    if (overrideValue === undefined) continue;

    if (Array.isArray(defaultValue) && Array.isArray(overrideValue)) {
      result[key] = overrideValue.map((item, index) => {
        if (typeof item === 'object' && item !== null && defaultValue[index]) {
          return deepMerge(defaultValue[index] as Record<string, unknown>, item as Record<string, unknown>);
        }
        return item ?? defaultValue[index];
      }) as T[Extract<keyof T, string>];
    } else if (typeof defaultValue === 'object' && defaultValue !== null && typeof overrideValue === 'object' && overrideValue !== null) {
      result[key] = deepMerge(defaultValue as Record<string, unknown>, overrideValue as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else {
      result[key] = overrideValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

export default async function HeatingPage() {
  const cmsConfig = await getHeatingPageConfig();

  // Merge CMS config with defaults
  const config = deepMerge(defaultConfig, cmsConfig);

  // Build services array with icons
  const services = config.services.items.map((item, idx) => ({
    ...item,
    icon: serviceIcons[idx],
  }));

  // Build inspection phases with icons
  const inspectionPhases = config.inspection.phases.map((phase, idx) => ({
    ...phase,
    icon: phaseIcons[idx],
    color: 'bg-primary',
  }));

  // Build warning cards with icons and colors
  const warningCardColors = [
    'bg-secondary/10 dark:bg-secondary/20 text-secondary',
    'bg-primary/10 dark:bg-primary/20 text-primary',
    'bg-primary/10 dark:bg-primary/20 text-primary',
    'bg-primary/10 dark:bg-primary/20 text-primary',
  ];

  const warningCards = config.warnings.cards.map((card, idx) => ({
    ...card,
    icon: warningIcons[idx],
    iconClass: warningCardColors[idx],
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/heating-services.webp)' }}
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
              {config.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              {config.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidthMobile>
                  {config.hero.primaryButton}
                </Button>
              </Link>
              <a href="tel:+18324371000" className="w-full sm:w-auto">
                <Button variant="outline-inverse" size="lg" fullWidthMobile>
                  {config.hero.secondaryButton}
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
              {config.services.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              {config.services.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {config.services.description}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 flex flex-col"
              >
                {/* Icon + Stat row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center">
                    {service.icon}
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
              {config.inspection.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {config.inspection.description}
            </p>
          </div>

          {/* 3 Phase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {inspectionPhases.map((phase, idx) => (
              <div
                key={phase.name}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${phase.color} text-white flex items-center justify-center`}>
                    {phase.icon}
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Phase {idx + 1}</div>
                    <div className="text-lg font-bold text-neutral-black dark:text-white">{phase.name}</div>
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
                <h3 className="text-lg font-bold text-white mb-2">{config.safetyCallout.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {config.safetyCallout.description}
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
              {config.warnings.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              {config.warnings.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {config.warnings.description}
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
                  <h3 className="text-xl font-bold text-white">{config.warnings.emergencyTitle}</h3>
                  <p className="text-white/80 text-sm">{config.warnings.emergencySubtitle}</p>
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

          {/* Warning Signs Grid - Simple 4 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warningCards.map((card) => (
              <div key={card.title} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                <div className={`w-12 h-12 rounded-xl ${card.iconClass} flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-2">{card.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div id="faq" className="scroll-mt-20">
        <FAQSection
          subtitle={config.faq.subtitle}
          items={config.faq.items}
        />
      </div>

      <FinalCTA />
    </>
  );
}
