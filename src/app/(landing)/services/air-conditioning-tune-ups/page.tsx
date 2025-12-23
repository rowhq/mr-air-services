import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, ChecklistGrid, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';
import { StickyTuneUpCTA } from '@/components/ui/StickyTuneUpCTA';

export const metadata = {
  title: 'FREE AC Tune-Up for Qualifying Homeowners | Mr. Air Services Houston',
  description: 'Check if you qualify for a FREE CoolSaver tune-up in Houston. Or just $49—still saves you $600+ in summer emergencies. Same-day service available.',
};

const checklistItems = [
  'Refrigerant levels checked & adjusted',
  'All coils cleaned for better cooling',
  'New air filter installed',
  'Thermostat calibrated for accuracy',
  'All electrical connections secured',
  'Drain line cleared to prevent leaks',
  'Full system performance test',
  'Detailed report with photos',
];

const benefits = [
  {
    title: "Save Up to $300/Year",
    description: "A dirty AC works 30% harder. Our tune-up restores peak efficiency, cutting your power bill by 10-15% all summer long.",
    stat: "15%",
    statLabel: "lower bills",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Avoid $600 Emergencies',
    description: "We catch small issues before they become expensive repairs. One prevented emergency pays for 12 years of tune-ups.",
    stat: "$600",
    statLabel: "avg emergency",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Add 10 Years to Your AC',
    description: "Regular maintenance extends your system from 10 to 20 years. That's $6,000-12,000 you keep in your pocket.",
    stat: "+10yr",
    statLabel: "lifespan",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ACTuneUpsPage() {
  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyTuneUpCTA />

      {/* Hero - FREE Prominently Featured */}
      <section className="relative min-h-[500px] md:min-h-[550px] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/seasonal-maintenance.webp)' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/60" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Main Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                FREE AC Tune-Up for Qualifying Homeowners
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Check if you qualify in 30 seconds. Or just $49—saves you $600+ in emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CoolSaverCTA variant="secondary" size="lg" className="shadow-2xl shadow-white/10">
                  Check If You Qualify — FREE
                </CoolSaverCTA>
                <Link href="/contact">
                  <Button variant="outline-inverse" size="lg" className="w-full sm:w-auto">
                    Or Schedule $49 Now
                  </Button>
                </Link>
              </div>

              <TrustSignals className="mt-6" variant="dark" items={['NATE certified techs', '100% satisfaction guaranteed', 'Veteran owned']} />
            </div>

            {/* Right - Pricing Card */}
            <div className="relative">
              {/* Decorative glow circles - más visibles */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/50 rounded-full blur-2xl pointer-events-none" />

              {/* Main Card */}
              <div className="relative bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-2xl shadow-black/25 overflow-hidden">
                {/* Guarantee Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200">100% Money-Back</span>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Price */}
                  <div className="text-center mb-6 mt-2">
                    <div className="text-6xl font-black text-neutral-900 dark:text-white tracking-tight">
                      FREE<span className="text-xl align-top text-neutral-400 ml-0.5">*</span>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                      *or just <span className="text-primary font-bold">$49</span> if you don&apos;t qualify
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {[
                      { text: 'Complete inspection', value: 'Included' },
                      { text: 'Filter replacement', value: 'Included' },
                      { text: 'Performance report', value: 'Included' },
                      { text: 'Same-day service', value: 'Available' },
                    ].map((item) => (
                      <li key={item.text} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-primary/15 dark:bg-primary/25 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-neutral-700 dark:text-neutral-300">{item.text}</span>
                        </div>
                        <span className="text-xs font-semibold text-primary">{item.value}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                      No pressure • Cancel anytime • Honest recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              Complete Inspection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              What We Check
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A thorough inspection that catches problems before they become expensive emergencies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ChecklistGrid items={checklistItems} initialCount={8} />
          </div>
        </div>
      </section>

      {/* Benefits - Simplified to 3 */}
      <section className="relative py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Three Reasons to <span className="text-primary">Act Today</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Not tomorrow. Not next month. Today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-10 border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/40 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <div className="text-primary transition-colors duration-300">
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-neutral-black dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {benefit.description}
                </p>

                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-4xl font-black text-primary">{benefit.stat}</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-2">{benefit.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
