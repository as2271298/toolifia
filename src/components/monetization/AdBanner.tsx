"use client";

import { useEffect, useRef, useState, useId } from "react";
import { siteConfig } from "@/config/site.config";
import { ExternalLink } from "lucide-react";
import { PosterAd } from "./PosterAd";

interface AdBannerProps {
  slot: keyof typeof siteConfig.monetization.slots;
  className?: string;
  variant?: "leaderboard" | "rectangle" | "sidebar" | "native";
  theme?: "violet" | "cyan" | "emerald" | "amber" | "dark";
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
  theme,
}: AdBannerProps) {
  const uid = useId().replace(/:/g, "");
  const containerId = `${BASE_CONTAINER_ID}-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hasNetworkAd, setHasNetworkAd] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!siteConfig.monetization.enableAds) return;

    // Set container ID for network script targeting
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

    // Observer to detect when the ad script actually inserts ad content into the DOM
    const observer = new MutationObserver(() => {
      const el = document.getElementById(BASE_CONTAINER_ID);
      if (el && el.children.length > 0) {
        setHasNetworkAd(true);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      const restored = document.getElementById(BASE_CONTAINER_ID);
      if (restored && containerRef.current?.contains(restored)) {
        restored.id = containerId;
      }
    };
  }, [mounted, containerId]);

  if (!siteConfig.monetization.enableAds) return null;
  if (!mounted) return null;

  return (
    <div className={`relative w-full my-6 ${className}`} aria-label="Advertisement">
      {/* 1. Network Script Container */}
      <div
        ref={containerRef}
        className={`w-full flex justify-center items-center ${
          hasNetworkAd ? "block p-4 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl" : "hidden"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
            <span>SPONSORED ADVERTISEMENT</span>
            <a
              href={SMARTLINK_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-1 hover:text-violet-400 transition-colors"
            >
              Featured Offer <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <div id={containerId} className="w-full min-h-[90px]" />
        </div>
      </div>

      {/* 2. Fallback Poster Ad (renders immediately & stays active if network ad is empty or blocked) */}
      {!hasNetworkAd && (
        <PosterAd
          theme={theme}
          layout={variant === "sidebar" ? "vertical" : "horizontal"}
          className="my-0"
        />
      )}
    </div>
  );
}
