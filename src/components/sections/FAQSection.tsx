'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  categories?: FAQCategory[];
  // Legacy support
  items?: FAQItem[];
  subtitle?: string;
}

// Default icons for FAQ items
const defaultIcons = [
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="5" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="6" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

export function FAQSection({
  title = "Got Questions? We've Got Answers",
  description = "Browse through our FAQs to find answers about our services, pricing, process, and more. Need further assistance? We're always here to help.",
  categories,
  // Legacy props
  items,
  subtitle,
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Handle legacy API: convert items to single category
  const effectiveCategories: FAQCategory[] = categories || [
    { name: 'General', items: items || [] }
  ];

  // Use subtitle as description if provided (legacy)
  const effectiveDescription = subtitle || description;

  const currentItems = effectiveCategories[activeCategory]?.items || [];

  return (
    <section className="bg-neutral-900 py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              {effectiveDescription}
            </p>
          </div>

          {/* Right - Tabs + Accordion */}
          <div>
            {/* Category Tabs - only show if multiple categories */}
            {effectiveCategories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {effectiveCategories.map((cat, index) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenIndex(0);
                    }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === index
                        ? 'bg-white text-neutral-900'
                        : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* FAQ Items */}
            <div>
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start gap-4 py-5 text-left group"
                  >
                    {/* Icon */}
                    <span className={`flex-shrink-0 mt-0.5 transition-colors ${
                      openIndex === index ? 'text-primary' : 'text-white/50'
                    }`}>
                      {item.icon || defaultIcons[index % defaultIcons.length]}
                    </span>

                    {/* Question */}
                    <span className={`flex-1 text-base font-medium transition-colors ${
                      openIndex === index ? 'text-white' : 'text-white/90 group-hover:text-white'
                    }`}>
                      {item.question}
                    </span>

                    {/* Toggle Icon */}
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all ${
                      openIndex === index ? 'text-white/70 rotate-45' : 'text-white/40'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-9 pr-10 pb-5">
                      <p className="text-neutral-400 text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
