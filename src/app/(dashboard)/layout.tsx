"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/editor/home", label: "Editor Visual", icon: "✨" },
  { href: "/admin/pages", label: "Paginas", icon: "📄" },
  { href: "/admin/services", label: "Servicios", icon: "🔧" },
  { href: "/admin/testimonials", label: "Testimonios", icon: "💬" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/media", label: "Media", icon: "🖼️" },
  { href: "/admin/leads", label: "Leads", icon: "📩" },
  { href: "/admin/office-locations", label: "Ubicaciones", icon: "📍" },
  { href: "/admin/navigation", label: "Navegacion", icon: "🔗" },
  { href: "/admin/site-config", label: "Configuracion", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show sidebar on login page or editor
  if (pathname === "/login" || pathname.includes("/admin/editor/")) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">Mr. Air Services</h1>
          <p className="text-sm text-gray-400">Panel de Administracion</p>
        </div>
        <nav className="mt-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-gray-800 border-r-4 border-blue-500"
                  : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <span>🚪</span>
            <span>Cerrar Sesion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Panel de Control</h2>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-blue-600 hover:underline text-sm"
            >
              Ver sitio web →
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
