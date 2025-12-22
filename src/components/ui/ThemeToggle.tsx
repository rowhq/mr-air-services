'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(initialDark);
  }, []);

  // Apply dark class to HTML when isDark changes
  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="hidden sm:flex w-16 h-8 bg-white/20 backdrop-blur-sm rounded-full" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="hidden sm:flex relative w-16 h-8 items-center bg-white/20 backdrop-blur-sm rounded-full p-1 hover:bg-white/30 transition-colors cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        {/* Sun */}
        <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        {/* Moon */}
        <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Sliding circle */}
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-out ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
