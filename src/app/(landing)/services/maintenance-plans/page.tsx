import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'HVAC Maintenance Plans | Mr. Air Services - Houston AC & Heating Protection',
  description: 'Annual preventative maintenance plans with CoolSaver Tune-Ups. Modern diagnostic tools, priority service, and repair discounts. Keep your system at peak performance.',
};

const plans = [
  {
    name: 'Basic Plan',
    price: 'Call',
    period: ' for pricing',
    description: 'Essential coverage for single-system homes',
    features: [
      'Annual CoolSaver Tune-Up (AC)',
      'Annual heating tune-up',
      '10% discount on repairs',
      'Priority scheduling',
      'Filter reminders',
    ],
    popular: false,
  },
  {
    name: 'Premium Plan',
    price: 'Call',
    period: ' for pricing',
    description: 'Comprehensive coverage for complete peace of mind',
    features: [
      'Bi-annual CoolSaver Tune-Ups (AC)',
      'Annual heating tune-up',
      '15% discount on repairs',
      'Priority scheduling',
      'No overtime charges',
      'Free service calls',
      'Extended warranty on repairs',
    ],
    popular: true,
  },
  {
    name: 'Commercial Plan',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for businesses',
    features: [
      'Customized service schedule',
      'Multiple system coverage',
      'Emergency priority service',
      'Dedicated account manager',
      'Quarterly inspections',
      'Volume discounts',
    ],
    popular: false,
  },
];

const benefits = [
  {
    title: 'Skip the Emergency Call',
    description: "We catch the $50 problem before it becomes a $600 Saturday emergency. That's the whole point.",
  },
  {
    title: 'Lower Power Bills',
    description: "Clean system = efficient system = less money to the power company. Usually 10-15% less.",
  },
  {
    title: 'Squeeze More Years Out of It',
    description: "AC units are expensive. Proper maintenance adds 5-10 years before you need to replace it.",
  },
  {
    title: 'Jump the Line',
    description: "When it's 102° and everyone's AC is dying, members get priority. You'll appreciate this in July.",
  },
  {
    title: 'Discounts on Repairs',
    description: "Members get 10-15% off repairs. So even if something breaks, you pay less to fix it.",
  },
  {
    title: 'Sleep Better',
    description: "Your AC is checked regularly by people who know what they're doing. One less thing to worry about.",
  },
];

export default function MaintenancePlansPage() {
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
              { label: 'Maintenance Plans' },
            ]}
          />
          <div className="text-center max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">Maintenance Plans</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
              Stop Overpaying for AC Repairs
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Maintenance plans = catch problems early, avoid emergency calls, save money. It's not complicated.
            </p>
            <TrustSignals className="mt-6 justify-center" />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">What's Included</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Every Plan Includes Our CoolSaver Tune-Up
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Our 14-point CoolSaver Tune-Up covers everything: refrigerant charge adjustment, coil cleaning, blower cleaning, filter replacement, and more. We use the latest diagnostic tools to keep your system running at peak performance.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                <strong>Pro tip:</strong> Any AC system 1 year or older should have an annual tune-up. It's the difference between a $50 catch and a $600 emergency.
              </p>
              <Link href="/services/air-conditioning-tune-ups">
                <Button variant="outline">
                  See Full CoolSaver Tune-Up Details →
                </Button>
              </Link>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-6">CoolSaver Tune-Up Highlights</h3>
              <ul className="space-y-4">
                {[
                  'Refrigerant charge adjustment',
                  'Condenser & evaporator coil cleaning',
                  'Blower cleaning',
                  'Air filter replacement',
                  'Airflow measurement',
                  'Full electrical inspection',
                  'Drain line inspection',
                  'Performance report',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Choose Your Plan</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-14 text-center leading-tight">
            Pick Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-secondary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">{plan.period}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    variant={plan.popular ? 'secondary' : 'outline'}
                    fullWidth
                  >
                    {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Benefits</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-14 text-center leading-tight">
            Why People Actually Sign Up
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-2xl hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Let's Get You Signed Up
              </h2>
              <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join the Houston homeowners who don't panic when their AC makes a weird noise. Because we're already on it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Sign Me Up
                  </Button>
                </Link>
                <a href="tel:+18324371000">
                  <Button variant="outline" size="lg">
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
