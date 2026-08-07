import { notFound } from "next/navigation";
import { CATEGORIES } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PosterAd } from "@/components/monetization/PosterAd";
import { siteConfig } from "@/config/site.config";
import { constructMetadata } from "@/lib/seo";
import { Sparkles, Grid } from "lucide-react";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

// Custom SEO per category
const CATEGORY_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  "ai-tools": {
    title: "Free AI Tools Online — No Signup, No Limits | Toolifia",
    description: "Explore 50+ free AI tools: AI video generator (Kling 2.1), AI text humanizer, AI content detector, prompt generator, story writer & more. 100% free, runs in-browser. Best Toolify & Futurepedia alternative.",
    keywords: "free ai tools, ai tools online free, ai humanizer free, ai video generator, ai content detector, best free ai tools 2025, toolify alternative"
  },
  "seo-tools": {
    title: "Free SEO Tools Online — Meta Tags, Schema, Sitemap | Toolifia",
    description: "15+ free SEO tools: meta tag generator, JSON-LD schema generator, sitemap builder, robots.txt generator, keyword density checker, Open Graph generator. No account required.",
    keywords: "free seo tools online, meta tag generator free, schema markup generator, sitemap generator free, robots txt generator, keyword density checker, seo tools no signup"
  },
  "developer-tools": {
    title: "Free Developer Tools Online — JSON, Base64, UUID, Hash | Toolifia",
    description: "20+ free developer utilities: JSON formatter, Base64 encoder/decoder, UUID generator, MD5/SHA256 hash generator, HTML formatter, regex tester, JWT decoder. No account needed.",
    keywords: "free developer tools online, json formatter, base64 encoder, uuid generator, hash generator, regex tester, jwt decoder, developer utilities free"
  },
  "calculator-tools": {
    title: "Free Online Calculators — BMI, Loan, Percentage, Scientific | Toolifia",
    description: "10+ free online calculators: BMI calculator, loan & EMI calculator, compound interest calculator, scientific calculator, GPA calculator, age calculator, percentage calculator. Instant results.",
    keywords: "free online calculator, bmi calculator, loan calculator, compound interest calculator, scientific calculator, gpa calculator, age calculator"
  },
  "converter-tools": {
    title: "Free Unit Converter Online — Length, Weight, Temperature, Currency | Toolifia",
    description: "Convert units instantly for free: length, weight, temperature, speed, currency, binary, hex, roman numerals, and color codes. No account required.",
    keywords: "free unit converter, length converter, weight converter, temperature converter, currency converter, binary converter, hex converter"
  },
  "text-tools": {
    title: "Free Text Tools Online — Word Counter, Case Converter, Rewriter | Toolifia",
    description: "10+ free text utilities: word counter, character counter, case converter, text rewriter, slug generator, Lorem Ipsum generator, markdown editor. Instant results, no signup.",
    keywords: "free text tools, word counter online, case converter, text rewriter, slug generator, lorem ipsum generator, markdown editor free"
  },
  "image-tools": {
    title: "Free Image Tools Online — QR Code, Color Picker, Image Resizer | Toolifia",
    description: "Free image utilities: QR code generator, barcode generator, color picker, image resizer. Process images directly in your browser with no upload limits.",
    keywords: "free image tools online, qr code generator free, color picker online, image resizer free, barcode generator"
  },
  "generator-tools": {
    title: "Free Online Generators — Password, UUID, Lorem Ipsum, Color Palette | Toolifia",
    description: "Free generator tools: random password generator, UUID generator, Lorem Ipsum text generator, color palette generator, CSS gradient generator. All free, no signup.",
    keywords: "free online generator, password generator, uuid generator, lorem ipsum generator, color palette generator, css gradient generator"
  },
  "security-tools": {
    title: "Free Security Tools Online — Password Checker, Hash Generator | Toolifia",
    description: "Free online security tools: password strength checker, random password generator, MD5/SHA256 hash generator. Check password security instantly in your browser.",
    keywords: "password strength checker, password generator free, hash generator, online security tools, md5 generator, sha256 generator"
  },
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return constructMetadata();

  const custom = CATEGORY_SEO[params.slug];
  const toolCount = TOOLS.filter((t) => t.category === params.slug).length;

  return constructMetadata({
    title: custom?.title || `${cat.name} — ${toolCount} Free Online Tools | Toolifia`,
    description: custom?.description || `${toolCount} free ${cat.name.toLowerCase()} that work directly in your browser. No signup required. ${cat.description}`,
    canonicalUrl: `${siteConfig.url}/category/${cat.slug}`,
    ...(custom?.keywords ? { keywords: custom.keywords } : {}),
  });
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryTools = TOOLS.filter((t) => t.category === category.slug);

  const breadcrumbs = [
    { name: "Categories", url: "/#categories" },
    { name: category.name, url: `/category/${category.slug}` },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
            <Sparkles className="w-4 h-4" /> Category Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* --- Banner Ad between hero and tool grid --- */}
      <PosterAd layout="horizontal" className="mb-4" />

      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Available Tools ({categoryTools.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All tools in {category.name} are 100% free and web-based
          </p>
        </div>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-800">
          <Grid className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Tools coming soon</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            We are constantly adding new tools to the {category.name} collection. Check back shortly!
          </p>
        </div>
      )}

      {/* --- Leaderboard-style poster ad below tool grid --- */}
      <PosterAd layout="horizontal" className="mt-8" />

      {/* SEO Content Block */}
      <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Free {category.name} — No Account Required
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              All {categoryTools.length} tools in the {category.name} collection on Toolifia are 100% free with no account registration, no email signup, and no credit card required. Every tool runs directly in your browser using client-side processing for instant results.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Why Use Toolifia&apos;s {category.name}?
            </h2>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              {[
                "100% free — no hidden paywalls or subscription tiers",
                "No account or signup required to use any tool",
                "Runs entirely in-browser — no data uploaded to servers",
                "REST API access for every tool for developers",
                "Mobile-friendly responsive design",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="/tools" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">→ Browse All 300+ Free Tools</a>
          <a href="/blog" className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline">→ Read Tool Guides & Tutorials</a>
          <a href="/tool/ai-video-generator" className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline">→ Try AI Video Generator Free</a>
        </div>
      </section>
    </div>
  );
}
