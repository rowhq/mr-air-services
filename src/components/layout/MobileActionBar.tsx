'use client';

import Link from 'next/link';
import type { SiteConfig } from '@/types/site-config';

interface MobileActionBarProps {
  config: SiteConfig;
}

export function MobileActionBar({ config }: MobileActionBarProps) {
  // Format phone for tel: link
  const phoneLink = `tel:+1${config.company.phone.replace(/\D/g, '')}`;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-16 lg:hidden" />

      {/* Fixed bar - uses CSS fixed positioning which works on both Safari and Chrome */}
      <div
        className="fixed inset-x-0 bottom-0 lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50"
        style={{
          transform: 'translate3d(0,0,0)',
          WebkitTransform: 'translate3d(0,0,0)',
        }}
      >
        <div className="flex safe-area-bottom">
          <a
            href={phoneLink}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-secondary text-white font-medium active:bg-secondary/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
          <Link
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-medium active:bg-primary/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Online
          </Link>
        </div>
      </div>
    </>
  );
}
