import Link from 'next/link';
import { Button, Breadcrumbs } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'HVAC Services | Mr. Air Services - Houston AC & Heating Experts',
  description: 'Complete HVAC services in Houston. AC repair, tune-ups, heating services, and maintenance plans. Licensed & insured, same-day service available.',
};

const services = [
  {
    title: 'Air Conditioning Repair',
    description: 'Is your AC not cooling properly? Making strange noises? Our experienced technicians diagnose and repair all makes and models. Same-day service available for emergencies.',
    features: [
      'All major brands serviced',
      'Same-day emergency service',
      'Upfront pricing',
      'Parts warranty included',
    ],
    href: '/services/air-conditioning-repair',
    cta: 'Schedule AC Repair',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Air Conditioning Tune-Ups',
    description: 'Regular maintenance extends the life of your AC and improves efficiency. Our 13-point tune-up catches small issues before they become expensive repairs.',
    features: [
      'Complete 13-point inspection',
      'Filter replacement',
      'Coil cleaning',
      'Refrigerant check',
    ],
    href: '/services/air-conditioning-tune-ups',
    cta: 'Book Your Tune-Up',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Heating Services',
    description: 'Stay warm during Houston\'s cold snaps. We service furnaces, heat pumps, and all heating systems. Installation, repair, and maintenance available.',
    features: [
      'Furnace repair & installation',
      'Heat pump services',
      'Emergency heating repair',
      'Energy efficiency upgrades',
    ],
    href: '/services/heating',
    cta: 'Schedule Heating Service',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: 'Maintenance Plans',
    description: 'Protect your HVAC investment with our comprehensive maintenance plans. Regular service prevents breakdowns and keeps your system running efficiently.',
    features: [
      'Priority scheduling',
      'Discounts on repairs',
      'Bi-annual tune-ups',
      'No overtime charges',
    ],
    href: '/services/maintenance-plans',
    cta: 'Compare Plans',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <div className="max-w-3xl">
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">Our Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
              Our HVAC Services
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Comprehensive heating and cooling solutions for residential and commercial properties in the Greater Houston area.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">What We Offer</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 lg:mb-0 max-w-xl leading-tight">
              Complete HVAC Solutions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md text-lg">
              From emergency repairs to preventive maintenance, we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 lg:p-10 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-black dark:text-white mb-4">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.href}>
                  <Button variant="secondary" fullWidth>
                    {service.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Why Choose Us</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 lg:mb-0 max-w-xl leading-tight">
              Why Choose Mr. Air Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Response',
                description: 'Same-day service available. We understand HVAC emergencies can\'t wait.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Licensed & Insured',
                description: 'Experienced technicians with ongoing training on the latest systems.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
              {
                title: 'Upfront Pricing',
                description: 'No surprises. Get a detailed estimate before any work begins.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center bg-white dark:bg-neutral-900 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
