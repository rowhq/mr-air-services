'use client';

import { useState } from 'react';
import { Button, Input, Select, Textarea, Breadcrumbs } from '@/components/ui';

const serviceAreas = [
  { value: 'greater-houston', label: 'Greater Houston Area' },
  { value: 'missouri-city', label: 'Missouri City' },
  { value: 'spring', label: 'Spring' },
  { value: 'houston-west', label: 'West Houston / Katy Area' },
  { value: 'other', label: 'Other' },
];

const homeTypes = [
  { value: 'single-family', label: 'Single Family Home' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'condo', label: 'Condo' },
  { value: 'other', label: 'Other' },
];

const systemAges = [
  { value: '0-5', label: '0-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '11-15', label: '11-15 years' },
  { value: '15+', label: '15+ years' },
  { value: 'unknown', label: 'Not sure' },
];

export default function FreeACTuneUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    homeType: '',
    systemAge: '',
    comments: '',
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
          <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-hero-start to-hero-end rounded-full flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-black mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              We've received your CoolSaver Program application. One of our team members will review your information and contact you within 24-48 hours to confirm your eligibility and schedule your free AC tune-up.
            </p>
            <p className="text-neutral-600">
              Questions? Call us at{' '}
              <a href="tel:+18324371000" className="text-secondary font-semibold hover:underline">
                (832) 437-1000
              </a>
            </p>
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
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 blur-xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/20 blur-xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative py-20">
          <Breadcrumbs items={[{ label: 'Free AC Tune-Up' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                <span className="text-sm font-medium text-secondary">Limited Time Offer</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
                Free AC Tune-Up for Qualifying Homeowners
              </h1>
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
                Join the CoolSaver Program and receive a complimentary AC tune-up. Keep your system running at peak performance with no obligation.
              </p>
              <ul className="space-y-4">
                {[
                  'Complete 13-point inspection',
                  'Filter replacement included',
                  'No sales pressure, ever',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center w-full lg:w-auto shadow-xl">
                <div className="text-4xl lg:text-6xl font-bold text-secondary mb-1 lg:mb-2">FREE</div>
                <div className="text-lg lg:text-xl text-neutral-700 mb-2 lg:mb-4">AC Tune-Up</div>
                <div className="text-xs lg:text-sm text-neutral-500">For qualifying homeowners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Apply Now</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-neutral-black mb-8">
                Check Your Eligibility
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <Input
                    label="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  label="Street Address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <Select
                  label="City/Area"
                  required
                  options={serviceAreas}
                  placeholder="Select your area"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Home Type"
                    required
                    options={homeTypes}
                    placeholder="Select home type"
                    value={formData.homeType}
                    onChange={(e) => setFormData({ ...formData, homeType: e.target.value })}
                  />
                  <Select
                    label="AC System Age"
                    required
                    options={systemAges}
                    placeholder="Select age"
                    value={formData.systemAge}
                    onChange={(e) => setFormData({ ...formData, systemAge: e.target.value })}
                  />
                </div>
                <Textarea
                  label="Additional Comments (Optional)"
                  placeholder="Let us know if you have any specific concerns about your AC system..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
                <Button type="submit" variant="secondary" size="lg" loading={isSubmitting}>
                  Check My Eligibility
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-neutral-black mb-6">
                  Program Requirements
                </h3>
                <ul className="space-y-4">
                  {[
                    'Homeowner (not renter)',
                    'Located in our service area',
                    'AC system 5+ years old',
                    'First-time program participant',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-neutral-black mb-4">
                  Questions?
                </h3>
                <p className="text-neutral-600 mb-6">
                  Our team is happy to answer any questions about the CoolSaver Program.
                </p>
                <a
                  href="tel:+18324371000"
                  className="flex items-center gap-3 text-secondary font-semibold hover:underline"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  (832) 437-1000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
