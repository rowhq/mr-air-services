'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MobileActionBar() {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (window.visualViewport) {
        // Calculate offset from layout viewport to visual viewport bottom
        const layoutHeight = window.innerHeight;
        const visualHeight = window.visualViewport.height;
        const visualOffsetTop = window.visualViewport.offsetTop;
        const offset = layoutHeight - visualHeight - visualOffsetTop;
        setBottomOffset(Math.max(0, offset));
      }
    };

    // Listen to visual viewport changes (Chrome/Safari toolbar hide/show)
    window.visualViewport?.addEventListener('resize', updatePosition);
    window.visualViewport?.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => {
      window.visualViewport?.removeEventListener('resize', updatePosition);
      window.visualViewport?.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 pb-[env(safe-area-inset-bottom)]"
      style={{
        bottom: bottomOffset,
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      <div className="flex">
        <a
          href="tel:+18324371000"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Online
        </Link>
      </div>
    </div>
  );
}
