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
    { name: 'Pay Invoice', href: '/pay-invoice' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
  ],
};

export function Footer() {
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
                alt="Mr. Air Services"
                width={160}
                height={38}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-neutral-400 leading-relaxed mb-8 max-w-md">
              Professional HVAC service for the Greater Houston area. Quality work, fair prices, guaranteed satisfaction.
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
                  {footerLinks.services.map((link) => (
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
                  {footerLinks.company.map((link) => (
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

              {/* Contact */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="tel:+18324371000"
                      className="text-sm text-neutral-400 hover:text-white transition-colors font-medium"
                    >
                      (832) 437-1000
                    </a>
                  </li>
                  <li className="text-sm text-neutral-500">
                    Houston, TX
                  </li>
                  <li className="text-sm text-neutral-500">
                    Mon–Fri 8AM–5PM
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
                © {new Date().getFullYear()} Mr. Air Services, LLC
              </p>
              <span className="hidden sm:inline text-neutral-700">·</span>
              <p className="text-sm text-neutral-600">
                Licensed & Insured
              </p>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
