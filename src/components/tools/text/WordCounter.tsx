"use client";

import { useState } from "react";
import { Hash, Clock, FileText, AlignLeft } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{words}</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">Words</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{chars}</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">Characters</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{charsNoSpaces}</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">No Spaces</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{sentences}</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">Sentences</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200">{paragraphs}</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">Paragraphs</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-500">{readingTime} min</div>
          <div className="text-[11px] font-bold uppercase text-slate-400">Read Time</div>
        </div>
      </div>

      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to calculate word metrics in real-time..."
          className="w-full h-72 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setText("")}
            className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
          >
            Clear Text
          </button>
        </div>
      </div>
    </div>
  );
}
