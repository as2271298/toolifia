import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-x-2 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
      <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={item.url} className="flex items-center gap-x-2 shrink-0 max-w-full">
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          {idx === items.length - 1 ? (
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[220px] sm:max-w-md" title={item.name}>
              {item.name}
            </span>
          ) : (
            <Link href={item.url} className="hover:text-brand-600 dark:hover:text-brand-400 truncate max-w-[140px] sm:max-w-none">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
