import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SAMPLE_POSTS } from "@/lib/blog-data";
import { db } from "@/lib/db";
import { BookOpen } from "lucide-react";
import { BlogSearchList, SerializedBlogPost } from "@/components/blog/BlogSearchList";

export const revalidate = 60; // Revalidate blog page every 60 seconds

export const metadata = constructMetadata({
  title: `Blog & Technical SEO Knowledge Hub | ${siteConfig.name}`,
  description:
    "In-depth guides on technical SEO, JSON-LD structured data schemas, AI humanizer techniques, and developer tool optimization.",
  canonicalUrl: `${siteConfig.url}/blog`,
});

export default async function BlogIndexPage() {
  const breadcrumbs = [{ name: "Blog", url: "/blog" }];

  let dbPosts = await db.blogPost
    .findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        readingTime: true,
        author: true,
        createdAt: true,
      },
    })
    .catch((err: Error) => {
      console.error("[blog/page] DB fetch failed:", err.message);
      return [];
    });

  let serializedPosts: SerializedBlogPost[] = [];

  if (dbPosts.length > 0) {
    serializedPosts = dbPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readingTime: p.readingTime,
      author: p.author,
      createdAt: p.createdAt ? p.createdAt.toISOString() : undefined,
    }));
  } else {
    serializedPosts = SAMPLE_POSTS.map((p, idx) => ({
      id: `sample-${idx}`,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readingTime: p.readTime,
      author: p.author,
    }));
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
          <BookOpen className="w-4 h-4" /> Editorial & Knowledge Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          SEO & Web Development Insights
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Expert guides on technical SEO optimization, structured data schemas, AI content humanization, and developer utilities.
        </p>
      </div>

      <BlogSearchList posts={serializedPosts} />
    </div>
  );
}
