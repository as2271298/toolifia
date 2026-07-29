import { notFound } from "next/navigation";
import { SAMPLE_POSTS } from "@/lib/blog-data";
import { db } from "@/lib/db";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ShareButtons } from "@/components/common/ShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { MarkdownContent } from "@/components/common/MarkdownContent";
import { siteConfig } from "@/config/site.config";
import { constructMetadata } from "@/lib/seo";
import { Clock, User, Calendar, BookOpen } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const dbPosts = await db.blogPost.findMany({ select: { slug: true } }).catch(() => []);
  if (dbPosts.length > 0) {
    return dbPosts.map((p) => ({ slug: p.slug }));
  }
  return SAMPLE_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post = await db.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null);
  
  if (!post) {
    const sample = SAMPLE_POSTS.find((p) => p.slug === params.slug);
    if (!sample) return constructMetadata();
    post = {
      id: "sample",
      slug: sample.slug,
      title: sample.title,
      excerpt: sample.excerpt,
      content: sample.content,
      author: sample.author,
      category: sample.category,
      readingTime: sample.readTime,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return constructMetadata({
    title: `${post.title} | ${siteConfig.name} Blog`,
    description: post.excerpt,
    canonicalUrl: `${siteConfig.url}/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post = await db.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null);

  if (!post) {
    const sample = SAMPLE_POSTS.find((p) => p.slug === params.slug);
    if (sample) {
      post = {
        id: "sample",
        slug: sample.slug,
        title: sample.title,
        excerpt: sample.excerpt,
        content: sample.content,
        author: sample.author,
        category: sample.category,
        readingTime: sample.readTime,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const dateFormatted = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "July 26, 2026";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    datePublished: dateFormatted,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <Breadcrumb items={breadcrumbs} />

        {/* Article Header */}
        <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {dateFormatted}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readingTime}
              </span>
            </div>

            <ShareButtons title={post.title} url={`${siteConfig.url}/blog/${post.slug}`} />
          </div>
        </div>

        {/* Highlight Summary Callout Card */}
        {post.excerpt && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <BookOpen className="w-4 h-4" /> Executive Summary
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Rich Styled Article Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <MarkdownContent content={post.content} />
        </div>

        {/* Live Interactive Tool Call-to-Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Free Live Web Tool
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Try Toolifia's Interactive Tools for Free
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              No registration, no daily caps. Fast, client-side processing directly in your browser.
            </p>
          </div>
          <a
            href="/#tools"
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm hover:bg-slate-100 transition-all shadow-xl shrink-0 text-center"
          >
            Explore All 75+ Tools →
          </a>
        </div>
      </article>
    </>
  );
}
