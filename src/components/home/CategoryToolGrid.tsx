"use client";

import React, { useState } from "react";
import { TOOLS, ToolDef } from "@/config/tools.registry";
import { CATEGORIES } from "@/config/categories.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Sparkles, Flame, LayoutGrid, Zap } from "lucide-react";

export function CategoryToolGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterTabs = [
    { slug: "all", name: "All Tools (133+)" },
    { slug: "ai-tools", name: "🤖 AI Tools" },
    { slug: "seo-tools", name: "📈 SEO Tools" },
    { slug: "developer-tools", name: "💻 Dev Tools" },
    { slug: "calculator-tools", name: "🧮 Calculators" },
    { slug: "converter-tools", name: "🔄 Converters" },
    { slug: "text-tools", name: "📝 Text Tools" },
    { slug: "image-tools", name: "🖼️ Image Tools" },
  ];

  const displayedTools =
    selectedCategory === "all"
      ? TOOLS.slice(0, 12)
      : TOOLS.filter((t) => t.category === selectedCategory).slice(0, 12);

  return (
    <div className="space-y-8">
      {/* Category Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {filterTabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setSelectedCategory(tab.slug)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 shrink-0 border ${
              selectedCategory === tab.slug
                ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-lg shadow-brand-500/20 scale-105"
                : "bg-slate-900/60 dark:bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
