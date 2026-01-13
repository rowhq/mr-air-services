import { BlockRenderer } from '@/components/cms/BlockRenderer';
import type { EditorBlock, BlockSettings, BlockContent } from '@/types/cms';

export const metadata = {
  title: 'Privacy Policy | Mr. Air Services',
  description: 'Privacy policy for Mr. Air Services. Learn how we collect, use, and protect your personal information.',
};

// Database response types
interface DBBlock {
  id: string;
  type: string;
  content: unknown;
  settings: unknown;
  position: number;
  is_visible: boolean;
}

interface DBPageWithBlocks {
  id: string;
  slug: string;
  title: string;
  blocks: DBBlock[];
}

async function getPageData(): Promise<EditorBlock[] | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/pages/privacy-policy`, {
      next: { revalidate: 60 },
      cache: 'force-cache',
    });

    if (!res.ok) return null;

    const pageData: DBPageWithBlocks = await res.json();

    return pageData.blocks.map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));
  } catch {
    return null;
  }
}

// Hardcoded fallback content
function HardcodedPrivacyPolicy() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 pb-20 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-primary/20 blur-xl"></div>

        <div className="container relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Last updated: December 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-neutral">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-0">Introduction</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-0 leading-relaxed">
                Mr. Air Services (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4">Information We Collect</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              We may collect personal information that you voluntarily provide when you:
            </p>
            <ul className="list-none pl-0 space-y-3 mb-6">
              {[
                'Fill out a contact form or request a quote',
                'Schedule a service appointment',
                'Sign up for our newsletter or promotions',
                'Apply for financing',
                'Communicate with us via phone, email, or chat',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              This information may include your name, email address, phone number, physical address, and details about your HVAC system.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">How We Use Your Information</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-none pl-0 space-y-3 mb-6">
              {[
                'Provide and improve our HVAC services',
                'Respond to your inquiries and service requests',
                'Schedule and manage appointments',
                'Process payments and financing applications',
                'Send service reminders and promotional communications',
                'Analyze website usage to improve our online experience',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">Information Sharing</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-none pl-0 space-y-3 mb-6">
              {[
                'Service providers who assist in our operations (payment processors, scheduling software)',
                'Financing partners when you apply for financing',
                'Legal authorities when required by law',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">Cookies and Tracking</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              Our website uses cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">Data Security</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">Your Rights</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-none pl-0 space-y-3 mb-6">
              {[
                'Access the personal information we hold about you',
                'Request correction of inaccurate information',
                'Request deletion of your information',
                'Opt out of marketing communications',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 mt-10">
              <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-0">Contact Us</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                <strong className="text-neutral-black dark:text-white">Mr. Air Services</strong>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                Phone: <a href="tel:+18324371000" className="text-secondary hover:underline">(832) 437-1000</a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-0">
                Email: <a href="mailto:coolsavertuneups@mrairservices.com" className="text-secondary hover:underline">coolsavertuneups@mrairservices.com</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-neutral-black dark:text-white mb-4 mt-10">Changes to This Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-0 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function PrivacyPolicyPage() {
  const blocks = await getPageData();

  // If CMS data is available and has blocks, use dynamic rendering
  if (blocks && blocks.length > 0) {
    return <BlockRenderer blocks={blocks} />;
  }

  // Fall back to hardcoded content
  return <HardcodedPrivacyPolicy />;
}
