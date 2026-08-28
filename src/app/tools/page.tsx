import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { TOOLS } from "@/config/tools.registry";
import { CATEGORIES, getToolsForCategory } from "@/config/categories.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AdBanner } from "@/components/monetization/AdBanner";
import { PosterAd } from "@/components/monetization/PosterAd";
import { Sparkles, Grid, Wrench } from "lucide-react";

export const metadata = constructMetadata({
  title: `All 130+ Free Online Tools & AI Utilities | ${siteConfig.name}`,
  description:
    "Explore the complete directory of 130+ free online tools for AI image generation, AI video creation, text humanizing, SEO checkers, dev formatters, calculators, and converters.",
  canonicalUrl: `${siteConfig.url}/tools`,
});

export default function AllToolsPage() {
  const breadcrumbs = [{ name: "All Tools", url: "/tools" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 text-xs font-extrabold uppercase tracking-wider border border-brand-500/20">
          <Wrench className="w-4 h-4" /> Full Directory ({TOOLS.length} Tools)
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          All Free Online Tools & AI Utilities
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          100% free browser tools with zero signup. Click any tool to run it instantly.
        </p>
      </div>

      {/* Ad: Below header — double stack */}
      <AdBanner slot="headerBanner" variant="leaderboard" />
      <PosterAd layout="horizontal" theme="violet" />
      <AdBanner slot="inArticleBanner" variant="leaderboard" />

      {/* Featured AI & Video Highlights */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 border border-purple-500/30 text-white space-y-4">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> New AI Generation Tools
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Featured Next-Gen AI Generators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.filter(t => ["ai-image-generator", "ai-video-generator", "ai-humanizer", "ai-detector"].includes(t.slug)).map(t => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </div>

      {/* Ad: After featured block — double stack */}
      <AdBanner slot="inArticleBanner" variant="leaderboard" />
      <PosterAd layout="horizontal" theme="cyan" />
      <AdBanner slot="sidebarBanner" variant="leaderboard" />

      {/* Tools Grouped by Category — ad injected every 3 categories */}
      <div className="space-y-12">
        {CATEGORIES.map((cat, catIndex) => {
          const categoryTools = getToolsForCategory(cat.slug, TOOLS);
          if (categoryTools.length === 0) return null;

          return (
            <>
              <section key={cat.slug} id={cat.slug} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cat.name}</h2>
                      <p className="text-xs text-slate-500">{cat.description} ({categoryTools.length} tools)</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>

              {/* Inject BOTH a banner ad AND a poster after EVERY category block */}
              <AdBanner key={`ad-${catIndex}`} slot="inArticleBanner" variant="leaderboard" />
              <PosterAd key={`poster-${catIndex}`} layout="horizontal" />
              {catIndex % 3 === 0 && (
                <AdBanner key={`ad2-${catIndex}`} slot="toolFooterBanner" variant="leaderboard" />
              )}
            </>
          );
        })}
      </div>

      {/* Ad: Bottom of page — triple stack */}
      <AdBanner slot="toolFooterBanner" variant="leaderboard" />
      <PosterAd layout="horizontal" theme="emerald" />
      <AdBanner slot="headerBanner" variant="leaderboard" />
      <PosterAd layout="horizontal" theme="dark" />
    </div>
  );
}
