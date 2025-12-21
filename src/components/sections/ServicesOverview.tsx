import Link from 'next/link';

const services = [
  {
    title: 'AC Repair',
    description: "AC not cooling? Making weird noises? We diagnose fast and fix it right the first time. Same-day service available.",
    href: '/services/air-conditioning-repair',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'CoolSaver Tune-Ups',
    description: "Our signature 14-point tune-up keeps your AC at peak performance. Catch problems before they become emergencies.",
    href: '/services/air-conditioning-tune-ups',
    featured: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Maintenance Plans',
    description: "Annual plans with priority service and repair discounts. Sleep better knowing we're already on it.",
    href: '/services/maintenance-plans',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Heating Services',
    description: "Furnace and heat pump repair, maintenance, and installation. Be ready when Houston winters surprise you.",
    href: '/services/heating',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black leading-tight tracking-tight mb-6">
            We Fix What Breaks.{' '}
            <span className="text-neutral-500">We Keep It Running.</span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            From emergency repairs to routine maintenance—we handle it all. No job too big, too small, or too sweaty.
          </p>
        </div>

        {/* Services Grid - Premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative rounded-3xl p-8 transition-all duration-500 ease-out
                hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
                ${service.featured
                  ? 'bg-gradient-to-br from-secondary to-primary text-white shadow-xl shadow-secondary/20'
                  : 'bg-neutral-50 border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-secondary/20'
                }`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-white rounded-full text-xs font-bold text-secondary">
                  POPULAR
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                transition-all duration-500 ease-out
                ${service.featured
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-secondary group-hover:bg-secondary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-sm'
                }`}>
                {service.icon}
              </div>

              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300
                ${service.featured ? 'text-white' : 'text-neutral-black group-hover:text-secondary'}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${service.featured ? 'text-white/90' : 'text-neutral-600'}`}>
                {service.description}
              </p>

              {/* Arrow indicator */}
              <div className={`flex items-center gap-2 text-sm font-medium
                ${service.featured
                  ? 'text-white/80 group-hover:text-white'
                  : 'text-secondary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                } transition-all duration-300`}>
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link href="/services" className="group inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
            View All Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
