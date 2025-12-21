export const metadata = {
  title: 'Terms of Use | Mr. Air Services',
  description: 'Terms of use for Mr. Air Services website and services.',
};

export default function TermsOfUsePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 pb-20 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-primary/20 blur-xl"></div>

        <div className="container relative">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Legal</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black leading-tight">
            Terms of Use
          </h1>
          <p className="text-neutral-600 mt-2">Last updated: December 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-neutral">
            <div className="bg-neutral-50 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-0">Agreement to Terms</h2>
              <p className="text-neutral-600 mb-0 leading-relaxed">
                By accessing and using the Mr. Air Services website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-neutral-black mb-4">Use of Website</h2>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-none pl-0 space-y-3 mb-6">
              {[
                'Use the website in any way that violates applicable laws',
                'Attempt to gain unauthorized access to any portion of the website',
                'Use the website to transmit harmful code or malware',
                'Interfere with the proper functioning of the website',
                'Collect or harvest user information without consent',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Service Appointments</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              When you schedule a service appointment through our website, you agree to be present at the scheduled time or provide access to the service location. Cancellations should be made at least 24 hours in advance when possible.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Pricing and Payment</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              All prices displayed on our website are estimates and may vary based on actual conditions. Final pricing will be provided before work begins. Payment is due upon completion of services unless other arrangements have been made.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Warranties and Guarantees</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Mr. Air Services stands behind our work with a satisfaction guarantee. Specific warranty terms vary by service and will be provided in writing. Manufacturer warranties on parts and equipment are separate from our labor warranty.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Intellectual Property</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the property of Mr. Air Services and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Limitation of Liability</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Mr. Air Services shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability is limited to the amount paid for the specific service in question.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Disclaimer</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              The information on this website is provided "as is" without warranties of any kind. We do not guarantee that the website will be error-free or uninterrupted. HVAC advice provided on this site is general in nature and should not replace professional assessment.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Third-Party Links</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites. Accessing third-party sites is at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Governing Law</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              These Terms of Use are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-10">Changes to Terms</h2>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the new terms.
            </p>

            <div className="bg-neutral-50 rounded-2xl p-8 mt-10">
              <h2 className="text-2xl font-bold text-neutral-black mb-4 mt-0">Contact</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Questions about these Terms of Use should be directed to:
              </p>
              <p className="text-neutral-600 mb-2">
                <strong className="text-neutral-black">Mr. Air Services</strong>
              </p>
              <p className="text-neutral-600 mb-2">
                Phone: <a href="tel:+18324371000" className="text-secondary hover:underline">(832) 437-1000</a>
              </p>
              <p className="text-neutral-600 mb-0">
                Email: <a href="mailto:coolsavertuneups@mrairservices.com" className="text-secondary hover:underline">coolsavertuneups@mrairservices.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
