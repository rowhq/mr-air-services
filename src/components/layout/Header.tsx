'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button, ThemeToggle } from '@/components/ui';
import type { SiteDataProps } from '@/types/site-config';

// Service icons mapping - expanded library (18 icons)
const serviceIcons: Record<string, ReactNode> = {
  // HVAC Principal
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
  // Servicios
  'snowflake': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M8 12l4-4 4 4M12 16l-4-4 4-4" />
    </svg>
  ),
  'thermometer': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
    </svg>
  ),
  'fan': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12c-2-2.96-6-2.5-6 1.5 0 2.76 2 5 4 5.5m2-7c2.96-2 2.5-6-1.5-6-2.76 0-5 2-5.5 4m7 2c2 2.96 6 2.5 6-1.5 0-2.76-2-5-4-5.5m-2 7c-2.96 2-2.5 6 1.5 6 2.76 0 5-2 5.5-4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  'droplets': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  'wind': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  // Tipo de Servicio
  'home': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  'building': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M9 21V6a1 1 0 011-1h4a1 1 0 011 1v15M5 21V11a1 1 0 011-1h2M17 21V11a1 1 0 011 1h2M12 9h.01M12 12h.01M12 15h.01" />
    </svg>
  ),
  'clock': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
    </svg>
  ),
  'zap': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  // Calidad
  'shield': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'check-circle': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
  'star': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  'award': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} cx="12" cy="8" r="7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  // Herramientas
  'wrench': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  'settings': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} cx="12" cy="12" r="3" />
    </svg>
  ),
  'tools': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 21v-5l6-6" />
    </svg>
  ),
  // Default fallback
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
              {navigationItems.map((item) => {
                const isActive = item.children
                  ? pathname === item.href || pathname.startsWith(item.href + '/')
                  : pathname === item.href;

                return item.children ? (
                  <div
                    key={item.name}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setServicesMenuOpen(false)}
                      className={`flex items-center gap-1.5 transition-colors py-2 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-white/90 hover:text-white font-medium'
                      }`}
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
                    className={`transition-colors ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-white/90 hover:text-white font-medium'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
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
