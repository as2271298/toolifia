export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  creator: string;
  twitterHandle: string;
  links: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  monetization: {
    adsensePublisherId: string;
    enableAds: boolean;
    slots: {
      headerBanner: string;
      sidebarBanner: string;
      inArticleBanner: string;
      toolFooterBanner: string;
    };
  };
  ai: {
    defaultProvider: "openai" | "gemini" | "claude" | "local";
    maxTokens: number;
  };
  contactEmail: string;
}

export const siteConfig: SiteConfig = {
  name: "Toolifia",
  shortName: "Toolifia",
  tagline: "World-Class Free AI & SEO Web Utilities",
  description:
    "Over 300+ free online tools for AI text humanization, SEO optimization, PDF converting, developer formatting, calculations, generators, and image utilities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://toolifia.vercel.app",
  ogImage: "https://toolifia.vercel.app/og-default.png",
  creator: "Toolifia Inc.",
  twitterHandle: "@toolifia",
  links: {
    github: "https://github.com/toolifia",
    twitter: "https://twitter.com/toolifia",
    linkedin: "https://linkedin.com/company/toolifia",
  },
  monetization: {
    adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-0000000000000000",
    enableAds: true,
    slots: {
      headerBanner: "1234567890",
      sidebarBanner: "0987654321",
      inArticleBanner: "1122334455",
      toolFooterBanner: "5544332211",
    },
  },
  ai: {
    defaultProvider: "gemini",
    maxTokens: 2048,
  },
  contactEmail: "support@toolifia.com",
};
