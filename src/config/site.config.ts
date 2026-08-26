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
    facebook: string;
    instagram: string;
    youtube: string;
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
  tagline: "Free AI Tools, SEO Utilities & Web Tools — No Signup",
  description:
    "Toolifia offers 300+ free online AI tools, SEO tools, developer utilities, calculators, and converters. No account required. The best Toolify AI alternative with tools that work directly in your browser.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://toolifia.vercel.app",
  ogImage: "https://toolifia.vercel.app/og-default.png",
  creator: "Toolifia Inc.",
  twitterHandle: "@toolifia",
  links: {
    github: "",
    twitter: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
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
