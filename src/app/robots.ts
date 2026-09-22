import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  const hostName = siteConfig.url.replace(/^https?:\/\//, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Mediapartners-Google",
          "AdsBot-Google",
          "Bingbot",
          "msnbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "cohere-ai",
          "Bytespider",
          "Applebot",
          "YouBot",
          "anthropic-ai",
          "Diffbot",
          "facebookexternalhit",
          "Twitterbot",
        ],
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: hostName,
  };
}

