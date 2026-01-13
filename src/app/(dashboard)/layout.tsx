"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { Sidebar, MobileNav, ExternalLinkIcon, ChevronRightIcon, HomeIcon } from "@/components/admin";

// Page titles and sections for breadcrumbs
const pageConfig: Record<string, { title: string; section?: string }> = {
  "/admin": { title: "Dashboard" },
  "/admin/pages": { title: "Paginas", section: "Contenido" },
  "/admin/services": { title: "Servicios", section: "Contenido" },
  "/admin/testimonials": { title: "Testimonios", section: "Contenido" },
  "/admin/faqs": { title: "FAQs", section: "Contenido" },
  "/admin/media": { title: "Media", section: "Contenido" },
  "/admin/leads": { title: "Leads" },
  "/admin/office-locations": { title: "Ubicaciones", section: "Configuracion" },
  "/admin/navigation": { title: "Navegacion", section: "Configuracion" },
  "/admin/site-config": { title: "Configuracion", section: "Configuracion" },
  "/admin/editor": { title: "Editor Visual", section: "Principal" },
};

function getPageInfo(pathname: string): { title: string; section?: string } {
  // Check exact match first
  if (pageConfig[pathname]) {
    return pageConfig[pathname];
  }
  // Check if path starts with a known route
  for (const [route, config] of Object.entries(pageConfig)) {
    if (pathname.startsWith(route + "/")) {
      return config;
    }
  }
  return { title: "Panel de Control" };
}

function getBreadcrumbs(pathname: string): Array<{ label: string; href?: string }> {
  const { title, section } = getPageInfo(pathname);
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: "Admin", href: "/admin" },
  ];

  if (section) {
    breadcrumbs.push({ label: section });
  }

  breadcrumbs.push({ label: title });

  return breadcrumbs;
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page or visual editor
  if (pathname === "/login" || pathname.includes("/admin/editor/")) {
    return <>{children}</>;
  }

  const { title: pageTitle } = getPageInfo(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar className="h-screen sticky top-0" />
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <Sidebar className="h-full" />
      </MobileNav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="
          sticky top-0 z-20
          bg-white border-b border-gray-200
          px-4 lg:px-6 py-3
        ">
          <div className="flex items-center justify-between">
            {/* Left side - spacer for mobile menu button */}
            <div className="w-10 lg:hidden" />

            {/* Title and Breadcrumbs */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumbs - hidden on mobile */}
              <nav className="hidden sm:flex items-center gap-1 text-sm text-gray-500 mb-1">
                <HomeIcon className="w-3.5 h-3.5" />
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <ChevronRightIcon className="w-3 h-3" />
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : ""}>
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>

              {/* Title */}
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {pageTitle}
              </h1>
            </div>

            {/* Right side - View site link */}
            <Link
              href="/"
              target="_blank"
              className="
                hidden sm:flex items-center gap-1.5
                text-sm text-blue-600 hover:text-blue-700
                font-medium transition-colors
              "
            >
              <span>Ver sitio</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardContent>{children}</DashboardContent>
    </SessionProvider>
  );
}
