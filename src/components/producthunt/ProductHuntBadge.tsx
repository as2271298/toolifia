"use client";

import React from "react";
import { ExternalLink, Star } from "lucide-react";

interface ProductHuntBadgeProps {
  variant?: "header" | "hero" | "footer" | "floating";
  className?: string;
}

export function ProductHuntBadge({ variant = "header", className = "" }: ProductHuntBadgeProps) {
  const phUrl = "https://www.producthunt.com/products/toolifia/reviews/new";

  if (variant === "header") {
    return (
      <a
        href={phUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900 border border-[#ff6154]/40 hover:border-[#ff6154] text-xs transition-all shadow-sm group hover:scale-[1.02] ${className}`}
        title="Featured on Product Hunt - Review Toolifia"
      >
        <span className="flex items-center gap-1 font-bold text-white">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ff6154] text-white font-black text-[10px]">
            P
          </span>
          Product Hunt
        </span>
        <span className="text-[11px] font-semibold text-[#ff6154] bg-[#ff6154]/10 px-2 py-0.5 rounded-full group-hover:bg-[#ff6154] group-hover:text-white transition-colors">
          ★ 5.0
        </span>
      </a>
    );
  }

  if (variant === "hero") {
    return (
      <a
        href={phUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md border border-[#ff6154]/40 hover:border-[#ff6154] transition-all shadow-lg hover:shadow-[#ff6154]/20 group hover:-translate-y-0.5 ${className}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff6154] text-white font-black text-xs shadow-sm">
            P
          </span>
          <span className="text-xs font-bold text-white tracking-wide">Product Hunt</span>
        </div>

        <div className="h-3.5 w-px bg-slate-700"></div>

        <div className="flex items-center gap-1 text-[#ff6154]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#ff6154] stroke-none" />
          ))}
        </div>

        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          <strong className="text-white font-bold">5.0 / 5</strong> Product Hunt Review
        </span>

        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff6154] transition-colors ml-0.5" />
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`w-full max-w-2xl mx-auto my-6 p-6 rounded-3xl bg-gradient-to-r from-slate-900/95 via-slate-900 to-slate-900/95 border border-[#ff6154]/40 shadow-2xl backdrop-blur-xl transition-all ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff6154] text-white font-black text-sm shadow-md">
                P
              </span>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Featured on Product Hunt
              </h3>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              Help us grow by leaving an honest review on Product Hunt! Share your experience with Toolifia.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-1 text-[#ff6154] pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ff6154] stroke-none" />
              ))}
              <span className="text-xs font-bold text-slate-300 ml-2">FEATURED PRODUCT</span>
            </div>
          </div>

          <a
            href={phUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#ff6154] hover:bg-[#e04f43] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#ff6154]/30 hover:scale-[1.03] active:scale-95 shrink-0"
          >
            Review on Product Hunt <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Floating button
  return (
    <a
      href={phUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 left-5 z-30 hidden md:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#ff6154]/50 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 group ${className}`}
      title="Review Toolifia on Product Hunt"
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff6154] text-white font-black text-xs">
        P
      </span>
      <div className="flex flex-col text-left">
        <span className="text-[11px] font-bold leading-tight group-hover:text-[#ff6154] transition-colors">
          Product Hunt
        </span>
        <div className="flex items-center gap-0.5 text-[#ff6154]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-[#ff6154] stroke-none" />
          ))}
          <span className="text-[10px] font-semibold text-slate-300 ml-1">5.0</span>
        </div>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff6154] transition-colors" />
    </a>
  );
}
