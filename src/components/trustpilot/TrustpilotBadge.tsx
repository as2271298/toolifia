"use client";

import { useState, useEffect } from "react";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";

interface TrustpilotBadgeProps {
  variant?: "header" | "hero" | "footer" | "floating";
  className?: string;
}

export function TrustpilotBadge({ variant = "header", className = "" }: TrustpilotBadgeProps) {
  const reviewUrl = "https://www.trustpilot.com/review/toolifia.vercel.app";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 3500);
    return () => clearTimeout(t);
  }, []);

  if (variant === "floating" && !mounted) return null;

  if (variant === "header") {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900 border border-[#00b67a]/40 hover:border-[#00b67a] text-xs transition-all shadow-sm group hover:scale-[1.02] ${className}`}
        title="Verified Trustpilot Partner - Read or leave reviews"
      >
        <span className="flex items-center gap-1 font-bold text-white">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#00b67a] text-slate-950 font-black text-[10px]">
            ★
          </span>
          Trustpilot
        </span>

        <div className="flex items-center gap-0.5 text-[#00b67a]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#00b67a] stroke-none" />
          ))}
        </div>

        <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors">
          4.9/5
        </span>
      </a>
    );
  }

  if (variant === "hero") {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md border border-[#00b67a]/30 hover:border-[#00b67a] transition-all shadow-lg hover:shadow-[#00b67a]/10 group hover:-translate-y-0.5 ${className}`}
      >
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#00b67a] text-slate-950 font-black text-xs">
            ★
          </span>
          <span className="text-xs font-bold text-white tracking-wide">Trustpilot</span>
        </div>

        <div className="h-3.5 w-px bg-slate-700"></div>

        <div className="flex items-center gap-1 text-[#00b67a]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] stroke-none" />
          ))}
        </div>

        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          <strong className="text-white font-bold">4.9/5</strong> Verified Partner
        </span>

        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00b67a] transition-colors ml-0.5" />
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex flex-col justify-between w-full h-full min-h-[160px] p-5 rounded-2xl bg-slate-900/80 border border-white/[0.06] hover:border-[#00b67a]/50 shadow-lg hover:shadow-[#00b67a]/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      >
        {/* Top row: logo + label */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#00b67a] text-slate-950 font-black text-sm shadow-md shrink-0">
              ★
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#00b67a] uppercase tracking-widest leading-none">Trustpilot</p>
              <p className="text-sm font-bold text-white mt-0.5">Official Partner</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00b67a]" />
            <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00b67a] transition-colors" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] stroke-none" />
          ))}
          <span className="text-xs font-bold text-slate-300 ml-1.5">4.9 · Excellent</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2">
          Read community reviews and ratings for Toolifia's 300+ free online tools.
        </p>

        {/* CTA */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00b67a] group-hover:gap-2.5 transition-all">
          Review Us on Trustpilot
          <ExternalLink className="w-3 h-3" />
        </div>
      </a>
    );
  }


  // Floating review button
  return (
    <a
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-30 hidden md:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#00b67a]/50 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 group ${className}`}
      title="Review Toolifia on Trustpilot"
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#00b67a] text-slate-950 font-black text-xs">
        ★
      </span>
      <div className="flex flex-col text-left">
        <span className="text-[11px] font-bold leading-tight group-hover:text-[#00b67a] transition-colors">
          Trustpilot Partner
        </span>
        <div className="flex items-center gap-0.5 text-[#00b67a]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-[#00b67a] stroke-none" />
          ))}
          <span className="text-[10px] font-semibold text-slate-300 ml-1">4.9/5</span>
        </div>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00b67a] transition-colors" />
    </a>
  );
}
