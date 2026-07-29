import Link from "next/link";
import { siteConfig } from "@/config/site.config";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", iconOnly = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Visual Logo Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-violet-500 p-0.5 shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center`}
      >
        <div className="w-full h-full bg-slate-950 dark:bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
          
          {/* Custom SVG Stylized 'T' Spark Mark */}
          <svg
            className="w-3/5 h-3/5 text-white relative z-10 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Main T pillar */}
            <path d="M12 4v16" />
            <path d="M5 4h14" />
            {/* AI Sparkles */}
            <path d="M18 10l1.5 1.5L18 13l-1.5-1.5z" fill="currentColor" />
            <path d="M6 14l1 1-1 1-1-1z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Brand Text Typography */}
      {!iconOnly && (
        <span
          className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-brand-600 dark:from-white dark:via-slate-100 dark:to-brand-400 bg-clip-text text-transparent`}
        >
          {siteConfig.name}
          <span className="text-brand-500 font-bold text-xs ml-0.5 uppercase tracking-widest align-super">
            .AI
          </span>
        </span>
      )}
    </Link>
  );
}
