import Link from "next/link";
import { ToolDef } from "@/config/tools.registry";
import { Star, Flame, ArrowUpRight, Sparkles } from "lucide-react";

// Category → color system
const CATEGORY_CONFIG: Record<string, {
  gradient: string;
  glowClass: string;
  bgIcon: string;
  textColor: string;
  badgeColor: string;
}> = {
  "ai-tools":            { gradient: "from-violet-500 to-purple-600",   glowClass: "tool-card-violet",  bgIcon: "bg-violet-500/15 border-violet-500/25",  textColor: "text-violet-400",  badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  "seo-tools":           { gradient: "from-emerald-500 to-teal-600",    glowClass: "tool-card-emerald", bgIcon: "bg-emerald-500/15 border-emerald-500/25", textColor: "text-emerald-400", badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  "text-tools":          { gradient: "from-sky-400 to-blue-600",        glowClass: "tool-card-sky",     bgIcon: "bg-sky-500/15 border-sky-500/25",         textColor: "text-sky-400",     badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
  "developer-tools":     { gradient: "from-cyan-400 to-cyan-600",       glowClass: "tool-card-cyan",    bgIcon: "bg-cyan-500/15 border-cyan-500/25",       textColor: "text-cyan-400",    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
  "calculator-tools":    { gradient: "from-orange-400 to-orange-600",   glowClass: "tool-card-orange",  bgIcon: "bg-orange-500/15 border-orange-500/25",   textColor: "text-orange-400",  badgeColor: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
  "converter-tools":     { gradient: "from-amber-400 to-yellow-600",    glowClass: "tool-card-amber",   bgIcon: "bg-amber-500/15 border-amber-500/25",     textColor: "text-amber-400",   badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  "image-tools":         { gradient: "from-pink-500 to-rose-600",       glowClass: "tool-card-pink",    bgIcon: "bg-pink-500/15 border-pink-500/25",       textColor: "text-pink-400",    badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/20" },
  "pdf-tools":           { gradient: "from-red-500 to-red-700",         glowClass: "tool-card-red",     bgIcon: "bg-red-500/15 border-red-500/25",         textColor: "text-red-400",     badgeColor: "bg-red-500/10 text-red-300 border-red-500/20" },
  "security-tools":      { gradient: "from-rose-500 to-pink-700",       glowClass: "tool-card-rose",    bgIcon: "bg-rose-500/15 border-rose-500/25",       textColor: "text-rose-400",    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
  "productivity-tools":  { gradient: "from-indigo-500 to-indigo-700",   glowClass: "tool-card-indigo",  bgIcon: "bg-indigo-500/15 border-indigo-500/25",   textColor: "text-indigo-400",  badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
  "generator-tools":     { gradient: "from-teal-400 to-teal-600",       glowClass: "tool-card-teal",    bgIcon: "bg-teal-500/15 border-teal-500/25",       textColor: "text-teal-400",    badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20" },
  "social-media-tools":  { gradient: "from-fuchsia-500 to-purple-700",  glowClass: "tool-card-fuchsia", bgIcon: "bg-fuchsia-500/15 border-fuchsia-500/25", textColor: "text-fuchsia-400", badgeColor: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20" },
};

const DEFAULT_CONFIG = CATEGORY_CONFIG["ai-tools"];

export function ToolCard({ tool }: { tool: ToolDef }) {
  const cfg = CATEGORY_CONFIG[tool.category] ?? DEFAULT_CONFIG;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl glass-card ${cfg.glowClass} overflow-hidden`}
    >
      {/* Gradient top border accent */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cfg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

      {/* Subtle background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-4">
          {/* Icon with category gradient background */}
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${cfg.bgIcon} group-hover:scale-110 transition-transform duration-300`}>
            <Sparkles className={`w-4.5 h-4.5 ${cfg.textColor}`} />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {tool.trending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Flame className="w-2.5 h-2.5 fill-amber-400" /> Hot
              </span>
            )}
            {tool.featured && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.badgeColor}`}>
                Featured
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-slate-400 border border-white/[0.07]">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              {tool.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-sm font-bold text-white group-hover:${cfg.textColor} transition-colors duration-200 mb-2 leading-snug`}>
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-3.5 mt-4 border-t border-white/[0.06]">
        <span className="text-[10px] font-mono text-slate-500 tracking-wide">Free · No signup</span>
        <div className={`flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:${cfg.textColor} transition-colors duration-200`}>
          <span>Use Tool</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
