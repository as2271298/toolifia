import Link from "next/link";
import { ToolDef } from "@/config/tools.registry";
import { Sparkles, Star, Flame, ArrowUpRight, Zap } from "lucide-react";

export function ToolCard({ tool }: { tool: ToolDef }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-brand-500/60 dark:hover:border-brand-400/60 hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md overflow-hidden"
    >
      {/* Subtle top glow highlight on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-500/15 via-purple-500/15 to-indigo-500/15 dark:from-brand-500/25 dark:to-indigo-500/25 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1.5">
            {tool.trending && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm animate-pulse-glow">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> Hot
              </span>
            )}
            {tool.featured && !tool.trending && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                <Zap className="w-3 h-3 text-purple-500" /> Featured
              </span>
            )}
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tool.rating}</span>
            </div>
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2 leading-snug">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        <span className="inline-flex items-center gap-1">
          Instant Run <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">(No Signup)</span>
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
