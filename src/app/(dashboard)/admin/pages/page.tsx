'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEditablePages } from '@/lib/cms/page-schemas';

// Service pages that use config editor
const servicePages = getEditablePages();
const serviceSlugs = servicePages.map(p => p.slug);

// Icons for pages
const pageIcons: Record<string, string> = {
  'home': '🏡',
  'services': '🔧',
  'air-conditioning-repair': '❄️',
  'heating': '🔥',
  'air-conditioning-tune-ups': '🛠️',
  'financing-payments': '💳',
  'pay-invoice': '📄',
  'contact': '📞',
  'about': '👥',
  'privacy-policy': '🔒',
  'terms-of-use': '📋',
};

interface Page {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_published: boolean;
}

export default function PagesPage() {
  const [dbPages, setDbPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPages() {
      try {
        const res = await fetch('/api/cms/pages');
        const data = await res.json();
        setDbPages(data);
      } catch (error) {
        console.error('Failed to load pages:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPages();
  }, []);

  // Filter out service pages from DB pages (they're shown in the first section)
  const otherPages = dbPages.filter(p => !serviceSlugs.includes(p.slug));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Pages
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Manage all site pages. Service pages use the content editor, other pages use the visual editor.
        </p>
      </div>

      {/* Service Pages Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Service Pages
          <span className="text-xs font-normal text-neutral-500 ml-2">Content Editor</span>
        </h2>
        <div className="grid gap-3">
          {servicePages.map((page) => (
            <Link
              key={page.slug}
              href={`/admin/pages/${page.slug}`}
              className="block bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl" role="img" aria-label={page.title}>
                    {pageIcons[page.slug] || '📄'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-neutral-400 font-mono">
                        {page.productionUrl}
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                        {page.fieldCount} fields
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit Content
                  </span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Pages Section */}
      {otherPages.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Other Pages
            <span className="text-xs font-normal text-neutral-500 ml-2">Visual Editor</span>
          </h2>
          <div className="grid gap-3">
            {otherPages.map((page) => (
              <Link
                key={page.id}
                href={`/admin/editor/${page.slug}`}
                className="block bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl" role="img" aria-label={page.title}>
                      {pageIcons[page.slug] || '📄'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 transition-colors">
                        {page.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-neutral-400 font-mono">
                          /{page.slug}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          page.is_published
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                        }`}>
                          {page.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600">
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Visual Editor
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-neutral-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Editor types:</p>
            <ul className="space-y-1">
              <li><span className="text-blue-600">Content Editor</span> — Edit text directly. Changes are reflected in production.</li>
              <li><span className="text-purple-600">Visual Editor</span> — Design pages with draggable blocks.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
