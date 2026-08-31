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
  const dbSlugs = dbPosts.map((p) => ({ slug: p.slug }));
  const sampleSlugs = SAMPLE_POSTS.map((post) => ({ slug: post.slug }));

  // Deduplicate
  const allSlugsMap = new Map<string, { slug: string }>();
  for (const s of [...sampleSlugs, ...dbSlugs]) {
    allSlugsMap.set(s.slug, s);
  }
  return Array.from(allSlugsMap.values());
}

async function getPostBySlug(slug: string) {
  // Check static SAMPLE_POSTS first (fast, zero DB latency/errors)
  const sample = SAMPLE_POSTS.find((p) => p.slug === slug);
  if (sample) {
    return {
      id: `sample-${slug}`,
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

  // Fallback to database lookup with catch
  return await db.blogPost
    .findUnique({ where: { slug } })
    .catch(() => null);
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) return constructMetadata();

  const truncatedTitle = post.title.length > 46 ? `${post.title.slice(0, 46).trim()}...` : post.title;

  return constructMetadata({
    title: `${truncatedTitle} | ${siteConfig.name}`,
    description: post.excerpt,
    canonicalUrl: `${siteConfig.url}/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-[#04050a] min-h-screen text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd data={articleSchema} />

      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumb items={breadcrumbs} />

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-light">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-violet-400" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                {post.readingTime}
              </span>
            </div>

            <ShareButtons title={post.title} url={`${siteConfig.url}/blog/${post.slug}`} />
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-img:rounded-2xl">
          <MarkdownContent content={post.content} />
        </article>

        {/* Footer Share */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <ShareButtons title={post.title} url={`${siteConfig.url}/blog/${post.slug}`} />
        </div>
      </div>
    </div>
  );
}
