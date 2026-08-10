import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { TOOLS } from "@/config/tools.registry";
import { CATEGORIES } from "@/config/categories.registry";
import { SAMPLE_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Blog posts — dynamically includes ALL posts including newly added ones
  const blogPages: MetadataRoute.Sitemap = SAMPLE_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // High-priority SEO target blog posts (exact-match keyword articles)
  const seoTargetSlugs = [
    "problems-users-face-with-emi-calculator-websites",
    "challenges-building-cross-platform-markdown-editor",
    "ai-resume-builder-challenges-for-mis-students",
    "best-toolify-ai-alternative-2026",
    "best-free-ai-humanizer-no-signup-2026",
    "best-free-ai-video-generator-higgsfield-alternative-2025",
  ];

  const boostedBlogPages: MetadataRoute.Sitemap = blogPages.map((page) => ({
    ...page,
    priority: seoTargetSlugs.some((s) => page.url.includes(s)) ? 0.9 : 0.75,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...boostedBlogPages];
}
