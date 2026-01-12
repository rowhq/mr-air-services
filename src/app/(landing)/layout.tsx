import { Header, Footer, MobileActionBar } from '@/components/layout';
import { FloatingCTA } from '@/components/ui';
import { getSiteData } from '@/lib/site-data';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all site data from CMS
  const siteData = await getSiteData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteData={siteData} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer siteData={siteData} />
      <MobileActionBar config={siteData.config} />
      <FloatingCTA phone={siteData.config.company.phone} />
    </div>
  );
}
