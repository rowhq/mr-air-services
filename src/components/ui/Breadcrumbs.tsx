import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // All hero sections use dark backgrounds, so we use light colors
  const baseClasses = 'text-white/60';
  const separatorClasses = 'text-white/40';
  const activeClasses = 'text-white/90 font-medium';
  const hoverClasses = 'hover:text-white';

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${baseClasses} mb-6`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link href="/" className={`${hoverClasses} transition-colors`}>
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span className={separatorClasses}>/</span>
            {item.href ? (
              <Link href={item.href} className={`${hoverClasses} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <span className={activeClasses}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
