import Link from 'next/link';
import { Button } from '@/components/ui';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-hero-start to-hero-end relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5"></div>

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you need emergency repair, routine maintenance, or a new system installation, our team is ready to help. Contact us today for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Request a Quote
              </Button>
            </Link>
            <a href="tel:+18324371000">
              <Button variant="outline-inverse" size="lg">
                Call (832) 437-1000
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
