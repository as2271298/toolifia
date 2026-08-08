"use client";

import { useEffect, useRef, useState, useId } from "react";
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

const BASE_CONTAINER_ID = "container-00cf79882490a2b5dc99ed1e056650aa";

export function AdBanner({
  slot,
  className = "",
  variant = "native",
}: AdBannerProps) {
  const uid = useId().replace(/:/g, "");
  const containerId = `${BASE_CONTAINER_ID}-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!siteConfig.monetization.enableAds) return;

    // Rename the inner container to match what the script expects, then load script
    const inner = document.getElementById(containerId);
    if (inner) {
      inner.id = BASE_CONTAINER_ID;
    }

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
      // Restore unique ID on unmount so re-mounts work correctly
      const restored = document.getElementById(BASE_CONTAINER_ID);
      if (restored && containerRef.current?.contains(restored)) {
        restored.id = containerId;
      }
    };
  }, [mounted, containerId]);

  if (!siteConfig.monetization.enableAds) return null;
  if (!mounted) return null;

  const labelRow = (
    <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        Sponsored Advertisement
      </span>
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center gap-1 hover:text-violet-400 transition-colors"
      >
        Featured Offer <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  );

  const adContainer = (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center min-h-[280px]"
    >
      <div id={containerId} className="w-full" />
    </div>
  );

  if (variant === "leaderboard") {
    return (
      <div
        className={`w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950/90 p-5 my-8 backdrop-blur-sm ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        {labelRow}
        {adContainer}
      </div>
    );
  }

  if (variant === "rectangle") {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-b from-slate-900 to-slate-950 p-5 my-6 ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        {labelRow}
        {adContainer}
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-5 my-6 backdrop-blur-sm ${className}`}
        aria-label="Advertisement"
        suppressHydrationWarning
      >
        {labelRow}
        {adContainer}
      </div>
    );
  }

  // Default: native
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 my-8 ${className}`}
      aria-label="Advertisement"
      suppressHydrationWarning
    >
      {labelRow}
      {adContainer}
    </div>
  );
}
