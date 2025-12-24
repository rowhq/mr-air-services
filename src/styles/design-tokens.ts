/**
 * Design System Tokens
 * Based on Mr. Air Services UX/UI Specification Document
 */

export const colors = {
  // Primary Colors - Brand Cyan
  primary: {
    main: '#00AEEF',
    hover: '#0099D6',
    dark: '#0080B3',
    light: '#E6F7FD',
  },
  // Secondary Colors - Same as Primary (single brand color)
  secondary: {
    main: '#00AEEF',
    hover: '#0099D6',
    light: '#F0FAFF',
  },
  // Neutral Colors - Full grayscale
  neutral: {
    black: '#1E293B',
    900: '#0F172A',
    700: '#334155',
    600: '#475569',
    500: '#64748B',
    400: '#94A3B8',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50: '#F8FAFC',
    white: '#FFFFFF',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: '"Plus Jakarta Sans", "SF Pro Display", system-ui, -apple-system, sans-serif',
  },
  fontSize: {
    // Desktop
    h1: { desktop: '48px', mobile: '32px' },
    h2: { desktop: '36px', mobile: '28px' },
    h3: { desktop: '24px', mobile: '20px' },
    h4: { desktop: '20px', mobile: '18px' },
    body: { desktop: '16px', mobile: '16px' },
    bodySmall: { desktop: '14px', mobile: '14px' },
    caption: { desktop: '12px', mobile: '12px' },
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

export const breakpoints = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
} as const;

export const grid = {
  desktop: {
    columns: 12,
    gutter: '24px',
    margin: '80px',
    maxWidth: '1280px',
  },
  tablet: {
    columns: 8,
    gutter: '20px',
    margin: '40px',
  },
  mobile: {
    columns: 4,
    gutter: '16px',
    margin: '20px',
  },
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const;

// Contact Information
export const contactInfo = {
  phone: '(832) 437-1000',
  phoneLink: 'tel:+18324371000',
  email: 'coolsavertuneups@mrairservices.com',
  emailLink: 'mailto:coolsavertuneups@mrairservices.com',
  hours: {
    weekdays: 'Monday–Friday: 8:00 AM – 5:00 PM',
    saturday: 'Saturday: By appointment',
    sunday: 'Sunday: Closed',
  },
  locations: ['Missouri City', 'Spring', 'Houston'],
  areasServed: ['Greater Houston Area'],
} as const;
