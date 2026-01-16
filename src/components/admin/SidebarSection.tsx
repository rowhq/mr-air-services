"use client";

import { useState, useEffect, ComponentType, SVGProps } from "react";
import { SidebarItem } from "./SidebarItem";
import { ChevronDownIcon } from "./icons";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: number;
  hasUnsavedIndicator?: boolean;
  exactMatch?: boolean;
}

interface SidebarSectionProps {
  title: string;
  items: NavItem[];
  collapsed: boolean;
  pathname: string;
  defaultOpen?: boolean;
  searchQuery?: string;
}

export function SidebarSection({
  title,
  items,
  collapsed,
  pathname,
  defaultOpen = true,
  searchQuery = "",
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Persist section state
  useEffect(() => {
    const saved = localStorage.getItem(`sidebar-section-${title}`);
    if (saved !== null) {
      setIsOpen(JSON.parse(saved));
    }
  }, [title]);

  const toggleSection = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(`sidebar-section-${title}`, JSON.stringify(newState));
  };

  // Auto-open section if current path matches any item
  useEffect(() => {
    const hasActiveItem = items.some(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/")
    );
    if (hasActiveItem && !isOpen) {
      setIsOpen(true);
    }
  }, [pathname, items, isOpen]);

  if (collapsed) {
    // In collapsed mode, show only icons without section headers
    return (
      <div className="py-2 border-b border-gray-800 last:border-b-0">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={
              item.exactMatch
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/")
            }
            collapsed={collapsed}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Section Header */}
      <button
        onClick={toggleSection}
        className="
          w-full flex items-center justify-between
          px-4 py-2 text-xs font-semibold text-gray-500
          uppercase tracking-wider
          hover:text-gray-400 transition-colors
        "
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`
            w-4 h-4 transition-transform duration-200
            ${isOpen ? "" : "-rotate-90"}
          `}
        />
      </button>

      {/* Section Items */}
      <div
        className={`
          overflow-hidden transition-all duration-200 ease-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={
              item.exactMatch
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/")
            }
            collapsed={collapsed}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}
