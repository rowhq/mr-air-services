import Link from 'next/link';
import { Button } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'Customer Reviews | Mr. Air Services - Houston HVAC Testimonials',
  description: 'Read what Houston homeowners say about Mr. Air Services. 5-star reviews for AC repair, tune-ups, and heating services.',
};

const reviews = [
  {
    name: 'Sarah M.',
    location: 'Missouri City',
    rating: 5,
    date: 'December 2024',
    service: 'AC Repair',
    text: "Mr. Air Services came out the same day I called. The technician was professional, explained everything clearly, and fixed my AC quickly. They didn't try to upsell me on anything I didn't need. Highly recommend!",
  },
  {
    name: 'Robert J.',
    location: 'Houston',
    rating: 5,
    date: 'November 2024',
    service: 'Maintenance Plan',
    text: "Best HVAC company I've worked with. Fair pricing, honest assessment, and quality work. They've been maintaining my system for 3 years now. The maintenance plan is worth every penny.",
  },
  {
    name: 'Maria G.',
    location: 'Spring',
    rating: 5,
    date: 'November 2024',
    service: 'New Installation',
    text: "The team was punctual, courteous, and efficient. They installed a new unit and the whole process was seamless. Great customer service from start to finish.",
  },
  {
    name: 'David L.',
    location: 'Katy',
    rating: 5,
    date: 'October 2024',
    service: 'AC Tune-Up',
    text: "Got the free tune-up through their CoolSaver program. No sales pressure, just honest advice about my system. The technician found a small issue and fixed it before it became a big problem.",
  },
  {
    name: 'Jennifer W.',
    location: 'Sugar Land',
    rating: 5,
    date: 'October 2024',
    service: 'Emergency Repair',
    text: "Our AC died on a 100-degree day. Called Mr. Air Services and they were at our house within 2 hours. Had us back to cool air the same evening. Lifesavers!",
  },
  {
    name: 'Michael T.',
    location: 'Pearland',
    rating: 5,
    date: 'September 2024',
    service: 'Heating Service',
    text: "Had them come out to check our furnace before winter. Very thorough inspection and reasonable price. They even cleaned up after themselves. Will definitely use again.",
  },
  {
    name: 'Amanda K.',
    location: 'Houston',
    rating: 5,
    date: 'September 2024',
    service: 'AC Repair',
    text: "Refreshingly honest company. My AC was making a strange noise and I was worried it would be expensive. Turned out to be a simple fix. They could have charged me for more but didn't.",
  },
  {
    name: 'Carlos R.',
    location: 'Missouri City',
    rating: 5,
    date: 'August 2024',
    service: 'New Installation',
    text: "We got quotes from 5 companies for a new AC system. Mr. Air Services wasn't the cheapest but they were the most professional and transparent. The installation was flawless.",
  },
  {
    name: 'Lisa H.',
    location: 'Spring',
    rating: 5,
    date: 'August 2024',
    service: 'AC Tune-Up',
    text: "Been using them for years. Always on time, always professional, always fair. It's hard to find service companies you can trust these days, but Mr. Air is one of them.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-warning' : 'text-neutral-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const averageRating = 5.0;
  const totalReviews = 247;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Testimonials</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
              Customer Reviews
            </h1>
            <p className="text-xl text-neutral-700 mb-10 leading-relaxed">
              Don't just take our word for it. See what our customers have to say about Mr. Air Services.
            </p>

            <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{averageRating}</div>
              <div className="text-left">
                <StarRating rating={5} />
                <div className="text-sm text-neutral-600 mt-1">Based on {totalReviews} reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">What Customers Say</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Real Reviews from Real Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-neutral-400 mt-1 block">{review.date}</span>
                  </div>
                  <span className="text-xs bg-gradient-to-br from-hero-start to-hero-end text-secondary font-medium px-3 py-1.5 rounded-full">
                    {review.service}
                  </span>
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="pt-6 border-t border-neutral-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-black">{review.name}</p>
                    <p className="text-sm text-neutral-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Share Your Experience</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight">
              Have You Used Our Services?
            </h2>
            <p className="text-neutral-600 mb-10 text-lg leading-relaxed">
              We'd love to hear about your experience. Your feedback helps us improve and helps others make informed decisions.
            </p>
            <a
              href="https://g.page/r/mrairservices/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Leave a Google Review
              </Button>
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
