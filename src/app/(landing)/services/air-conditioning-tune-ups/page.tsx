import Link from 'next/link';
import { Button } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'AC Tune-Ups | Mr. Air Services - Houston Air Conditioning Maintenance',
  description: 'Professional AC tune-ups in Houston. Extend your system\'s life and improve efficiency with our comprehensive 21-point inspection. Schedule your tune-up today.',
};

const checklistItems = [
  'Inspect and clean condenser coils',
  'Check refrigerant levels',
  'Test electrical connections',
  'Lubricate moving parts',
  'Inspect and replace air filter',
  'Check thermostat calibration',
  'Inspect drain line and pan',
  'Test system controls',
  'Check capacitor and contractor',
  'Measure airflow',
  'Inspect ductwork connections',
  'Check blower components',
  'Test safety controls',
  'Inspect evaporator coils',
  'Check voltage and amperage',
  'Inspect fan blade',
  'Test starting capabilities',
  'Check condensate pump',
  'Inspect insulation',
  'Review overall system performance',
  'Provide maintenance report',
];

const benefits = [
  {
    title: 'Lower Energy Bills',
    description: 'A well-maintained AC runs more efficiently, reducing your monthly energy costs by up to 15%.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Prevent Breakdowns',
    description: 'Regular tune-ups catch small issues before they become expensive repairs or emergency situations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Extended System Life',
    description: 'Proper maintenance can add 5-10 years to your AC\'s lifespan, protecting your investment.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Better Air Quality',
    description: 'Clean filters and coils mean cleaner air circulating through your home.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function ACTuneUpsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warning/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <span className="text-sm font-medium text-neutral-700">Most Popular Service</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
                AC Tune-Up Service
              </h1>
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed max-w-lg">
                Keep your air conditioner running at peak performance with our comprehensive 21-point tune-up service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Tune-Up
                  </Button>
                </Link>
                <Link href="/free-ac-tune-up">
                  <Button variant="outline" size="lg">
                    Free Tune-Up Offer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">$129</div>
                <div className="text-neutral-600 mb-6">Regular Price</div>
                <ul className="text-left space-y-3 text-sm">
                  {['21-point inspection', 'Filter replacement', 'Performance report'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center">
                        <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Benefits</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Benefits of Regular AC Tune-Ups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">What's Included</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 text-center leading-tight">
            Our 21-Point AC Tune-Up Checklist
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-14 text-center">
            Every tune-up includes a thorough inspection of your entire system.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-5 rounded-xl hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CoolSaver CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warning/20 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
            <span className="text-sm font-medium text-warning">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Get a Free AC Tune-Up
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Qualifying homeowners can receive a complimentary AC tune-up through our CoolSaver Program. No obligation, no pressure.
          </p>
          <Link href="/free-ac-tune-up">
            <Button variant="primary" size="lg">
              Check If You Qualify
            </Button>
          </Link>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
