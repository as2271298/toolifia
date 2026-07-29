import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { CATEGORIES } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { SearchBar } from "@/components/common/SearchBar";
import { ToolCard } from "@/components/common/ToolCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { AdBanner } from "@/components/monetization/AdBanner";
import { TrustpilotBadge } from "@/components/trustpilot/TrustpilotBadge";
import {
  Sparkles,
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Mail,
  Star,
  Users,
  Award,
} from "lucide-react";

export default function HomePage() {
  const trendingTools = TOOLS.filter((t) => t.trending).slice(0, 6);
  const featuredCategories = CATEGORIES.slice(0, 12);

  const homeFaqs = [
    {
      question: "Are all tools on Toolifia 100% free to use?",
      answer: "Yes, 100% of our online tools, calculators, AI humanizers, and generators are completely free with zero hidden subscriptions or paywalls.",
    },
    {
      question: "Do I need to create an account or log in?",
      answer: "No registration is required. You can start using any tool instantly in your web browser.",
    },
    {
      question: "Is my data safe and private when using these tools?",
      answer: "Absolutley. Processing for image resizers, counters, encoders, and calculators happens locally inside your browser client.",
    },
    {
      question: "Can I use Toolifia tools programmatically via API?",
      answer: "Yes! Every tool includes a dedicated JSON REST API endpoint tab for developers.",
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative text-center py-16 sm:py-24 rounded-3xl bg-gradient-to-b from-brand-500/5 via-indigo-500/5 to-transparent border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 text-xs font-extrabold uppercase tracking-wider border border-brand-500/20">
            <Sparkles className="w-4 h-4" /> Next-Generation AI & SEO Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            World-Class Free Online Tools & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Utilities
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Over 300+ free online tools for AI text humanization, technical SEO, PDF conversion, developer formatters, calculators, and generators.
          </p>

          <div className="flex justify-center pt-2">
            <SearchBar placeholder="Search 300+ free tools (e.g. AI Humanizer, Meta Tag Generator)..." />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-slate-500 pt-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free & Unlimited
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-500" /> No Account Required
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Instant Browser Execution
            </div>
          </div>

          {/* Trustpilot Partner Badge */}
          <div className="pt-2 flex justify-center">
            <TrustpilotBadge variant="hero" />
          </div>
        </div>
      </section>

      <AdBanner slot="headerBanner" />

      {/* Trending Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-500" /> High Usage Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Trending Online Utilities
            </h2>
          </div>
          <Link
            href="/#categories"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            Explore All Tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* AI Features Powerhouse Highlight */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
              AI Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Bypass AI Content Detectors & Humanize Writing
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transform generic ChatGPT output into engaging, natural, human-like prose with sentence length variance and tone adjustment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/tool/ai-humanizer"
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
              >
                Try AI Humanizer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tool/ai-detector"
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all"
              >
                Scan AI Probability
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-bold text-purple-400">Live AI Output Sample</span>
              <span className="text-emerald-400 font-bold">98% Human Score</span>
            </div>
            <p className="leading-relaxed text-slate-200">
              "We engineered our platform around modularity and speed. By structuring content cleanly, your readers stay engaged while your search engine rankings improve organically."
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section id="categories" className="space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            35+ Specialized Categories
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Browse Tools by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Platform Statistics Counter */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">300+</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Working Tools</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-200">10M+</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Monthly Runs</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-3xl sm:text-4xl font-black text-emerald-500">100%</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Free Forever</div>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">4.9/5</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">User Rating</div>
        </div>
      </section>

      {/* Blog & Knowledge Hub Teaser */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-brand-600 dark:text-brand-400">
            <BookOpen className="w-4 h-4" /> SEO & Web Development Guides
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learn Technical SEO & Content Optimization
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Explore our blog articles covering JSON-LD schemas, Core Web Vitals, AI humanization techniques, and developer best practices.
          </p>
        </div>

        <Link
          href="/blog"
          className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shrink-0 flex items-center gap-2 transition-all"
        >
          Read Blog Articles <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about using Toolifia free online tools
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={homeFaqs} />
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-700 text-white shadow-2xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Stay Updated with New Tools & Features
          </h2>
          <p className="text-brand-100 text-sm leading-relaxed">
            Subscribe to our monthly newsletter for new tool releases, SEO optimization tips, and developer guides.
          </p>
        </div>

        <NewsletterForm endpoint="https://formspree.io/f/xqerwaog" />
      </section>
    </div>
  );
}
