import Link from 'next/link';
import { Button } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'About Us | Mr. Air Services - Houston\'s Trusted HVAC Company',
  description: 'Learn about Mr. Air Services - over 15 years serving the Greater Houston area. Licensed, insured, and committed to your comfort.',
};

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '10,000+', label: 'Happy Customers' },
  { value: '24/7', label: 'Emergency Support' },
  { value: '100%', label: 'Satisfaction Guarantee' },
];

const values = [
  {
    title: 'Integrity',
    description: 'We provide honest assessments and transparent pricing. You\'ll never pay for work you don\'t need.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'Our NATE-certified technicians deliver quality workmanship on every job, big or small.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    description: 'When we say we\'ll be there, we\'ll be there. On time, every time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Customer Focus',
    description: 'Your comfort is our priority. We go above and beyond to ensure your satisfaction.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="max-w-3xl">
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">About Us</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
              About Mr. Air Services
            </h1>
            <p className="text-xl text-neutral-700 max-w-2xl leading-relaxed">
              For over 15 years, we've been keeping Houston homes and businesses comfortable with reliable HVAC services and exceptional customer care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Story</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight">
                A Legacy of Comfort
              </h2>
              <div className="space-y-4 text-neutral-600 text-lg leading-relaxed">
                <p>
                  Mr. Air Services was founded with a simple mission: provide honest, reliable HVAC services to the Greater Houston community. What started as a one-man operation has grown into a team of certified technicians serving thousands of residential and commercial customers.
                </p>
                <p>
                  We understand that your HVAC system is more than just equipment—it's what keeps your family comfortable during Houston's hot summers and occasional cold snaps. That's why we treat every service call with the urgency and care it deserves.
                </p>
                <p>
                  Today, we're proud to be one of the most trusted HVAC companies in Missouri City, Spring, and the greater Houston area. Our growth is a testament to our commitment to doing things right: honest pricing, quality work, and genuine customer care.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-10">
              <h3 className="text-xl font-bold text-neutral-black mb-6">
                Licensed & Certified
              </h3>
              <ul className="space-y-4">
                {[
                  'State of Texas HVAC License',
                  'NATE Certified Technicians',
                  'EPA 608 Certified',
                  'Fully Insured & Bonded',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Values</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Our Core Values
            </h2>
            <p className="text-neutral-600 max-w-md text-lg">
              These principles guide everything we do at Mr. Air Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="group bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm text-secondary flex items-center justify-center mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-black mb-3">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-8 leading-tight">
                  Why Houston Trusts Us
                </h2>
                <ul className="space-y-6">
                  {[
                    { title: 'Same-Day Service', desc: 'We understand emergencies can\'t wait.' },
                    { title: 'Upfront Pricing', desc: 'No surprises—you approve the cost before we start.' },
                    { title: 'Satisfaction Guarantee', desc: 'If you\'re not happy, we make it right.' },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="text-neutral-black text-lg">{item.title}</strong>
                        <p className="text-neutral-600 mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center bg-white/30 backdrop-blur-sm rounded-2xl p-10">
                <p className="text-xl text-neutral-700 mb-8">
                  Ready to experience the Mr. Air Services difference?
                </p>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
