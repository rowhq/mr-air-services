'use client';

import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, ThemeToggle } from '@/components/ui';

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
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Services data for mega menu
const servicesData = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 26V12l10-8 10 8v14a2 2 0 01-2 2H8a2 2 0 01-2-2z" strokeLinejoin="round" />
        <path d="M16 14v6M13 17h6" strokeLinecap="round" />
      </svg>
    ),
    name: 'AC Repair',
    description: 'Fast, reliable repairs when you need them most.',
    href: '/services/air-conditioning-repair',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4v24M16 4l-3 3M16 4l3 3M16 28l-3-3M16 28l3-3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="6" />
        <path d="M16 10v12" strokeLinecap="round" />
      </svg>
    ),
    name: 'Heating',
    description: 'Stay warm all winter with expert heating service.',
    href: '/services/heating',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6l-2-2M24 6l2-2" strokeLinecap="round" />
      </svg>
    ),
    name: 'AC Tune-Ups',
    description: 'Keep your AC running at peak efficiency.',
    href: '/services/air-conditioning-tune-ups',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="20" height="20" rx="2" />
        <path d="M6 12h20M12 6v20" strokeLinecap="round" />
        <path d="M16 16l2 2M16 22l2 2" strokeLinecap="round" />
      </svg>
    ),
    name: 'Maintenance Plans',
    description: 'Save money with scheduled preventive care.',
    href: '/services/maintenance-plans',
  },
];

// Service Card Component
const ServiceCard = forwardRef<HTMLAnchorElement, {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}>(({ icon, name, description, href, onKeyDown }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      onKeyDown={onKeyDown}
      className="group p-4 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
    >
      <div className="text-secondary mb-3">{icon}</div>
      <h4 className="text-white font-semibold mb-1.5">{name}</h4>
      <p className="text-white/60 text-sm leading-relaxed mb-2">{description}</p>
      <span className="text-secondary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Services Mega Menu Component
function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // All focusable items: 4 service cards + phone link + CTA button
  const totalItems = servicesData.length + 2;

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < servicesData.length) {
      itemRefs.current[focusedIndex]?.focus();
    } else if (focusedIndex === servicesData.length) {
      phoneRef.current?.focus();
    } else if (focusedIndex === servicesData.length + 1) {
      ctaRef.current?.focus();
    }
  }, [focusedIndex]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(0);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    }
  };

  const handleItemKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + totalItems) % totalItems);
        break;
      case 'ArrowRight':
        e.preventDefault();
        // Move to next column (add 2 for 2-column grid)
        if (index < servicesData.length - 1) {
          const nextIndex = index + 2;
          setFocusedIndex(nextIndex < servicesData.length ? nextIndex : servicesData.length);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        // Move to previous column
        if (index >= 2) {
          setFocusedIndex(index - 2);
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(totalItems - 1);
        break;
      case 'Tab':
        if (e.shiftKey && index === 0) {
          setIsOpen(false);
          setFocusedIndex(-1);
        } else if (!e.shiftKey && index === totalItems - 1) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  }, [totalItems]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 text-white/90 hover:text-white font-medium transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-2 -mx-2"
      >
        Services
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="menu"
        aria-label="Services menu"
      >
        <div className="bg-slate-900/98 backdrop-blur-sm rounded-lg border border-white/10 p-6 shadow-xl w-[720px]">
          <div className="grid grid-cols-3 gap-6">
            {/* Services Grid - 2 columns */}
            <div className="col-span-2 grid grid-cols-2 gap-2" role="group" aria-label="Our services">
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={service.name}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  {...service}
                />
              ))}
            </div>

            {/* Quick Action Panel */}
            <div className="bg-slate-800/50 rounded-lg p-5 border border-white/10 flex flex-col">
              <h4 className="text-white font-semibold mb-2">Need help now?</h4>
              <p className="text-white/60 text-sm mb-4">
                Our technicians are ready to help with any HVAC emergency.
              </p>

              {/* Phone */}
              <a
                ref={phoneRef}
                href="tel:+18324371000"
                onKeyDown={(e) => handleItemKeyDown(e, servicesData.length)}
                className="flex items-center gap-3 text-white font-bold text-lg mb-3 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-lg transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                (832) 437-1000
              </a>

              {/* Badge */}
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-white" />
                Same-day service available
              </div>

              {/* CTA Button */}
              <Link
                ref={ctaRef}
                href="/contact"
                onKeyDown={(e) => handleItemKeyDown(e, servicesData.length + 1)}
                onClick={() => setIsOpen(false)}
                className="mt-auto"
              >
                <Button variant="primary" size="sm" fullWidth>
                  Book Emergency Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/85 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Bar - Solo desktop - Hidden when scrolled */}
      <div
        className={`hidden lg:block transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
        }`}
      >
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-6 text-sm text-white/70">
            {/* Veteran Badge */}
            <span className="flex items-center gap-2 text-white font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              US MILITARY VETERAN OWNED & OPERATED
            </span>
            <span className="w-px h-4 bg-white/20" />
            <a
              href="tel:+18324371000"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (832) 437-1000
            </a>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Fri: 8AM-5PM
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-transparent">
        <div className={`container transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
          <div className="flex items-center justify-between">
            {/* Left Side - Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.svg"
                alt="Mr. Air Services"
                width={180}
                height={42}
                className={`w-auto text-white transition-all duration-300 ${
                  scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'
                }`}
                priority
              />
            </Link>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <ServicesMegaMenu />
              <Link
                href="/free-ac-tune-up"
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Free AC Tune-Up
              </Link>
              <Link
                href="/financing-payments"
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Financing
              </Link>
              <Link
                href="/reviews"
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Side - CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Mobile Theme Toggle */}
              <div className="lg:hidden">
                <ThemeToggle />
              </div>

              {/* CTA Button */}
              <Link href="/contact" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  Book a Repair
                </Button>
              </Link>

              {/* Mobile/Tablet Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
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
            </div>
          </div>
        </div>

        {/* Full Screen Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gradient-to-b from-hero-start to-hero-end z-50">
            <div className="container py-4">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/logo-white.svg"
                    alt="Mr. Air Services"
                    width={160}
                    height={37}
                    className="h-8 w-auto"
                  />
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
                  Mon-Fri: 8AM-5PM
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
