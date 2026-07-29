"use client";
import { useState } from "react";
import { Code, Check, AlertCircle } from "lucide-react";

export function RegexTester() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+\\.\\w+)");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("Contact us at support@example.com or sales@toolifia.com for help.");

  let matches: RegExpExecArray[] = [];
  let error = "";

  try {
    if (pattern) {
      const regex = new RegExp(pattern, flags);
      let match: RegExpExecArray | null;
      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          matches.push(match);
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testText);
        if (match) matches.push(match);
      }
    }
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Invalid Regular Expression";
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Regex Pattern</label>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white font-mono text-sm">
            <span className="text-slate-400 select-none mr-1">/</span>
            <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" className="w-full bg-transparent outline-none" />
            <span className="text-slate-400 select-none ml-1">/</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Flags</label>
          <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gim" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white font-mono" />
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      ) : (
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Check className="w-4 h-4" /> Valid Pattern — {matches.length} match{matches.length === 1 ? "" : "es"} found
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Test String</label>
        <textarea value={testText} onChange={e => setTestText(e.target.value)} rows={5} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white font-mono" />
      </div>

      {matches.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-400">Match Details</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {matches.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-amber-400 font-bold">Match #{idx + 1}:</span> "{m[0]}" <span className="text-slate-500">(Index: {m.index})</span>
                {m.length > 1 && (
                  <div className="mt-1 pl-3 text-slate-400 border-l border-slate-800 space-y-0.5">
                    {Array.from(m).slice(1).map((g, gIdx) => (
                      <div key={gIdx}>Group {gIdx + 1}: <span className="text-emerald-400">"{g}"</span></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
