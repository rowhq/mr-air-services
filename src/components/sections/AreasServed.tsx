'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { officeLocations as defaultOfficeLocations, getFullAddress, OfficeLocation } from '@/data/officeLocations';
import type { AreasServedBlockContent, BlockSettings } from '@/types/cms';

interface AreasServedProps {
  content?: AreasServedBlockContent;
  settings?: BlockSettings;
  locations?: OfficeLocation[];
}

const defaultContent: AreasServedBlockContent = {
  title: "Serving the Greater Houston Area",
  subtitle: "With 3 convenient locations across the Houston metro, we're always nearby when you need us. Same-day service available.",
  showMap: true,
  showList: true,
};

// Generate Google Maps directions URL
const getDirectionsUrl = (office: OfficeLocation) => {
  const address = encodeURIComponent(getFullAddress(office));
  return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
};

// Dynamically import the map component to avoid SSR issues with Leaflet
const HoustonCoverageMap = dynamic(
  () => import('./HoustonCoverageMap'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl h-[450px] flex items-center justify-center">
        <div className="text-neutral-400 dark:text-neutral-400 flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading map...
        </div>
      </div>
    ),
  }
);

export function AreasServed({
  content = defaultContent,
  settings,
  locations = defaultOfficeLocations
}: AreasServedProps) {
  const [activeOffice, setActiveOffice] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { title, subtitle, showMap, showList } = content;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePillClick = (office: OfficeLocation) => {
    // Check if mobile (< lg breakpoint)
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    if (isMobile) {
      // Mobile: scroll to map and open popup
      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveOffice(office.name);
      setOpenPopup(office.name);
      // Reset openPopup after a delay to allow re-triggering
      setTimeout(() => setOpenPopup(null), 2000);
    } else {
      // Desktop: open Google Maps directly
      window.open(getDirectionsUrl(office), '_blank');
    }
  };

  return (
    <section className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight tracking-tight">
              {title.includes('Greater') ? (
                <>Serving the Greater<br />Houston Area</>
              ) : (
                title
              )}
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-10 max-w-md leading-relaxed">
              {subtitle || `With ${locations.length} convenient locations across the Houston metro, we're always nearby when you need us. Same-day service available.`}
            </p>

            {/* Office Location Pills - Mobile: scroll to map, Desktop: open Maps */}
            {showList && (
            <div className="flex flex-wrap gap-2 mb-10">
              {locations.map((office, index) => (
                <button
                  key={office.name}
                  onClick={() => handlePillClick(office)}
                  onMouseEnter={() => setActiveOffice(office.name)}
                  onMouseLeave={() => setActiveOffice(null)}
                  className={`group relative px-4 py-3 rounded-full text-left transition-all duration-200
                    bg-white dark:bg-neutral-900 hover:bg-secondary hover:scale-105
                    animate-fade-in-up ${index === 0 ? 'animation-delay-100' : index === 1 ? 'animation-delay-200' : 'animation-delay-300'}`}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-secondary group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-white transition-colors">
                      {office.name}
                    </span>
                    {/* External link icon - only on desktop */}
                    <svg
                      className="w-3 h-3 hidden lg:block text-neutral-400 group-hover:text-white/70 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
            )}

            {/* CTA */}
            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 text-sm">
              <span>Questions?</span>
              <a
                href="tel:+18324371000"
                className="text-secondary font-semibold hover:text-secondary-hover transition-colors"
              >
                Call (832) 437-1000
              </a>
            </div>
          </div>

          {/* Right - Coverage Map (after content on mobile, right side on desktop) */}
          {showMap && (
          <div ref={mapRef} className="lg:sticky lg:top-24 animate-fade-in-up animation-delay-200">
            {mounted && (
              <HoustonCoverageMap
                activeOffice={activeOffice}
                onOfficeHover={setActiveOffice}
                openPopup={openPopup}
              />
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
