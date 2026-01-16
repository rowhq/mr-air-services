'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { PageSchema } from '@/lib/cms/page-schemas';
import { ToastProvider, useToast } from '@/components/ui/Toast';

interface ConfigEditorFormProps {
  schema: PageSchema;
  initialValues: Record<string, string>;
  slug: string;
}

function ConfigEditorFormContent({ schema, initialValues, slug }: ConfigEditorFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    // Start with all sections expanded
    schema.sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );
  const { toast } = useToast();

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSave = useCallback(async () => {
    if (saving) return;

    setSaving(true);

    try {
      // Build configs array from values
      const configs = Object.entries(values)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => ({ key, value }));

      const response = await fetch('/api/cms/config/batch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configs,
          pagePath: schema.productionUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setLastSaved(new Date());
      toast('Changes saved successfully', 'success');
    } catch (error) {
      console.error('Save error:', error);
      toast('Error saving changes', 'error');
    } finally {
      setSaving(false);
    }
  }, [saving, values, schema.productionUrl, toast]);

  const hasChanges = JSON.stringify(values) !== JSON.stringify(initialValues);

  // Keyboard shortcut: Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasChanges && !saving) {
          handleSave();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasChanges, saving, handleSave]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Calculate completion stats
  const totalFields = useMemo(() =>
    schema.sections.reduce((acc, s) => acc + s.fields.length, 0),
    [schema.sections]
  );

  const filledFields = useMemo(() =>
    schema.sections.reduce((acc, section) =>
      acc + section.fields.filter(f => values[f.key] && values[f.key].trim() !== '').length, 0
    ),
    [schema.sections, values]
  );

  const getSectionStats = (sectionId: string) => {
    const section = schema.sections.find(s => s.id === sectionId);
    if (!section) return { filled: 0, total: 0 };
    const filled = section.fields.filter(f => values[f.key] && values[f.key].trim() !== '').length;
    return { filled, total: section.fields.length };
  };

  const getCompletionColor = (filled: number, total: number) => {
    if (total === 0) return 'text-neutral-400';
    const percent = (filled / total) * 100;
    if (percent === 100) return 'text-green-500';
    if (percent >= 50) return 'text-yellow-500';
    return 'text-neutral-400';
  };

  // Copy URL to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.origin + schema.productionUrl);
    toast('URL copied to clipboard');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Edit: {schema.title}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              {schema.description}
            </p>
            <div className="flex items-center gap-4 mt-3">
              {/* Progress indicator */}
              <span className={`text-sm font-medium ${getCompletionColor(filledFields, totalFields)}`}>
                {filledFields}/{totalFields} fields filled
              </span>
              {/* Last saved */}
              {lastSaved && (
                <span className="text-sm text-neutral-400">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Copy URL */}
            <button
              onClick={copyUrl}
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              title="Copy URL"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            {/* View Live */}
            <a
              href={schema.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              title="View Live"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                hasChanges
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  Save
                  <span className="text-xs opacity-70">⌘S</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Unsaved changes indicator */}
        {hasChanges && (
          <div className="mt-4 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            You have unsaved changes
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {schema.sections.map((section) => {
          const sectionStats = getSectionStats(section.id);
          return (
          <div
            key={section.id}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Section completion badge */}
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  sectionStats.filled === sectionStats.total
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : sectionStats.filled > 0
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                }`}>
                  {sectionStats.filled}/{sectionStats.total}
                </span>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${
                    expandedSections[section.id] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Section Fields */}
            {expandedSections[section.id] && (
              <div className="px-6 pb-6 space-y-4 border-t border-neutral-100 dark:border-neutral-700 pt-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.key}
                        value={values[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    ) : field.type === 'image' ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id={field.key}
                            value={values[field.key] || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder || 'https://...'}
                            className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                          <a
                            href="/admin/media"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors text-sm flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Media
                          </a>
                        </div>
                        {values[field.key] && (
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                            <img
                              src={values[field.key]}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        id={field.key}
                        value={values[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    )}
                    {field.helpText && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {field.helpText}
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1 font-mono">
                      {field.key}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Footer Save Button */}
      {hasChanges && (
        <div className="mt-8 sticky bottom-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                Save All Changes
                <span className="text-xs opacity-70">⌘S</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export function ConfigEditorForm(props: ConfigEditorFormProps) {
  return (
    <ToastProvider>
      <ConfigEditorFormContent {...props} />
    </ToastProvider>
  );
}
