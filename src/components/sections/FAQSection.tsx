'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQSection({
  title = "Frequently\nAsked Questions",
  subtitle,
  items
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-900 py-20 lg:py-28">
      <div className="container">
        {/* Header - 2 column grid matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-16 lg:mb-20">
          {/* Left column - FAQ label */}
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary mt-1.5" />
            <span className="text-neutral-400 uppercase tracking-widest text-sm font-medium">
              FAQ
            </span>
          </div>

          {/* Right column - Title and subtitle */}
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-[1.1] whitespace-pre-line">
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral-400 text-lg max-w-md">{subtitle}</p>
            )}
          </div>
        </div>

        {/* FAQ Items */}
        <div>
          {items.map((item, index) => (
            <div key={index} className="border-b border-neutral-700/50">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-7 lg:py-8 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[80px_1fr_1fr_56px] items-center gap-4 lg:gap-0 text-left group"
              >
                {/* Number */}
                <span className="text-neutral-500 text-base lg:text-lg font-normal">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Line - only visible on desktop, spans the middle area */}
                <div className="hidden lg:flex items-center pr-8">
                  <div className="h-px w-full bg-neutral-700/60" />
                </div>

                {/* Question */}
                <span className="text-white text-lg lg:text-xl font-normal group-hover:text-neutral-200 transition-colors col-span-1">
                  {item.question}
                </span>

                {/* Button +/× */}
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  openIndex === index
                    ? 'bg-neutral-600/80 text-white'
                    : 'bg-neutral-700/60 text-neutral-400 group-hover:bg-neutral-600/80 group-hover:text-neutral-300'
                }`}>
                  <span className="text-2xl lg:text-3xl font-light leading-none">
                    {openIndex === index ? '×' : '+'}
                  </span>
                </div>
              </button>

              {/* Answer - aligned with question column */}
              {openIndex === index && (
                <div className="pb-8 lg:grid lg:grid-cols-[80px_1fr_1fr_56px] lg:gap-0">
                  {/* Empty space for number column */}
                  <div className="hidden lg:block" />
                  {/* Empty space for line column */}
                  <div className="hidden lg:block" />
                  {/* Answer text aligned with question */}
                  <div className="pl-0 lg:pl-0 pr-4 lg:pr-8">
                    <p className="text-neutral-400 text-base lg:text-lg leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                  {/* Empty space for button column */}
                  <div className="hidden lg:block" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
