import Link from 'next/link';

const testimonials = [
  {
    initials: 'MC',
    location: 'Missouri City',
    rating: 5,
    text: "They came out the same day I called. The technician was professional, explained everything clearly, and fixed my AC quickly. Highly recommend!",
  },
  {
    initials: 'HT',
    location: 'Houston',
    rating: 5,
    text: "Fair pricing, honest assessment, and quality work. They don't try to upsell you on things you don't need.",
  },
  {
    initials: 'SP',
    location: 'Spring',
    rating: 5,
    text: "The team was punctual, courteous, and efficient. Great customer service from start to finish.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-200 dark:text-neutral-700'}`}
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
    <section className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 -translate-y-1/2 translate-x-1/2"></div>

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 animate-fade-in-up">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight tracking-tight">
              What Our Customers Say
            </h2>
          </div>
          <Link
            href="/contact"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 rounded-full
              text-neutral-700 dark:text-neutral-300 font-medium hover:bg-white dark:hover:bg-neutral-900 hover:border-secondary/30 hover:text-secondary
              hover:shadow-lg transition-all duration-300 text-sm"
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 rounded-3xl p-8
                hover:border-secondary/20 hover:shadow-xl hover:-translate-y-1
                transition-all duration-500 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              {/* Verified Google Badge */}
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </span>
              </div>

              {/* Quote */}
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary
                  flex items-center justify-center text-white font-bold
                  group-hover:scale-110 transition-transform duration-300">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">Verified Customer</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center animate-fade-in-up animation-delay-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">4.9/5 Rating</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">Veteran Owned & Operated</span>
          <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">Licensed & Insured</span>
        </div>
      </div>
    </section>
  );
}
