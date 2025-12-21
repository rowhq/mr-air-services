import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

const trustBadges = [
  { label: 'Veteran Owned', abbr: 'VET' },
  { label: 'Licensed & Insured', abbr: 'LIC' },
  { label: 'Same-Day Service', abbr: '24H' },
  { label: 'All Brands', abbr: 'ALL' },
];

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

      {/* Improved Overlay - More subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Geometric Pattern Overlay (like About page) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#hero-grid)" className="text-white"/>
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-secondary/10 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl"></div>

      {/* Content */}
      <div className="container relative pt-32 pb-20 min-h-[600px] md:min-h-[700px] lg:min-h-screen flex flex-col justify-center items-start text-left">

        {/* Exclusive Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <span className="text-sm font-medium text-white">Exclusive to Houston</span>
        </div>

        {/* Main Headline - CoolSaver First */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight animate-fade-in-up">
          Free AC Tune-Ups for{' '}
          <span className="block md:inline">
            <span className="text-white/90 underline decoration-secondary decoration-4 underline-offset-4">Qualifying</span>{' '}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text">Homeowners</span>
          </span>
        </h1>

        {/* Subheading with value prop */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
          You already pay for it in your electric bill. We help you get it back.
          <span className="block mt-2 text-white/70 text-base md:text-lg">
            Veteran-owned. Same-day service. All brands serviced.
          </span>
        </p>

        {/* Social Proof */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in-up animation-delay-300">
          <div className="flex -space-x-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {['J','M','R','S'][i-1]}
              </div>
            ))}
          </div>
          <span className="text-white/80 text-sm">
            <span className="text-white font-semibold">2,400+</span> Houston homeowners qualified
          </span>
        </div>

        {/* CTA Buttons - Clear hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up animation-delay-400">
          <Link href="/free-ac-tune-up">
            <Button variant="primary" size="lg" className="group">
              Check If You Qualify
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
          <a href="tel:+18324371000" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/90 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">(832) 437-1000</span>
          </a>
        </div>

        {/* Trust Badges - Premium style with tooltips */}
        <div className="flex flex-wrap gap-3 animate-fade-in-up animation-delay-500">
          {trustBadges.map((badge) => (
            <div
              key={badge.abbr}
              className="group relative px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 cursor-default
                hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white">{badge.abbr}</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg
                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                {badge.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
              </div>
            </div>
          ))}
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
