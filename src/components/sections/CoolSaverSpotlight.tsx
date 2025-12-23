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
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                <span className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white">$0</span>
                <div className="flex flex-col">
                  <span className="text-neutral-400 line-through text-lg">$149</span>
                  <span className="text-primary font-semibold text-sm">for qualifying homeowners</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" onClick={openCoolSaverModal}>
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
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">2,500+</p>
                  <p className="text-xs text-neutral-500">homeowners qualified</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                  <div className="flex items-center justify-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">4.9</span>
                  </div>
                  <p className="text-xs text-neutral-500">customer rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
