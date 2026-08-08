"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";
import { ExternalLink } from "lucide-react";
import { PosterAd } from "./PosterAd";

export const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/d51gzcmx?key=80aaee205e409e2d9f27954f0639f7bf";

// ─── The EXACT HTML snippet from EffectiveCPM for the native ad zone ──────────
// Using an iframe per instance means each one gets its own container-ID context
// so there's NO conflict when 10+ ads are on the same page.
const NATIVE_AD_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: transparent; overflow: hidden; }
  </style>
</head>
<body>
  <div id="container-00cf79882490a2b5dc99ed1e056650aa"></div>
  <script async data-cfasync="false"
    src="https://pl30549938.effectivecpmnetwork.com/00cf79882490a2b5dc99ed1e056650aa/invoke.js">
  </script>
</body>
</html>`;

interface AdBannerProps {
  slot: keyof typeof siteConfig.monetization.slots;
  className?: string;
  /** leaderboard ≈ 90px tall  |  rectangle ≈ 280px tall  |  native ≈ 320px tall */
  variant?: "leaderboard" | "rectangle" | "sidebar" | "native";
  theme?: "violet" | "cyan" | "emerald" | "amber" | "dark";
}

/** Height in px reserved for each variant. Must be fixed so the iframe fills it. */
const VARIANT_HEIGHT: Record<NonNullable<AdBannerProps["variant"]>, number> = {
  leaderboard: 110,
  rectangle:   280,
  sidebar:     280,
  native:      340,
};

export function AdBanner({
  slot,
  className = "",
  variant = "native",
  theme,
}: AdBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!siteConfig.monetization.enableAds) return null;

  const height = VARIANT_HEIGHT[variant];

  // ── SSR / pre-hydration: reserve space to avoid CLS ─────────────────────────
  if (!mounted) {
    return (
      <div
        className={`w-full my-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 ${className}`}
        style={{ height }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`w-full my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl ${className}`}
      style={{ height: height + 32 /* +32 for label padding */ }}
      aria-label="Advertisement"
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        <span>Sponsored Advertisement</span>
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-1 hover:text-violet-400 transition-colors"
        >
          Featured Offer <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* ── Iframe: isolated context so each ad loads its OWN container ─────── */}
      <iframe
        srcDoc={NATIVE_AD_HTML}
        width="100%"
        height={height}
        scrolling="no"
        frameBorder="0"
        title="Advertisement"
        style={{ display: "block", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
