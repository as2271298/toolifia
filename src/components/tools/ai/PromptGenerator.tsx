"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";

export function PromptGenerator() {
  const [idea, setIdea] = useState("");
  const [model, setModel] = useState("ChatGPT");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: `Target AI: ${model}. Idea: ${idea}` }),
      });
      const data = await res.json();
      setOutput(data.result || data.data?.result || "Failed to generate prompt.");
    } catch {
      setOutput("Error generating prompt. Please try again.");
    }

    setLoading(false);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Target AI Engine:</span>
        <div className="flex flex-wrap gap-2">
          {["ChatGPT", "Claude 3.5", "Midjourney", "Gemini"].map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                model === m
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Your Idea or Task Goal
        </label>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. Write a marketing campaign strategy for a modern SaaS tool launch"
          className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={loading || !idea.trim()}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "Optimizing..." : "Generate Engineered Prompt"}
        </button>
      </div>

      {output && (
        <div className="p-6 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-brand-400 font-mono">Engineered Prompt Output</span>
            <button
              onClick={copyPrompt}
              className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Prompt"}
            </button>
          </div>
          <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-300">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
