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

const furnaceChecklist = [
  { title: 'Safety Controls', description: 'Testing safety shutoffs' },
  { title: 'Electrical Systems', description: 'Voltage and amperage checks' },
  { title: 'Performance Analysis', description: 'Temperature data readings' },
  { title: 'Fan & Pilot Calibration', description: 'Preventing energy waste' },
  { title: 'Burner Cleaning', description: 'Proper combustion and efficiency' },
  { title: 'Heat Exchanger Inspection', description: 'Checking for CO leak risks' },
  { title: 'Carbon Monoxide Testing', description: 'Measuring emission levels' },
  { title: 'Gas & Flue Lines', description: 'Proper exhaust of hazardous gases' },
  { title: 'Thermostat Check', description: 'System cycle verification' },
  { title: 'Filter Service', description: 'Airflow maintenance' },
  { title: 'System Assessment', description: 'Overall evaluation' },
  { title: 'Consultation', description: 'Review findings with customer' },
];

const warningSignsItems = [
  'Uneven heating throughout your home',
  'Strange noises when the system runs',
  'Yellow or flickering pilot light',
  'Frequent cycling on and off',
  'Higher than normal energy bills',
  'Dust or dry air in your home',
  'System is 15+ years old',
  'Visible rust or cracks',
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
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Heating' },
            ]}
          />
          <div className="max-w-3xl">
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">Heating Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
              Heat Out? We're On It.
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed max-w-lg">
              Yeah, Houston winters are mild. But when it's 35° and your heat won't kick on, you'll wish you'd called us sooner. Furnaces, heat pumps, whatever—we fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Schedule Heating Service
                </Button>
              </Link>
              <a href="tel:+18324371000">
                <Button variant="outline" size="lg">
                  Call (832) 437-1000
                </Button>
              </a>
            </div>
            <TrustSignals className="mt-6" />
          </div>
        </div>
      </section>

      <SectionNav items={sectionNavItems} />

      {/* Services */}
      <section id="services" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">What We Offer</span>
          </div>

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
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Furnace Tune-Up</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 text-center leading-tight">
            12-Point Furnace Inspection
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-14 text-center">
            Yearly inspections are essential for safety, peace of mind, and proper operation. Here's what we check.
          </p>

          <NumberedChecklistGrid items={furnaceChecklist} initialCount={6} />

          {/* Safety Callout */}
          <div className="mt-12 max-w-3xl mx-auto bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">Why Yearly Inspections Matter</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Carbon monoxide is odorless and invisible. A cracked heat exchanger can leak it into your home without warning.
              Yearly inspections catch these problems early—before they put your family at risk.
            </p>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section id="warnings" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Warning Signs</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Your Heater Is Trying to Tell You Something
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                Weird noises? Uneven temps? Don't ignore it. These are your heater's way of saying "help me before I die completely."
              </p>
              <ul className="space-y-4">
                {warningSignsItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-white/10"></div>
              <div className="absolute bottom-5 left-5 w-24 h-24 rounded-full bg-white/10"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-neutral-black dark:text-white mb-4">Don't Wait Until It's 40° Inside</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                  Sure, Houston winters are mild. But when that one cold week hits and your heat's dead? You'll be miserable. Get it checked now.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Book a Tune-Up
                  </Button>
                </Link>
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
