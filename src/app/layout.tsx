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
      <body>
        {children}
        {/* Rowship Feedback URL Tracker - enables automatic URL detection in iframe */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.parent!==window){var s=function(){window.parent.postMessage({type:'ROWSHIP_URL_CHANGE',url:location.href},'*')};s();var p=history.pushState;history.pushState=function(){p.apply(this,arguments);s()};var r=history.replaceState;history.replaceState=function(){r.apply(this,arguments);s()};addEventListener('popstate',s);addEventListener('hashchange',s)}})();`
          }}
        />
      </body>
    </html>
  );
}
