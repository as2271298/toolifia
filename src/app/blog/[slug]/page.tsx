import Link from "next/link";
import { notFound } from "next/navigation";
import { SAMPLE_POSTS, BlogPostData } from "@/lib/blog-data";
import { db } from "@/lib/db";
import { TOOLS, ToolDef } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ShareButtons } from "@/components/common/ShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { MarkdownContent } from "@/components/common/MarkdownContent";
import { siteConfig } from "@/config/site.config";
import { constructMetadata } from "@/lib/seo";
import { Clock, User, Calendar, BookOpen, Sparkles, ArrowRight, Zap } from "lucide-react";

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

function getRelatedToolsForPost(post: { slug: string; title: string; category?: string; content?: string }): ToolDef[] {
  const text = `${post.title} ${post.slug} ${post.category || ""} ${post.content?.slice(0, 3000) || ""}`.toLowerCase();

  const rules: { triggers: string[]; slug: string }[] = [
    { triggers: ["video", "kling", "higgsfield", "runway", "pika", "sora", "text-to-video", "reel", "shorts"], slug: "ai-video-generator" },
    { triggers: ["image", "photo", "picture", "art", "midjourney", "diffusion", "image-to-image"], slug: "ai-image-generator" },
    { triggers: ["humanize", "humanizer", "burstiness", "perplexity", "undetectable", "bypass"], slug: "ai-humanizer" },
    { triggers: ["detector", "detect", "chatgpt detection", "gptzero", "turnitin"], slug: "ai-detector" },
    { triggers: ["prompt", "chatgpt prompt", "prompt engineering", "crispe"], slug: "prompt-generator" },
    { triggers: ["meta tag", "meta description", "title tag", "open graph", "serp"], slug: "meta-tag-generator" },
    { triggers: ["schema", "json-ld", "structured data"], slug: "schema-generator" },
    { triggers: ["keyword", "density", "keyword frequency"], slug: "keyword-density-checker" },
    { triggers: ["robots", "robots.txt"], slug: "robots-txt-generator" },
    { triggers: ["sitemap", "xml sitemap"], slug: "xml-sitemap-validator" },
    { triggers: ["json", "pretty print", "beautify json", "json formatter"], slug: "json-formatter" },
    { triggers: ["word count", "character count", "reading time"], slug: "word-counter" },
    { triggers: ["base64", "encode", "decode"], slug: "base64-encoder" },
    { triggers: ["hash", "md5", "sha256"], slug: "hash-generator" },
    { triggers: ["uuid", "guid"], slug: "uuid-generator" },
    { triggers: ["qr code", "qr generator"], slug: "qr-generator" },
    { triggers: ["password", "secure password"], slug: "password-generator" },
    { triggers: ["bmi", "body mass"], slug: "bmi-calculator" },
    { triggers: ["loan", "emi", "interest"], slug: "emi-calculator" },
  ];

  const matchedSlugs = new Set<string>();

  for (const rule of rules) {
    if (rule.triggers.some((t) => text.includes(t))) {
      matchedSlugs.add(rule.slug);
      if (matchedSlugs.size >= 4) break;
    }
  }

  // Category fallback
  const cat = (post.category || "").toLowerCase();
  let categoryFilter = "";
  if (cat.includes("ai")) categoryFilter = "ai-tools";
  else if (cat.includes("seo")) categoryFilter = "seo-tools";
  else if (cat.includes("dev") || cat.includes("code")) categoryFilter = "developer-tools";
  else if (cat.includes("calc")) categoryFilter = "calculator-tools";
  else if (cat.includes("text") || cat.includes("content")) categoryFilter = "text-tools";

  if (categoryFilter) {
    const catTools = TOOLS.filter((t) => t.category === categoryFilter);
    for (const t of catTools) {
      if (!matchedSlugs.has(t.slug)) {
        matchedSlugs.add(t.slug);
        if (matchedSlugs.size >= 4) break;
      }
    }
  }

  // Global popular fallbacks to guarantee 4 high quality tools
  const fallbacks = [
    "ai-video-generator",
    "ai-image-generator",
    "ai-humanizer",
    "ai-detector",
    "meta-tag-generator",
    "json-formatter",
  ];
  for (const slug of fallbacks) {
    if (!matchedSlugs.has(slug)) {
      matchedSlugs.add(slug);
      if (matchedSlugs.size >= 4) break;
    }
  }

  return Array.from(matchedSlugs)
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter((t): t is ToolDef => Boolean(t))
    .slice(0, 4);
}

function getRelatedArticles(currentSlug: string, currentCategory?: string): BlogPostData[] {
  const others = SAMPLE_POSTS.filter((p) => p.slug !== currentSlug);
  const sameCat = others.filter((p) => p.category.toLowerCase() === (currentCategory || "").toLowerCase());
  if (sameCat.length >= 2) return sameCat.slice(0, 2);
  return others.slice(0, 2);
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

  const relatedTools = getRelatedToolsForPost(post);
  const relatedArticles = getRelatedArticles(post.slug, post.category);

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
    <div className="bg-[#04050a] min-h-screen text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd data={articleSchema} />

      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumb items={breadcrumbs} />

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            {post.category}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-slate-400 font-medium">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Enjoyed this guide? Share it with your friends or colleagues.
          </div>
          <ShareButtons title={post.title} url={`${siteConfig.url}/blog/${post.slug}`} />
        </div>

        {/* ── RELATED FREE TOOLS SECTION AT EVERY BLOG END ── */}
        <section className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Recommended Free Tools
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Free Online Tools Mentioned In This Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Try these 100% free web utilities directly in your browser — zero signup or credit card required.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors shrink-0"
            >
              Explore All 300+ Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2x2 Grid of Related Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {/* Quick Tool Launch CTA Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-indigo-950/60 border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Ready to create or test online?
              </h3>
              <p className="text-xs text-slate-400">
                All 300+ tools run directly in your browser with no account or email needed.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/tool/ai-video-generator"
                className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-violet-600 hover:opacity-90 text-white font-bold text-xs shadow-lg transition-all"
              >
                Try AI Video Generator
              </Link>
              <Link
                href="/tools"
                className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* ── MORE GUIDES & TUTORIALS ── */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                More Guides &amp; Tutorials
              </h3>
              <Link href="/blog" className="text-xs font-semibold text-violet-400 hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((art) => (
                <Link
                  key={art.slug}
                  href={`/blog/${art.slug}`}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/40 hover:bg-white/[0.05] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                      {art.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-white/[0.05]">
                    <span>{art.readTime}</span>
                    <span className="text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
