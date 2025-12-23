import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, NumberedChecklistGrid, SectionNav } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

const sectionNavItems = [
  { id: 'services', label: 'Services' },
  { id: 'tune-up', label: 'Tune-Up' },
  { id: 'warnings', label: 'Warning Signs' },
  { id: 'faq', label: 'FAQ' },
];

export const metadata = {
  title: 'Heating Services | Mr. Air Services - Houston Furnace & Heat Pump Experts',
  description: 'Professional heating services in Houston. Furnace repair, heat pump installation, and heating maintenance. Stay warm this winter. Call (832) 437-1000.',
};

const services = [
  {
    title: 'Furnace Repair',
    description: "Gas, electric, oil—doesn't matter. If it's supposed to make heat and doesn't, we'll find out why and fix it fast.",
  },
  {
    title: 'Furnace Installation',
    description: "New furnace installed right. We'll help you pick the right size for Houston weather. No overselling, no undersizing.",
  },
  {
    title: 'Heat Pump Services',
    description: "Perfect for Houston's \"winter.\" More efficient than a furnace when temps are above freezing. We install, fix, and maintain them.",
  },
  {
    title: 'Heating Tune-Ups',
    description: "Yearly inspections catch carbon monoxide risks and worn parts before they become emergencies.",
  },
  {
    title: 'Emergency Repair',
    description: "Cold night, no heat, freaking out? We get it. Same-day service when your heater picks the worst time to quit.",
  },
  {
    title: 'Ductwork Services',
    description: "Leaky ducts waste heat (and money). We seal them up, clean them out, and make your system actually work.",
  },
];

const inspectionPhases = [
  {
    phase: 'Safety',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'bg-primary',
    items: [
      'Safety controls & shutoffs',
      'Heat exchanger inspection (CO leak check)',
      'Carbon monoxide testing',
      'Gas & flue line inspection',
    ],
  },
  {
    phase: 'Performance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-primary',
    items: [
      'Electrical system checks',
      'Temperature data readings',
      'Fan & pilot calibration',
      'Burner cleaning & combustion',
    ],
  },
  {
    phase: 'Efficiency',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'bg-primary',
    items: [
      'Thermostat calibration',
      'Filter service & airflow',
      'System efficiency assessment',
      'Consultation & recommendations',
    ],
  },
];

const houstonStats = [
  { number: '3-5', label: 'freezing days/year in Houston', sublabel: 'But when it happens...' },
  { number: '$2,400', label: 'average emergency repair', sublabel: 'vs $85 tune-up' },
  { number: '430+', label: 'CO poisoning deaths/year (US)', sublabel: 'Most are preventable' },
];

const faqs = [
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

export default function HeatingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Heat Out? We're On It.
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Yeah, Houston winters are mild. But when it's 35° and your heat won't kick on, you'll wish you'd called us sooner. Furnaces, heat pumps, whatever—we fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Schedule Heating Service
                </Button>
              </Link>
              <a href="tel:+18324371000">
                <Button variant="outline-inverse" size="lg">
                  Call (832) 437-1000
                </Button>
              </a>
            </div>
            <TrustSignals className="mt-6" variant="dark" />
          </div>
        </div>
      </section>

      <SectionNav items={sectionNavItems} />

      {/* Houston Stats */}
      <section className="py-16 lg:py-20 bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {houstonStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-neutral-300 text-sm mb-1">{stat.label}</div>
                <div className="text-secondary text-xs font-medium">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 lg:mb-0 max-w-xl leading-tight">
              Everything Heating
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md text-lg">
              From "won't turn on" to "smells weird" to "I need a whole new system." We handle it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{service.description}</p>
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
            {inspectionPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${phase.color} text-white flex items-center justify-center`}>
                    {phase.icon}
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
          <div className="max-w-3xl mx-auto bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Carbon Monoxide: The Silent Killer</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  A cracked heat exchanger can leak odorless, invisible CO into your home. 430+ Americans die from CO poisoning annually—most cases are preventable with regular inspections. Don't skip your yearly tune-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs - Premium Design */}
      <section id="warnings" className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20 overflow-hidden">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Know the Signs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Is Your Heater<br />Asking for Help?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Your heating system gives you clues before it fails. Here's what to look for.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">

            {/* Emergency Card - Large Featured */}
            <div className="lg:col-span-7 group">
              <div className="relative h-full bg-secondary rounded-3xl p-8 lg:p-10 overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Emergency</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Smell Gas?<br />Get Out Now.
                  </h3>
                  <p className="text-white/90 text-lg mb-8 max-w-md">
                    If you smell rotten eggs, leave immediately. Don't flip switches. Call from outside.
                  </p>

                  <a href="tel:+18324371000" className="inline-flex items-center gap-3 bg-white text-secondary font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors group-hover:shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (832) 437-1000
                  </a>
                </div>
              </div>
            </div>

            {/* Yellow Pilot Light */}
            <div className="lg:col-span-5 group">
              <div className="h-full bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg shadow-secondary/25">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary text-xs font-bold rounded-full">CO RISK</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">Yellow Pilot Light</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">Should be blue. Yellow = incomplete combustion = carbon monoxide.</p>
                <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Schedule today
                </div>
              </div>
            </div>

            {/* Needs Attention Row */}
            <div className="lg:col-span-4 group">
              <div className="h-full bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-2">Strange Sounds</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">Banging, squealing, rattling = parts wearing out</p>
              </div>
            </div>

            <div className="lg:col-span-4 group">
              <div className="h-full bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-2">Short Cycling</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">Turns on/off constantly? Thermostat or filter issue</p>
              </div>
            </div>

            <div className="lg:col-span-4 group">
              <div className="h-full bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-black dark:text-white mb-2">Visible Damage</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">Rust or cracks? Get a professional inspection</p>
              </div>
            </div>

            {/* Maintenance Signs - Horizontal Scroll on Mobile */}
            <div className="lg:col-span-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Schedule a tune-up if you notice:</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 scrollbar-hide">
                <div className="flex-shrink-0 w-64 lg:w-auto bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-black dark:text-white text-sm">High Bills</h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">Efficiency dropping</p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-64 lg:w-auto bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-black dark:text-white text-sm">Uneven Heat</h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">Hot/cold spots</p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-64 lg:w-auto bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-black dark:text-white text-sm">15+ Years Old</h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">Consider upgrade</p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-64 lg:w-auto bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-black dark:text-white text-sm">Dusty Air</h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs">Filter or duct issue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-secondary/20 rounded-3xl blur-2xl" />
            <div className="relative bg-neutral-900 dark:bg-neutral-950 rounded-3xl p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-4">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-white/80 text-sm">Houston winters are unpredictable</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    $85 tune-up vs $2,400 emergency repair
                  </h3>
                  <p className="text-neutral-400 max-w-lg">
                    Don't wait until it's 40° inside. Our 12-point inspection catches problems before they become emergencies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg shadow-secondary/25">
                      Book $85 Tune-Up
                    </Button>
                  </Link>
                  <a href="tel:+18324371000">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
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
