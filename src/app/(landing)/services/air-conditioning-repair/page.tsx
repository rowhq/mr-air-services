import Link from 'next/link';
import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our certified technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

const repairTypes = [
  {
    title: 'AC Not Cooling',
    description: 'Refrigerant leaks, compressor issues, or airflow problems—we diagnose and fix the root cause.',
  },
  {
    title: 'Strange Noises',
    description: 'Grinding, squealing, or banging sounds indicate mechanical problems that need immediate attention.',
  },
  {
    title: 'AC Won\'t Turn On',
    description: 'Electrical issues, thermostat problems, or failed components—we identify and repair quickly.',
  },
  {
    title: 'Frozen Evaporator Coils',
    description: 'Ice on your AC? We fix airflow restrictions and refrigerant issues causing the freeze.',
  },
  {
    title: 'Water Leaks',
    description: 'Clogged drain lines, damaged pans, or other issues causing water damage—we handle it all.',
  },
  {
    title: 'High Energy Bills',
    description: 'Inefficient systems cost you money. We optimize your AC for peak performance.',
  },
];

const faqs = [
  {
    question: 'How quickly can you respond to an AC emergency?',
    answer: 'We offer same-day service for most emergencies in the Greater Houston area. For urgent situations, we prioritize calls to get your AC running as quickly as possible.',
  },
  {
    question: 'Do you repair all AC brands?',
    answer: 'Yes, our technicians are trained to service all major brands including Carrier, Trane, Lennox, Rheem, Goodman, and more.',
  },
  {
    question: 'How much does AC repair cost?',
    answer: 'Repair costs vary depending on the issue. We provide upfront pricing before any work begins—no surprises. Common repairs range from $150-$600.',
  },
  {
    question: 'Should I repair or replace my AC?',
    answer: 'Generally, if your AC is over 10-15 years old and repairs exceed 50% of a new unit\'s cost, replacement may be more economical. We\'ll give you an honest recommendation.',
  },
];

export default function ACRepairPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">AC Repair</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
                Air Conditioning Repair
              </h1>
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed max-w-lg">
                Fast, reliable AC repair when you need it most. Our certified technicians diagnose and fix problems right the first time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Repair
                  </Button>
                </Link>
                <a href="tel:+18324371000">
                  <Button variant="outline" size="lg">
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 text-center shadow-xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Same-Day</div>
                <div className="text-xl text-neutral-700 mb-4">Emergency Service</div>
                <div className="text-sm text-neutral-500">Available 7 days a week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Common Issues</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Common AC Problems We Fix
            </h2>
            <p className="text-neutral-600 max-w-md text-lg">
              Whether your AC is making strange noises or not cooling at all, we've seen it all and fixed it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairTypes.map((type) => (
              <div
                key={type.title}
                className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{type.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            Our Repair Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Call Us', description: 'Describe your AC problem and schedule a convenient appointment time.' },
              { step: '2', title: 'Diagnosis', description: 'Our technician thoroughly inspects your system to identify the issue.' },
              { step: '3', title: 'Upfront Quote', description: 'You receive a detailed estimate before any repair work begins.' },
              { step: '4', title: 'Expert Repair', description: 'We fix your AC right the first time with quality parts and workmanship.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">FAQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-10 text-center leading-tight">
              Frequently Asked Questions
            </h2>
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger value={`faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent value={`faq-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
