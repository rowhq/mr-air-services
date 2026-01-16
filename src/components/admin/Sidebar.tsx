"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarSection } from "./SidebarSection";
import { UserMenu } from "./UserMenu";
import {
  LayoutDashboardIcon,
  PaletteIcon,
  FileTextIcon,
  WrenchIcon,
  MessageSquareIcon,
  ImageIcon,
  MailIcon,
  MapPinIcon,
  LinkIcon,
  SettingsIcon,
  ChevronLeftIcon,
  SearchIcon,
  ExternalLinkIcon,
  WifiIcon,
  WifiOffIcon,
} from "./icons";

// Base navigation structure
const baseSections = [
  {
    title: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon, exactMatch: true, id: "dashboard" },
      { href: "/admin/editor/home", label: "Visual Editor", icon: PaletteIcon, id: "visual-editor" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/pages", label: "Pages", icon: FileTextIcon },
      { href: "/admin/services", label: "Services", icon: WrenchIcon },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareIcon },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/office-locations", label: "Locations", icon: MapPinIcon },
      { href: "/admin/navigation", label: "Navigation", icon: LinkIcon },
      { href: "/admin/site-config", label: "Settings", icon: SettingsIcon },
    ],
  },
  {
    title: "Leads",
    items: [
      { href: "/admin/leads", label: "Forms", icon: MailIcon, id: "leads" },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [leadsCount, setLeadsCount] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const pathname = usePathname();

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    if (saved !== null) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch leads count
  const fetchLeadsCount = useCallback(async () => {
    try {
      const response = await fetch("/api/cms/leads/count");
      if (response.ok) {
        const data = await response.json();
        setLeadsCount(data.count || 0);
      }
    } catch {
      // Silently fail - count will stay at 0
    }
  }, []);

  useEffect(() => {
    fetchLeadsCount();
    // Refresh count every 60 seconds
    const interval = setInterval(fetchLeadsCount, 60000);
    return () => clearInterval(interval);
  }, [fetchLeadsCount]);

  // Listen for unsaved changes from editor store
  useEffect(() => {
    const checkUnsavedChanges = () => {
      // Check if editor store exists and has unsaved changes
      const editorState = (window as unknown as { __EDITOR_STORE__?: { hasUnsavedChanges: boolean } }).__EDITOR_STORE__;
      if (editorState) {
        setHasUnsavedChanges(editorState.hasUnsavedChanges);
      }
    };

    // Check periodically
    const interval = setInterval(checkUnsavedChanges, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle collapse
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("admin-sidebar-collapsed", JSON.stringify(newState));
  };

  // Build sections with dynamic data
  const sections = baseSections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if ("id" in item && item.id === "leads") {
        return { ...item, badge: leadsCount };
      }
      if ("id" in item && item.id === "visual-editor" && hasUnsavedChanges) {
        return { ...item, hasUnsavedIndicator: true };
      }
      return item;
    }),
  }));

  // Filter sections based on search
  const filteredSections = searchQuery
    ? sections.map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((section) => section.items.length > 0)
    : sections;

  // Keyboard shortcut for search (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("sidebar-search");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside
      className={`
        ${collapsed ? "w-16" : "w-64"}
        bg-gray-900 text-white flex flex-col
        transition-all duration-200 ease-out
        ${className}
      `}
    >
      {/* Header */}
      <div className={`p-4 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-white dark:text-gray-100">Mr. Air CMS</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title={collapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeftIcon
              className={`w-5 h-5 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 mb-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              id="sidebar-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="
                w-full pl-9 pr-12 py-2
                bg-gray-800 border border-gray-700
                rounded-lg text-sm text-white
                placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
              "
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {filteredSections.map((section) => (
          <SidebarSection
            key={section.title}
            {...section}
            collapsed={collapsed}
            pathname={pathname}
            searchQuery={searchQuery}
          />
        ))}

        {searchQuery && filteredSections.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            No results found
          </div>
        )}
      </nav>

      {/* View Site Link & Connection Status */}
      <div className="px-3 py-2 border-t border-gray-800">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="
                flex items-center gap-2 px-3 py-2
                text-sm text-gray-400 hover:text-white
                hover:bg-gray-800 rounded-lg
                transition-colors
              "
            >
              <ExternalLinkIcon className="w-4 h-4" />
              <span>View website</span>
            </Link>
            {/* Connection Status */}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                isOnline
                  ? "text-green-400"
                  : "text-red-400"
              }`}
              title={isOnline ? "Online" : "Offline"}
            >
              {isOnline ? (
                <WifiIcon className="w-3.5 h-3.5" />
              ) : (
                <WifiOffIcon className="w-3.5 h-3.5" />
              )}
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        ) : (
          /* Collapsed: just show connection status icon */
          <div className="flex justify-center">
            <div
              className={`p-2 rounded-lg ${
                isOnline ? "text-green-400" : "text-red-400"
              }`}
              title={isOnline ? "Online" : "Offline"}
            >
              {isOnline ? (
                <WifiIcon className="w-4 h-4" />
              ) : (
                <WifiOffIcon className="w-4 h-4" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <UserMenu collapsed={collapsed} />
    </aside>
  );
}
