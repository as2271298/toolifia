import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { TOOLS } from "@/config/tools.registry";
import { CATEGORIES } from "@/config/categories.registry";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://toolifia.vercel.app";

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // ── Tool pages (95 tools) ──────────────────────────────────────────────────
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ── Category pages ─────────────────────────────────────────────────────────
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ── Blog posts from PostgreSQL (all 285+ articles) ─────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (err) {
    // If DB is unreachable at build time, degrade gracefully with no blog routes
    console.error("[sitemap] Failed to fetch blog posts from DB:", err);
  }

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
