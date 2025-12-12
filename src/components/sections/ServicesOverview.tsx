'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    title: 'Diagnostics & Repairs',
    description: 'Fast, reliable AC repair to restore your comfort. Our certified technicians diagnose and fix all makes and models.',
    href: '/services/air-conditioning-repair',
  },
  {
    title: 'Installation & Replacement',
    description: 'We help you choose the right AC and install it cleanly, safely, and up to code.',
    href: '/services/air-conditioning-tune-ups',
  },
  {
    title: 'Seasonal Maintenance',
    description: 'Keep your AC running efficiently with regular tune-ups. Prevent breakdowns and extend the life of your system.',
    href: '/services/maintenance-plans',
  },
  {
    title: 'Heating Services',
    description: 'Complete heating solutions including installation, repair, and maintenance. Stay warm all winter long.',
    href: '/services/heating',
  },
];

export function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Image/Illustration */}
          <div className="relative">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Services</span>
            </div>

            {/* 3D Room Illustration */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full max-w-[280px]">
                {/* Room Floor */}
                <path d="M50 200 L150 250 L250 200 L150 150 Z" fill="#E2E8F0" />
                {/* Back Wall Left */}
                <path d="M50 200 L50 100 L150 50 L150 150 Z" fill="#CBD5E1" />
                {/* Back Wall Right */}
                <path d="M150 50 L150 150 L250 200 L250 100 Z" fill="#94A3B8" />
                {/* AC Unit on wall */}
                <rect x="70" y="80" width="60" height="30" rx="4" fill="white" />
                <rect x="75" y="85" width="50" height="15" rx="2" fill="#F1F5F9" />
                {/* Cool air waves */}
                <g stroke="#60A5FA" strokeWidth="1.5" opacity="0.6">
                  <path d="M85 115 Q100 125 115 115" fill="none" />
                  <path d="M90 120 Q100 130 110 120" fill="none" />
                </g>
                {/* Furniture - Sofa */}
                <rect x="100" y="170" width="80" height="25" rx="4" fill="#64748B" />
                <rect x="105" y="165" width="70" height="10" rx="3" fill="#475569" />
                {/* Plant */}
                <circle cx="200" cy="160" r="15" fill="#10B981" opacity="0.7" />
                <rect x="197" y="170" width="6" height="20" rx="2" fill="#94A3B8" />
                {/* Window */}
                <rect x="180" y="70" width="40" height="50" rx="2" fill="#DBEAFE" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="200" y1="70" x2="200" y2="120" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="180" y1="95" x2="220" y2="95" stroke="#CBD5E1" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight">
              Everything Your AC<br />
              Could Ever Need
            </h2>
            <p className="text-neutral-600 text-lg mb-10 max-w-md">
              From sudden breakdowns to seasonal checkups — we handle it all. Explore our expert AC services designed to get your cool back.
            </p>

            {/* Services Accordion */}
            <div className="border-t border-neutral-200">
              {services.map((service, index) => (
                <div key={service.title} className="border-b border-neutral-200">
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className={`text-lg font-medium transition-colors ${
                      activeIndex === index ? 'text-neutral-black' : 'text-neutral-600'
                    }`}>
                      {service.title}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      activeIndex === index
                        ? 'bg-secondary text-white'
                        : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </button>
                  {activeIndex === index && (
                    <div className="pb-5 pr-14">
                      <p className="text-neutral-600 mb-4">{service.description}</p>
                      <Link
                        href={service.href}
                        className="text-secondary font-medium hover:underline inline-flex items-center gap-1"
                      >
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
