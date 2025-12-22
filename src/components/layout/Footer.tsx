import Link from 'next/link';
import Image from 'next/image';
import { officeLocations } from '@/data/officeLocations';

const footerLinks = {
  services: [
    { name: 'Air Conditioning Repair', href: '/services/air-conditioning-repair' },
    { name: 'Air Conditioning Tune-Ups', href: '/services/air-conditioning-tune-ups' },
    { name: 'Heating', href: '/services/heating' },
    { name: 'Maintenance Plans', href: '/services/maintenance-plans' },
  ],
  company: [
    { name: 'Contact', href: '/contact' },
    { name: 'Financing', href: '/financing-payments' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-black text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-white.svg"
                alt="Mr. Air Services"
                width={160}
                height={37}
                className="h-8 w-auto"
              />
            </Link>
            {/* Veteran Badge */}
            <div className="flex items-center gap-2 text-white text-sm font-medium mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              US Military Veteran Owned & Operated
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Your trusted HVAC experts serving the Greater Houston area. Professional service, quality workmanship, and customer satisfaction guaranteed.
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
                href="mailto:coolsavertuneups@mrairservices.com"
                className="flex items-center gap-3 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                coolsavertuneups@mrairservices.com
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
            <h3 className="text-lg font-semibold text-white mb-4">Our Locations</h3>
            <div className="space-y-3">
              {officeLocations.map((office) => (
                <div key={office.name} className="text-neutral-400 text-sm">
                  <span className="text-white font-medium">{office.name}</span>
                  <p className="text-xs mt-0.5">{office.address}</p>
                </div>
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
