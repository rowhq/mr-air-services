import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr. Air Services",
  description: "Servicios profesionales de aire acondicionado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
