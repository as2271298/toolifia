"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/config/categories.registry";
import { siteConfig } from "@/config/site.config";
import { X, Search, ChevronRight, Facebook, Instagram } from "lucide-react";

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
          className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 active:scale-95 transition-all flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 bg-slate-900 border-b border-slate-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-between p-3.5 min-h-[44px] rounded-xl bg-slate-900/60 text-white font-medium text-sm active:bg-slate-800"
        >
          Home
        </Link>
        <Link
          href="/tools"
          onClick={onClose}
          className="flex items-center justify-between p-3.5 min-h-[44px] rounded-xl bg-slate-900/60 text-white font-medium text-sm active:bg-slate-800"
        >
          All Tools (300+)
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

        {/* Social Links */}
        <div className="pt-6 pb-2 border-t border-slate-800/80">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Follow Toolifia
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {siteConfig.links.facebook && (
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#1877F2] transition-colors flex items-center gap-2 text-xs font-medium border border-slate-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
            )}
            {siteConfig.links.instagram && (
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-2 text-xs font-medium border border-slate-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>
            )}
            {siteConfig.links.tiktok && (
              <a
                href={siteConfig.links.tiktok}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2 text-xs font-medium border border-slate-800"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
