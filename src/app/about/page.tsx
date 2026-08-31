import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Sparkles, ShieldCheck, Zap, Heart, Users, Globe2, Cpu, Award } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: `About Us | ${siteConfig.name}`,
  description:
    "Learn about Toolifia's mission to provide 100% free, browser-native AI, SEO, and developer utilities with zero friction, zero signups, and total user privacy.",
  canonicalUrl: `${siteConfig.url}/about`,
});

export default function AboutPage() {
  const breadcrumbs = [{ name: "About Us", url: "/about" }];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <Breadcrumb items={breadcrumbs} />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-wider border border-violet-500/20">
          <Sparkles className="w-4 h-4" /> Empowering Web Creators Worldwide
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          About {siteConfig.name}
        </h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          We build fast, free, client-side web tools that work instantly in your browser—no account registration, no paywalls, and no hidden subscriptions.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Instant Execution</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every tool is optimized for zero latency. Calculators, converters, encoders, and formatters execute entirely in your local browser sandbox.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Privacy First</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We believe your data belongs to you. We never store, sell, or monetize user inputs, text files, or prompt contents.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">100% Free Forever</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            All 130+ tools are completely free to use without requiring an email address, login credentials, or credit card.
          </p>
        </div>
      </div>

      {/* Detailed Story & Technology Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Globe2 className="w-6 h-6 text-violet-400" /> Who We Are &amp; Why We Built Toolifia
          </h2>
          <p>
            {siteConfig.name} was founded by a team of software engineers, technical SEO practitioners, and digital creators who were tired of bloated web utility sites. Too many online directories act merely as affiliate links or require aggressive paywalls, intrusive pop-unders, and mandatory account signups just to format a block of JSON, compute a loan amortization, or adjust sentence flow.
          </p>
          <p>
            We built Toolifia as an open, accessible software toolkit where utilities run directly in your browser. Whether you are debugging an API payload at 2 AM or drafting an article, Toolifia provides reliable, fast tools with zero friction.
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-cyan-400" /> Engineering &amp; Data Ethics
          </h2>
          <p>
            Our core engineering principle is <strong>client-side first</strong>. Most utilities—including code formatters, unit converters, hash generators, regex testers, and math calculators—execute entirely within your web browser sandbox using modern JavaScript and WebAssembly.
          </p>
          <p>
            For tools requiring external neural processing (such as AI writing aids or video generation models), requests are sent over encrypted TLS connections to dedicated API endpoints. We never store, log, or resell your prompt inputs or generated text for model training.
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" /> Tool Testing &amp; Accuracy Standards
          </h2>
          <p>
            Every utility on Toolifia undergoes rigorous validation before release:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
            <li><strong>Specification Compliance:</strong> Developer tools conform to official RFC standards (e.g. RFC 8259 for JSON, RFC 4122 for UUIDs, RFC 4648 for Base64).</li>
            <li><strong>Mathematical Verification:</strong> Financial and scientific calculators are audited against standard amortization and compounding algorithms.</li>
            <li><strong>Cross-Browser Testing:</strong> All interfaces are tested on Chromium, Safari, Firefox, and mobile viewport devices for responsive, crash-free performance.</li>
          </ul>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-emerald-400" /> Contact &amp; Community Feedback
          </h2>
          <p>
            Toolifia is continuously maintained and improved based on user feedback. If you discover a bug, have an idea for a new tool, or need technical assistance, we welcome your direct communication.
          </p>
          <p>
            Visit our{" "}
            <Link href="/contact" className="text-violet-400 font-bold hover:underline">
              Contact &amp; Support Hub
            </Link>{" "}
            or email our engineering team directly at{" "}
            <a href="mailto:support@toolifia.com" className="text-cyan-400 font-semibold hover:underline">
              support@toolifia.com
            </a>
            . We typically respond within 24–48 business hours.
          </p>
        </section>
      </div>
    </div>
  );
}
