'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

// SVG Icons for services
const ServiceIcons = {
  'ac-repair': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
    </svg>
  ),
  'ac-tune-up': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'heating': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  'new-installation': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'maintenance': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  'other': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

const serviceOptions = [
  { id: 'ac-repair', label: 'AC Repair' },
  { id: 'ac-tune-up', label: 'AC Tune-Up' },
  { id: 'heating', label: 'Heating' },
  { id: 'new-installation', label: 'Installation' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'other', label: 'Other' },
];

function getIsOpen(): { isOpen: boolean; statusText: string } {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
    return { isOpen: true, statusText: 'Open Now' };
  }
  if (day === 6) {
    return { isOpen: false, statusText: 'By Appointment' };
  }
  return { isOpen: false, statusText: 'Closed' };
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    services: [] as string[],
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openStatus, setOpenStatus] = useState({ isOpen: false, statusText: 'Closed' });

  useEffect(() => {
    setMounted(true);
    setOpenStatus(getIsOpen());
    const interval = setInterval(() => setOpenStatus(getIsOpen()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const isFieldActive = (field: string, value: string) => focusedField === field || value.length > 0;

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center bg-white dark:bg-neutral-900">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-12 shadow-xl border border-neutral-100 dark:border-neutral-700">
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-4">
              Message Sent!
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Thank you for contacting Mr. Air Services. We'll respond within 24 hours.
            </p>
            <a href="tel:+18324371000">
              <Button variant="secondary" size="lg">
                Call (832) 437-1000
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 bg-white dark:bg-neutral-900">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Title & Contact Info */}
          <div className={`lg:pt-8 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
              Let's Get In<br />Touch
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md leading-relaxed">
              Need HVAC service? We're here to help. Fill out the form or contact us directly.
            </p>

            {/* Trust Signals - SVG Icons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-full border border-neutral-100 dark:border-neutral-700">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">4.9 Google Rating</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-full border border-neutral-100 dark:border-neutral-700">
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Veteran Owned</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-full border border-neutral-100 dark:border-neutral-700">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Licensed & Insured</span>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <a
                href="tel:+18324371000"
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-secondary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Call Us</p>
                  <p className="text-xl font-bold text-neutral-black dark:text-white group-hover:text-secondary transition-colors">(832) 437-1000</p>
                </div>
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="mailto:info@mrairservices.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-secondary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Email Us</p>
                  <p className="text-lg font-bold text-neutral-black dark:text-white group-hover:text-secondary transition-colors truncate">info@mrairservices.com</p>
                </div>
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
                <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Business Hours</p>
                  <p className="font-semibold text-neutral-black dark:text-white">Mon–Fri: 8AM – 5PM</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Sat: By appointment</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  openStatus.isOpen
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : openStatus.statusText === 'By Appointment'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                    openStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-neutral-400'
                  }`}></span>
                  {openStatus.statusText}
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="mt-8 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-neutral-black dark:text-white">Service Area</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Greater Houston Area</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Houston', 'Katy', 'Sugar Land', 'Pearland', 'The Woodlands'].map((area) => (
                  <span key={area} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-sm text-neutral-600 dark:text-neutral-400">
                    {area}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm text-secondary font-medium">
                  +20 more
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className={`transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 md:p-10 border border-neutral-100 dark:border-neutral-700">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-2">Send a Message</h2>
                <p className="text-neutral-500 dark:text-neutral-400">We'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full pl-14 pr-5 pt-6 pb-2 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-black dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-14 transition-all duration-200 pointer-events-none ${
                        isFieldActive('name', formData.name)
                          ? 'top-2 text-xs text-secondary'
                          : 'top-1/2 -translate-y-1/2 text-neutral-400'
                      }`}
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full pl-14 pr-5 pt-6 pb-2 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-black dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-14 transition-all duration-200 pointer-events-none ${
                        isFieldActive('email', formData.email)
                          ? 'top-2 text-xs text-secondary'
                          : 'top-1/2 -translate-y-1/2 text-neutral-400'
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Phone & Preferred Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full pl-14 pr-5 pt-6 pb-2 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-black dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                    />
                    <label
                      htmlFor="phone"
                      className={`absolute left-14 transition-all duration-200 pointer-events-none ${
                        isFieldActive('phone', formData.phone)
                          ? 'top-2 text-xs text-secondary'
                          : 'top-1/2 -translate-y-1/2 text-neutral-400'
                      }`}
                    >
                      Phone Number
                    </label>
                  </div>

                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      onFocus={() => setFocusedField('preferredTime')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-14 pr-10 pt-6 pb-2 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all appearance-none cursor-pointer ${
                        formData.preferredTime ? 'text-neutral-black dark:text-white' : 'text-neutral-400'
                      }`}
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <label
                      htmlFor="preferredTime"
                      className="absolute left-14 top-2 text-xs text-secondary pointer-events-none"
                    >
                      Preferred Time
                    </label>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Services - 2 Column Grid with SVG Icons */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    Services Needed
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceToggle(service.id)}
                        className={`group flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                          formData.services.includes(service.id)
                            ? 'border-secondary bg-secondary/5'
                            : 'border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:border-secondary/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          formData.services.includes(service.id)
                            ? 'bg-secondary text-white'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:bg-secondary/10 group-hover:text-secondary'
                        }`}>
                          {ServiceIcons[service.id as keyof typeof ServiceIcons]}
                        </div>
                        <span className={`font-medium ${
                          formData.services.includes(service.id)
                            ? 'text-secondary'
                            : 'text-neutral-600 dark:text-neutral-400'
                        }`}>
                          {service.label}
                        </span>
                        {formData.services.includes(service.id) && (
                          <svg className="w-5 h-5 text-secondary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="peer w-full px-5 pt-8 pb-4 rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-black dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all resize-none"
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-5 transition-all duration-200 pointer-events-none ${
                      isFieldActive('message', formData.message)
                        ? 'top-2 text-xs text-secondary'
                        : 'top-4 text-neutral-400'
                    }`}
                  >
                    Tell us about your HVAC needs...
                  </label>
                  <div className="absolute bottom-3 right-4 text-xs text-neutral-400">
                    {formData.message.length}/500
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-secondary hover:bg-secondary-hover text-white font-bold text-lg rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Form
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                  By submitting, you agree to our{' '}
                  <a href="/privacy-policy" className="text-secondary hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
