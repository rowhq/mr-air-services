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
      <section className="relative min-h-[600px] md:min-h-[670px] pt-32 overflow-hidden bg-neutral-900">
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
            <div className="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 lg:p-10 ring-1 ring-neutral-200/60 dark:ring-neutral-700/60">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pt-2">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">CoolSaver Program</p>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">AC Tune-Up</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Guaranteed
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-neutral-900 dark:text-white tracking-tight">$0</span>
                  <span className="text-lg text-neutral-400 line-through">$149</span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  For qualifying homeowners • <span className="text-neutral-700 dark:text-neutral-300">or just $49</span>
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Full system inspection</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Filter replacement included</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Detailed performance report</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Same-day service available</span>
                </div>
              </div>

              {/* Divider with trust */}
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-600 ring-2 ring-white dark:ring-neutral-800" />
                  <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-500 ring-2 ring-white dark:ring-neutral-800" />
                  <div className="w-8 h-8 rounded-full bg-neutral-400 dark:bg-neutral-400 ring-2 ring-white dark:ring-neutral-800" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">2,500+</span> Houston homeowners served
                </p>
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
