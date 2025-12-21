import Link from 'next/link';
import { Button } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'About Us | Mr. Air Services - Houston\'s Trusted HVAC Company',
  description: 'Learn about Mr. Air Services - a veteran-owned HVAC company serving residential and commercial clients throughout Greater Houston. All brands serviced.',
};

const milestones = [
  {
    phase: 'The Beginning',
    title: 'One Truck, One Mission',
    description: "We started with one truck and one simple idea: don't be like those other HVAC companies. You know the ones—they show up late, quote you for stuff you don't need, and disappear when something goes wrong.",
  },
  {
    phase: 'Growth',
    title: 'Building the Team',
    description: "Now we've got a whole team of experienced techs, but the idea hasn't changed. Show up on time. Tell the truth about what's broken. Fix it right so we don't have to come back.",
  },
  {
    phase: 'Today',
    title: "Houston's Trusted Choice",
    description: "Today we're one of the most trusted HVAC companies in the Greater Houston area. Not because of fancy marketing. Because we do what we say we'll do.",
  },
];

const promises = [
  {
    title: 'On-Time, Every Time',
    description: "We show up when we say. No \"sometime between 8 and 5\" windows. Same-day service available.",
    stat: '98%',
    statLabel: 'on-time rate',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Transparent Pricing',
    description: "We tell you what's wrong and what it costs upfront. You approve before we start. No surprises.",
    stat: '$0',
    statLabel: 'hidden fees',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Guaranteed Satisfaction',
    description: "We remember your name, your system, your weird thermostat. If you're not happy, we make it right.",
    stat: '4.9/5',
    statLabel: 'avg rating',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const services = [
  { title: 'CoolSaver Tune-Ups', desc: 'Our signature 14-point AC tune-up to keep your system at peak performance.', href: '/services/air-conditioning-tune-ups', featured: true },
  { title: 'AC Repair', desc: 'Fast, reliable repairs for all brands. Same-day service available.', href: '/services/air-conditioning-repair', featured: false },
  { title: 'Heating Services', desc: 'Furnace and heat pump repair, maintenance, and installation.', href: '/services/heating', featured: false },
  { title: 'Maintenance Plans', desc: 'Annual plans with priority service and repair discounts.', href: '/services/maintenance-plans', featured: false },
  { title: 'Equipment Sales', desc: 'New AC and heating systems with professional installation.', href: '/services', featured: false },
];

const certifications = [
  { name: 'Veteran Owned', abbr: 'VET' },
  { name: 'Texas HVAC License', abbr: 'TX' },
  { name: 'EPA 608 Certified', abbr: 'EPA' },
  { name: 'Fully Insured', abbr: 'INS' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero - Enhanced with better typography */}
      <section className="relative min-h-[70vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" className="text-secondary"/>
          </svg>
        </div>

        {/* Floating elements with subtle animation */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-secondary/10 blur-3xl"></div>

        <div className="container relative py-24 md:py-32">
          <div className="max-w-4xl">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-sm font-medium text-neutral-700">US Military Veteran Owned & Operated</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-black mb-8 leading-[1.1] tracking-tight animate-fade-in-up">
              The AC Company That{' '}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Gives a Damn
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 max-w-2xl leading-relaxed opacity-90 animate-fade-in-up animation-delay-200">
              A long-established, trusted HVAC company serving residential and commercial clients throughout the Greater Houston area. We service all brands.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-10 animate-fade-in-up animation-delay-400">
              {certifications.map((cert) => (
                <div
                  key={cert.abbr}
                  className="group relative px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 cursor-default
                    hover:bg-white/60 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-sm font-semibold text-neutral-800">{cert.abbr}</span>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                    {cert.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Timeline Visual */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          {/* Section Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black leading-tight tracking-tight">
              How We Got Here
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-transparent"></div>

            {milestones.map((milestone, index) => (
              <div
                key={milestone.phase}
                className="relative pl-20 md:pl-28 pb-16 last:pb-0 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-10 w-5 h-5 rounded-full bg-white border-4 border-secondary
                  group-hover:scale-125 group-hover:bg-secondary transition-all duration-300 z-10">
                </div>

                {/* Content card */}
                <div className="bg-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-100
                  group-hover:shadow-xl group-hover:shadow-neutral-200/50 group-hover:-translate-y-1
                  transition-all duration-500 ease-out">
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-4">
                    {milestone.phase}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-black mb-4">{milestone.title}</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Story */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 max-w-4xl">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="group">
                Schedule Your Service
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <a href="tel:+18324371000">
              <Button variant="outline" size="lg">
                Call (832) 437-1000
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CoolSaver Program - Elevated to Position #3 */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-secondary via-secondary to-primary relative overflow-hidden">
        {/* Geometric accents */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"></div>

        <div className="container relative">
          {/* Exclusive badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-sm font-semibold text-white">Exclusive to Houston</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Free AC Tune-Ups for{' '}
              <span className="text-white/90 underline decoration-white decoration-2 underline-offset-4">Qualifying Homeowners</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              You already pay for it in your electric bill. We help you get it back.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* What You Get */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10
              hover:bg-white/15 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">What You Get (FREE)</h3>
              <ul className="space-y-4 mb-6">
                {[
                  'Refrigerant charge adjustment',
                  'Condenser & evaporator coil cleaning',
                  'Blower cleaning',
                  'Air filter replacement',
                  'Full electrical inspection',
                  'Performance report',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/60 text-sm">Valued at $149 — yours FREE if you qualify</p>
            </div>

            {/* Contact CoolSaver */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl
              hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
              <h3 className="text-2xl font-bold text-neutral-black mb-2">Check If You Qualify</h3>
              <p className="text-neutral-600 mb-8">It takes 2 minutes. No obligation.</p>

              <div className="space-y-4 mb-8">
                <a href="tel:+18324371000" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50
                  hover:bg-secondary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center
                    group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">(832) 437-1000</div>
                    <div className="text-sm text-neutral-500">Call now</div>
                  </div>
                </a>

                <a href="mailto:coolsavertuneups@mrairservices.com" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50
                  hover:bg-secondary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center
                    group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800 text-sm md:text-base">coolsavertuneups@mrairservices.com</div>
                    <div className="text-sm text-neutral-500">Email us</div>
                  </div>
                </a>
              </div>

              <Link href="/free-ac-tune-up" className="block">
                <Button variant="secondary" fullWidth size="lg" className="group">
                  See If You Qualify
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-center text-white/60 mt-12 text-lg">
            Thousands of Houston homeowners have already qualified
          </p>
        </div>
      </section>

      {/* The Mr. Air Services Promise - Merged Values + Why Choose Us */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">Our Promise</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight tracking-tight">
              What Makes Us Different
            </h2>
            <p className="text-xl text-neutral-600">
              Veteran-owned. Houston-trusted. No BS.
            </p>
          </div>

          {/* Promise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="group relative bg-white rounded-3xl p-8 md:p-10 border border-neutral-100
                  hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-2
                  transition-all duration-500 ease-out"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100
                  group-hover:from-secondary group-hover:to-secondary
                  text-secondary group-hover:text-white
                  flex items-center justify-center mb-6
                  group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-500 ease-out
                  shadow-sm group-hover:shadow-lg group-hover:shadow-secondary/25">
                  {promise.icon}
                </div>

                <h3 className="text-xl font-bold text-neutral-black mb-3 group-hover:text-secondary transition-colors duration-300">
                  {promise.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {promise.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-neutral-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {promise.stat}
                  </div>
                  <div className="text-sm text-neutral-500">{promise.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Condensed with Featured */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 animate-fade-in-up">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]">What We Do</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-black leading-tight tracking-tight">
                Our Services
              </h2>
            </div>
            <Link href="/services" className="group inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Services Grid with Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative rounded-3xl p-8 transition-all duration-500 ease-out
                  hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
                  ${service.featured
                    ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-secondary to-primary text-white shadow-xl shadow-secondary/20'
                    : 'bg-neutral-50 border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-secondary/20'
                  }`}
              >
                {service.featured && (
                  <div className="absolute top-6 right-6 px-3 py-1 bg-white rounded-full text-xs font-bold text-secondary">
                    FEATURED
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300
                  ${service.featured ? 'text-white' : 'text-neutral-black group-hover:text-secondary'}`}>
                  {service.title}
                </h3>
                <p className={`leading-relaxed mb-6 ${service.featured ? 'text-white/90' : 'text-neutral-600'}`}>
                  {service.desc}
                </p>

                {/* Arrow indicator */}
                <div className={`flex items-center gap-2 text-sm font-medium
                  ${service.featured
                    ? 'text-white/80 group-hover:text-white'
                    : 'text-secondary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                  } transition-all duration-300`}>
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
