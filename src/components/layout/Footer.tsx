import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'Air Conditioning Repair', href: '/services/air-conditioning-repair' },
    { name: 'Air Conditioning Tune-Ups', href: '/services/air-conditioning-tune-ups' },
    { name: 'Heating', href: '/services/heating' },
    { name: 'Maintenance Plans', href: '/services/maintenance-plans' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
    { name: 'Free AC Tune-Up', href: '/free-ac-tune-up' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
  ],
};

const areasServed = ['Houston', 'Missouri City', 'Spring', 'Katy', 'Sugar Land', 'Pearland'];

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

export function Footer() {
  return (
    <footer className="bg-neutral-black text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <LogoIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold">Mr. Air Services</span>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Your trusted HVAC experts in the Greater Houston area. Professional service, quality workmanship, and customer satisfaction guaranteed.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+18324371000"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                (832) 437-1000
              </a>
              <a
                href="mailto:info@mrairservices.com"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                info@mrairservices.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Areas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Hours</h3>
            <ul className="space-y-2 text-neutral-400 mb-8">
              <li className="flex justify-between">
                <span>Mon–Fri</span>
                <span>8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>By appointment</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white mb-4">Areas Served</h3>
            <div className="flex flex-wrap gap-2">
              {areasServed.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 text-sm text-neutral-400 bg-white/5 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Mr. Air Services. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-500 hover:text-white text-sm transition-colors"
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
