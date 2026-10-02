"use client";

import Script from "next/script";
import { ShieldCheck, ExternalLink } from "lucide-react";

interface MyWotBadgeProps {
  className?: string;
}

export function MyWotBadge({ className = "" }: MyWotBadgeProps) {
  const wotUrl = "https://www.mywot.com/scorecard/toolifia.vercel.app?wot_badge=2_black";

  return (
    <>
      <Script
        src="https://static.mywot.com/website_owners_badges/websiteOwnersBadge.js"
        strategy="lazyOnload"
      />
      <a
        href={wotUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex flex-col justify-between w-full h-full min-h-[160px] p-5 rounded-2xl bg-slate-900/80 border border-white/[0.06] hover:border-[#4f8ef7]/50 shadow-lg hover:shadow-[#4f8ef7]/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${className}`}
        aria-label="MyWOT Verified Site - See Toolifia Trust Report"
      >
        {/* Top row: logo + label */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#4f8ef7] text-white shadow-md shrink-0">
              {/* WOT Shield SVG */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#4f8ef7] uppercase tracking-widest leading-none">MyWOT</p>
              <p className="text-sm font-bold text-white mt-0.5">Verified Site</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4f8ef7]" />
            <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#4f8ef7] transition-colors" />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] text-[10px] font-bold uppercase tracking-wide">
            <ShieldCheck className="w-3 h-3" /> Trusted
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
            Safe &amp; Secure
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2">
          Toolifia is verified and trusted by the Web of Trust community worldwide.
        </p>

        {/* CTA */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4f8ef7] group-hover:gap-2.5 transition-all">
          See Trust Report
          <ExternalLink className="w-3 h-3" />
        </div>
      </a>
    </>
  );
}
