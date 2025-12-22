'use client';

import { Button } from '@/components/ui';
import { useCoolSaverModal } from '@/context/ModalContext';

const benefits = [
  'Refrigerant charge adjustment',
  'Condenser & evaporator cleaning',
  'Air filter replacement',
  'Full electrical inspection',
  'Performance report',
  'Zero obligation',
];

export function CoolSaverSpotlight() {
  const { openCoolSaverModal } = useCoolSaverModal();

  return (
    <section id="coolsaver" className="py-24 md:py-32 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden scroll-mt-20">
      {/* Geometric accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"></div>

      <div className="container relative">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-sm font-semibold text-white">Limited Time Offer</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Free AC Tune-Up for{' '}
            <span className="text-white/90">Qualifying Homeowners</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            You already pay for it in your electric bill. We help you get it back.
          </p>
        </div>

        {/* Benefits + CTA Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">What You Get (FREE)</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-white/90">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm text-center mb-6">Valued at $149 — yours FREE if you qualify</p>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={openCoolSaverModal}
              className="mb-4"
            >
              Check If You Qualify
            </Button>

            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">Or call us directly</p>
              <a
                href="tel:+18324371000"
                className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (832) 437-1000
              </a>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <p className="text-center text-white/60 mt-12 text-lg animate-fade-in-up">
          Thousands of Houston homeowners have already qualified
        </p>
      </div>
    </section>
  );
}
