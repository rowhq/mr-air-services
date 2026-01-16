'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getEditablePages } from '@/lib/cms/page-schemas';
import { ToastProvider, useToast } from '@/components/ui/Toast';

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
  'privacy-policy': '🔒',
  'terms-of-use': '📋',
};

interface Page {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_published: boolean;
  updated_at?: string;
}

interface PageStats {
  slug: string;
  filledFields: number;
  totalFields: number;
  lastModified: string | null;
}

// Helper to format relative time
function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Helper to get completion color
function getCompletionColor(filled: number, total: number): string {
  if (total === 0) return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500';
  const percent = (filled / total) * 100;
  if (percent === 100) return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
  if (percent >= 50) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
  return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500';
}

function PagesPageContent() {
  const [dbPages, setDbPages] = useState<Page[]>([]);
  const [pageStats, setPageStats] = useState<PageStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const [pagesRes, statsRes] = await Promise.all([
          fetch('/api/cms/pages'),
          fetch('/api/cms/pages/stats'),
        ]);
        const [pagesData, statsData] = await Promise.all([
          pagesRes.json(),
          statsRes.json(),
        ]);
        setDbPages(pagesData);
        setPageStats(statsData);
      } catch (error) {
        console.error('Failed to load pages:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Get stats for a service page
  const getStats = (slug: string): PageStats | undefined => {
    return pageStats.find(s => s.slug === slug);
  };

  // Filter pages based on search
  const filteredServicePages = useMemo(() => {
    if (!searchQuery) return servicePages;
    const query = searchQuery.toLowerCase();
    return servicePages.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.slug.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter out service pages from DB pages (they're shown in the first section)
  const otherPages = useMemo(() => {
    const filtered = dbPages.filter(p => !serviceSlugs.includes(p.slug));
    if (!searchQuery) return filtered;
    const query = searchQuery.toLowerCase();
    return filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.slug.toLowerCase().includes(query)
    );
  }, [dbPages, searchQuery]);

  // Copy URL to clipboard
  const copyUrl = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + url);
    toast('URL copied to clipboard');
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Pages
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              Manage all site pages. Service pages use the content editor, other pages use the visual editor.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Service Pages Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Service Pages
          <span className="text-xs font-normal text-neutral-500 ml-2">Content Editor</span>
        </h2>
        {filteredServicePages.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm py-8 text-center">
            No service pages match your search.
          </p>
        ) : (
        <div className="grid gap-3">
          {filteredServicePages.map((page) => {
            const stats = getStats(page.slug);
            return (
            <div
              key={page.slug}
              className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl" role="img" aria-label={page.title}>
                    {pageIcons[page.slug] || '📄'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-neutral-400 font-mono">
                        {page.productionUrl}
                      </span>
                      {stats && stats.lastModified && (
                        <span className="text-xs text-neutral-400">
                          Edited {formatRelativeTime(stats.lastModified)}
                        </span>
                      )}
                      {stats && (
                        <span className={`text-xs px-2 py-0.5 rounded ${getCompletionColor(stats.filledFields, stats.totalFields)}`}>
                          {stats.filledFields}/{stats.totalFields} fields
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* Copy URL */}
                  <button
                    onClick={(e) => copyUrl(page.productionUrl, e)}
                    className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    title="Copy URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  {/* View Live */}
                  <a
                    href={page.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    title="View Live"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {/* Edit Content */}
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">Edit</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        )}
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
              <div
                key={page.id}
                className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl" role="img" aria-label={page.title}>
                      {pageIcons[page.slug] || '📄'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {page.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-neutral-400 font-mono">
                          /{page.slug}
                        </span>
                        {page.updated_at && (
                          <span className="text-xs text-neutral-400">
                            Edited {formatRelativeTime(page.updated_at)}
                          </span>
                        )}
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
                  <div className="flex items-center gap-1">
                    {/* Copy URL */}
                    <button
                      onClick={(e) => copyUrl(`/${page.slug}`, e)}
                      className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                      title="Copy URL"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    {/* View Live */}
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                      title="View Live"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {/* Edit */}
                    <Link
                      href={`/admin/editor/${page.slug}`}
                      className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium">Edit</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
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

export default function PagesPage() {
  return (
    <ToastProvider>
      <PagesPageContent />
    </ToastProvider>
  );
}
