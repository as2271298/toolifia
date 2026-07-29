"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

export function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const totalWords = words.length;
  const freqMap: Record<string, number> = {};

  words.forEach((w) => {
    freqMap[w] = (freqMap[w] || 0) + 1;
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Article or Web Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste content here to calculate top keyword frequency & density percentage..."
          className="w-full h-48 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
        />
      </div>

      {totalWords > 0 && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Top Keyword Density Analysis</span>
            <span className="text-xs font-medium text-slate-500">Total Filtered Words: {totalWords}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedKeywords.map(([word, count]) => {
              const density = ((count / totalWords) * 100).toFixed(1);
              return (
                <div
                  key={word}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{word}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">{count}x</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">{density}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
