import Link from "next/link";
import { CategoryDef } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { ArrowRight } from "lucide-react";

const CATEGORY_CONFIG: Record<string, {
  gradient: string;
  border: string;
  glow: string;
  emoji: string;
}> = {
  "ai-tools":           { gradient: "from-violet-600/20 via-purple-600/10 to-transparent",  border: "border-violet-500/20 hover:border-violet-400/50",  glow: "hover:shadow-[0_8px_32px_rgba(124,58,237,0.25)]",  emoji: "🤖" },
  "seo-tools":          { gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",   border: "border-emerald-500/20 hover:border-emerald-400/50", glow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.25)]",  emoji: "📊" },
  "text-tools":         { gradient: "from-sky-600/20 via-blue-600/10 to-transparent",       border: "border-sky-500/20 hover:border-sky-400/50",         glow: "hover:shadow-[0_8px_32px_rgba(56,189,248,0.25)]",  emoji: "✍️" },
  "developer-tools":    { gradient: "from-cyan-600/20 via-cyan-500/10 to-transparent",      border: "border-cyan-500/20 hover:border-cyan-400/50",       glow: "hover:shadow-[0_8px_32px_rgba(6,182,212,0.25)]",   emoji: "⚡" },
  "calculator-tools":   { gradient: "from-orange-600/20 via-orange-500/10 to-transparent",  border: "border-orange-500/20 hover:border-orange-400/50",   glow: "hover:shadow-[0_8px_32px_rgba(249,115,22,0.25)]",  emoji: "🧮" },
  "converter-tools":    { gradient: "from-amber-600/20 via-yellow-500/10 to-transparent",   border: "border-amber-500/20 hover:border-amber-400/50",     glow: "hover:shadow-[0_8px_32px_rgba(251,191,36,0.25)]",  emoji: "🔄" },
  "image-tools":        { gradient: "from-pink-600/20 via-rose-500/10 to-transparent",      border: "border-pink-500/20 hover:border-pink-400/50",       glow: "hover:shadow-[0_8px_32px_rgba(236,72,153,0.25)]",  emoji: "🖼️" },
  "pdf-tools":          { gradient: "from-red-600/20 via-red-500/10 to-transparent",        border: "border-red-500/20 hover:border-red-400/50",         glow: "hover:shadow-[0_8px_32px_rgba(239,68,68,0.25)]",   emoji: "📄" },
  "security-tools":     { gradient: "from-rose-600/20 via-pink-500/10 to-transparent",      border: "border-rose-500/20 hover:border-rose-400/50",       glow: "hover:shadow-[0_8px_32px_rgba(244,63,94,0.25)]",   emoji: "🔒" },
  "productivity-tools": { gradient: "from-indigo-600/20 via-indigo-500/10 to-transparent",  border: "border-indigo-500/20 hover:border-indigo-400/50",   glow: "hover:shadow-[0_8px_32px_rgba(99,102,241,0.25)]",  emoji: "📈" },
  "generator-tools":    { gradient: "from-teal-600/20 via-teal-500/10 to-transparent",      border: "border-teal-500/20 hover:border-teal-400/50",       glow: "hover:shadow-[0_8px_32px_rgba(20,184,166,0.25)]",  emoji: "🎨" },
  "social-media-tools": { gradient: "from-fuchsia-600/20 via-purple-500/10 to-transparent", border: "border-fuchsia-500/20 hover:border-fuchsia-400/50", glow: "hover:shadow-[0_8px_32px_rgba(217,70,239,0.25)]",  emoji: "📱" },
};

const DEFAULT_CFG = { gradient: "from-violet-600/20 via-purple-600/10 to-transparent", border: "border-violet-500/20 hover:border-violet-400/50", glow: "hover:shadow-[0_8px_32px_rgba(124,58,237,0.25)]", emoji: "🔧" };

export function CategoryCard({ category }: { category: CategoryDef }) {
  const toolsCount = TOOLS.filter((t) => t.category === category.slug).length;
  const cfg = CATEGORY_CONFIG[category.slug] ?? DEFAULT_CFG;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white/[0.025] backdrop-blur-sm border transition-all duration-300 overflow-hidden ${cfg.border} ${cfg.glow} hover:-translate-y-1`}
    >
      {/* Background gradient fill on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
        {/* Top row: emoji + count */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {cfg.emoji}
          </div>
          <span className="text-[10px] font-semibold font-mono text-slate-400 bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-full">
            {toolsCount > 0 ? `${toolsCount} tools` : "active"}
          </span>
        </div>

        {/* Category name */}
        <h3 className="text-sm font-bold text-white group-hover:text-white transition-colors mb-1.5 leading-snug">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-white pt-3.5 mt-4 border-t border-white/[0.06] transition-colors duration-200">
        <span>Explore</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
}
