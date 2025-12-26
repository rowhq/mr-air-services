import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  services: [
    { name: 'AC Repair', href: '/services/air-conditioning-repair' },
    { name: 'Tune-Ups', href: '/services/air-conditioning-tune-ups' },
    { name: 'Heating', href: '/services/heating' },
  ],
  company: [
    { name: 'Contact', href: '/contact' },
    { name: 'Financing', href: '/financing-payments' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-950 dark:bg-neutral-950">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        {/* Logo & Description */}
        <div className="mb-10">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/logo-white.svg"
              alt="Mr. Air Services"
              width={120}
              height={28}
              className="h-7 w-auto opacity-80"
            />
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Professional HVAC service for the Greater Houston area. Quality work, fair prices, guaranteed satisfaction.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Services */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+18324371000"
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  (832) 437-1000
                </a>
              </li>
              <li>
                <span className="text-xs text-neutral-500">
                  Houston, TX
                </span>
              </li>
              <li>
                <span className="text-xs text-neutral-500">
                  Mon–Fri 8AM–5PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Line with Veteran Badge */}
      <div className="border-t border-neutral-800/50">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Veteran Owned Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800/60 rounded-lg border border-neutral-700/50">
              <span className="text-2xl" role="img" aria-label="US Flag">🇺🇸</span>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Veteran Owned</p>
                <p className="text-xs text-neutral-400">US Military</p>
              </div>
            </div>
            <span className="hidden sm:inline text-neutral-700">·</span>
            <p className="text-[11px] text-neutral-500">
              Licensed & Insured · Serving Greater Houston
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800/50">
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-neutral-600">
              © {new Date().getFullYear()} Mr. Air Services, LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/privacy-policy" className="text-neutral-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-neutral-700">|</span>
              <Link href="/terms-of-use" className="text-neutral-500 hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
