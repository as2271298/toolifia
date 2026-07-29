import Link from "next/link";
import { CategoryDef } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { Sparkles, ArrowRight } from "lucide-react";

export function CategoryCard({ category }: { category: CategoryDef }) {
  const toolsCount = TOOLS.filter((t) => t.category === category.slug).length;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-card transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-sm group-hover:scale-105 transition-transform`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {toolsCount > 0 ? `${toolsCount} Tools` : "Active"}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1.5">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 pt-4 mt-2">
        <span>Explore Category</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
