"use client";

import { useEffect, useRef, useCallback } from "react";
import { MenuIcon, XIcon } from "./icons";

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function MobileNav({ isOpen, onToggle, children }: MobileNavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onToggle();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onToggle]);

  // Swipe to close handler
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchCurrentX.current;
    const swipeThreshold = 80; // pixels

    // If swiped left more than threshold, close the sidebar
    if (swipeDistance > swipeThreshold && isOpen) {
      onToggle();
    }
  }, [isOpen, onToggle]);

  // Attach swipe listeners to sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || !isOpen) return;

    sidebar.addEventListener("touchstart", handleTouchStart, { passive: true });
    sidebar.addEventListener("touchmove", handleTouchMove, { passive: true });
    sidebar.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      sidebar.removeEventListener("touchstart", handleTouchStart);
      sidebar.removeEventListener("touchmove", handleTouchMove);
      sidebar.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
      >
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          lg:hidden fixed top-0 left-0 bottom-0 w-72 z-40
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {children}
      </div>
    </>
  );
}

// Mobile Header Component
export function MobileHeader({ title }: { title: string }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-30 flex items-center justify-center">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </header>
  );
}
