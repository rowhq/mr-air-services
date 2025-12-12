import {
  Hero,
  ServicesOverview,
  WhyChooseUs,
  CoolSaverSpotlight,
  Testimonials,
  AreasServed,
  FinalCTA,
} from '@/components/sections';

export const metadata = {
  title: 'Mr. Air Services | Houston HVAC Experts - AC Repair, Tune-Ups & Heating',
  description: 'Houston\'s trusted HVAC experts. Professional air conditioning repair, tune-ups, heating services, and maintenance plans. Same-day service available. Call (832) 437-1000.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <CoolSaverSpotlight />
      <Testimonials />
      <AreasServed />
      <FinalCTA />
    </>
  );
}
