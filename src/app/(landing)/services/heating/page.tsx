import Link from 'next/link';
import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'Heating Services | Mr. Air Services - Houston Furnace & Heat Pump Experts',
  description: 'Professional heating services in Houston. Furnace repair, heat pump installation, and heating maintenance. Stay warm this winter. Call (832) 437-1000.',
};

const services = [
  {
    title: 'Furnace Repair',
    description: 'Fast diagnosis and repair of all furnace issues. We service gas, electric, and oil furnaces from all major brands.',
  },
  {
    title: 'Furnace Installation',
    description: 'Professional installation of high-efficiency furnaces. We help you choose the right size and model for your home.',
  },
  {
    title: 'Heat Pump Services',
    description: 'Installation, repair, and maintenance of heat pump systems—an efficient solution for Houston\'s mild winters.',
  },
  {
    title: 'Heating Maintenance',
    description: 'Annual tune-ups keep your heating system running safely and efficiently all winter long.',
  },
  {
    title: 'Emergency Heating Repair',
    description: 'When your heat goes out on a cold night, we\'re here with same-day emergency service.',
  },
  {
    title: 'Ductwork Services',
    description: 'Duct repair, sealing, and cleaning to improve heating efficiency and indoor air quality.',
  },
];

const warningSignsItems = [
  'Uneven heating throughout your home',
  'Strange noises when the system runs',
  'Yellow or flickering pilot light',
  'Frequent cycling on and off',
  'Higher than normal energy bills',
  'Dust or dry air in your home',
  'System is 15+ years old',
  'Visible rust or cracks',
];

const faqs = [
  {
    question: 'How often should I have my heating system serviced?',
    answer: 'We recommend annual maintenance before winter begins. Regular tune-ups prevent breakdowns, improve efficiency, and extend the life of your system.',
  },
  {
    question: 'What\'s the difference between a furnace and a heat pump?',
    answer: 'Furnaces generate heat by burning fuel, while heat pumps transfer heat from outside air. In Houston\'s mild climate, heat pumps are often more energy-efficient for heating.',
  },
  {
    question: 'How long does a heating system last?',
    answer: 'With proper maintenance, furnaces typically last 15-20 years and heat pumps last 10-15 years. We can evaluate your system and advise on repair vs. replacement.',
  },
  {
    question: 'Do you offer financing for new heating systems?',
    answer: 'Yes, we offer flexible financing options to help make a new heating system affordable. Ask about our payment plans.',
  },
];

export default function HeatingPage() {
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
              <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Heating Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
              Heating Services
            </h1>
            <p className="text-xl text-neutral-700 mb-8 leading-relaxed max-w-lg">
              Keep your home warm and comfortable with our professional heating services. From emergency repairs to new installations, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Schedule Service
                </Button>
              </Link>
              <a href="tel:+18324371000">
                <Button variant="outline" size="lg">
                  Emergency: (832) 437-1000
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">What We Offer</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Our Heating Services
            </h2>
            <p className="text-neutral-600 max-w-md text-lg">
              Comprehensive heating solutions for residential and commercial properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Warning Signs</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight">
                Warning Signs Your Heating System Needs Attention
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Don't wait until your heater stops working completely. Watch for these signs that indicate your system needs service.
              </p>
              <ul className="space-y-4">
                {warningSignsItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-white/10"></div>
              <div className="absolute bottom-5 left-5 w-24 h-24 rounded-full bg-white/10"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold text-neutral-black mb-4">Don't Get Left in the Cold</h3>
                <p className="text-neutral-700 mb-8 leading-relaxed">
                  Houston winters may be mild, but a broken heater on a cold night is no fun. Schedule preventive maintenance before winter hits.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Maintenance
                  </Button>
                </Link>
              </div>
            </div>
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
              Heating FAQs
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
