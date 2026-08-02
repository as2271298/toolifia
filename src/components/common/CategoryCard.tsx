import Link from "next/link";
import { CategoryDef } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { Sparkles, ArrowRight } from "lucide-react";

export function CategoryCard({ category }: { category: CategoryDef }) {
  const toolsCount = TOOLS.filter((t) => t.category === category.slug).length;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/60 dark:hover:border-brand-400/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-brand-600 dark:text-brand-400 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            {toolsCount > 0 ? `${toolsCount} Tools` : "Featured"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        <span>Explore Tools</span>
        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
