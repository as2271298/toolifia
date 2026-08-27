import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { TOOLS } from "@/config/tools.registry";
import { CATEGORIES } from "@/config/categories.registry";
import { SAMPLE_POSTS } from "@/lib/blog-data";
import { db } from "@/lib/db";

// SEO-priority boosted slugs (exact-match keyword target articles from GSC analysis)
const SEO_PRIORITY_SLUGS = [
  "meta-title-length-checker-complete-guide-and-best-practices",
  "keyword-density-checker-complete-guide-and-best-practices",
  "mastering-json-ld-schema-engineering-for-google-rich-snippets",
  "base64-encoding-explained-uses-and-misuses",
  "ai-summarizer-complete-guide-and-best-practices",
  "complete-guide-css-gradients-linear-radial-conic",
  "git-commit-message-best-practices-conventional-commits",
  "problems-users-face-with-emi-calculator-websites",
  "challenges-building-cross-platform-markdown-editor",
  "ai-resume-builder-challenges-for-mis-students",
  "best-toolify-ai-alternative-2026",
  "best-free-ai-humanizer-no-signup-2026",
  "best-free-ai-video-generator-higgsfield-alternative-2025",
  "how-to-make-ai-videos-for-free-tiktok-reels-shorts",
  "kling-ai-free-online-alternative-toolifia",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // ── Static pages ─────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,              lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${baseUrl}/tools`,   lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/blog`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/terms`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── Category pages ────────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Tool pages ────────────────────────────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // ── Blog posts — fetch ALL 304 from database ──────────────────────────────
  let allSlugs: { slug: string; createdAt: Date | null }[] = [];

  try {
    allSlugs = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: { slug: true, createdAt: true },
    });
  } catch (err) {
    console.error("[sitemap] DB fetch failed, using static fallback:", (err as Error).message);
  }

  // If DB fetch failed or returned empty, fall back to static SAMPLE_POSTS
  const blogEntries =
    allSlugs.length > 0
      ? allSlugs
      : SAMPLE_POSTS.map((p) => ({
          slug: p.slug,
          createdAt: p.date ? new Date(p.date) : new Date(),
        }));

  const blogPages: MetadataRoute.Sitemap = blogEntries.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.createdAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: SEO_PRIORITY_SLUGS.includes(post.slug) ? 0.9 : 0.75,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages];
}


