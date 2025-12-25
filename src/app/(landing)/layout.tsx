import { Header, Footer, MobileActionBar } from '@/components/layout';
import { FloatingCTA } from '@/components/ui';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingCTA />
    </div>
  );
}
