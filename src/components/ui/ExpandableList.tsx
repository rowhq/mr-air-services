'use client';

import { useState } from 'react';

interface ExpandableListProps {
  items: React.ReactNode[];
  initialCount?: number;
  showAllText?: string;
  showLessText?: string;
}

export function ExpandableList({
  items,
  initialCount = 6,
  showAllText,
  showLessText = 'Show Less',
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > initialCount;
  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const remainingCount = items.length - initialCount;

  return (
    <>
      {visibleItems}
      {hasMore && (
        <div className="col-span-full flex justify-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-full transition-colors"
          >
            {expanded ? (
              <>
                {showLessText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                {showAllText || `Show All ${items.length} Items`}
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
