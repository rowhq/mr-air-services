import Link from 'next/link';
import { Button } from '@/components/ui';

export function CoolSaverSpotlight() {
  return (
    <section className="py-20 lg:py-28 bg-secondary text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warning/20 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
              <span className="text-sm font-medium text-warning">Limited Time Offer</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Free AC Tune-Up for Qualifying Homeowners
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Join the CoolSaver Program and get a complimentary AC tune-up. Keep your system running efficiently and catch small issues before they become big problems.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Complete 21-point inspection',
                'Filter replacement included',
                'Performance optimization',
                'No obligation, no pressure',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/free-ac-tune-up">
              <Button variant="primary" size="lg">
                Check If You Qualify
              </Button>
            </Link>
          </div>

          <div className="relative flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center max-w-sm w-full">
              <div className="text-7xl font-bold mb-2">$0</div>
              <div className="text-xl text-white/90 mb-6">AC Tune-Up</div>
              <div className="text-sm text-white/60 mb-6">Value: $129</div>
              <div className="pt-6 border-t border-white/20">
                <p className="text-sm text-white/70">
                  Available for homeowners in Houston, Missouri City, Spring, Katy, Sugar Land, and Pearland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
