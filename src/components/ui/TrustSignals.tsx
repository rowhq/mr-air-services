interface TrustSignalsProps {
  items?: string[];
  className?: string;
}

const defaultItems = [
  'Same-day service',
  'Veteran owned',
  'No hidden fees',
];

export function TrustSignals({ items = defaultItems, className = '' }: TrustSignalsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 ${className}`}>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {item}
        </span>
      ))}
    </div>
  );
}
