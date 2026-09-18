import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustpilotBadge } from "@/components/trustpilot/TrustpilotBadge";
import { ProductHuntBadge } from "@/components/producthunt/ProductHuntBadge";
import { CookieConsent } from "@/components/common/CookieConsent";
import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04050a",
  colorScheme: "dark",
};

export const metadata: Metadata = constructMetadata();

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const hasValidGA = Boolean(GA_ID && GA_ID !== "G-TOOLIFIA01" && GA_ID.startsWith("G-"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization schema — includes all social profiles so Google knows they belong to Toolifia
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
    contactPoint: {
      "@type": "ContactPoint",
      url: `${siteConfig.url}/contact`,
      contactType: "customer support",
      availableLanguage: "English",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.youtube,
      siteConfig.links.tiktok,
    ].filter(Boolean),
  };

  // WebSite schema — enables Google Sitelinks Searchbox
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // SoftwareApplication schema — helps rank for "free tools" searches
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteConfig.url,
  };

  return (
    <html lang="en" className={`dark ${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="c7d56998-6f55-46a8-97d5-b09dfc212854" />
        <meta name="keywords" content="free online tools, ai humanizer free, ai detector free, toolify alternative, free ai tools no signup, seo tools free, meta tag generator, keyword density checker, json formatter, word counter free, pdf converter online, text tools online, developer tools free, free calculator online, unit converter free, ai text humanizer, bypass ai detection, free prompt generator, schema markup generator, online tools no account" />

        {/* Google AdSense Site Verification & Ad Script — only load when active to protect Mobile PageSpeed */}
        {siteConfig.monetization.enableAds && (
          <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.monetization.adsensePublisherId}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}

        {/* Google Analytics 4 — only load if valid GA_ID configured */}
        {hasValidGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <JsonLd data={[orgSchema, websiteSchema, appSchema]} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#04050a] text-white antialiased selection:bg-violet-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TrustpilotBadge variant="floating" />
        <ProductHuntBadge variant="floating" />
        <CookieConsent />
      </body>
    </html>
  );
}
