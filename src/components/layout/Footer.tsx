import Link from 'next/link';
import Image from 'next/image';
import type { SiteDataProps, NavigationItem, ServiceItem } from '@/types/site-config';

interface FooterProps {
  siteData: SiteDataProps;
}

export function Footer({ siteData }: FooterProps) {
  const { config, navigation, services, primaryLocation } = siteData;

  // Get footer navigation items
  const footerNavItems = navigation
    .filter((item) => item.location === 'footer' && item.is_visible)
    .sort((a, b) => a.position - b.position);

  // Group footer items by type
  const serviceLinks = services
    .filter((s) => s.is_published)
    .slice(0, 3)
    .map((service) => ({
      name: service.title,
      href: `/services/${service.slug}`,
    }));

  const companyLinks = footerNavItems
    .filter((item) => !item.href.includes('privacy') && !item.href.includes('terms') && !item.href.includes('services'))
    .map((item) => ({
      name: item.label,
      href: item.href,
    }));

  const legalLinks = footerNavItems
    .filter((item) => item.href.includes('privacy') || item.href.includes('terms'))
    .map((item) => ({
      name: item.label,
      href: item.href,
    }));

  // Format phone for tel: link
  const phoneLink = `tel:+1${config.company.phone.replace(/\D/g, '')}`;

  // Get location info
  const locationCity = primaryLocation ? `${primaryLocation.city}, ${primaryLocation.state}` : 'Houston, TX';

  return (
    <footer className="bg-neutral-950">
      {/* Main Footer */}
      <div className="container py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt={config.company.name}
                width={160}
                height={38}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-neutral-400 leading-relaxed mb-8 max-w-md">
              {config.company.tagline || 'Professional HVAC service for the Greater Houston area. Quality work, fair prices, guaranteed satisfaction.'}
            </p>

            {/* Veteran Owned Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-neutral-900 rounded-xl border border-neutral-800">
              <span className="text-3xl" role="img" aria-label="US Flag">🇺🇸</span>
              <div>
                <p className="font-semibold text-white">Veteran Owned</p>
                <p className="text-sm text-neutral-400">US Military</p>
              </div>
            </div>

            {/* Social Links */}
            {(config.social.facebook || config.social.instagram || config.social.twitter || config.social.youtube) && (
              <div className="flex items-center gap-4 mt-6">
                {config.social.facebook && (
                  <a
                    href={config.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {config.social.instagram && (
                  <a
                    href={config.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {config.social.twitter && (
                  <a
                    href={config.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {config.social.youtube && (
                  <a
                    href={config.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Services
                </h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {companyLinks.length > 0 ? (
                    companyLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    // Fallback if no navigation items
                    <>
                      <li>
                        <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/financing-payments" className="text-sm text-neutral-400 hover:text-white transition-colors">
                          Financing
                        </Link>
                      </li>
                      <li>
                        <Link href="/pay-invoice" className="text-sm text-neutral-400 hover:text-white transition-colors">
                          Pay Invoice
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Contact */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={phoneLink}
                      className="text-sm text-neutral-400 hover:text-white transition-colors font-medium"
                    >
                      {config.company.phone}
                    </a>
                  </li>
                  {config.company.email && (
                    <li>
                      <a
                        href={`mailto:${config.company.email}`}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {config.company.email}
                      </a>
                    </li>
                  )}
                  <li className="text-sm text-neutral-500">
                    {locationCity}
                  </li>
                  <li className="text-sm text-neutral-500">
                    {config.hours.weekday}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} {config.company.name}, LLC
              </p>
              <span className="hidden sm:inline text-neutral-700">·</span>
              <p className="text-sm text-neutral-600">
                Licensed & Insured
              </p>
            </div>
            <div className="flex items-center gap-6">
              {legalLinks.length > 0 ? (
                legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                // Fallback
                <>
                  <Link href="/privacy-policy" className="text-sm text-neutral-500 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-use" className="text-sm text-neutral-500 hover:text-white transition-colors">
                    Terms of Use
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
