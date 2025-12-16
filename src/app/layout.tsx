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
        {/* Rowship Feedback Tracker - URL + scroll position detection + scroll-to in iframe */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.parent!==window){var s=function(){window.parent.postMessage({type:'ROWSHIP_URL_CHANGE',url:location.href,scrollY:window.scrollY||document.documentElement.scrollTop||0},'*')};s();var p=history.pushState;history.pushState=function(){p.apply(this,arguments);s()};var r=history.replaceState;history.replaceState=function(){r.apply(this,arguments);s()};addEventListener('popstate',s);addEventListener('hashchange',s);addEventListener('scroll',function(){window.parent.postMessage({type:'ROWSHIP_SCROLL_CHANGE',scrollY:window.scrollY||document.documentElement.scrollTop||0},'*')});addEventListener('message',function(e){if(e.data&&e.data.type==='ROWSHIP_SCROLL_TO'){window.scrollTo({top:e.data.scrollY||0,left:e.data.scrollX||0,behavior:'smooth'})}})}})();`
          }}
        />
      </body>
    </html>
  );
}
