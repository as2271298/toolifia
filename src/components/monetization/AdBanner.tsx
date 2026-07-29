"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { ExternalLink } from "lucide-react";

interface AdBannerProps {
  slot: keyof typeof siteConfig.monetization.slots;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "native";
}

// New Smartlink URL for toolifia.vercel.app
export const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/d51gzcmx?key=80aaee205e409e2d9f27954f0633be82805";

export function AdBanner({ slot, className = "", format = "auto" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!siteConfig.monetization.enableAds) return;

    // Load New Native Banner invoke script dynamically inside client container
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl30549938.effectivecpmnetwork.com/00cf79882490a2b5dc99ed1e056650aa/invoke.js";

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

  // Render nothing on server — only render on client to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 p-4 my-6 transition-all ${className}`}
      aria-label="Advertisement"
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">
        <span>SPONSORED ADVERTISEMENT</span>
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-brand-500 transition"
        >
          Featured Offer <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
        </a>
      </div>

      {/* New Native Banner Ad Container for toolifia.vercel.app */}
      <div ref={containerRef} className="w-full flex justify-center items-center min-h-[90px]">
        <div id="container-00cf79882490a2b5dc99ed1e056650aa" className="w-full"></div>
      </div>
    </div>
  );
}
