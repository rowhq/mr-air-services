import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
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

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div className="container relative pt-32 pb-20 min-h-screen flex flex-col justify-center items-start text-left">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Fast AC Repair — When You<br className="hidden sm:block" />
          Need It Most.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          Same-day service. Certified technicians.<br className="hidden sm:block" />
          100% satisfaction guarantee.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Book a Repair
            </Button>
          </Link>
          <Link href="/free-ac-tune-up">
            <Button variant="outline-inverse" size="lg">
              Get Estimate
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-start gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Licensed & Insured
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Same-Day Service
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Satisfaction Guaranteed
          </div>
        </div>
      </div>
    </section>
  );
}
