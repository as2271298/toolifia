"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";

export function EmailWriter() {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleWrite = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/tools/email-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt }),
      });
      const data = await res.json();
      const mailData = data.data || data;
      setSubject(mailData.subject || "Quick Email Follow Up");
      setOutput(mailData.result || data.result || "Failed to generate email draft.");
    } catch {
      setOutput("Error drafting email. Please try again.");
    }

    setLoading(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${output}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Email Goal or Message Brief
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Ask client for approval on design deliverables and request a 15-minute call..."
          className="w-full h-36 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleWrite}
          disabled={loading || !prompt.trim()}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "Drafting..." : "Draft Professional Email"}
        </button>
      </div>

      {output && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Generated Email Draft</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Full Email"}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-xs text-slate-800 dark:text-slate-200">
            Subject: {subject}
          </div>
          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
