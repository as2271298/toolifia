import { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { ToolDef } from "@/config/tools.registry";

export function constructMetadata({
  title = `${siteConfig.name} — Free AI Tools & Utilities Online`,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false,
  keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  keywords?: string;
} = {}): Metadata {
  const defaultKeywords = [
    "free online tools",
    "ai humanizer free",
    "ai detector free",
    "toolify alternative",
    "toolify ai alternative",
    "free ai tools no signup",
    "seo tools free",
    "meta tag generator",
    "keyword density checker",
    "json formatter",
    "word counter free",
    "pdf converter online",
    "text tools online",
    "developer tools free",
    "free calculator online",
    "unit converter free",
    "ai text humanizer",
    "bypass ai detection",
    "free prompt generator",
    "schema markup generator",
    "online tools no account",
    "ai tools directory",
    "best ai tools 2025",
    "free ai tools no account",
    "text to video ai free",
    "ai video generator free",
    "higgsfield alternative",
    "kling ai free",
    "toolify alternative free",
    "futurepedia alternative",
    "there's an ai for that alternative",
  ];

  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map(k => k.trim()) : defaultKeywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    verification: {
      google: "googlece21faa3a4ad7aa8",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateSoftwareApplicationSchema(tool: ToolDef) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    operatingSystem: "All",
    applicationCategory: "WebApplication",
    description: tool.description,
    url: `${siteConfig.url}/tool/${tool.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toString(),
      ratingCount: tool.reviewsCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(toolName: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${toolName}`,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
