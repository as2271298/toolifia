"use client";

import React from "react";
import { ExternalLink, Star } from "lucide-react";

interface ProductHuntBadgeProps {
  variant?: "header" | "hero" | "footer" | "floating";
  className?: string;
}

export function ProductHuntBadge({ variant = "header", className = "" }: ProductHuntBadgeProps) {
  const phUrl = "https://www.producthunt.com/products/toolifia/reviews/new";
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 3500);
    return () => clearTimeout(t);
  }, []);

  if (variant === "floating" && !mounted) return null;

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
      <a
        href={phUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex flex-col justify-between w-full h-full min-h-[160px] p-5 rounded-2xl bg-slate-900/80 border border-white/[0.06] hover:border-[#ff6154]/50 shadow-lg hover:shadow-[#ff6154]/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      >
        {/* Top row: logo + label */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#ff6154] text-white font-black text-sm shadow-md shrink-0">
              P
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#ff6154] uppercase tracking-widest leading-none">Product Hunt</p>
              <p className="text-sm font-bold text-white mt-0.5">Featured Product</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#ff6154] transition-colors mt-0.5 shrink-0" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#ff6154] stroke-none" />
          ))}
          <span className="text-xs font-bold text-slate-300 ml-1.5">5.0</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2">
          Help us grow by leaving an honest review on Product Hunt.
        </p>

        {/* CTA */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ff6154] group-hover:gap-2.5 transition-all">
          Review on Product Hunt
          <ExternalLink className="w-3 h-3" />
        </div>
      </a>
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
