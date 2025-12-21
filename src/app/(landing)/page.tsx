import {
  Hero,
  CoolSaverSpotlight,
  WhyChooseUs,
  ServicesOverview,
  Testimonials,
  AreasServed,
  FinalCTA,
} from '@/components/sections';

export const metadata = {
  title: 'Mr. Air Services | Houston HVAC Experts - Free AC Tune-Ups for Qualifying Homeowners',
  description: 'Houston\'s trusted HVAC experts. FREE CoolSaver AC Tune-Ups for qualifying homeowners. Professional air conditioning repair, heating services, and maintenance plans. Veteran-owned. Same-day service. Call (832) 437-1000.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoolSaverSpotlight />
      <WhyChooseUs />
      <ServicesOverview />
      <Testimonials />
      <AreasServed />
      <FinalCTA />
    </>
  );
}
