"use client";

import React, { useState } from "react";
import { TOOLS } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";

const FILTER_TABS = [
  { slug: "all",                name: "⚡ All Tools",   count: true },
  { slug: "ai-tools",           name: "🤖 AI Tools",    count: false },
  { slug: "seo-tools",          name: "📊 SEO",         count: false },
  { slug: "developer-tools",    name: "⚙️ Dev Tools",   count: false },
  { slug: "calculator-tools",   name: "🧮 Calculators", count: false },
  { slug: "converter-tools",    name: "🔄 Converters",  count: false },
  { slug: "text-tools",         name: "✍️ Text",        count: false },
  { slug: "image-tools",        name: "🖼️ Images",      count: false },
  { slug: "security-tools",     name: "🔒 Security",    count: false },
  { slug: "generator-tools",    name: "🎨 Generators",  count: false },
];

export function CategoryToolGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const total = TOOLS.length;
  const displayedTools =
    selectedCategory === "all"
      ? TOOLS.slice(0, 12)
      : TOOLS.filter((t) => t.category === selectedCategory).slice(0, 12);

  return (
    <div className="space-y-6">
      {/* Filter Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth -mx-1 px-1">
        {FILTER_TABS.map((tab) => {
          const isActive = selectedCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              onClick={() => setSelectedCategory(tab.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 border whitespace-nowrap ${
                isActive
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.03] border-white/[0.07] text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.14]"
              }`}
            >
              {tab.name}
              {tab.count && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-500"}`}>
                  {total}+
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
