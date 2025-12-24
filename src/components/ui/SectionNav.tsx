'use client';

import { useState, useEffect } from 'react';

interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

export function SectionNav({ items }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 60vh = ~400px on most screens)
      setIsVisible(window.scrollY > 400);

      // Find active section based on scroll position
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!isVisible) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky nav height
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-16 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex justify-center gap-1 px-4 py-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeSection === item.id
                  ? 'bg-secondary text-white'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
