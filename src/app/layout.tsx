import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mr. Air Services",
  description: "Professional air conditioning services",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <head>
        {/* Theme initialization script - runs before render to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`
          }}
        />
      </head>
      <body className="font-sans bg-white dark:bg-neutral-900 text-neutral-black dark:text-neutral-50 transition-colors duration-300">
        <Providers>{children}</Providers>
        {/* Rowship Feedback Tracker - URL + scroll position detection + scroll-to in iframe */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.parent!==window){var s=function(){window.parent.postMessage({type:'ROWSHIP_URL_CHANGE',url:location.href,scrollY:window.scrollY||document.documentElement.scrollTop||0},'*')};s();var p=history.pushState;history.pushState=function(){p.apply(this,arguments);s()};var r=history.replaceState;history.replaceState=function(){r.apply(this,arguments);s()};addEventListener('popstate',s);addEventListener('hashchange',s);addEventListener('scroll',function(){window.parent.postMessage({type:'ROWSHIP_SCROLL_CHANGE',scrollY:window.scrollY||document.documentElement.scrollTop||0},'*')});addEventListener('message',function(e){if(e.data&&e.data.type==='ROWSHIP_SCROLL_TO'){window.scrollTo({top:e.data.scrollY||0,left:e.data.scrollX||0,behavior:'smooth'})}})}})();`
          }}
        />
        <script data-rowship-token="site_v2selDTstSFSfTH3" src="https://ops.rowship.com/rowship-widget.js" async></script>
      </body>
    </html>
  );
}
