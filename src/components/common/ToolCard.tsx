import Link from "next/link";
import { ToolDef } from "@/config/tools.registry";
import { Sparkles, Star, Flame, ArrowUpRight } from "lucide-react";

export function ToolCard({ tool }: { tool: ToolDef }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card dark:shadow-card-dark hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-glow transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500/10 to-indigo-500/10 dark:from-brand-500/20 dark:to-indigo-500/20 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            {tool.trending && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Flame className="w-3 h-3" /> Trending
              </span>
            )}
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tool.rating}</span>
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
        <span>Use Tool Free</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}
