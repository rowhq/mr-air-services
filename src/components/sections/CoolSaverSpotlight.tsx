'use client';

import { Button } from '@/components/ui';
import { useCoolSaverModal } from '@/context/ModalContext';

const benefits = [
  'Refrigerant levels checked',
  'Coils cleaned',
  'Filter replaced',
  'Electrical inspection',
  'Performance report',
];

export function CoolSaverSpotlight() {
  const { openCoolSaverModal } = useCoolSaverModal();

  return (
    <section id="coolsaver" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
      <div className="container max-w-5xl">
        {/* Main Card */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Left: Offer */}
            <div>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase mb-4 block">
                CoolSaver Program
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                Free AC Tune-Up
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                You already pay for it in your electric bill. We help you get it back.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white">FREE</span>
                <span className="text-primary font-semibold text-sm">for qualifying homeowners</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" fullWidthMobile onClick={openCoolSaverModal}>
                  Check If You Qualify
                </Button>
                <a
                  href="tel:+18324371000"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (832) 437-1000
                </a>
              </div>
            </div>

            {/* Right: What's Included */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-neutral-900 dark:text-white mb-5">
                What&apos;s Included
              </h3>

              {/* Grid layout for benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
