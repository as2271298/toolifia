import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
      <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={item.url} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-slate-400" />
          {idx === items.length - 1 ? (
            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
          ) : (
            <Link href={item.url} className="hover:text-brand-600 dark:hover:text-brand-400">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
