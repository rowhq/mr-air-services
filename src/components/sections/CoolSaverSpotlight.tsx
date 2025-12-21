import Link from 'next/link';
import { Button } from '@/components/ui';

const benefits = [
  'Refrigerant charge adjustment',
  'Condenser & evaporator cleaning',
  'Air filter replacement',
  'Full electrical inspection',
  'Performance report',
  'Zero obligation',
];

export function CoolSaverSpotlight() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
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
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Free AC Tune-Up for{' '}
            <span className="text-white/90 underline decoration-white decoration-2 underline-offset-4">Qualifying Homeowners</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            You already pay for it in your electric bill. We help you get it back.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* What You Get */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10
            hover:bg-white/15 transition-colors duration-300 animate-fade-in-up animation-delay-200">
            <h3 className="text-2xl font-bold text-white mb-6">What You Get (FREE)</h3>
            <ul className="space-y-4 mb-6">
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
            <p className="text-white/60 text-sm">Valued at $149 — yours FREE if you qualify</p>
          </div>

          {/* CTA Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl
            hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 animate-fade-in-up animation-delay-300">
            <h3 className="text-2xl font-bold text-neutral-black mb-2">Check If You Qualify</h3>
            <p className="text-neutral-600 mb-8">It takes 2 minutes. No obligation.</p>

            <div className="space-y-4 mb-8">
              <a href="tel:+18324371000" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50
                hover:bg-secondary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center
                  group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">(832) 437-1000</div>
                  <div className="text-sm text-neutral-500">Call now</div>
                </div>
              </a>

              <a href="mailto:coolsavertuneups@mrairservices.com" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50
                hover:bg-secondary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center
                  group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-neutral-800 text-sm md:text-base">coolsavertuneups@mrairservices.com</div>
                  <div className="text-sm text-neutral-500">Email us</div>
                </div>
              </a>
            </div>

            <Link href="/free-ac-tune-up" className="block">
              <Button variant="primary" fullWidth size="lg" className="group">
                See If You Qualify
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <p className="text-center text-white/60 mt-12 text-lg animate-fade-in-up animation-delay-400">
          Thousands of Houston homeowners have already qualified
        </p>
      </div>
    </section>
  );
}
