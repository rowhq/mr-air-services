import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-inverse' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-white hover:bg-secondary-hover hover:shadow-lg hover:shadow-secondary/25 focus:ring-secondary/30',
  secondary:
    'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:shadow-lg focus:ring-neutral-400/20 border border-neutral-200 dark:border-neutral-700',
  outline:
    'bg-transparent border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-secondary hover:text-secondary hover:shadow-md focus:ring-neutral-400/30',
  'outline-inverse':
    'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:border-white/50 focus:ring-white/30',
  ghost:
    'bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-400/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-base min-h-[44px] max-h-[56px]',
  md: 'px-6 py-2.5 text-base min-h-[44px] max-h-[56px]',
  lg: 'px-8 py-3 text-base min-h-[48px] max-h-[56px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center
          font-semibold rounded-full
          transition-all duration-200 ease-out
          hover:scale-[1.01] active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
