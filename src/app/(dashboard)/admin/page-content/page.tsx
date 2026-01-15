'use client';

import Link from 'next/link';
import { getEditablePages } from '@/lib/cms/page-schemas';

const editablePages = getEditablePages();

export default function PageContentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Contenido de Páginas
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Edita el contenido de texto de las páginas de servicio. Los cambios se reflejan directamente en producción.
        </p>
      </div>

      <div className="grid gap-4">
        {editablePages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/page-content/${page.slug}`}
            className="block bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                  {page.title}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  {page.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-neutral-400 font-mono">
                    {page.productionUrl}
                  </span>
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded">
                    {page.fieldCount} campos
                  </span>
                </div>
              </div>
              <div className="text-neutral-400 group-hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              Sobre este editor
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Este editor modifica el contenido de texto de las páginas. El diseño visual (layout, colores, iconos)
              permanece exactamente igual. Los cambios se aplican después de ~60 segundos de caché.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
