"use client";

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { TestimonialsBlockContent, BlockSettings } from '@/types/cms';

interface TestimonialItem {
  id?: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  source?: string;
}

interface TestimonialsProps {
  content?: TestimonialsBlockContent;
  settings?: BlockSettings;
  testimonials?: TestimonialItem[];
}

const defaultContent: TestimonialsBlockContent = {
  sectionTitle: "What Our Customers Say",
  testimonialIds: "featured",
  layout: "grid",
  maxItems: 3,
  showSource: true,
};

const defaultTestimonials: TestimonialItem[] = [
  {
    initials: 'MC',
    location: 'Missouri City',
    rating: 5,
    text: "They came out the same day I called. The technician was professional, explained everything clearly, and fixed my AC quickly. Highly recommend!",
    source: 'Google',
  },
  {
    initials: 'HT',
    location: 'Houston',
    rating: 5,
    text: "Fair pricing, honest assessment, and quality work. They don't try to upsell you on things you don't need.",
    source: 'Google',
  },
  {
    initials: 'SP',
    location: 'Spring',
    rating: 5,
    text: "The team was punctual, courteous, and efficient. Great customer service from start to finish.",
    source: 'Google',
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

function TestimonialCard({ testimonial, showSource, index }: { testimonial: TestimonialItem; showSource: boolean; index: number }) {
  return (
    <div
      className={`group bg-white dark:bg-neutral-900 rounded-3xl p-5 md:p-8
        hover:bg-neutral-50 dark:hover:bg-neutral-800
        transition-all duration-500 animate-fade-in-up animation-delay-${(index + 1) * 100}
        h-full flex flex-col`}
    >
      {/* Verified Badge */}
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={testimonial.rating} />
        {showSource && testimonial.source && (
          <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
            {testimonial.source === 'Google' && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {testimonial.source}
          </span>
        )}
      </div>

      {/* Quote */}
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
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
  );
}

function TestimonialsCarousel({ testimonials, showSource }: { testimonials: TestimonialItem[]; showSource: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-21.333px)] min-w-0"
            >
              <TestimonialCard testimonial={testimonial} showSource={showSource} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6
          w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg
          flex items-center justify-center
          text-neutral-600 dark:text-neutral-300 hover:text-secondary dark:hover:text-secondary
          transition-all duration-300 hover:scale-110
          hidden md:flex"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6
          w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg
          flex items-center justify-center
          text-neutral-600 dark:text-neutral-300 hover:text-secondary dark:hover:text-secondary
          transition-all duration-300 hover:scale-110
          hidden md:flex"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-secondary w-8'
                : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({
  content = defaultContent,
  settings,
  testimonials = defaultTestimonials
}: TestimonialsProps) {
  const { sectionTitle, maxItems, showSource, layout } = content;

  // For carousel, show more items; for grid, respect maxItems
  const effectiveMaxItems = layout === 'carousel' ? 10 : maxItems;
  const displayTestimonials = testimonials.slice(0, effectiveMaxItems);

  // Only use carousel if configured AND there are more than 3 testimonials
  const shouldUseCarousel = layout === 'carousel' && displayTestimonials.length > 3;

  return (
    <section className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 -translate-y-1/2 translate-x-1/2"></div>

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 animate-fade-in-up">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight tracking-tight">
              {sectionTitle}
            </h2>
          </div>
          <Link
            href="/contact"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-700 rounded-full
              text-neutral-700 dark:text-neutral-300 font-medium hover:bg-secondary/10 dark:hover:bg-secondary/20 hover:text-secondary
              transition-all duration-300 text-sm"
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Testimonials - Grid or Carousel (carousel only if > 3 items) */}
        {shouldUseCarousel ? (
          <TestimonialsCarousel testimonials={displayTestimonials} showSource={showSource ?? true} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id || index}
                testimonial={testimonial}
                showSource={showSource ?? true}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
