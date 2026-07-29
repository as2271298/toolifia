import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustpilotBadge } from "@/components/trustpilot/TrustpilotBadge";
import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
    sameAs: [siteConfig.links.github, siteConfig.links.twitter, siteConfig.links.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tool/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="c7d56998-6f55-46a8-97d5-b09dfc212854" />
        {/* TrustBox script */}
        <Script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
          async
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[orgSchema, websiteSchema]} />

        {/* Multitag / Glad tag Script */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="264982"
          async
          data-cfasync="false"
        />

        {/* Popunder script for toolifia.vercel.app */}
        <Script
          src="https://pl30549937.effectivecpmnetwork.com/de/c0/f0/dec0f0d1f5c6bb531bdc77c26daeb45c.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TrustpilotBadge variant="floating" />

        {/* Social Bar script for toolifia.vercel.app right before closing </body> */}
        <Script
          src="https://pl30549940.effectivecpmnetwork.com/c2/b9/7a/c2b97a6f7a2f3d0dfd5d888ca701bdfd.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
