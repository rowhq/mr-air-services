import Link from 'next/link';
import Image from 'next/image';
import { officeLocations, getFullAddress, OfficeLocation } from '@/data/officeLocations';

const getDirectionsUrl = (office: OfficeLocation) => {
  const address = encodeURIComponent(getFullAddress(office));
  return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
};

const footerLinks = {
  services: [
    { name: 'AC Repair', href: '/services/air-conditioning-repair' },
    { name: 'CoolSaver Tune-Ups', href: '/services/air-conditioning-tune-ups' },
    { name: 'Heating', href: '/services/heating' },
  ],
  company: [
    { name: 'Contact', href: '/contact' },
    { name: 'Financing', href: '/financing-payments' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-white.svg"
                alt="Mr. Air Services"
                width={160}
                height={37}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Professional HVAC service for the Greater Houston area. Quality work, fair prices, guaranteed satisfaction.
            </p>
            {/* Veteran Badge - Prominent */}
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
              <svg className="w-8 h-6 flex-shrink-0" viewBox="0 0 60 42" fill="none">
                <rect width="60" height="42" fill="#B22234"/>
                <rect y="3.23" width="60" height="3.23" fill="white"/>
                <rect y="9.69" width="60" height="3.23" fill="white"/>
                <rect y="16.15" width="60" height="3.23" fill="white"/>
                <rect y="22.62" width="60" height="3.23" fill="white"/>
                <rect y="29.08" width="60" height="3.23" fill="white"/>
                <rect y="35.54" width="60" height="3.23" fill="white"/>
                <rect width="24" height="22.62" fill="#3C3B6E"/>
                <g fill="white">
                  <circle cx="4" cy="3" r="1.2"/><circle cx="8" cy="3" r="1.2"/><circle cx="12" cy="3" r="1.2"/><circle cx="16" cy="3" r="1.2"/><circle cx="20" cy="3" r="1.2"/>
                  <circle cx="6" cy="5.5" r="1.2"/><circle cx="10" cy="5.5" r="1.2"/><circle cx="14" cy="5.5" r="1.2"/><circle cx="18" cy="5.5" r="1.2"/>
                  <circle cx="4" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12" cy="8" r="1.2"/><circle cx="16" cy="8" r="1.2"/><circle cx="20" cy="8" r="1.2"/>
                  <circle cx="6" cy="10.5" r="1.2"/><circle cx="10" cy="10.5" r="1.2"/><circle cx="14" cy="10.5" r="1.2"/><circle cx="18" cy="10.5" r="1.2"/>
                  <circle cx="4" cy="13" r="1.2"/><circle cx="8" cy="13" r="1.2"/><circle cx="12" cy="13" r="1.2"/><circle cx="16" cy="13" r="1.2"/><circle cx="20" cy="13" r="1.2"/>
                  <circle cx="6" cy="15.5" r="1.2"/><circle cx="10" cy="15.5" r="1.2"/><circle cx="14" cy="15.5" r="1.2"/><circle cx="18" cy="15.5" r="1.2"/>
                  <circle cx="4" cy="18" r="1.2"/><circle cx="8" cy="18" r="1.2"/><circle cx="12" cy="18" r="1.2"/><circle cx="16" cy="18" r="1.2"/><circle cx="20" cy="18" r="1.2"/>
                  <circle cx="6" cy="20.5" r="1.2"/><circle cx="10" cy="20.5" r="1.2"/><circle cx="14" cy="20.5" r="1.2"/><circle cx="18" cy="20.5" r="1.2"/>
                </g>
              </svg>
              <div>
                <div className="text-white text-sm font-semibold">Veteran Owned</div>
                <div className="text-neutral-400 text-xs">US Military</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <svg className="w-3 h-3 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mt-8 mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <svg className="w-3 h-3 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold mb-6">Locations</h3>
            <div className="space-y-4">
              {officeLocations.map((office) => (
                <a
                  key={office.name}
                  href={getDirectionsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 -mx-3 rounded-lg hover:bg-neutral-800 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div>
                      <div className="text-white text-sm font-medium group-hover:text-secondary transition-colors">
                        {office.name}
                      </div>
                      <div className="text-neutral-500 text-xs mt-0.5">
                        {office.address}
                      </div>
                    </div>
                    <svg className="w-3 h-3 text-neutral-600 group-hover:text-secondary ml-auto mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Hours</h3>
            <div className="space-y-2 text-sm mb-8">
              <div className="flex justify-between text-neutral-400">
                <span>Mon – Fri</span>
                <span className="text-white">8 AM – 5 PM</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Saturday</span>
                <span className="text-neutral-500">By appointment</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Sunday</span>
                <span className="text-neutral-500">Closed</span>
              </div>
            </div>

            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="tel:+18324371000"
                className="flex items-center gap-3 text-neutral-400 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (832) 437-1000
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-3 text-neutral-400 hover:text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send us a message
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-neutral-800">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-neutral-500 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Licensed & Insured
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              4.9/5 Rating
            </span>
            <span>Serving Greater Houston</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-neutral-600">
              © {new Date().getFullYear()} Mr. Air Services, LLC
            </p>
            <div className="flex gap-6 text-neutral-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-use" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
