"use client";
import { useState } from "react";

export function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const maxLines = Math.max(origLines.length, modLines.length);

  const diffRows: { orig: string; mod: string; type: "same" | "diff" }[] = [];
  for (let i = 0; i < maxLines; i++) {
    const o = origLines[i] ?? "";
    const m = modLines[i] ?? "";
    diffRows.push({ orig: o, mod: m, type: o === m ? "same" : "diff" });
  }

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Original Text</label>
          <textarea className={inp} rows={8} value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="Paste original text..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Modified Text</label>
          <textarea className={inp} rows={8} value={modified} onChange={(e) => setModified(e.target.value)} placeholder="Paste modified text..." />
        </div>
      </div>

      {(original || modified) && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Line-by-Line Comparison</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden font-mono text-xs divide-y divide-slate-200 dark:divide-slate-800">
            {diffRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-2">
                <div className={`p-2.5 overflow-x-auto ${row.type === "diff" ? "bg-red-500/10 text-red-700 dark:text-red-300" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"}`}>
                  <span className="text-slate-400 mr-2 select-none">{idx + 1}</span>
                  {row.orig || <span className="opacity-0">empty</span>}
                </div>
                <div className={`p-2.5 overflow-x-auto border-l border-slate-200 dark:border-slate-800 ${row.type === "diff" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"}`}>
                  <span className="text-slate-400 mr-2 select-none">{idx + 1}</span>
                  {row.mod || <span className="opacity-0">empty</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
