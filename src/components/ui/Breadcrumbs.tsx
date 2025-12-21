import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'light';
}

export function Breadcrumbs({ items, variant = 'default' }: BreadcrumbsProps) {
  const baseClasses = variant === 'light'
    ? 'text-white/70'
    : 'text-neutral-500';
  const separatorClasses = variant === 'light'
    ? 'text-white/50'
    : 'text-neutral-400';
  const activeClasses = variant === 'light'
    ? 'text-white font-medium'
    : 'text-neutral-900 font-medium';
  const hoverClasses = variant === 'light'
    ? 'hover:text-white'
    : 'hover:text-secondary';

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
