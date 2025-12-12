import Link from 'next/link';
import { Button } from '@/components/ui';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Missouri City',
    rating: 5,
    text: "Mr. Air Services came out the same day I called. The technician was professional, explained everything clearly, and fixed my AC quickly. Highly recommend!",
  },
  {
    name: 'Robert J.',
    location: 'Houston',
    rating: 5,
    text: "Best HVAC company I've worked with. Fair pricing, honest assessment, and quality work. They've been maintaining my system for 3 years now.",
  },
  {
    name: 'Maria G.',
    location: 'Spring',
    rating: 5,
    text: "The team was punctual, courteous, and efficient. They installed a new unit and the whole process was seamless. Great customer service from start to finish.",
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

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-secondary"></div>
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Testimonials</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
            What Our Customers Say
          </h2>
          <Link href="/reviews">
            <Button variant="outline" size="md">
              Read More Reviews
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-6 text-neutral-700 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>
              <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-neutral-black">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
