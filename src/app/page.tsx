import Link from "next/link";
import Image from "next/image";
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
import { HeroPlayground } from "@/components/home/HeroPlayground";
import { CategoryToolGrid } from "@/components/home/CategoryToolGrid";
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
    <div className="space-y-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-x-hidden">
      {/* Dynamic Background Glowing Mesh Orbs */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-60 right-1/4 translate-x-1/2 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-[160px] pointer-events-none animate-float-delayed" />
      <div className="absolute top-[800px] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-rose-600/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative text-center py-12 sm:py-20 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-950 border border-slate-800/80 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        {/* Glowing Top Edge Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-pink-500/20 text-brand-300 text-xs font-extrabold uppercase tracking-wider border border-brand-500/30 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <Sparkles className="w-4 h-4 text-brand-400" /> 10M+ Monthly Runs · #1 Toolify Alternative 2025
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            300+ Free AI Tools —
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
              Actually Working In Your Browser
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI Video Generator, AI Humanizer, AI Detector, SEO tools, calculators, converters — all 100% free, no account needed. The best <strong className="text-brand-400 font-extrabold">Toolify alternative</strong> with tools that actually run on-site.
          </p>

          <div className="flex justify-center pt-2 max-w-2xl mx-auto">
            <SearchBar placeholder="Search 300+ free tools (e.g. AI Humanizer, Meta Tag Generator)..." />
          </div>

          {/* Interactive Live Hero Playground */}
          <div className="pt-6">
            <HeroPlayground />
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

      {/* Interactive Category Tools Showcase Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-extrabold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> Interactive Category Filter
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Explore 133+ Online Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-lg transition-all shrink-0 hover:scale-105"
          >
            View Full Directory &rarr;
          </Link>
        </div>

        <CategoryToolGrid />
      </section>

      {/* AI Features Powerhouse Showcase */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-extrabold uppercase tracking-wider border border-purple-500/30">
              AI Powerhouse Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bypass AI Content Detectors & Humanize Writing
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transform generic ChatGPT output into engaging, natural, human-like prose with sentence length variance and tone adjustment.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/tool/ai-humanizer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                Try AI Humanizer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tool/ai-detector"
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-slate-700 flex items-center gap-2 transition-all hover:scale-105"
              >
                Scan AI Probability
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800/80 space-y-4 font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-extrabold text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> Live AI Humanizer Sample
              </span>
              <span className="text-emerald-400 font-extrabold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                99% Human Score
              </span>
            </div>
            <p className="leading-relaxed text-slate-200 text-sm italic">
              &quot;We engineered our platform around modularity and speed. By structuring content cleanly, your readers stay engaged while your search engine rankings improve organically.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section id="categories" className="space-y-6">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-brand-400">
            35+ Specialized Categories
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
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
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-5xl font-black text-brand-400">300+</div>
          <div className="text-xs font-extrabold uppercase text-slate-400 mt-1">Working Tools</div>
        </div>
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-5xl font-black text-slate-200">10M+</div>
          <div className="text-xs font-extrabold uppercase text-slate-400 mt-1">Monthly Runs</div>
        </div>
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-5xl font-black text-emerald-400">100%</div>
          <div className="text-xs font-extrabold uppercase text-slate-400 mt-1">Free Forever</div>
        </div>
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="text-3xl sm:text-5xl font-black text-amber-400">4.9/5</div>
          <div className="text-xs font-extrabold uppercase text-slate-400 mt-1">User Rating</div>
        </div>
      </section>

      {/* Why Toolifia vs Toolify Comparison */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> Why Toolifia Beats the Competition
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            The Only AI Tools Platform Where Tools <em>Actually Work</em>
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Unlike Toolify, Futurepedia, and similar directories that just redirect you to external sites — every tool on Toolifia runs <strong>directly in your browser</strong>.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 shadow-2xl bg-slate-950/80 backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800">
                <th className="text-left p-4 font-black text-slate-300">Feature</th>
                <th className="text-center p-4 font-black text-brand-400 bg-brand-500/15 border-x border-brand-500/30">Toolifia ✅</th>
                <th className="text-center p-4 font-extrabold text-slate-400">Toolify ❌</th>
                <th className="text-center p-4 font-extrabold text-slate-400">Futurepedia ❌</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
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
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 font-extrabold text-slate-300">{feature}</td>
                  <td className="p-4 text-center font-black text-emerald-400 bg-brand-500/5 border-x border-brand-500/20">{us}</td>
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
            <div key={i} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog & Knowledge Hub Teaser */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-brand-400">
            <BookOpen className="w-4 h-4" /> SEO & Web Development Guides
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Learn Technical SEO & Content Optimization
          </h2>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Explore our blog articles covering JSON-LD schemas, Core Web Vitals, AI humanization techniques, and developer best practices.
          </p>
        </div>

        <Link
          href="/blog"
          className="px-7 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-xl shrink-0 flex items-center gap-2 transition-all hover:scale-105"
        >
          Read Blog Articles <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about using Toolifia free online tools
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={homeFaqs} />
        </div>
      </section>

      {/* SEO Content Block — Helps Google understand the page topic */}
      <section className="prose prose-slate dark:prose-invert max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">What is Toolifia?</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Toolifia is a free online tools platform with 300+ utilities that run directly in your browser. Unlike AI tool directories like Toolify.ai or Futurepedia that redirect you to external sites, Toolifia hosts actual working tools — including an AI video generator powered by Kling 2.1, an AI text humanizer, AI content detector, meta tag generator, JSON formatter, BMI calculator, and more.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              All tools are 100% free with no account registration required. No credit card, no email signup, no daily limits.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">Free Online Tools — No Signup</h2>
            <ul className="text-sm text-slate-400 space-y-2">
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
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-700 text-white shadow-2xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
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
