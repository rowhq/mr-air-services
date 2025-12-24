'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FloatingCTAProps {
  href?: string;
  label?: string;
  phone?: string;
}

export function FloatingCTA({
  href = '/contact',
  label = 'Book Service',
  phone = '(832) 437-1000',
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [finalCTAVisible, setFinalCTAVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    // Initial scroll check
    handleScroll();

    // Detect when FinalCTA section OR footer is visible
    const finalCTA = document.getElementById('final-cta');
    const footer = document.querySelector('footer');

    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyVisible = entries.some(entry => entry.isIntersecting);
        setFinalCTAVisible(isAnyVisible);
      },
      { threshold: 0.1 }
    );

    if (finalCTA) observer.observe(finalCTA);
    if (footer) observer.observe(footer);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!isVisible || finalCTAVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <a
        href={`tel:+1${phone.replace(/\D/g, '')}`}
        className="flex items-center gap-2 px-4 py-3.5 bg-white dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-secondary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="font-medium">{phone}</span>
      </a>
      <Link
        href={href}
        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-white rounded-full hover:bg-secondary-hover transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {label}
      </Link>
    </div>
  );
}
