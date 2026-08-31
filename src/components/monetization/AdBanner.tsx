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
  if (!siteConfig.monetization.enableAds) return null;
  return null;
}
