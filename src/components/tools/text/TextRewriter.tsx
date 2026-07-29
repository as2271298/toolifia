"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Sparkles } from "lucide-react";

export function TextRewriter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/text-rewriter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setOutput(data.result || data.data?.result || "Failed to rewrite text.");
    } catch {
      setOutput("Error processing rewrite request.");
    }

    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Original Passage</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text to rewrite with enhanced vocabulary and smooth sentence flow..."
            className="w-full h-64 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-500">Paraphrased Result</label>
            {output && (
              <button
                onClick={copyText}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Output"}
              </button>
            )}
          </div>
          <div className="w-full h-64 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto text-slate-900 dark:text-white whitespace-pre-wrap leading-relaxed">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-400 gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-brand-500" /> Rewriting with AI...
              </div>
            ) : (
              output || <span className="text-slate-400 italic">Rewritten text will appear here...</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleRewrite}
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" /> Rewrite & Paraphrase Text
        </button>
      </div>
    </div>
  );
}
