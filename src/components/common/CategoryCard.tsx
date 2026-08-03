import Link from "next/link";
import { CategoryDef } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { Sparkles, ArrowRight } from "lucide-react";

export function CategoryCard({ category }: { category: CategoryDef }) {
  const toolsCount = TOOLS.filter((t) => t.category === category.slug).length;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#111318] border border-white/[0.07] hover:border-white/[0.22] hover:bg-[#151820] transition-all duration-200 shadow-md hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/10 transition-all duration-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
            {toolsCount > 0 ? `${toolsCount} tools` : "active"}
          </span>
        </div>

        <h3 className="text-sm font-bold text-[#f7f8f8] group-hover:text-indigo-300 transition-colors mb-1">
          {category.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-white pt-3 mt-2 border-t border-white/[0.06] transition-colors">
        <span>Browse</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
