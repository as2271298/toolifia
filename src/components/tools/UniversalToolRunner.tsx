"use client";
import { useState } from "react";
import { ToolDef } from "@/config/tools.registry";
import { Sparkles, Loader2, Copy, Check, Terminal } from "lucide-react";

export function UniversalToolRunner({ tool }: { tool: ToolDef }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runTool = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`/api/tools/${tool.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (data.data?.result) {
        setResult(data.data.result);
      } else if (typeof data.data === "string") {
        setResult(data.data);
      } else if (data.data?.output) {
        setResult(data.data.output);
      } else {
        setResult(JSON.stringify(data.data || data, null, 2));
      }
    } catch {
      setResult("Error processing tool request. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Input for {tool.name}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={`Enter your input text or data for ${tool.name}...`}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-sans"
        />
        <div className="flex justify-between items-center mt-1 text-xs text-slate-400">
          <span>{input.length} characters</span>
          <span>Fast AI & Algorithmic Engine</span>
        </div>
      </div>

      <button
        onClick={runTool}
        disabled={loading || !input.trim()}
        className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-500/20"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Processing..." : `Run ${tool.name}`}
      </button>

      {result && (
        <div className="relative p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Result Output
            </span>
            <button
              onClick={copy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-slate-200 font-mono overflow-x-auto leading-relaxed max-h-96">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
