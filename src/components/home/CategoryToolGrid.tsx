"use client";

import React, { useState } from "react";
import { TOOLS, ToolDef } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";

export function CategoryToolGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterTabs = [
    { slug: "all", name: "All Tools (133+)" },
    { slug: "ai-tools", name: "AI Tools" },
    { slug: "seo-tools", name: "SEO Tools" },
    { slug: "developer-tools", name: "Dev Tools" },
    { slug: "calculator-tools", name: "Calculators" },
    { slug: "converter-tools", name: "Converters" },
    { slug: "text-tools", name: "Text Tools" },
    { slug: "image-tools", name: "Image Tools" },
  ];

  const displayedTools =
    selectedCategory === "all"
      ? TOOLS.slice(0, 12)
      : TOOLS.filter((t) => t.category === selectedCategory).slice(0, 12);

  return (
    <div className="space-y-6">
      {/* Category Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {filterTabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setSelectedCategory(tab.slug)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 shrink-0 border ${
              selectedCategory === tab.slug
                ? "bg-white/[0.1] text-white border-white/[0.2] shadow-sm font-semibold"
                : "bg-[#111318] border-white/[0.07] text-slate-400 hover:text-white hover:border-white/[0.14]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
