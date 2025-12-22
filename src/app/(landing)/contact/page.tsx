'use client';

import { useState } from 'react';
import { Button, Input, Select, Textarea, Breadcrumbs } from '@/components/ui';

const serviceTypes = [
  { value: 'ac-repair', label: 'AC Repair' },
  { value: 'ac-tune-up', label: 'AC Tune-Up' },
  { value: 'heating', label: 'Heating Service' },
  { value: 'new-installation', label: 'New Installation' },
  { value: 'maintenance', label: 'Maintenance Plan' },
  { value: 'other', label: 'Other' },
];

const preferredTimes = [
  { value: 'morning', label: 'Morning (8AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'flexible', label: 'Flexible' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center bg-white dark:bg-neutral-900 rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-hero-start to-hero-end rounded-full flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-4">
              Message Sent!
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Thank you for contacting Mr. Air Services. We'll respond to your inquiry within 24 hours. For immediate assistance, please call us.
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
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <div className="max-w-3xl">
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">Get In Touch</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Have questions or need service? We're here to help. Reach out by phone, email, or fill out the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Contact Info</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-neutral-black dark:text-white mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: 'Phone',
                    content: (
                      <a href="tel:+18324371000" className="text-secondary font-semibold hover:underline">
                        (832) 437-1000
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: 'Email',
                    content: (
                      <a href="mailto:coolsavertuneups@mrairservices.com" className="text-secondary font-semibold hover:underline">
                        coolsavertuneups@mrairservices.com
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: 'Hours',
                    content: (
                      <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Mon–Fri: 8:00 AM – 5:00 PM<br />
                        Sat: By appointment<br />
                        Sun: Closed
                      </div>
                    ),
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: 'Service Area',
                    content: (
                      <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Greater Houston Area
                      </div>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-black dark:text-white mb-1">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 md:p-10">
                {/* Section Label */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Send Message</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-neutral-black dark:text-white mb-8">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Service Needed"
                      options={serviceTypes}
                      placeholder="Select a service"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    />
                    <Select
                      label="Preferred Time"
                      options={preferredTimes}
                      placeholder="Select a time"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    />
                  </div>
                  <Textarea
                    label="Message"
                    required
                    placeholder="Tell us about your HVAC needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button type="submit" variant="secondary" size="lg" loading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-hero-start to-hero-end relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5"></div>

        <div className="container relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6">
            Need Emergency Service?
          </h2>
          <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            AC emergency? Don't sweat it. Call us now for same-day service.
          </p>
          <a href="tel:+18324371000">
            <Button variant="secondary" size="lg">
              Call (832) 437-1000 Now
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
