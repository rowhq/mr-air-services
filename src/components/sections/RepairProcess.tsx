'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'You call',
    description: "We answer. Tell us what's wrong—we'll have someone there fast.",
    badge: 'Usually same day',
    badgeIcon: (
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    ),
  },
  {
    number: '02',
    title: 'We diagnose',
    description: 'The real problem. Not a symptom. The actual cause.',
    badge: 'Honest assessment',
    badgeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'You approve',
    description: 'You know the price before we start. Your call, always.',
    badge: 'No hidden fees',
    badgeIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'We fix it',
    description: 'Quality parts. Proper installation. It works when we leave.',
    badge: 'Guaranteed',
    badgeIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    featured: true,
  },
];

export function RepairProcess() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header observer
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Steps observer
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleSteps((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) stepObserver.observe(ref);
    });

    return () => {
      headerObserver.disconnect();
      stepObserver.disconnect();
    };
  }, []);

  return (
    <section id="process" className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20 overflow-hidden">
      <div className="container">
        {/* Header - Asymmetric */}
        <div
          ref={headerRef}
          className={`max-w-4xl mb-16 lg:mb-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white leading-[1.1] tracking-tight">
            Four steps.<br />
            <span className="text-neutral-400 dark:text-neutral-500">Zero surprises.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`grid grid-cols-12 items-center border-t border-neutral-200 dark:border-neutral-700 ${
                step.featured
                  ? 'border-b bg-white dark:bg-neutral-900 -mx-5 px-5 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16'
                  : ''
              }`}
            >
              {/* Number */}
              <div
                className={`col-span-12 md:col-span-2 py-8 md:py-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visibleSteps[index]
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className={`text-7xl md:text-8xl font-bold ${
                  step.featured
                    ? 'text-secondary/20'
                    : 'text-neutral-200 dark:text-neutral-700'
                }`}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div
                className={`col-span-12 md:col-span-5 pb-8 md:py-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visibleSteps[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 100 + 100}ms` }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-black dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  {step.description}
                </p>
              </div>

              {/* Badge */}
              <div
                className={`col-span-12 md:col-span-5 pb-8 md:py-12 md:text-right transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visibleSteps[index]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {step.featured ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 dark:bg-secondary/20 text-secondary font-bold rounded-full">
                    {step.badgeIcon}
                    {step.badge}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-secondary font-semibold">
                    {step.badgeIcon}
                    {step.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
