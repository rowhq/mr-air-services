'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (value: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={`divide-y divide-neutral-200 border-y border-neutral-200 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className = '' }: AccordionItemProps) {
  return (
    <div className={className} data-accordion-item={value}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ value, children, className = '' }: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={`
        w-full flex items-center justify-between
        py-4 text-left
        font-medium text-neutral-black
        hover:text-primary
        transition-colors duration-200
        ${className}
      `}
      aria-expanded={isOpen}
    >
      {children}
      <svg
        className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

interface AccordionContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ value, children, className = '' }: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const { openItems } = context;
  const isOpen = openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div className={`pb-4 text-neutral-600 ${className}`}>
      {children}
    </div>
  );
}
