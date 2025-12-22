import Link from 'next/link';
import { Button, CoolSaverCTA } from '@/components/ui';

const services = [
  {
    title: 'AC Repair',
    description: "AC not cooling? Making weird noises? We diagnose fast and fix it right. Same-day service available.",
    href: '/services/air-conditioning-repair',
    cta: 'tel:+18324371000',
    ctaLabel: 'Call Now',
    isEmergency: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'CoolSaver Tune-Ups',
    description: "14-point inspection to catch problems before they become emergencies. FREE for qualifying homeowners.",
    href: '/#coolsaver',
    ctaLabel: 'Check If You Qualify',
    featured: true,
    useModal: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Heating Services',
    description: "Furnace and heat pump repair, maintenance, and installation. Be ready for Houston winters.",
    href: '/services/heating',
    ctaLabel: 'Schedule Service',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: 'Maintenance Plans',
    description: "Annual plans with priority service and repair discounts. Prevention is cheaper than repair.",
    href: '/services/maintenance-plans',
    ctaLabel: 'Compare Plans',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight tracking-tight mb-4">
            We Fix What Breaks.{' '}
            <span className="text-neutral-500 dark:text-neutral-400">We Keep It Running.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            From emergency repairs to routine maintenance—we handle it all.
          </p>
        </div>

        {/* Services Grid - Clean Apple style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative rounded-2xl p-6 transition-shadow duration-200
                ${service.featured
                  ? 'bg-gradient-to-br from-secondary to-primary text-white'
                  : 'bg-neutral-50 dark:bg-neutral-800 hover:shadow-md'
                }`}
            >
              {service.isEmergency && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-medium text-red-500 dark:text-red-400">Emergency</span>
                </div>
              )}
              {service.featured && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-white/20 rounded-full">
                  <span className="text-xs font-semibold text-white">FREE</span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                ${service.featured
                  ? 'bg-white/20 text-white'
                  : 'bg-white dark:bg-neutral-900 text-secondary'
                }`}>
                {service.icon}
              </div>

              <h3 className={`text-lg font-bold mb-2
                ${service.featured ? 'text-white' : 'text-neutral-black dark:text-white'}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${service.featured ? 'text-white/90' : 'text-neutral-600 dark:text-neutral-400'}`}>
                {service.description}
              </p>

              {service.useModal ? (
                <CoolSaverCTA
                  variant={service.featured ? 'outline-inverse' : 'secondary'}
                  size="sm"
                  fullWidth
                >
                  {service.ctaLabel}
                </CoolSaverCTA>
              ) : service.cta ? (
                <a href={service.cta}>
                  <Button variant={service.featured ? 'outline-inverse' : 'secondary'} size="sm" fullWidth>
                    {service.ctaLabel}
                  </Button>
                </a>
              ) : (
                <Link href={service.href}>
                  <Button variant={service.featured ? 'outline-inverse' : 'secondary'} size="sm" fullWidth>
                    {service.ctaLabel}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-secondary font-medium hover:underline">
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
