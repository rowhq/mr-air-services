'use client';

import { useState, useEffect, useRef } from 'react';

// Feature icons - using secondary color
const icons = {
  certified: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" className="stroke-secondary" strokeWidth="2" />
      <path
        d="M14 20l4 4 8-8"
        className="stroke-secondary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="12" className="stroke-secondary/30" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  ),
  pricing: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="10" width="28" height="20" rx="3" className="stroke-secondary" strokeWidth="2" />
      <path d="M6 17h28" className="stroke-secondary" strokeWidth="2" />
      <circle cx="12" cy="24" r="2" className="fill-secondary" />
      <path d="M20 22h8" className="stroke-secondary/50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  guarantee: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4L6 10v10c0 9 6 14 14 16 8-2 14-7 14-16V10L20 4z"
        className="stroke-secondary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 20l4 4 8-8"
        className="stroke-secondary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const features = [
  {
    icon: icons.certified,
    title: 'Experienced Pros',
    description: "Trained technicians who actually care about getting it right. We service all major brands.",
    stat: '98%',
    statLabel: 'on-time rate',
  },
  {
    icon: icons.pricing,
    title: 'Upfront Pricing',
    description: "You'll know exactly what it costs before we start. No surprise bills, no hidden fees. Ever.",
    stat: '$0',
    statLabel: 'hidden fees',
  },
  {
    icon: icons.guarantee,
    title: 'Guaranteed Work',
    description: "If something's off, we come back and fix it. Period. Your comfort is our reputation.",
    stat: '4.9/5',
    statLabel: 'avg rating',
  },
];

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight tracking-tight">
            Why People Call Us Back
          </h2>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className={`relative animate-fade-in-up animation-delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 shadow-2xl">
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                alt="HVAC Technician"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/20 dark:border-neutral-700/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">Veteran Owned</div>
                      <div className="text-neutral-500 dark:text-neutral-400 text-sm">Serving Greater Houston</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className={`animate-fade-in-up animation-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Features */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700
                    hover:border-secondary/30 hover:shadow-lg hover:-translate-y-0.5
                    transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700
                      flex items-center justify-center group-hover:bg-secondary/10 transition-colors duration-300">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-secondary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    {/* Stat */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold text-secondary">{feature.stat}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{feature.statLabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="tel:+18324371000"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-full
                  hover:bg-secondary-hover hover:shadow-lg hover:shadow-secondary/25 hover:scale-[1.02]
                  active:scale-[0.98] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (832) 437-1000
              </a>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">Free estimates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
