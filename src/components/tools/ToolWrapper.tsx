"use client";

import { useState } from "react";
import { ToolDef, TOOLS } from "@/config/tools.registry";
import { Breadcrumb } from "../common/Breadcrumb";
import { ShareButtons } from "../common/ShareButtons";
import { RatingStars } from "../common/RatingStars";
import { FAQAccordion } from "../common/FAQAccordion";
import { ToolCard } from "../common/ToolCard";
import { AdBanner } from "../monetization/AdBanner";
import { PosterAd } from "../monetization/PosterAd";
import { JsonLd } from "../seo/JsonLd";
import {
  generateSoftwareApplicationSchema,
  generateFaqSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Sparkles, Code, CheckCircle2, AlertTriangle, Lightbulb, ThumbsUp } from "lucide-react";

export function ToolWrapper({
  tool,
  children,
}: {
  tool: ToolDef;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"tool" | "api">("tool");

  const breadcrumbs = [
    { name: "Tools", url: "/tools" },
    { name: tool.category, url: `/category/${tool.category}` },
    { name: tool.name, url: `/tool/${tool.slug}` },
  ];

  const relatedTools = TOOLS.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 3);

  const softwareSchema = generateSoftwareApplicationSchema(tool);
  const faqSchema = generateFaqSchema(tool.faqs);
  const howToSchema = generateHowToSchema(tool.name, tool.howTo);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: tool.name, url: `${siteConfig.url}/tool/${tool.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[softwareSchema, faqSchema, howToSchema, breadcrumbSchema]} />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbs} />

        {/* Header Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                {tool.category.replace("-", " ")}
              </span>
              {tool.trending && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Popular
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {tool.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {tool.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <RatingStars initialRating={tool.rating} reviewsCount={tool.reviewsCount} />
            <ShareButtons title={tool.name} url={`${siteConfig.url}/tool/${tool.slug}`} />
          </div>
        </div>

        <AdBanner slot="headerBanner" />

        {/* Tool vs API Mode Switch */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("tool")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "tool"
                ? "border-brand-600 dark:border-brand-400 text-brand-600 dark:text-brand-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Sparkles className="w-4 h-4" /> Interactive Tool
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "api"
                ? "border-brand-600 dark:border-brand-400 text-brand-600 dark:text-brand-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Code className="w-4 h-4" /> REST API Docs
          </button>
        </div>

        {/* Main Content Area */}
        {activeTab === "tool" ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
            {children}
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 shadow-xl mb-12 space-y-4 font-mono text-xs sm:text-sm">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Code className="w-4 h-4 text-brand-400" /> Programmatic API Endpoint
            </h3>
            <p className="text-slate-400 font-sans">
              Execute {tool.name} programmatically using our high-speed JSON REST API.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto text-emerald-400">
              POST {siteConfig.url}/api/tools/{tool.slug}
            </div>
            <div className="pt-2 text-slate-300 font-sans font-semibold">Example cURL Request:</div>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 overflow-x-auto">
{`curl -X POST "${siteConfig.url}/api/tools/${tool.slug}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "Your sample text or parameters here"
  }'`}
            </pre>
          </div>
        )}

        <AdBanner slot="inArticleBanner" />

        {/* Educational SEO & Guide Content */}
        <div className="mt-12 space-y-12">
          {/* How to use */}
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> How to Use {tool.name}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tool.howTo.map((step, idx) => (
                <li key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="w-7 h-7 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs flex items-center justify-center mb-3">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Features & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Key Features
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {tool.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-brand-500" /> Benefits
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {tool.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Common Mistakes */}
          <section className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Common Pitfalls to Avoid
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900/80 dark:text-amber-300/80">
              {tool.commonMistakes.map((mistake, i) => (
                <li key={i}>• {mistake}</li>
              ))}
            </ul>
          </section>

          {/* FAQ Section */}
          <section>
            {/* Poster ad directly before FAQ for high visibility */}
            <PosterAd layout="horizontal" className="mb-8" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={tool.faqs} />
          </section>

          {/* Related SEO Articles & Guides */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" /> Guides & Articles for {tool.name}
              </h2>
              <a href="/blog" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">View All Blogs →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: `The Definitive Guide to ${tool.name}: Best Practices`, slug: `${tool.slug}-complete-guide-and-best-practices`, desc: `Master ${tool.name} with step-by-step implementations and benchmarks.` },
                { title: `How to Solve ${tool.name} Problems`, slug: `how-to-solve-${tool.slug}-problems-in-2026`, desc: `Troubleshooting, edge cases, and automation methods for ${tool.name}.` },
                { title: `Top Real-World Use Cases for ${tool.name}`, slug: `top-use-cases-and-examples-for-${tool.slug}`, desc: `Explore production examples and workflows powered by ${tool.name}.` }
              ].map((art, i) => (
                <a key={i} href={`/blog/${art.slug}`} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-lg transition-all group">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 mb-2 block">Technical Article</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1.5 line-clamp-2">{art.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{art.desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Related {tool.category.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((rel) => (
                  <ToolCard key={rel.slug} tool={rel} />
                ))}
              </div>
            </section>
          )}

          {/* Poster Ad at bottom of tool page */}
          <PosterAd layout="horizontal" theme="dark" className="mt-8" />
        </div>
      </div>
    </>
  );
}
