import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  const hostName = siteConfig.url.replace(/^https?:\/\//, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tool/", "/category/", "/blog/", "/tools", "/contact", "/privacy", "/terms", "/llms.txt", "/_next/static/"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/_next/static/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "msnbot",
        allow: ["/", "/_next/static/"],
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
        ],
        allow: ["/", "/_next/static/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: hostName,
  };
}

