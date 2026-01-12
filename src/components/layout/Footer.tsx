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
