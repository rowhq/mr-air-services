import Link from 'next/link';
import { ReactNode } from 'react';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { PlanQuiz, FAQSection } from '@/components/sections';

export const metadata = {
  title: 'HVAC Maintenance Plans | Mr. Air Services - Houston AC & Heating Protection',
  description: 'Annual preventative maintenance plans with CoolSaver Tune-Ups. Modern diagnostic tools, priority service, and repair discounts. Keep your system at peak performance.',
};

const plans = [
  {
    name: 'Basic',
    price: '$19',
    period: '/month',
    annual: '$199/year',
    savings: 'Save $400+ vs paying per visit',
    description: 'Perfect for newer systems with basic maintenance needs',
    features: [
      { text: 'Annual CoolSaver Tune-Up (AC)', value: '$149 value' },
      { text: 'Annual heating tune-up', value: '$85 value' },
      { text: '10% discount on all repairs', value: null },
      { text: 'Priority scheduling', value: null },
      { text: 'Filter reminders', value: null },
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    annual: '$299/year',
    savings: 'Save $600+ vs paying per visit',
    description: 'Best value for homes 5+ years old',
    features: [
      { text: '2x CoolSaver Tune-Ups (AC)', value: '$298 value' },
      { text: 'Annual heating tune-up', value: '$85 value' },
      { text: '15% discount on all repairs', value: null },
      { text: 'Priority scheduling', value: 'Skip the 4-week wait' },
      { text: 'No overtime charges', value: 'Save $150+ on emergencies' },
      { text: 'Free service calls', value: '$89 value each' },
      { text: 'Extended warranty on repairs', value: null },
    ],
    popular: true,
  },
  {
    name: 'Commercial',
    price: 'Custom',
    period: '',
    annual: 'Based on # of systems',
    savings: 'Volume discounts available',
    description: 'Tailored solutions for businesses',
    features: [
      { text: 'Customized service schedule', value: null },
      { text: 'Multiple system coverage', value: null },
      { text: 'Emergency priority service', value: '4-hour response' },
      { text: 'Dedicated account manager', value: null },
      { text: 'Quarterly inspections', value: null },
      { text: '20%+ discount on repairs', value: null },
    ],
    popular: false,
  },
];

const comparisonFeatures = [
  { feature: 'AC Tune-Ups per Year', basic: '1', premium: '2', commercial: 'Custom' },
  { feature: 'Heating Tune-Ups per Year', basic: '1', premium: '1', commercial: 'Custom' },
  { feature: 'Repair Discount', basic: '10%', premium: '15%', commercial: '20%+' },
  { feature: 'Priority Scheduling', basic: true, premium: true, commercial: true },
  { feature: 'Free Service Calls', basic: false, premium: true, commercial: true },
  { feature: 'No Overtime Charges', basic: false, premium: true, commercial: true },
  { feature: 'Extended Warranty', basic: false, premium: true, commercial: true },
  { feature: 'Dedicated Account Manager', basic: false, premium: false, commercial: true },
];

const benefits = [
  {
    title: 'One Prevented Emergency Pays for the Year',
    description: "Average emergency: $600. Average tune-up catch: $50. Do the math.",
    stat: '12x',
    statLabel: 'ROI',
    icon: 'shield',
  },
  {
    title: 'Lower Bills, Every Month',
    description: "Dirty coils = 30% harder work. Clean system = 10-15% savings. Real money back.",
    stat: '15%',
    statLabel: 'energy savings',
    icon: 'bolt',
  },
  {
    title: 'Double Your System Life',
    description: "New unit: $8,000+. Maintenance extends life from 10 to 20 years.",
    stat: '+10yr',
    statLabel: 'lifespan',
    icon: 'clock',
  },
  {
    title: 'Skip the Summer Wait',
    description: "July: everyone's AC dies. Members get priority. Others wait 4 weeks.",
    stat: '48hr',
    statLabel: 'response',
    icon: 'calendar',
  },
  {
    title: 'Repairs Cost Less',
    description: "10-15% off every repair. Most homes need 1-2 per year.",
    stat: '$120',
    statLabel: 'saved/year',
    icon: 'dollar',
  },
  {
    title: 'No Surprise Bills',
    description: "Fixed monthly cost. No $1,000 emergencies. Peace of mind.",
    stat: '$0',
    statLabel: 'surprises',
    icon: 'check',
  },
];

const testimonials = [
  {
    quote: "They caught a refrigerant leak during my tune-up. Saved me $600 in emergency repairs.",
    author: "Sarah M.",
    location: "The Woodlands",
    plan: "Premium member since 2022",
  },
  {
    quote: "AC died in July. As a member, I got service in 48 hours. My neighbor waited 4 weeks.",
    author: "James T.",
    location: "Memorial",
    plan: "Premium member",
  },
  {
    quote: "Veteran-owned, transparent pricing, no surprises. Finally a company I trust.",
    author: "Patricia D.",
    location: "Katy",
    plan: "Basic member",
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. 30-day money-back guarantee on your first month. After that, cancel anytime with no penalties.",
  },
  {
    q: "What if I want to upgrade or downgrade?",
    a: "Change plans anytime. We'll prorate the billing. Most members upgrade to Premium after trying Basic.",
  },
  {
    q: "Are repairs covered?",
    a: "Plans cover preventive maintenance. For repairs, you get 10-20% discount depending on your plan. Premium members get free service calls.",
  },
  {
    q: "Is the money-back guarantee real?",
    a: "100% real. Try any plan for 30 days. Not satisfied? Full refund, no questions asked.",
  },
];

export default function MaintenancePlansPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] md:min-h-[550px] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/seasonal-maintenance.webp)' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Maintenance Plans' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stop Overpaying for AC Repairs
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Catch problems early. Avoid emergencies. Save money. Simple.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="#plans">
                <Button variant="secondary" size="lg">
                  See All Plans
                </Button>
              </Link>
              <a href="tel:+18324371000">
                <Button variant="outline-inverse" size="lg">
                  Call (832) 437-1000
                </Button>
              </a>
            </div>

            <TrustSignals variant="dark" />
          </div>
        </div>
      </section>

      {/* Quick Quiz */}
      <section className="py-12 lg:py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <PlanQuiz />
          </div>
        </div>
      </section>

      {/* What's Included - Rediseñado */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          {/* Header con badge */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Included in Every Plan
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight">
                14-Point CoolSaver Tune-Up
              </h2>
            </div>
            <div className="mt-6 lg:mt-0 flex items-baseline gap-2">
              <span className="text-5xl font-black text-primary">$149</span>
              <span className="text-neutral-500 dark:text-neutral-400 text-lg">value</span>
            </div>
          </div>

          {/* Grid de servicios con iconos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'Refrigerant Check', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )},
              { name: 'Coil Cleaning', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )},
              { name: 'Blower Service', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              )},
              { name: 'Filter Replace', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              )},
              { name: 'Airflow Test', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )},
              { name: 'Electrical Check', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )},
              { name: 'Drain Service', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              )},
              { name: 'Full Report', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map((service) => (
              <div
                key={service.name}
                className="group p-5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white text-sm group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {service.name}
                </h4>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href="/services/air-conditioning-tune-ups">
              <Button variant="secondary" size="lg">
                See Full Tune-Up Details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
              <strong className="text-neutral-700 dark:text-neutral-300">Pro tip:</strong> Any AC system 1+ year old should have an annual tune-up. It's the difference between a $50 catch and a $600 emergency.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Pick Your Plan
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              All plans include our 14-point CoolSaver Tune-Up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              // Different styles per plan
              const planStyles = {
                Basic: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
                Premium: 'bg-primary/5 dark:bg-primary/10 ring-2 ring-primary shadow-xl shadow-primary/10',
                Commercial: 'bg-neutral-900 dark:bg-neutral-950 text-white border border-neutral-800',
              };
              const isCommercial = plan.name === 'Commercial';

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl plan-card ${planStyles[plan.name as keyof typeof planStyles]}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6 pt-4">
                    <h3 className={`text-xl font-bold mb-3 ${isCommercial ? 'text-white' : 'text-neutral-black dark:text-white'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className={`text-5xl font-black ${isCommercial ? 'text-white' : 'text-neutral-black dark:text-white'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ${isCommercial ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {plan.period}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${isCommercial ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                      {plan.annual}
                    </p>
                    <p className={`text-sm font-semibold ${plan.popular ? 'text-primary' : isCommercial ? 'text-primary-light' : 'text-primary'}`}>
                      {plan.savings}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isCommercial ? 'bg-primary/30' : 'bg-primary/15 dark:bg-primary/25'
                        }`}>
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm ${isCommercial ? 'text-neutral-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
                            {feature.text}
                          </span>
                          {feature.value && (
                            <span className="block text-xs text-primary font-medium mt-0.5">{feature.value}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Guarantee Badge */}
                  <div className={`flex items-center gap-2 text-sm font-medium mb-6 pt-4 border-t ${
                    isCommercial ? 'border-neutral-700 text-green-400' : 'border-neutral-200 dark:border-neutral-700 text-green-600 dark:text-green-400'
                  }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    30-day money-back guarantee
                  </div>

                  <Link href="/contact">
                    <Button
                      variant={plan.popular ? 'primary' : isCommercial ? 'secondary' : 'outline'}
                      fullWidth
                    >
                      {plan.price === 'Custom' ? 'Get Custom Quote' : `Choose ${plan.name}`}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-6 text-center">
              Compare All Features
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">Basic</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-secondary">Premium</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">Commercial</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={row.feature} className={idx !== comparisonFeatures.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''}>
                      <td className="py-3 px-4 text-sm text-neutral-700 dark:text-neutral-300">{row.feature}</td>
                      <td className="text-center py-3 px-4">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? (
                            <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{row.basic}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4 bg-secondary/5">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <svg className="w-5 h-5 text-secondary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium text-secondary">{row.premium}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {typeof row.commercial === 'boolean' ? (
                          row.commercial ? (
                            <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{row.commercial}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              The Math That Makes Sense
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real numbers from real Houston homeowners. Your plan pays for itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const icons: Record<string, ReactNode> = {
                shield: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                bolt: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                clock: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                calendar: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                dollar: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                check: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              };

              return (
                <div
                  key={benefit.title}
                  className="benefit-card bg-neutral-50 dark:bg-neutral-800 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group border border-transparent hover:border-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col">
                    {/* Icon + Stat Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {icons[benefit.icon]}
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-neutral-900 dark:text-white">{benefit.stat}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">{benefit.statLabel}</div>
                      </div>
                    </div>
                    {/* Text */}
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Why Houston Families Choose Us
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real stories from real members. No paid actors, just happy customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="testimonial-card bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
                  <p className="font-semibold text-neutral-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.location}</p>
                  <p className="text-xs text-primary font-medium mt-1">{testimonial.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Common Questions"
        description="Straight answers. No fine print."
        items={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/5"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Stop Worrying About Your AC?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 2,000+ Houston homeowners who sleep better knowing we&apos;ve got them covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#plans">
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-neutral-100">
                    Choose Your Plan
                  </Button>
                </Link>
                <a href="tel:+18324371000">
                  <Button variant="outline-inverse" size="lg">
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>
              {/* Guarantee reminder */}
              <p className="text-white/70 text-sm mt-6 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                30-day money-back guarantee on all plans
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
