"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/config/categories.registry";
import { X, Search, ChevronRight } from "lucide-react";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
        <span className="text-lg font-bold text-white">Menu</span>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 bg-slate-900 border-b border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 text-white font-medium text-sm"
        >
          Home
        </Link>
        <Link
          href="/tools"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 text-white font-medium text-sm"
        >
          All Tools (130+)
        </Link>
        <Link
          href="/blog"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 text-white font-medium text-sm"
        >
          Blog & Guides
        </Link>
        <Link
          href="/about"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 text-white font-medium text-sm"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 text-white font-medium text-sm"
        >
          Contact Support
        </Link>

        <div className="pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Categories ({filteredCategories.length})
        </div>

        <div className="space-y-1">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm"
            >
              <span>{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
