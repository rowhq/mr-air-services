"use client";

import Link from "next/link";
import { ComponentType, SVGProps } from "react";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isActive: boolean;
  collapsed: boolean;
  badge?: number;
  searchQuery?: string;
  hasUnsavedIndicator?: boolean;
}

// Highlight matching text in search
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-yellow-400/30 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SidebarItem({
  href,
  label,
  icon: Icon,
  isActive,
  collapsed,
  badge,
  searchQuery = "",
  hasUnsavedIndicator,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg
        transition-all duration-150 ease-out
        ${isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
        }
        ${collapsed ? "justify-center" : ""}
      `}
      title={collapsed ? label : undefined}
    >
      {/* Icon with optional unsaved indicator */}
      <div className="relative flex-shrink-0">
        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
        {hasUnsavedIndicator && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full" title="Unsaved changes" />
        )}
      </div>

      {!collapsed && (
        <span className="text-sm font-medium truncate">
          <HighlightText text={label} query={searchQuery} />
        </span>
      )}

      {badge !== undefined && badge > 0 && (
        <span className={`
          ${collapsed ? "absolute -top-1 -right-1" : "ml-auto"}
          min-w-[20px] h-5 px-1.5 flex items-center justify-center
          text-xs font-bold rounded-full
          ${isActive ? "bg-white text-blue-600" : "bg-red-500 text-white"}
        `}>
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="
          absolute left-full ml-2 px-2 py-1
          bg-gray-900 text-white text-sm font-medium
          rounded-md whitespace-nowrap
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-150 z-50
          shadow-lg border border-gray-700
        ">
          {label}
          {badge !== undefined && badge > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-red-500 rounded text-xs">
              {badge}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
