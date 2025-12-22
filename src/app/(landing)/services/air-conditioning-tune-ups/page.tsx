import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, ChecklistGrid } from '@/components/ui';
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
    title: "Your Wallet Will Thank You",
    description: "Clean coils and proper refrigerant levels mean your AC doesn't work as hard. That's 10-15% off your power bill.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Avoid the Emergency Call',
    description: "A tune-up catches the loose wire before it becomes an expensive Saturday emergency. Math is pretty simple.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Squeeze 5 More Years Out of It',
    description: "AC units don't grow on trees. Regular maintenance can add 5-10 years before you need to drop $5K on a new one.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Breathe Easy (Literally)',
    description: "Dirty filters and moldy coils pump nasty stuff into your air. We clean it out. Your lungs will appreciate it.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Beat Houston Humidity',
    description: "A tuned AC pulls moisture out of your air properly. No more sticky feeling indoors. Just cool, comfortable air.",
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
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Most Popular Service</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Skip the 3AM Panic Call
              </h1>
              <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed max-w-lg">
                A tune-up now beats an emergency repair in July. We check everything. Catch problems early. Keep you cool all summer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Book Your Tune-Up
                  </Button>
                </Link>
                <Link href="/free-ac-tune-up">
                  <Button variant="outline" size="lg">
                    Get It Free
                  </Button>
                </Link>
              </div>
              <TrustSignals className="mt-6" />
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-xl text-center w-full lg:w-auto">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 lg:mb-2">CoolSaver Tune-Up</div>
                <div className="text-neutral-600 dark:text-neutral-400 mb-4 lg:mb-6 text-sm lg:text-base">Complete Service</div>
                <ul className="text-left space-y-2 lg:space-y-3 text-sm">
                  {['14-point inspection', 'Filter replacement', 'Performance report'].map((item) => (
                    <li key={item} className="flex items-center gap-2 lg:gap-3">
                      <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
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
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Benefits</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 lg:mb-0 max-w-xl leading-tight">
              Why Bother with a Tune-Up?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">What's Included</span>
          </div>

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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-sm font-medium text-white">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Get Your CoolSaver Tune-Up Free
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Qualifying homeowners can get a complete CoolSaver tune-up at no cost. See if you qualify. Zero obligation. Zero sales pitch.
          </p>
          <Link href="/free-ac-tune-up">
            <Button variant="primary" size="lg">
              See If You Qualify
            </Button>
          </Link>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
