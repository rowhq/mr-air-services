'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface CoolSaverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoolSaverModal({ isOpen, onClose }: CoolSaverModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone1: '',
    phone2: '',
    streetAddress: '',
    city: '',
    stateZip: '',
    electricCompany: '',
    acUnits: '',
    messages: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset form after close animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone1: '',
        phone2: '',
        streetAddress: '',
        city: '',
        stateZip: '',
        electricCompany: '',
        acUnits: '',
        messages: '',
      });
    }, 300);
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600
    bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white
    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
    focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
    transition-all duration-200`;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-neutral-black dark:text-white mb-2">We'll Call You Soon!</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Our team will contact you within 24 hours to verify your eligibility and schedule your free tune-up.
          </p>
          <a href="tel:+18324371000" className="text-secondary font-semibold hover:underline">
            Or call us now: (832) 437-1000
          </a>
          <div className="mt-8">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">FREE for Qualifying Homeowners</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-2">
              A/C Heater Tune-Up & Service
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              For no cost A/C tune-up, please fill in the info below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                required
                placeholder="john@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
            </div>

            {/* Phone #1 & Phone #2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Phone #1 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  value={formData.phone1}
                  onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Phone #2 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 987-6543"
                  value={formData.phone2}
                  onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Street Address *
              </label>
              <input
                type="text"
                required
                placeholder="123 Main St"
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                className={inputClasses}
              />
            </div>

            {/* City & State Zip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Houston"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  State Zip Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="TX 77001"
                  value={formData.stateZip}
                  onChange={(e) => setFormData({ ...formData, stateZip: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Electric Company & # of A/C units */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Electric Company (if known) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="CenterPoint Energy"
                  value={formData.electricCompany}
                  onChange={(e) => setFormData({ ...formData, electricCompany: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  # of A/C units (if known) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="2"
                  value={formData.acUnits}
                  onChange={(e) => setFormData({ ...formData, acUnits: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Messages */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Messages
              </label>
              <textarea
                placeholder="Any additional information..."
                rows={3}
                value={formData.messages}
                onChange={(e) => setFormData({ ...formData, messages: e.target.value })}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" variant="secondary" fullWidth size="lg" loading={isSubmitting}>
                Submit Request
              </Button>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
              By submitting, you agree to be contacted about your eligibility.
              <br />
              Your information is secure and never shared.
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
