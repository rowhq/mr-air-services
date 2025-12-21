'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { officeLocations, getFullAddress, OfficeLocation } from '@/data/officeLocations';

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
      <div className="bg-neutral-50 border border-neutral-100 rounded-3xl h-[450px] flex items-center justify-center">
        <div className="text-neutral-400 flex items-center gap-2">
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

export function AreasServed() {
  const [activeOffice, setActiveOffice] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                Our Locations
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight tracking-tight">
              Serving the Greater<br />Houston Area
            </h2>

            <p className="text-neutral-600 text-lg mb-10 max-w-md leading-relaxed">
              With {officeLocations.length} convenient locations across the Houston metro, we&apos;re always nearby when you need us. Same-day service available.
            </p>

            {/* Office Location Cards - Compact Design */}
            <div className="flex flex-wrap gap-2 mb-10">
              {officeLocations.map((office, index) => (
                <button
                  key={office.name}
                  onMouseEnter={() => setActiveOffice(office.name)}
                  onMouseLeave={() => setActiveOffice(null)}
                  onClick={() => setActiveOffice(activeOffice === office.name ? null : office.name)}
                  className={`group relative px-4 py-3 rounded-full border text-left transition-all duration-300 ${
                    activeOffice === office.name
                      ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/25 pr-6'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-secondary hover:shadow-md'
                  } animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center gap-2">
                    {/* Pin Icon */}
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        activeOffice === office.name ? 'text-white' : 'text-secondary'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className={`font-semibold text-sm ${
                      activeOffice === office.name ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {office.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Expanded Location Detail */}
            <div className={`overflow-hidden transition-all duration-300 mb-10 ${
              activeOffice ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {activeOffice && (() => {
                const office = officeLocations.find(o => o.name === activeOffice);
                if (!office) return null;
                return (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-neutral-900 mb-1">{office.name}</h3>
                        <p className="text-sm text-neutral-500">
                          {office.address}, {office.city}, {office.state} {office.zip}
                        </p>
                      </div>
                      <a
                        href={getDirectionsUrl(office)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-full hover:bg-secondary-hover transition-colors"
                      >
                        Directions
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 text-neutral-500 text-sm">
              <span>Questions?</span>
              <a
                href="tel:+18324371000"
                className="text-secondary font-semibold hover:text-secondary-hover transition-colors"
              >
                Call (832) 437-1000
              </a>
            </div>
          </div>

          {/* Right - Coverage Map */}
          <div className="order-first lg:order-last lg:sticky lg:top-24 animate-fade-in-up animation-delay-200">
            {mounted && (
              <HoustonCoverageMap
                activeOffice={activeOffice}
                onOfficeHover={setActiveOffice}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
