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
  Video,
  Play,
  Wand2,
  Lock,
  Cpu,
  Layers,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Free Online AI Tools — AI Humanizer, Video Generator, SEO Tools | Toolifia",
  description: "300+ free AI tools that run directly in your browser. AI text humanizer, text-to-video generator (Kling 2.1), SEO utilities, calculators & converters. No account needed. The best free alternative to Toolify, Futurepedia & TAAFT.",
  keywords: "free online tools no signup, best free ai tools 2025, toolify alternative, free ai tools directory, ai humanizer free, ai video generator free, free seo tools, text to video ai free, ai tools no account, futurepedia alternative",
});

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
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Animated Glowing Orbs */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-40 right-1/4 translate-x-1/2 w-[30rem] h-[30rem] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none animate-float-delayed" />

      {/* Hero Section */}
      <section className="relative text-center py-16 sm:py-24 rounded-3xl bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Decorative Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Glow accent top bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-pink-500/20 text-brand-400 text-xs font-extrabold uppercase tracking-wider border border-brand-500/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <Sparkles className="w-4 h-4 text-brand-400" /> 10M+ Monthly Runs · #1 Toolify Alternative 2025
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            300+ Free AI Tools —
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Actually Working In Your Browser
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI Video Generator, AI Humanizer, AI Detector, SEO tools, calculators, converters — all 100% free, no account needed. The best <strong className="text-brand-400">Toolify alternative</strong> with tools that actually run on-site.
          </p>

          <div className="flex justify-center pt-2 max-w-2xl mx-auto">
            <SearchBar placeholder="Search 300+ free tools (e.g. AI Humanizer, Meta Tag Generator)..." />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link
              href="/tool/ai-video-generator"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-rose-500/20 flex items-center gap-2.5 hover:opacity-95 hover:scale-105 transition-all duration-300 border border-rose-500/30"
            >
              <Video className="w-4 h-4" /> Try AI Video Generator Free
            </Link>
            <Link
              href="/tools"
              className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-sm flex items-center gap-2.5 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Browse All 300+ Tools →
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-slate-400 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & Unlimited
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400" /> No Account Required
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Instant Browser Execution
            </div>
          </div>

          {/* Trustpilot Partner Badge */}
          <div className="pt-2 flex justify-center">
            <TrustpilotBadge variant="hero" />
          </div>
        </div>
      </section>

      <AdBanner slot="headerBanner" />

      {/* New AI Generators Showcase Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-950 border border-purple-500/30 text-white space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400" /> New Interactive AI Generators
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Create AI Images & Videos Free
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Generate 8K photorealistic artwork, 3D renders, and cinematic 4K video motion clips directly in your browser.
            </p>
          </div>
          <Link
            href="/tools"
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 hover:scale-105"
          >
            View All 133+ Tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {TOOLS.filter((t) =>
            ["ai-image-generator", "ai-video-generator", "ai-humanizer", "ai-detector"].includes(t.slug)
          ).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Trending Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-extrabold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-500" /> High Usage Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
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
              &quot;We engineered our platform around modularity and speed. By structuring content cleanly, your readers stay engaged while your search engine rankings improve organically.&quot;
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
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-center shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">300+</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Working Tools</div>
        </div>
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-center shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-200">10M+</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Monthly Runs</div>
        </div>
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-center shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-4xl font-black text-emerald-500">100%</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Free Forever</div>
        </div>
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-center shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">4.9/5</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">User Rating</div>
        </div>
      </section>

      {/* Why Toolifia vs Toolify Comparison */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> Why Toolifia Beats the Competition
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            The Only AI Tools Platform Where Tools <em>Actually Work</em>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Unlike Toolify, Futurepedia, and similar directories that just redirect you to external sites — every tool on Toolifia runs <strong>directly in your browser</strong>.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900/50 backdrop-blur-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <th className="text-left p-4 font-extrabold text-slate-700 dark:text-slate-300">Feature</th>
                <th className="text-center p-4 font-black text-brand-600 dark:text-brand-400 bg-brand-500/10 border-x border-brand-500/20">Toolifia ✅</th>
                <th className="text-center p-4 font-extrabold text-slate-400">Toolify ❌</th>
                <th className="text-center p-4 font-extrabold text-slate-400">Futurepedia ❌</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {[
                ["Tools run on-site", "✅ Always", "❌ Redirects only", "❌ Redirects only"],
                ["No account required", "✅ Zero signup", "⚠️ Varies", "⚠️ Varies"],
                ["AI Video Generator (Kling 2.1)", "✅ Free", "❌ Links to paid", "❌ Links to paid"],
                ["AI Text Humanizer", "✅ Unlimited free", "❌ Links to paid", "❌ Links to paid"],
                ["SEO Tools", "✅ 15+ tools free", "❌ Links only", "❌ Links only"],
                ["No watermarks on output", "✅ Never", "❌ Depends", "❌ Depends"],
                ["Dark mode", "✅ Full support", "❌ Partial", "✅ Yes"],
                ["REST API access", "✅ Every tool", "❌ None", "❌ None"],
              ].map(([feature, us, toolify, futurepedia], i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700 dark:text-slate-300">{feature}</td>
                  <td className="p-4 text-center font-black text-emerald-600 dark:text-emerald-400 bg-brand-500/5 border-x border-brand-500/20">{us}</td>
                  <td className="p-4 text-center text-slate-500">{toolify}</td>
                  <td className="p-4 text-center text-slate-500">{futurepedia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "Zero Redirects", desc: "Every tool runs 100% in-browser. No external links, no paywalls, no subscriptions." },
            { icon: "🔑", title: "Zero Signup", desc: "Use all 300+ tools with no account, no email, no credit card — ever." },
            { icon: "🎬", title: "Real AI Videos", desc: "Generate actual MP4 videos with Kling 2.1 — the same model as Higgsfield and Runway." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-indigo-500/10 border border-brand-500/20 space-y-3 shadow-md hover:scale-105 transition-transform duration-300">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
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

      {/* SEO Content Block — Helps Google understand the page topic */}
      <section className="prose prose-slate dark:prose-invert max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What is Toolifia?</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Toolifia is a free online tools platform with 300+ utilities that run directly in your browser. Unlike AI tool directories like Toolify.ai or Futurepedia that redirect you to external sites, Toolifia hosts actual working tools — including an AI video generator powered by Kling 2.1, an AI text humanizer, AI content detector, meta tag generator, JSON formatter, BMI calculator, and more.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
              All tools are 100% free with no account registration required. No credit card, no email signup, no daily limits.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Free Online Tools — No Signup</h2>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
              {[
                "AI Video Generator (Kling 2.1, Wan, MiniMax)",
                "AI Text Humanizer — Bypass AI Detection",
                "AI Content Detector — GPTZero Compatible",
                "Free SEO Tools — Meta Tags, Schema, Sitemap",
                "Developer Tools — JSON, Base64, UUID, Hash",
                "Calculators — BMI, Loan, Compound Interest",
                "Unit & Currency Converters",
                "Image Tools — QR Code, Color Picker, Resizer",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
