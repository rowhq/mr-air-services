'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { useCoolSaverModal } from '@/context/ModalContext';

export function StickyTuneUpCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openCoolSaverModal } = useCoolSaverModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px (after hero content)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-primary via-primary-dark to-primary shadow-2xl shadow-black/30 border-t border-white/10">
        <div className="container py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-white font-bold text-sm">
                FREE CoolSaver Tune-Up
              </span>
              <div className="text-white/70 text-xs">
                For qualifying homeowners
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={openCoolSaverModal}
              className="flex-shrink-0 shadow-lg"
            >
              Check If You Qualify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
