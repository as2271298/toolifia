import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustpilotBadge } from "@/components/trustpilot/TrustpilotBadge";
import { ProductHuntBadge } from "@/components/producthunt/ProductHuntBadge";
import { constructMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = constructMetadata();

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

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
      email: siteConfig.contactEmail,
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
    ],
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "12847",
      bestRating: "5",
    },
    url: siteConfig.url,
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="c7d56998-6f55-46a8-97d5-b09dfc212854" />

        {/* Multitag / Industrious Tag Script */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="264982"
          strategy="afterInteractive"
          data-cfasync="false"
        />

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <JsonLd data={[orgSchema, websiteSchema, appSchema]} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#04050a] text-white antialiased selection:bg-violet-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TrustpilotBadge variant="floating" />
        <ProductHuntBadge variant="floating" />

        {/* Social Bar script (Adsterra) — loaded before closing body tag */}
        <Script
          src="https://pl30549940.effectivecpmnetwork.com/c2/b9/7a/c2b97a6f7a2f3d0dfd5d888ca701bdfd.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
