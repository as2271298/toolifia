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
import { HeroPlayground } from "@/components/home/HeroPlayground";
import { CategoryToolGrid } from "@/components/home/CategoryToolGrid";
import {
  Sparkles,
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Search,
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
    <div className="bg-[#08090a] text-[#f7f8f8] min-h-screen">
      {/* Ambient Top Light Beam */}
      <div className="absolute top-0 inset-x-0 h-[650px] ambient-beam-master pointer-events-none" />

      <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

        {/* Hero Section (Master Linear / Vercel Blueprint) */}
        <section className="relative text-center py-10 sm:py-16 space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] text-slate-300 text-xs font-mono border border-white/[0.08] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>300+ Browser Tools · Zero Signup · #1 Toolify Alternative</span>
            <kbd className="kbd-badge ml-1 hidden sm:inline">⌘K</kbd>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            The platform for <br className="hidden sm:inline" />
            <span className="text-gradient-accent">browser-native AI & web tools.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Run AI video generators, text humanizers, calculators, and SEO utilities directly inside your browser memory. Zero setup. 100% free.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center max-w-xl mx-auto">
            <SearchBar placeholder="Search 300+ tools (e.g. AI Video Generator, Meta Tag Generator)..." />
          </div>

          {/* Interactive Live Hero Playground (Higgsfield / Supabase Sandbox) */}
          <div className="pt-4">
            <HeroPlayground />
          </div>

          {/* Feature Micro-Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Forever
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Zero Account Required
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Client Execution
            </div>
          </div>

          {/* Trustpilot Partner Badge */}
          <div className="pt-2 flex justify-center">
            <TrustpilotBadge variant="hero" />
          </div>
        </section>

        <AdBanner slot="headerBanner" />

        {/* Interactive Category Tools Showcase Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Tool Ecosystem
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Browse 133+ Browser Tools
              </h2>
            </div>
            <Link
              href="/tools"
              className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-xs transition-colors shrink-0"
            >
              View Full Directory &rarr;
            </Link>
          </div>

          <CategoryToolGrid />
        </section>

        {/* Linear-Style Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              title: "Client-Side Speed",
              desc: "Converters, calculators, and formatters execute instantly inside your browser memory. Zero latency, zero server lag."
            },
            {
              icon: ShieldCheck,
              title: "Zero Paywalls or Accounts",
              desc: "Every single tool is accessible without entering an email address or credit card details. Built for speed and privacy."
            },
            {
              icon: Cpu,
              title: "Programmatic REST APIs",
              desc: "Every tool includes a dedicated JSON REST API endpoint tab so developers can integrate features programmatically."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] space-y-3 shadow-md">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Featured Categories Grid */}
        <section id="categories" className="space-y-6">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              35+ Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Browse Tools by Domain
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCategories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>

        {/* Platform Statistics Counter */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-white">300+</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">Working Tools</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-white">10M+</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">Monthly Runs</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-400">100%</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">Free Forever</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.07] text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">4.9/5</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">User Rating</div>
          </div>
        </section>

        {/* Why Toolifia vs Toolify Comparison (Supabase / Linear Style) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Architecture Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Toolifia vs Toolify & Futurepedia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Unlike link directories that redirect you to external paid sites — every tool on Toolifia runs <strong>directly inside your browser</strong>.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#111318] shadow-xl">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.07] text-slate-400">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-bold text-white bg-white/[0.04]">Toolifia ✅</th>
                  <th className="text-center p-4 font-medium text-slate-500">Toolify ❌</th>
                  <th className="text-center p-4 font-medium text-slate-500">Futurepedia ❌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {[
                  ["Tools run on-site", "✅ Always", "❌ Redirects only", "❌ Redirects only"],
                  ["No account required", "✅ Zero signup", "⚠️ Varies", "⚠️ Varies"],
                  ["AI Video Generator (Kling 2.1)", "✅ Free", "❌ Links to paid", "❌ Links to paid"],
                  ["AI Text Humanizer", "✅ Unlimited free", "❌ Links to paid", "❌ Links to paid"],
                  ["SEO Tools", "✅ 15+ tools free", "❌ Links only", "❌ Links only"],
                  ["No watermarks on output", "✅ Never", "❌ Depends", "❌ Depends"],
                  ["REST API access", "✅ Every tool", "❌ None", "❌ None"],
                ].map(([feature, us, toolify, futurepedia], i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-slate-300">{feature}</td>
                    <td className="p-4 text-center font-bold text-emerald-400 bg-white/[0.02]">{us}</td>
                    <td className="p-4 text-center text-slate-500">{toolify}</td>
                    <td className="p-4 text-center text-slate-500">{futurepedia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Blog & Knowledge Hub Teaser */}
        <section className="p-8 rounded-2xl bg-[#111318] border border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400">
              <BookOpen className="w-3.5 h-3.5" /> Technical SEO & AI Guides
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Read Technical Tutorials & Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              In-depth articles covering JSON-LD schemas, Core Web Vitals, AI humanizer benchmarks, and developer best practices.
            </p>
          </div>

          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shrink-0 flex items-center gap-2 transition-colors shadow-md"
          >
            Read Knowledge Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400">
              Everything you need to know about using Toolifia browser tools
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={homeFaqs} />
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="prose prose-invert max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#111318] border border-white/[0.07]">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">What is Toolifia?</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Toolifia is a free online tools platform with 300+ utilities that run directly in your browser. Unlike AI tool directories like Toolify.ai or Futurepedia that redirect you to external sites, Toolifia hosts actual working tools — including an AI video generator powered by Kling 2.1, an AI text humanizer, AI content detector, meta tag generator, JSON formatter, BMI calculator, and more.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Free Online Tools — No Signup</h2>
              <ul className="text-xs text-slate-400 space-y-1.5">
                {[
                  "AI Video Generator (Kling 2.1, Wan, MiniMax)",
                  "AI Text Humanizer — Bypass AI Detection",
                  "AI Content Detector — GPTZero Compatible",
                  "Free SEO Tools — Meta Tags, Schema, Sitemap",
                  "Developer Tools — JSON, Base64, UUID, Hash",
                  "Calculators — BMI, Loan, Compound Interest",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Newsletter Block */}
        <section className="p-8 rounded-2xl bg-[#111318] border border-white/[0.07] text-white text-center space-y-4 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Stay Updated with New Tools & Features
            </h2>
            <p className="text-xs text-slate-300">
              Subscribe for new tool releases, SEO optimization tips, and developer guides.
            </p>
          </div>

          <NewsletterForm endpoint="https://formspree.io/f/xqerwaog" />
        </section>

      </div>
    </div>
  );
}
