"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { SMARTLINK_URL } from "./AdBanner";
import { ExternalLink, Zap, Star, TrendingUp, Shield, Sparkles } from "lucide-react";

interface PosterAdProps {
  /** Poster visual theme */
  theme?: "violet" | "cyan" | "emerald" | "amber" | "dark";
  /** Layout orientation */
  layout?: "horizontal" | "vertical";
  className?: string;
}

type PosterTheme = {
  gradient: string;
  border: string;
  badge: string;
  badgeText: string;
  cta: string;
  icon: string;
  iconBg: string;
  tagBg: string;
  tagText: string;
};

const THEMES: Record<string, PosterTheme> = {
  violet: {
    gradient: "from-violet-950 via-violet-900/80 to-slate-950",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    badgeText: "text-violet-200",
    cta: "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/50",
    icon: "text-violet-300",
    iconBg: "bg-violet-500/10",
    tagBg: "bg-violet-500/10",
    tagText: "text-violet-400",
  },
  cyan: {
    gradient: "from-cyan-950 via-cyan-900/60 to-slate-950",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    badgeText: "text-cyan-200",
    cta: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50",
    icon: "text-cyan-300",
    iconBg: "bg-cyan-500/10",
    tagBg: "bg-cyan-500/10",
    tagText: "text-cyan-400",
  },
  emerald: {
    gradient: "from-emerald-950 via-emerald-900/60 to-slate-950",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    badgeText: "text-emerald-200",
    cta: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50",
    icon: "text-emerald-300",
    iconBg: "bg-emerald-500/10",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-400",
  },
  amber: {
    gradient: "from-amber-950 via-amber-900/50 to-slate-950",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    badgeText: "text-amber-200",
    cta: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-900/50",
    icon: "text-amber-300",
    iconBg: "bg-amber-500/10",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-400",
  },
  dark: {
    gradient: "from-slate-900 via-slate-900 to-slate-950",
    border: "border-slate-700/50",
    badge: "bg-white/5 text-slate-300 border-slate-700/50",
    badgeText: "text-slate-200",
    cta: "bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-lg",
    icon: "text-slate-300",
    iconBg: "bg-white/5",
    tagBg: "bg-white/5",
    tagText: "text-slate-400",
  },
};

// Rotating poster ad content
const POSTER_ADS = [
  {
    tag: "🔥 Trending Tool",
    headline: "Generate Professional Videos with AI",
    subline: "Kling 2.1 — Text-to-Video in seconds. No watermark. 100% Free.",
    bullets: ["HD 1080p output", "No signup needed", "50+ styles"],
    cta: "Try AI Video Generator →",
    theme: "violet" as const,
    Icon: Sparkles,
  },
  {
    tag: "⚡ Free Forever",
    headline: "SEO Schema Markup Generator",
    subline: "Generate JSON-LD for Articles, FAQs, Products & more — instantly.",
    bullets: ["8 schema types", "Google-ready output", "Copy in 1 click"],
    cta: "Generate Schema Now →",
    theme: "cyan" as const,
    Icon: Zap,
  },
  {
    tag: "🌟 Most Popular",
    headline: "AI Text Humanizer — Bypass AI Detection",
    subline: "Make AI-generated content undetectable. Works on GPT-4, Claude & Gemini outputs.",
    bullets: ["Pass all AI detectors", "Natural tone", "Free to use"],
    cta: "Humanize Text Free →",
    theme: "emerald" as const,
    Icon: Star,
  },
  {
    tag: "🏆 Top Rated",
    headline: "Keyword Density Checker — SEO Optimized",
    subline: "Analyze keyword usage, density & TF-IDF scores for any content.",
    bullets: ["Real-time analysis", "TF-IDF scoring", "Export report"],
    cta: "Check Keywords Free →",
    theme: "amber" as const,
    Icon: TrendingUp,
  },
  {
    tag: "🔐 Secure & Private",
    headline: "Free Password Generator",
    subline: "Generate ultra-strong passwords. Customizable length, symbols & entropy.",
    bullets: ["256-bit strength", "Zero data logging", "Instant generation"],
    cta: "Generate Password →",
    theme: "dark" as const,
    Icon: Shield,
  },
];

export function PosterAd({ theme, layout = "horizontal", className = "" }: PosterAdProps) {
  const [mounted, setMounted] = useState(false);
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Pick a random ad on mount to rotate across page views
    setAdIndex(Math.floor(Math.random() * POSTER_ADS.length));
  }, []);

  if (!siteConfig.monetization.enableAds) return null;
  if (!mounted) return null;

  const ad = POSTER_ADS[adIndex];
  const resolvedTheme = theme || ad.theme;
  const t = THEMES[resolvedTheme];
  const Icon = ad.Icon;

  if (layout === "vertical") {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border ${t.border} bg-gradient-to-b ${t.gradient} p-6 my-6 group transition-all duration-300 hover:scale-[1.01] ${className}`}
        aria-label="Sponsored Content"
      >
        {/* Background Orb */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10 blur-3xl bg-white pointer-events-none" />

        {/* Sponsored label */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[9px] font-bold tracking-widest uppercase ${t.tagText} ${t.tagBg} px-2 py-1 rounded-full`}>
            Sponsored
          </span>
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`${t.icon} opacity-60 hover:opacity-100 transition-opacity`}
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Icon */}
        <div className={`w-10 h-10 rounded-2xl ${t.iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`w-5 h-5 ${t.icon}`} />
        </div>

        {/* Tag */}
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.badge} mb-3`}>
          {ad.tag}
        </span>

        {/* Headline */}
        <h3 className="text-base font-extrabold text-white mb-2 leading-snug">{ad.headline}</h3>
        <p className={`text-xs ${t.badgeText} opacity-80 mb-4 leading-relaxed`}>{ad.subline}</p>

        {/* Bullets */}
        <ul className="space-y-1 mb-5">
          {ad.bullets.map((b, i) => (
            <li key={i} className={`flex items-center gap-1.5 text-xs ${t.badgeText} opacity-70`}>
              <span className={`w-1 h-1 rounded-full bg-current opacity-60`} />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`block w-full text-center text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 ${t.cta}`}
        >
          {ad.cta}
        </a>
      </div>
    );
  }

  // Horizontal / Banner layout
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${t.border} bg-gradient-to-r ${t.gradient} p-5 my-6 group transition-all duration-300 hover:scale-[1.005] ${className}`}
      aria-label="Sponsored Content"
    >
      {/* Background Orb */}
      <div className="absolute -top-16 right-0 w-64 h-40 rounded-full opacity-10 blur-3xl bg-white pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: content */}
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-10 h-10 rounded-2xl ${t.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${t.icon}`} />
          </div>

          <div className="min-w-0">
            {/* Sponsored label + tag */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] font-bold tracking-widest uppercase ${t.tagText} opacity-70`}>
                Sponsored
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${t.badge}`}>
                {ad.tag}
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-white leading-snug truncate">{ad.headline}</h3>
            <p className={`text-xs ${t.badgeText} opacity-70 truncate mt-0.5`}>{ad.subline}</p>
          </div>
        </div>

        {/* Right: bullets + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <ul className="hidden md:flex items-center gap-3">
            {ad.bullets.map((b, i) => (
              <li key={i} className={`flex items-center gap-1 text-[10px] ${t.badgeText} opacity-60 whitespace-nowrap`}>
                <span className="w-1 h-1 rounded-full bg-current" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`whitespace-nowrap text-xs font-bold py-2 px-4 rounded-xl transition-all duration-200 ${t.cta}`}
          >
            {ad.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
