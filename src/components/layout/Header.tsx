'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button, ThemeToggle } from '@/components/ui';
import type { SiteDataProps } from '@/types/site-config';

// Service icons mapping (same as ServicesOverview for consistency)
const serviceIcons: Record<string, ReactNode> = {
  'ac-repair': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  'tune-up': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'heating': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  'default': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

function getServiceIcon(iconKey: string): ReactNode {
  return serviceIcons[iconKey] || serviceIcons['default'];
}

interface HeaderProps {
  siteData: SiteDataProps;
}

export function Header({ siteData }: HeaderProps) {
  const { config, navigation, services } = siteData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get header navigation items
  const headerNavItems = navigation
    .filter((item) => item.location === 'header' && item.is_visible)
    .sort((a, b) => a.position - b.position);

  // Get featured services for mega menu
  const featuredServices = services
    .filter((service) => service.is_featured && service.is_published)
    .sort((a, b) => a.position - b.position);

  // Build navigation structure with services as children
  const buildNavigation = () => {
    const navItems: Array<{ name: string; href: string; children?: Array<{ name: string; href: string }> }> = [];

    headerNavItems.forEach((item) => {
      if (item.label === 'Services' || item.href === '/services') {
        navItems.push({
          name: item.label,
          href: item.href,
          children: featuredServices.map((service) => ({
            name: service.title,
            href: `/services/${service.slug}`,
          })),
        });
      } else {
        navItems.push({
          name: item.label,
          href: item.href,
        });
      }
    });

    return navItems;
  };

  const navigationItems = buildNavigation();

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Detect scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && servicesMenuOpen) {
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [servicesMenuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Hover handlers with delays
  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(true);
    }, 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 200);
  }, []);

  // Format phone for tel: link
  const phoneLink = `tel:+1${config.company.phone.replace(/\D/g, '')}`;

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? 'bg-neutral-900/70 shadow-lg shadow-black/10 border-b border-white/5'
          : 'bg-neutral-900/40'
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
          <span className="flex items-center gap-2 text-white font-medium text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            US MILITARY VETERAN OWNED & OPERATED
          </span>

          <div className="flex items-center gap-6 text-sm text-white/70">
            <a
              href={phoneLink}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {config.company.phone}
            </a>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {config.hours.weekday}
            </span>
          </div>
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
                alt={config.company.name}
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
              {navigationItems.map((item) => (
                item.children ? (
                  <div
                    key={item.name}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setServicesMenuOpen(false)}
                      className="flex items-center gap-1.5 text-white/90 hover:text-white font-medium transition-colors py-2"
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${servicesMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/90 hover:text-white font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Right Side - CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link href="/docs" className="hidden lg:block text-white/60 hover:text-white text-sm transition-colors">
                Docs
              </Link>
              <ThemeToggle />
              <Link href="/contact" className="hidden sm:block">
                <Button variant="primary" size="md">
                  Book a Repair
                </Button>
              </Link>

              <button
                type="button"
                className="lg:hidden p-3 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
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
      </nav>
    </header>

    {/* Services Mega Menu Dropdown - OUTSIDE header for proper backdrop-blur */}
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ease-out bg-neutral-900/40 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10 ${
        servicesMenuOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
      }`}
      style={{ top: scrolled ? '56px' : '100px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 -z-10"
        onClick={() => setServicesMenuOpen(false)}
      />

        {/* Menu Content */}
        <div>
          <div className="container pt-8 pb-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredServices.map((service) => {
                    const serviceHref = `/services/${service.slug}`;
                    const isActive = pathname === serviceHref;
                    return (
                      <Link
                        key={service.id}
                        href={serviceHref}
                        onClick={() => setServicesMenuOpen(false)}
                        className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                          isActive
                            ? 'bg-white/20 border-white/40'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="text-white mb-3">
                          {getServiceIcon(service.icon)}
                        </div>
                        <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                        <p className="text-white/50 group-hover:text-white/80 text-sm leading-snug mb-2 transition-colors">{service.short_description}</p>
                        <div className={`flex items-center text-white/70 text-sm font-medium transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <span>{isActive ? 'Currently viewing' : 'Learn more'}</span>
                          {!isActive && (
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-gradient-to-b from-hero-start to-hero-end z-50">
          <div className="container py-4">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo-white.svg"
                  alt={config.company.name}
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

            <nav className="space-y-1">
              {navigationItems.map((item) => (
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

            <div className="mt-8 space-y-4">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth size="lg">
                  Book a Repair
                </Button>
              </Link>
              <a
                href={phoneLink}
                className="flex items-center justify-center gap-2 py-3 text-white font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {config.company.phone}
              </a>
              <p className="text-center text-white/70 text-sm">
                {config.hours.weekday}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
