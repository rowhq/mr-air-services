import Image from 'next/image';
import { CoolSaverCTA } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.webp"
        alt="Mr. Air Services technician working on AC unit"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Improved Overlay - Subtle gradient for Apple-like elegance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Geometric Pattern Overlay (like About page) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#hero-grid)" className="text-white"/>
        </svg>
      </div>

      {/* Content */}
      <div className="container relative pt-32 pb-20 min-h-[600px] md:min-h-[700px] lg:min-h-screen flex flex-col justify-center items-start text-left">

        {/* Main Headline - Clean Apple typography */}
        <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[64px] font-bold text-white mb-8 leading-[1.1] tracking-tight animate-fade-in-up">
          Free AC Tune-Ups for
          <span className="block">Qualifying Homeowners</span>
        </h1>

        {/* Subheading with value prop */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
          You already pay for it in your electric bill. We help you get it back.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up animation-delay-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-medium text-white">Veteran Owned</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-white">TX Licensed</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-white">EPA Certified</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-white">Fully Insured</span>
          </div>
        </div>

        {/* CTA Buttons - Clear hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-500">
          <CoolSaverCTA variant="primary" size="lg">
              Check If You Qualify
              <svg className="w-4 h-4 ml-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </CoolSaverCTA>
          <a href="tel:+18324371000" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/90 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">(832) 437-1000</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
