'use client';

import { useState } from 'react';

interface ChecklistItem {
  title: string;
  description: string;
}

interface NumberedChecklistGridProps {
  items: ChecklistItem[];
  initialCount?: number;
}

export function NumberedChecklistGrid({ items, initialCount = 6 }: NumberedChecklistGridProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > initialCount;
  const visibleItems = expanded ? items : items.slice(0, initialCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {visibleItems.map((item, index) => (
          <div
            key={item.title}
            className="flex items-start gap-4 bg-white dark:bg-neutral-800 p-5 rounded-xl hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-black dark:text-white">{item.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium rounded-full transition-colors"
          >
            {expanded ? (
              <>
                Show Less
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Show All {items.length} Points
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
