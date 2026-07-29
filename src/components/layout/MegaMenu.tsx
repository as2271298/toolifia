"use client";

import Link from "next/link";
import { CATEGORIES } from "@/config/categories.registry";
import {
  Sparkles,
  Search,
  FileText,
  PenTool,
  Code,
  Braces,
  Code2,
  Palette,
  Terminal,
  FileCode,
  Cpu,
  Droplet,
  Image as ImageIcon,
  FileUp,
  DollarSign,
  Calculator,
  HeartPulse,
  ArrowLeftRight,
  ShieldCheck,
  Lock,
  Binary,
  Wand2,
  Dices,
  Wrench,
  Share2,
  Zap,
  GraduationCap,
  Briefcase,
  TrendingUp,
  FileBadge,
  Atom,
  Scale,
  Video,
  Headphones,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Sparkles,
  Search,
  FileText,
  PenTool,
  Code,
  Braces,
  Code2,
  Palette,
  Terminal,
  FileCode,
  Cpu,
  Droplet,
  Image: ImageIcon,
  FileUp,
  DollarSign,
  Calculator,
  HeartPulse,
  ArrowLeftRight,
  ShieldCheck,
  Lock,
  Binary,
  Wand2,
  Dices,
  Wrench,
  Share2,
  Zap,
  GraduationCap,
  Briefcase,
  TrendingUp,
  FileBadge,
  Atom,
  Scale,
  Video,
  Headphones,
};

export function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Tool Categories</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Explore over 35 specialized categories & 300+ free online tools</p>
          </div>
          <Link
            href="/#categories"
            onClick={onClose}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-2">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Sparkles;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={onClose}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color} text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {cat.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
