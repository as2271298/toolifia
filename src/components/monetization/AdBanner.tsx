"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { ExternalLink, Zap, Star, TrendingUp } from "lucide-react";

interface AdBannerProps {
  slot: keyof typeof siteConfig.monetization.slots;
  className?: string;
  variant?: "leaderboard" | "rectangle" | "sidebar" | "native";
}

// Smartlink URL for toolifia.vercel.app
export const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/d51gzcmx?key=80aaee205e409e2d9f27954f0633be82805";

// Native invoke script URL
const INVOKE_SCRIPT_SRC =
  "https://pl30549938.effectivecpmnetwork.com/00cf79882490a2b5dc99ed1e056650aa/invoke.js";

const CONTAINER_ID = "container-00cf79882490a2b5dc99ed1e056650aa";

// Variant dimensions and styles
const VARIANT_STYLES = {
  leaderboard: {
    wrapper: "min-h-[100px] w-full",
    label: "Sponsored — Leaderboard Ad",
  },
  rectangle: {
    wrapper: "min-h-[280px] w-full max-w-[340px]",
    label: "Sponsored — Featured Offer",
  },
  sidebar: {
    wrapper: "min-h-[250px] w-full",
    label: "Sponsored",
  },
  native: {
    wrapper: "min-h-[90px] w-full",
    label: "Sponsored Advertisement",
  },
};

export function AdBanner({
  slot,
  className = "",
  variant = "native",
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const variantStyle = VARIANT_STYLES[variant];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!siteConfig.monetization.enableAds) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = INVOKE_SCRIPT_SRC;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [mounted]);

  if (!siteConfig.monetization.enableAds) return null;
  if (!mounted) return null;

  if (variant === "leaderboard") {
    return (
      <div
        className={`w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950/90 p-4 my-6 backdrop-blur-sm ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            {variantStyle.label}
          </span>
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1 hover:text-violet-400 transition-colors"
          >
            View Offer <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <div
          ref={containerRef}
          className={`w-full flex justify-center items-center ${variantStyle.wrapper}`}
        >
          <div id={CONTAINER_ID} className="w-full" />
        </div>
      </div>
    );
  }

  if (variant === "rectangle") {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-b from-slate-900 to-slate-950 p-5 my-4 ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
          <span className="flex items-center gap-1.5">
            <Star className="w-2.5 h-2.5 text-amber-500" />
            {variantStyle.label}
          </span>
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1 hover:text-violet-400 transition-colors"
          >
            Details <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <div
          ref={containerRef}
          className={`w-full flex justify-center items-center ${variantStyle.wrapper}`}
        >
          <div id={CONTAINER_ID} className="w-full" />
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-4 my-4 backdrop-blur-sm ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-2.5 h-2.5 text-cyan-500" />
            {variantStyle.label}
          </span>
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <div
          ref={containerRef}
          className={`w-full flex justify-center items-center ${variantStyle.wrapper}`}
        >
          <div id={CONTAINER_ID} className="w-full" />
        </div>
      </div>
    );
  }

  // Default: native
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 p-4 my-6 transition-all ${className}`}
      aria-label="Advertisement"
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">
        <span className="flex items-center gap-1.5">
          <Zap className="w-2.5 h-2.5" />
          {variantStyle.label}
        </span>
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-1 hover:text-brand-500 transition"
        >
          Featured Offer <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
        </a>
      </div>
      <div
        ref={containerRef}
        className={`w-full flex justify-center items-center ${variantStyle.wrapper}`}
      >
        <div id={CONTAINER_ID} className="w-full" />
      </div>
    </div>
  );
}
