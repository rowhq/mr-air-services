'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { useCoolSaverModal } from '@/context/ModalContext';

export function StickyTuneUpCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCoolSaverModal } = useCoolSaverModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
      <div className="bg-gradient-to-r from-primary via-primary-dark to-primary shadow-2xl shadow-black/30 border-t border-white/10">
        <div className="container py-3 px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
                <span className="text-white font-bold text-sm truncate">
                  Only 4 slots TODAY
                </span>
              </div>
              <div className="text-white/70 text-xs">
                FREE or $49 tune-up
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={openCoolSaverModal}
              className="flex-shrink-0 shadow-lg"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
