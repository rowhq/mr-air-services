"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/hero", label: "Hero", icon: "🏠" },
  { href: "/admin/servicios", label: "Servicios", icon: "🔧" },
  { href: "/admin/nosotros", label: "Nosotros", icon: "👥" },
  { href: "/admin/contacto", label: "Contacto", icon: "📧" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Mr. Air Services</h1>
          <p className="text-sm text-gray-400">Panel de Administración</p>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition ${
                pathname === item.href ? "bg-gray-800 border-r-4 border-blue-500" : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
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
