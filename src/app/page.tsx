import Link from "next/link";
import { CATEGORIES } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { AnimatedHero } from "@/components/home/AnimatedHero";
import { constructMetadata } from "@/lib/seo";
import {
  Zap, ShieldCheck, CheckCircle2, ArrowRight,
  BookOpen, Cpu, Flame, Sparkles, Star,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Free AI Tools Online — No Signup Required | Toolifia",
  description: "300+ free AI tools in your browser: AI video generator, text humanizer, SEO utilities, calculators & converters. No account needed. Zero paywalls.",
  keywords: "free online tools no signup, best free ai tools 2025, toolify alternative, free ai tools directory, ai humanizer free, ai video generator free, free seo tools, text to video ai free, ai tools no account, futurepedia alternative",
});


// Featured tools to highlight in sections
const FEATURED_TOOLS = TOOLS.filter((t) => t.featured).slice(0, 8);
const TRENDING_TOOLS = TOOLS.filter((t) => t.trending).slice(0, 8);
const AI_TOOLS      = TOOLS.filter((t) => t.category === "ai-tools").slice(0, 4);
const SEO_TOOLS     = TOOLS.filter((t) => t.category === "seo-tools").slice(0, 4);
const DEV_TOOLS     = TOOLS.filter((t) => t.category === "developer-tools").slice(0, 4);
const CALC_TOOLS    = TOOLS.filter((t) => t.category === "calculator-tools").slice(0, 4);

const homeFaqs = [
  { question: "Are all tools on Toolifia 100% free to use?", answer: "Yes — every single tool is completely free. No hidden subscriptions, no paywalls, no credit card ever required." },
  { question: "Do I need to create an account or sign in?", answer: "No registration whatsoever. Open any tool and start using it instantly — your browser is all you need." },
  { question: "Is my data safe and private?", answer: "Absolutely. Most tools (calculators, encoders, formatters) process data entirely inside your browser — nothing is sent to our servers." },
  { question: "Can I use Toolifia tools via a REST API?", answer: "Yes! Every tool page includes a developer API tab so you can integrate any utility programmatically into your own apps." },
  { question: "How is Toolifia different from Toolify.ai?", answer: "Toolify is a directory that redirects you to external paid tools. Toolifia hosts real, working tools that run directly in your browser — no redirects, no payments, no limits." },
];

// Reusable section label component
function SectionLabel({ icon: Icon, text, color = "text-violet-400" }: { icon: any; text: string; color?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-semibold font-mono uppercase tracking-widest ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}

// Reusable section header
function SectionHeader({
  label, labelIcon, labelColor, title, subtitle, href, linkText
}: {
  label: string; labelIcon: any; labelColor?: string;
  title: string; subtitle?: string; href?: string; linkText?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
      <div className="space-y-2">
        <SectionLabel icon={labelIcon} text={label} color={labelColor} />
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 max-w-xl">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 shrink-0"
        >
          {linkText ?? "View All"} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

// Inline tool category section (2x4 grid)
function ToolSection({ title, emoji, tools, href }: { title: string; emoji: string; tools: any[]; href: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-white">
          <span className="text-xl">{emoji}</span> {title}
        </h3>
        <Link href={href} className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
          All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </div>
  );
}

export default function HomePage() {
  const featuredCategories = CATEGORIES.slice(0, 12);

  return (
    <div className="bg-[#04050a] min-h-screen">

      {/* ══════════ HERO ══════════ */}
      <AnimatedHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-20">

        {/* ══════════ FEATURED TOOLS ══════════ */}
        <section className="space-y-8">
          <SectionHeader
            label="Featured" labelIcon={Sparkles} labelColor="text-violet-400"
            title="Most Popular Tools"
            subtitle="Hand-picked tools used by millions — running entirely in your browser."
            href="/tools" linkText="All 300+ Tools"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_TOOLS.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ TRENDING ══════════ */}
        <section className="space-y-8">
          <SectionHeader
            label="Trending Now" labelIcon={Flame} labelColor="text-amber-400"
            title="Hottest Tools This Week"
            href="/tools" linkText="See All Trending"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRENDING_TOOLS.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ CATEGORIES ══════════ */}
        <section id="categories" className="space-y-8">
          <SectionHeader
            label="Tool Catalog" labelIcon={Cpu} labelColor="text-cyan-400"
            title="Browse by Category"
            subtitle="12 domains covering AI, SEO, development, calculators, converters, and more."
            href="/tools" linkText="Full Directory"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCategories.map((cat) => <CategoryCard key={cat.slug} category={cat} />)}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ BY-CATEGORY TOOL SHOWCASE ══════════ */}
        <section className="space-y-8">
          <SectionHeader
            label="Tool Ecosystem" labelIcon={Zap} labelColor="text-emerald-400"
            title="Every Category. Every Tool. All Free."
            subtitle="From AI writing tools to developer utilities — no account, no limits."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ToolSection title="AI & Writing Tools"   emoji="🤖" tools={AI_TOOLS}   href="/category/ai-tools" />
            <ToolSection title="SEO Tools"             emoji="📊" tools={SEO_TOOLS}  href="/category/seo-tools" />
            <ToolSection title="Developer Tools"       emoji="⚡" tools={DEV_TOOLS}  href="/category/developer-tools" />
            <ToolSection title="Calculators"           emoji="🧮" tools={CALC_TOOLS} href="/category/calculator-tools" />
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ FEATURE HIGHLIGHTS ══════════ */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              color: "text-violet-400",
              bg: "bg-violet-500/10 border-violet-500/20",
              title: "Instant Browser Execution",
              desc: "Converters, calculators, and formatters run entirely in your device. Zero latency, zero server round-trips.",
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10 border-emerald-500/20",
              title: "Zero Paywalls. Zero Accounts.",
              desc: "Every single tool is accessible without entering an email address, credit card, or creating any account.",
            },
            {
              icon: Cpu,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10 border-cyan-500/20",
              title: "REST API for Developers",
              desc: "Every tool includes a dedicated JSON API tab so developers can integrate any utility programmatically.",
            },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div
              key={title}
              className="glass-card p-6 rounded-2xl space-y-4 group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${bg} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ VS COMPARISON TABLE ══════════ */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Why Choose Toolifia
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Toolifia vs Toolify vs Futurepedia
            </h2>
            <p className="text-sm text-slate-400">
              Unlike directories that redirect you to external paid sites — every tool on Toolifia runs <strong className="text-white">directly in your browser.</strong>
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] glass-card shadow-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="text-left p-5 font-semibold text-slate-400 text-xs uppercase tracking-wide">Feature</th>
                  <th className="text-center p-5 font-bold text-white bg-violet-500/10 text-xs uppercase tracking-wide">
                    <span className="text-violet-300">Toolifia</span> ✅
                  </th>
                  <th className="text-center p-5 font-medium text-slate-500 text-xs uppercase tracking-wide">Toolify ❌</th>
                  <th className="text-center p-5 font-medium text-slate-500 text-xs uppercase tracking-wide">Futurepedia ❌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {[
                  ["Tools run on-site (no redirects)", "✅ Always", "❌ Redirects only", "❌ Redirects only"],
                  ["Completely free — no signup", "✅ Zero signup", "⚠️ Varies", "⚠️ Varies"],
                  ["AI Video Generator (Kling 2.1)", "✅ Free", "❌ Links to paid", "❌ Links to paid"],
                  ["AI Text Humanizer (unlimited)", "✅ Unlimited", "❌ Links to paid", "❌ Links to paid"],
                  ["15+ SEO Tools on-site", "✅ All free", "❌ Links only", "❌ Links only"],
                  ["No watermarks on output", "✅ Never", "❌ Depends", "❌ Depends"],
                  ["REST API for every tool", "✅ Every tool", "❌ None", "❌ None"],
                ].map(([feature, us, toolify, future], i) => (
                  <tr key={i} className="compare-row transition-colors">
                    <td className="p-5 font-medium text-slate-300 text-sm">{feature}</td>
                    <td className="p-5 text-center font-bold text-emerald-400 bg-violet-500/[0.03]">{us}</td>
                    <td className="p-5 text-center text-slate-500">{toolify}</td>
                    <td className="p-5 text-center text-slate-500">{future}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ SOCIAL PROOF STARS ══════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { quote: "Finally — real tools that work without redirecting me somewhere else. Toolifia is my daily go-to.", user: "Sarah M.", role: "Content Creator", rating: 5 },
            { quote: "The AI humanizer alone is worth bookmarking this site. Bypasses GPTZero every single time.", user: "Dev K.", role: "SEO Specialist", rating: 5 },
            { quote: "300+ tools, no account, no paywalls. This is what the internet should always have been.", user: "James T.", role: "Web Developer", rating: 5 },
          ].map(({ quote, user, role, rating }) => (
            <div key={user} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">"{quote}"</p>
              <div>
                <div className="text-sm font-bold text-white">{user}</div>
                <div className="text-xs text-slate-500">{role}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Divider ── */}
        <hr className="section-divider" />

        {/* ══════════ BLOG TEASER ══════════ */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] glass-card p-8 md:p-12">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" /> Knowledge Hub
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Read SEO & AI Guides
              </h2>
              <p className="text-sm text-slate-400 max-w-lg">
                In-depth articles on JSON-LD schemas, Core Web Vitals, AI humanizer benchmarks, and developer best practices.
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-primary px-6 py-3 rounded-2xl text-sm font-bold text-white flex items-center gap-2 shrink-0 shadow-lg"
            >
              Read the Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ══════════ FAQ ══════════ */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything you need to know about Toolifia</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={homeFaqs} />
          </div>
        </section>

        {/* ══════════ SEO TEXT BLOCK & DETAILED KNOWLEDGE GUIDE ══════════ */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-white/[0.08] space-y-10">
          <div className="border-b border-white/[0.08] pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Toolifia — The Complete Free Browser Utilities &amp; AI Toolkit Platform
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              Toolifia provides over 300+ web-native utilities designed for software developers, technical SEO specialists, digital marketers, content creators, and students. Every utility operates 100% free of charge with zero mandatory registration, no subscription paywalls, and complete client-side data privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <article className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" /> Next-Generation AI Suite
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our suite of artificial intelligence tools includes an advanced <strong>AI Video Generator</strong> powered by Kling 2.1, Wan, and MiniMax architecture, capable of converting descriptive text prompts into high-definition 1080p MP4 video clips. Furthermore, our <strong>AI Text Humanizer</strong> algorithms reframe AI-generated prose from GPT-4, Claude 3.5, and Gemini into natural human cadence, passing detectors like GPTZero and Turnitin while preserving semantic meaning.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                For job seekers and professionals, our AI Resume Builder and Cover Letter Generator craft tailored, ATS-compliant CV documents optimized for automated recruitment filters.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" /> Technical SEO &amp; Webmaster Suite
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Technical SEO execution requires exact metadata formatting and valid structured data markup. Toolifia offers instant generators for <strong>JSON-LD Schema Markup</strong> (supporting Organizations, Local Business, FAQs, HowTo, Products, and Software Applications), custom Robots.txt rule builders, XML Sitemap generators, and Open Graph card previewers for social platforms.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Analyze your content using our TF-IDF <strong>Keyword Density Checker</strong> to prevent keyword stuffing penalties while identifying semantic gaps in page content.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-rose-400" /> Developer Utilities &amp; Formatters
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Web developers can format, validate, and minify complex JSON, HTML, CSS, and JavaScript payloads instantly. Security features include client-side <strong>MD5, SHA-256, and SHA-512 Hash Generators</strong>, cryptographically strong UUID/GUID generators, Base64 encoders/decoders, JWT token decoders, and customizable random password generators.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                All developer conversions run within your local browser execution context — zero sensitive tokens or source payloads are ever logged to external database nodes.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Financial, Health &amp; Unit Calculators
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Perform complex mathematical operations with our <strong>Loan &amp; EMI Calculator</strong>, Compound Interest Growth Estimator, Scientific Function Calculator, Percentage Calculator, and GPA Calculator. Health modules include Body Mass Index (BMI) assessment, TDEE Calorie calculators, and precise Age calculators.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our unit converter engine handles digital storage, speed, mass, length, temperature (Celsius, Fahrenheit, Kelvin), binary-to-hexadecimal, and currency conversions with microsecond latency.
              </p>
            </article>
          </div>

          <div className="border-t border-white/[0.08] pt-8 space-y-6">
            <h3 className="text-xl font-bold text-white">
              Why Toolifia is the Best Alternative to Legacy Tool Directories
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unlike legacy directory websites (such as Toolify or Futurepedia) that operate primarily as link portals redirecting users to external subscription paywalls, <strong>Toolifia hosts actual working tools directly on-site</strong>. Users enjoy unlimited execution, responsive mobile layout compatibility, dark mode UI theme support, zero intrusive popunder scripts, and programmatic REST API endpoint access for custom application integration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-base font-bold text-violet-300">Client-Side Processing</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Converters, formatters, and calculators execute 100% inside your browser using modern WebAssembly and JavaScript engines. No sensitive data is transferred to remote servers.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-base font-bold text-cyan-300">Zero Paywalls or Accounts</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enjoy unrestricted access to all 300+ utilities without creating an account, filling out credit card forms, or hitting arbitrary daily submission caps.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-base font-bold text-emerald-300">Developer API Integration</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every tool includes a dedicated JSON API tab with cURL examples, allowing software engineers to integrate Toolifia utilities into automated CI/CD pipelines.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <h3 className="text-xl font-bold text-white">
                Detailed Guide to Toolifia&apos;s Core Engineering Modules
              </h3>

              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <h4 className="text-base font-semibold text-slate-200">1. AI Text Humanizer &amp; Content Detection Methodology</h4>
                <p>
                  Artificial intelligence detection tools like GPTZero, Originality.ai, Turnitin, and CopyLeaks analyze two primary linguistic metrics: perplexity (randomness of word choice) and burstiness (variation in sentence structure length). AI language models tend to generate uniform sentence lengths with predictable vocabulary sequences. Toolifia&apos;s AI Humanizer analyzes input text, restructures clauses, injects varied syntactic patterns, and applies contextual synonym replacement. This lowers predictability metrics while preserving the core factual intent, producing human-like prose that passes detection scanners consistently.
                </p>

                <h4 className="text-base font-semibold text-slate-200">2. Technical SEO &amp; Schema Generator Implementation</h4>
                <p>
                  Structured data implementation is critical for modern search engine optimization (SEO) and Generative Engine Optimization (GEO). Search bots use JSON-LD markup to understand entity relationships, local business attributes, product reviews, and FAQ hierarchies. Toolifia&apos;s Schema Markup Generator creates Google-compliant JSON-LD scripts that can be pasted directly into website head tags. Combined with our Meta Tag Generator and XML Sitemap Builder, webmasters can build complete technical SEO frameworks that rank higher in search results.
                </p>

                <h4 className="text-base font-semibold text-slate-200">3. Cryptographic Security &amp; Developer Productivity Utilities</h4>
                <p>
                  Data security requires robust hashing algorithms. Toolifia provides MD5, SHA-1, SHA-256, and SHA-512 cryptographic hash generators, along with UUID/GUID v4 string generators. For frontend and backend developers, our JSON Formatter validates syntax, formats nested key-value structures, and minifies JSON payloads for optimal network transmission. Base64 encoders/decoders handle binary data stream encoding for API payload headers and URI query strings.
                </p>

                <h4 className="text-base font-semibold text-slate-200">4. Financial &amp; Mathematical Calculations</h4>
                <p>
                  Accurate financial estimation is vital for personal financial planning and business analysis. Our Loan &amp; EMI Calculator computes monthly installment schedules, interest amortization, and total repayment sums over custom tenures. The Compound Interest Calculator models wealth accumulation using annual, quarterly, or monthly compounding frequencies. Health calculators like our BMI and TDEE units provide actionable metrics for wellness and nutrition tracking.
                </p>

                <h4 className="text-base font-semibold text-slate-200">5. Unit Conversion Engine &amp; Color Science Tools</h4>
                <p>
                  Converting units across imperial and metric systems is seamless with our multi-unit converter. Convert length (meters, feet, miles, inches), mass (kilograms, pounds, ounces), temperature (Celsius, Fahrenheit, Kelvin), speed (km/h, mph, knots), and digital storage (bytes, gigabytes, terabytes). For visual designers, our HEX to RGB Color Converter and CSS Gradient Generator provide exact color space coordinates and cross-browser CSS code snippets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ NEWSLETTER ══════════ */}
        <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-violet-500/5 to-transparent p-8 md:p-12 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-mono border border-violet-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Stay in the loop
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get New Tools & SEO Tips
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              New tool releases, AI updates, and developer guides — straight to your inbox.
            </p>
          </div>
          <div className="relative z-10 max-w-md mx-auto">
            <NewsletterForm endpoint="https://formspree.io/f/xqerwaog" />
          </div>
        </section>

      </div>
    </div>
  );
}
