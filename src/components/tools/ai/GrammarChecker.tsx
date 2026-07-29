"use client";
import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function GrammarChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ corrected: string; issues: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!text.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/tools/grammar-checker", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch { setResult({ corrected: "Network error.", issues: [] }); }
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your text here to check for grammar, spelling, and style issues..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-500" />
        <div className="text-xs text-slate-400 mt-1 text-right">{text.length} characters · {text.trim().split(/\s+/).filter(Boolean).length} words</div>
      </div>
      <button onClick={check} disabled={loading || !text.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
        {loading ? "Checking grammar..." : "Check Grammar"}
      </button>
      {result && (
        <div className="space-y-4">
          {result.issues && result.issues.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Issues Found ({result.issues.length})</h3>
              <ul className="space-y-1">{result.issues.map((issue, i) => <li key={i} className="text-xs text-amber-700 dark:text-amber-400">• {issue}</li>)}</ul>
            </div>
          )}
          <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm mb-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Corrected Text</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{result.corrected}</p>
          </div>
        </div>
      )}
    </div>
  );
}
