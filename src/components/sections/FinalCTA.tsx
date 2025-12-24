import Link from 'next/link';
import { Button } from '@/components/ui';

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 md:py-32 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you need emergency repair, routine maintenance, or a new system installation, our team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" fullWidthMobile className="group">
                Schedule Your Service
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <a href="tel:+18324371000" className="w-full sm:w-auto">
              <Button variant="outline-inverse" size="lg" fullWidthMobile className="group">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (832) 437-1000
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
