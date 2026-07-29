"use client";

import { Star, ExternalLink, ShieldCheck } from "lucide-react";

interface TrustpilotBadgeProps {
  variant?: "header" | "hero" | "footer" | "floating";
  className?: string;
}

export function TrustpilotBadge({ variant = "header", className = "" }: TrustpilotBadgeProps) {
  const reviewUrl = "https://www.trustpilot.com/review/toolifia.vercel.app";

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
      <div className={`w-full max-w-2xl mx-auto my-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900/95 via-slate-900 to-slate-900/95 border border-[#00b67a]/40 shadow-2xl backdrop-blur-xl transition-all ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#00b67a] text-slate-950 font-black text-sm">
                ★
              </span>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Official Trustpilot Partner <ShieldCheck className="w-4 h-4 text-[#00b67a]" />
              </h3>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              Rated <strong className="text-white font-semibold">4.9 / 5 Stars</strong> by over 10,000+ happy creators, developers, and marketers worldwide.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-1 text-[#00b67a] pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00b67a] stroke-none" />
              ))}
              <span className="text-xs font-bold text-slate-300 ml-2">EXCELLENT</span>
            </div>
          </div>

          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#00b67a] hover:bg-[#009e6a] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#00b67a]/30 hover:scale-[1.03] active:scale-95 shrink-0"
          >
            Review Us on Trustpilot <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
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
