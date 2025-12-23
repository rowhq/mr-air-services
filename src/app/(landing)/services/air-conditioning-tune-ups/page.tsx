import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, ChecklistGrid, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';
import { StickyTuneUpCTA } from '@/components/ui/StickyTuneUpCTA';

export const metadata = {
  title: 'FREE AC Tune-Up for Qualifying Homeowners | Mr. Air Services Houston',
  description: 'Check if you qualify for a FREE CoolSaver tune-up in Houston. Or just $49—still saves you $600+ in summer emergencies. Same-day service available.',
};

const checklistItems = [
  'Refrigerant charge adjustment',
  'Condenser coil cleaning',
  'Blower cleaning',
  'Evaporator coil cleaning',
  'Air filter replacement',
  'Airflow measurement',
  'Thermostat check and calibration',
  'Contactor inspection and cleaning',
  'Electrical connection tightening',
  'Capacitor and relay inspection',
  'Drain line inspection',
  'Compressor amp draw verification',
  'Motor amp draw checks',
  'Motor oiling as needed',
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

const processSteps = [
  {
    step: "1",
    title: "You schedule online or call",
    description: "Pick a time that works. Same-day appointments available.",
    time: "30 seconds"
  },
  {
    step: "2",
    title: "Technician arrives on time",
    description: "Licensed, background-checked tech in uniform with ID.",
    time: "We're punctual"
  },
  {
    step: "3",
    title: "60-minute inspection",
    description: "We perform all 14 checks while you go about your day.",
    time: "60 minutes"
  },
  {
    step: "4",
    title: "You get a performance report",
    description: "Photos, measurements, and honest recommendations.",
    time: "10 minutes"
  },
  {
    step: "5",
    title: "You decide next steps",
    description: "If repairs needed, no pressure. Your timeline, your choice.",
    time: "No rush"
  }
];

export default function ACTuneUpsPage() {
  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyTuneUpCTA />

      {/* Hero - FREE Prominently Featured */}
      <section className="relative min-h-[85vh] pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/seasonal-maintenance.webp)' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/60" />

        <div className="container relative">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
            {/* Left - Main Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                FREE AC Tune-Up for Qualifying Homeowners
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Check if you qualify in 30 seconds. If not, it's just $49—still saves you $600+ in emergencies.
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

              <TrustSignals className="mt-6" variant="dark" items={['Same-day available', '14-point inspection', '100% satisfaction guaranteed']} />
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
                      { text: '14-point inspection', value: '$149 value' },
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

      {/* Trust Bar */}
      <section className="py-6 bg-neutral-100 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">NATE Certified</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">$1M Insured</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm">4.9/5 (147 reviews)</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Veteran Owned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now - Timeline */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-4">
              Houston AC Season Starts in <span className="text-primary">6 Weeks</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Book now while we still have same-day availability. By May, you'll wait 3+ days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-primary/30 shadow-lg shadow-primary/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-bold text-lg text-neutral-black dark:text-white mb-1">Jan - Feb</div>
              <div className="text-primary font-semibold mb-2">Schedule Now</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">$49 tune-up, same-day service, no rush</p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="font-bold text-lg text-neutral-black dark:text-white mb-1">Mar - May</div>
              <div className="text-primary font-semibold mb-2">You're Safe</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">AC ready for summer, peace of mind</p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-600">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="font-bold text-lg text-neutral-black dark:text-white mb-1">Jun - Aug</div>
              <div className="text-neutral-600 dark:text-neutral-400 font-semibold mb-2">Crisis Mode</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">$600+ emergency, 3-day wait, panic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist - Moved Up */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              14-Point Inspection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              We Check <span className="text-primary">Everything</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Most shops charge $149 for this inspection. You get it for $49—or FREE if you qualify.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ChecklistGrid items={checklistItems} initialCount={6} />
          </div>

          {/* CTA after checklist */}
          <div className="text-center mt-12">
            <CoolSaverCTA variant="primary" size="lg">
              Check If You Qualify — FREE
            </CoolSaverCTA>
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

      {/* Process - What Happens Next */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Here's Exactly What Happens
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              No surprises. No pressure. Just honest service.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((item, index) => (
              <div
                key={item.step}
                className="flex gap-6 items-start p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg shadow-primary/25">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="font-bold text-lg text-neutral-black dark:text-white">{item.title}</h3>
                    <span className="text-sm text-primary font-medium bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">{item.time}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12 p-8 bg-primary/10 dark:bg-primary/20 rounded-3xl">
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
              Ready to get started?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CoolSaverCTA variant="secondary" size="lg">
                Check If You Qualify — FREE
              </CoolSaverCTA>
              <a href="tel:+18324371000">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Or Call (832) 437-1000
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
