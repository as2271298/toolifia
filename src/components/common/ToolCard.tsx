import Link from "next/link";
import { ToolDef } from "@/config/tools.registry";
import { Sparkles, Star, Flame, ArrowUpRight } from "lucide-react";

export function ToolCard({ tool }: { tool: ToolDef }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#111318] border border-white/[0.07] hover:border-white/[0.22] hover:bg-[#151820] transition-all duration-200 shadow-lg hover:-translate-y-0.5 overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-200">
            <Sparkles className="w-4 h-4" />
          </div>
          
          <div className="flex items-center gap-1.5">
            {tool.trending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-3 h-3 fill-amber-400" /> Hot
              </span>
            )}
            <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{tool.rating}</span>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-bold text-[#f7f8f8] group-hover:text-indigo-300 transition-colors mb-1.5 leading-snug">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
        <span className="font-mono text-[10px] text-slate-500">Run on-site</span>
        <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
          <span>Launch</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
