'use client';

import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'CONTACT US',
    shortTitle: 'Get in touch',
    description: 'Call (832) 437-1000 or book online. Tell us what\'s happening with your AC.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 8L8 20v20h32V20L24 8z" strokeLinejoin="round" />
        <path d="M18 28h12v12H18z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'PICK A TIME',
    shortTitle: 'Schedule your visit',
    description: 'Choose a time that works for you — same-day and next-day appointments available.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 14v10l7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'WE ARRIVE',
    shortTitle: 'Expert service',
    description: 'Our certified technician arrives on time, diagnoses the issue, and fixes it right.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="18" r="4" />
        <circle cx="30" cy="30" r="4" />
        <path d="M18 22v8h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 26v-8h-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'PAY YOUR WAY',
    shortTitle: 'Transparent pricing',
    description: 'Upfront pricing with no hidden fees. Pay by card, cash, or financing.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="14" width="32" height="20" rx="2" />
        <path d="M8 22h32" />
        <circle cx="16" cy="28" r="2" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'STAY COOL',
    shortTitle: 'Comfort restored',
    description: 'Enjoy reliable comfort again. All work backed by our satisfaction guarantee.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="3" />
        <circle cx="24" cy="24" r="8" strokeDasharray="4 4" />
        <circle cx="32" cy="24" r="1.5" />
        <circle cx="16" cy="24" r="1.5" />
        <circle cx="24" cy="16" r="1.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-4 leading-[1.1]">
            From Call To Cool In 5 Steps
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md">
            Getting your AC back on track is easier than you think — just five simple steps and comfort returns.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="hidden lg:flex gap-4">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-lg p-6 text-left min-h-[350px] flex flex-col cursor-pointer transition-all duration-300 ease-out ${
                  isActive
                    ? 'flex-[2] bg-secondary text-white'
                    : 'flex-1 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
              >
                {/* Number and Title */}
                <div className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-white/80' : 'text-neutral-400'
                }`}>
                  {step.number}. <span className="uppercase">{step.title}</span>
                </div>

                {/* Icon and Description - only on active */}
                <div className={`mt-auto transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute'
                }`}>
                  <div className="mb-4 text-white/80">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.shortTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    {step.description}
                  </p>
                </div>

                {/* Icon placeholder for inactive cards */}
                <div className={`mt-auto text-neutral-300 dark:text-neutral-600 transition-all duration-300 ${
                  isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}>
                  {step.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={step.number}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-lg p-5 text-left min-h-[280px] flex flex-col transition-colors duration-200 ${
                  isActive
                    ? 'bg-secondary text-white col-span-2 md:col-span-1'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
              >
                <div className={`text-sm font-medium tracking-wide ${
                  isActive ? 'text-white/80' : 'text-neutral-400'
                }`}>
                  {step.number}. <span className="uppercase">{step.title}</span>
                </div>

                {isActive && (
                  <div className="mt-auto">
                    <div className="mb-3 text-white/80">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {step.shortTitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/90">
                      {step.description}
                    </p>
                  </div>
                )}

                {!isActive && (
                  <div className="mt-auto text-neutral-300 dark:text-neutral-600">
                    {step.icon}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
