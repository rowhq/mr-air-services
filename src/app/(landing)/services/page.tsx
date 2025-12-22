import Link from 'next/link';
import { Button, Breadcrumbs, StickyMobileCTA, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'HVAC Services | Mr. Air Services - Houston AC & Heating',
  description: 'Complete HVAC services in Houston. AC repair, tune-ups, heating services, and maintenance plans. Same-day service available.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero - Clean Apple style, no blobs */}
      <section className="relative min-h-[50vh] pt-32 bg-gradient-to-b from-neutral-900 to-neutral-800 overflow-hidden">
        {/* Subtle grid pattern instead of blobs */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="services-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#services-grid)" className="text-white"/>
          </svg>
        </div>

        <div className="container relative py-16">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              HVAC Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              From emergency repairs to preventive maintenance. Same-day service available.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Urgency hierarchy */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container">
          {/* Featured: AC Repair - Emergency Service */}
          <div className="mb-8">
            <div className="bg-neutral-900 dark:bg-neutral-800 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              {/* Emergency Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-medium text-red-400">Same-Day Emergency</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Air Conditioning Repair</h2>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed text-lg">
                    AC not cooling? Strange noises? Don't sweat it. Our technicians diagnose and repair all makes and models—usually the same day you call.
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {['All major brands', 'Same-day service', 'Upfront pricing', 'Parts warranty'].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                        <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                  <a href="tel:+18324371000">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </Button>
                  </a>
                  <Link href="/services/air-conditioning-repair">
                    <Button variant="outline-inverse" size="lg" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other Services - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Heating Services */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">Heating Services</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                Stay warm during Houston's cold snaps. Furnaces, heat pumps, and all heating systems.
              </p>
              <ul className="space-y-2 mb-6">
                {['Furnace repair', 'Heat pumps', 'Emergency service'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/heating">
                <Button variant="secondary" fullWidth>
                  Schedule Service
                </Button>
              </Link>
            </div>

            {/* AC Tune-Ups */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-md transition-shadow duration-200 relative">
              {/* Free Badge */}
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">FREE for Qualifying</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">CoolSaver Tune-Ups</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                14-point inspection. Catch small issues before they become expensive repairs.
              </p>
              <ul className="space-y-2 mb-6">
                {['14-point inspection', 'Filter replacement', 'Coil cleaning'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <CoolSaverCTA variant="secondary" fullWidth size="md">
                  Check If You Qualify
                </CoolSaverCTA>
            </div>

            {/* Maintenance Plans */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-500 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">Maintenance Plans</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                Protect your investment. Priority scheduling, discounts, and peace of mind.
              </p>
              <ul className="space-y-2 mb-6">
                {['Priority scheduling', 'Repair discounts', 'Bi-annual tune-ups'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/maintenance-plans">
                <Button variant="secondary" fullWidth>
                  Compare Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Simplified with Stats */}
      <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-12 text-center">
            Why Mr. Air Services?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Fast Response',
                description: 'Same-day service available for emergencies.',
                stat: '2hr',
                statLabel: 'Avg Response',
              },
              {
                title: 'Licensed & Insured',
                description: 'Certified technicians you can trust.',
                stat: '15+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Upfront Pricing',
                description: 'No surprises. Know the cost before we start.',
                stat: '$0',
                statLabel: 'Hidden Fees',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl font-bold text-secondary mb-1">{item.stat}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{item.statLabel}</div>
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <StickyMobileCTA />
    </>
  );
}
