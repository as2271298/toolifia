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
            <Globe2 className="w-6 h-6 text-violet-400" /> Our Story & Mission
          </h2>
          <p>
            {siteConfig.name} was created with a clear objective: to solve the frustration of modern online tool directories that redirect users through endless ads, mandatory account signups, and monthly subscriptions just to format a piece of JSON or calculate a loan.
          </p>
          <p>
            We built a platform where developers, content creators, marketers, students, and everyday internet users can access reliable, enterprise-grade utilities in a clean, distraction-free environment.
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-cyan-400" /> Technology & Infrastructure
          </h2>
          <p>
            Our architecture is built on cutting-edge web technologies including Next.js App Router, TypeScript, Tailwind CSS, and WebAssembly. Wherever possible, computation is performed client-side to minimize network hops and protect user privacy.
          </p>
          <p>
            For AI-powered tools such as our AI Text Humanizer, AI Content Detector, and Prompt Generator, we integrate state-of-the-art neural models over encrypted, ephemeral connections with zero persistent data storage.
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-400" /> Editorial Standards & Quality
          </h2>
          <p>
            Every tool in our catalog is continuously tested for mathematical precision, standard compliance (RFC specifications for JSON/UUID/Base64), and browser compatibility across mobile, tablet, and desktop devices.
          </p>
          <p>
            Have feedback, a feature suggestion, or want to report an issue? Reach out to our engineering team directly via our{" "}
            <Link href="/contact" className="text-violet-400 font-bold hover:underline">
              Contact Us page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
