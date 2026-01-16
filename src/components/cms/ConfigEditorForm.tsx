'use client';

import { useState } from 'react';
import type { PageSchema } from '@/lib/cms/page-schemas';

interface ConfigEditorFormProps {
  schema: PageSchema;
  initialValues: Record<string, string>;
  slug: string;
}

export function ConfigEditorForm({ schema, initialValues, slug }: ConfigEditorFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    // Start with all sections expanded
    schema.sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');

    try {
      // Build configs array from values
      const configs = Object.entries(values)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => ({ key, value }));

      const response = await fetch('/api/cms/config/batch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configs }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(values) !== JSON.stringify(initialValues);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Edit: {schema.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            {schema.description}
          </p>
          <a
            href={schema.productionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
          >
            View production page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-4">
          {saveStatus === 'success' && (
            <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Saved successfully
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-600 dark:text-red-400 text-sm">
              Error saving changes
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              hasChanges
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {schema.sections.map((section) => (
          <div
            key={section.id}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
            >
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
        ))}
      </div>

      {/* Footer Save Button */}
      {hasChanges && (
        <div className="mt-8 sticky bottom-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-lg hover:bg-primary/90 transition-all"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
