import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
          data-zone="264116"
          data-cfasync="false"
        />

        {/* Popunder script for toolifia.netlify.app */}
        <Script
          src="https://pl30550454.effectivecpmnetwork.com/36/16/50/36165061d6f2846611502f633be82805.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Social Bar script for toolifia.netlify.app right before closing </body> */}
        <Script
          src="https://pl30550456.effectivecpmnetwork.com/16/7d/ba/167dba2d2aa34a8d1319898cf8926703.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
