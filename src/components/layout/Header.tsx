'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Air Conditioning Repair', href: '/services/air-conditioning-repair' },
      { name: 'Air Conditioning Tune-Ups', href: '/services/air-conditioning-tune-ups' },
      { name: 'Heating', href: '/services/heating' },
      { name: 'Maintenance Plans', href: '/services/maintenance-plans' },
    ],
  },
  { name: 'Free AC Tune-Up', href: '/free-ac-tune-up' },
  { name: 'Financing', href: '/financing-payments' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Snowflake/AC Logo Icon
function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2v28M16 2l-4 4M16 2l4 4M16 30l-4-4M16 30l4-4M2 16h28M2 16l4-4M2 16l4 4M30 16l-4-4M30 16l-4 4M6.1 6.1l19.8 19.8M6.1 6.1l1.4 5.5M6.1 6.1l5.5 1.4M25.9 25.9l-1.4-5.5M25.9 25.9l-5.5-1.4M25.9 6.1L6.1 25.9M25.9 6.1l-5.5 1.4M25.9 6.1l-1.4 5.5M6.1 25.9l5.5-1.4M6.1 25.9l1.4-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main Navigation - Minimalista */}
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu & Language */}
          <div className="flex items-center gap-2">
            {/* Mobile/Tablet Menu Button */}
            <button
              type="button"
              className="p-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Language Selector - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <span className="font-medium">EN</span>
              <span className="opacity-60">/</span>
              <span className="opacity-60">ES</span>
            </div>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <LogoIcon className="w-7 h-7" />
            <span className="text-xl font-semibold hidden sm:inline">Mr. Air Services</span>
          </Link>

          {/* Right Side - Phone & CTA */}
          <div className="flex items-center gap-2">
            {/* Phone */}
            <a
              href="tel:+18324371000"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (832) 437-1000
            </a>

            {/* CTA Button */}
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Book a Repair
              </Button>
            </Link>
          </div>
        </div>

        {/* Full Screen Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gradient-to-b from-hero-start to-hero-end z-50">
            <div className="container py-4">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2 text-white" onClick={() => setMobileMenuOpen(false)}>
                  <LogoIcon className="w-7 h-7" />
                  <span className="text-xl font-semibold">Mr. Air Services</span>
                </Link>
                <button
                  type="button"
                  className="p-2 text-white bg-white/20 rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="w-full flex items-center justify-between py-3 text-white text-lg font-medium border-b border-white/20"
                        >
                          {item.name}
                          <svg
                            className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {servicesOpen && (
                          <div className="pl-4 py-2 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block py-2 text-white/80 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-white text-lg font-medium border-b border-white/20"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 space-y-4">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth size="lg">
                    Book a Repair
                  </Button>
                </Link>
                <a
                  href="tel:+18324371000"
                  className="flex items-center justify-center gap-2 py-3 text-white font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (832) 437-1000
                </a>
                <p className="text-center text-white/70 text-sm">
                  Mon–Fri: 8AM–5PM
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
