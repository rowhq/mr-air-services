import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, ChecklistGrid, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'CoolSaver Tune-Ups | Mr. Air Services - Houston AC Maintenance',
  description: 'CoolSaver tune-ups in Houston. Improve AC efficiency with condenser coil cleaning, refrigerant adjustment, and airflow optimization. Better cooling & humidity control.',
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
    title: "Save $150-300/Year on Energy",
    description: "Dirty coils make your AC work 30% harder. Our tune-up restores efficiency, cutting your power bill 10-15%.",
    stat: "15%",
    statLabel: "lower bills",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Prevent $600 Emergency Repairs',
    description: "Average emergency repair: $600. Average tune-up catch: $50. One prevented emergency = your tune-up pays for itself 12x.",
    stat: "$600",
    statLabel: "avg emergency",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Add 5-10 Years to Your System',
    description: "New AC: $6,000-12,000. Maintenance extends lifespan from 10 to 15-20 years. That's $6K+ you keep in your pocket.",
    stat: "+10yr",
    statLabel: "lifespan",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Cleaner Indoor Air',
    description: "Dirty coils grow mold. Clogged filters trap allergens. We clean everything so you breathe easier.",
    stat: "14pt",
    statLabel: "inspection",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Beat Houston Humidity',
    description: "A tuned AC removes 30% more moisture. No more sticky feeling indoors—just cool, comfortable air.",
    stat: "30%",
    statLabel: "more moisture removed",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

export default function ACTuneUpsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 overflow-hidden">
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
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                $49 Now Beats $600 in July
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Emergency AC repairs average $600. Our $49 tune-up catches problems before they become emergencies. Same-day service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule $49 Tune-Up
                  </Button>
                </Link>
                <CoolSaverCTA variant="outline" size="lg">
                  Check FREE Eligibility
                </CoolSaverCTA>
              </div>
              <TrustSignals className="mt-6" items={['Same-day available', '14-point inspection', 'Satisfaction guaranteed']} />
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-xl w-full lg:w-auto">
                <div className="text-center mb-6">
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">CoolSaver Tune-Up</div>
                  <div className="text-5xl font-bold text-neutral-black dark:text-white">$49</div>
                  <div className="text-sm text-secondary font-medium mt-1">or FREE if you qualify</div>
                </div>
                <ul className="text-left space-y-3 text-sm">
                  {[
                    { text: '14-point inspection', value: '$149 value' },
                    { text: 'Filter replacement', value: 'Included' },
                    { text: 'Performance report', value: 'Included' },
                    { text: 'Same-day service', value: 'Available' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300">{item.text}</span>
                      </div>
                      <span className="text-xs text-primary font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              The Numbers Don't Lie
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A $49 tune-up that saves you $600+ in emergencies. Here's exactly how.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{benefit.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-neutral-black dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 text-center leading-tight">
            We Check Everything. Seriously, Everything.
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-14 text-center">
            14 checks we perform to keep your AC running at peak performance. Because "kinda sorta checked it" doesn't cut it in Houston summers.
          </p>

          <div className="max-w-4xl mx-auto">
            <ChecklistGrid items={checklistItems} initialCount={6} />
          </div>
        </div>
      </section>

      {/* CoolSaver CTA */}
      <section className="py-20 lg:py-28 bg-neutral-900 relative overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              You May Qualify for a FREE Tune-Up
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Some Houston homeowners qualify for a complimentary CoolSaver tune-up. Takes 30 seconds to check—no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <CoolSaverCTA variant="secondary" size="lg">
                Check If You Qualify
              </CoolSaverCTA>
              <span className="text-white/60 text-sm">or</span>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Schedule $49 Tune-Up
                </Button>
              </Link>
            </div>

            <p className="text-sm text-white/60">
              Not sure? The $49 tune-up is still a great deal—it prevents $600+ emergencies.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
