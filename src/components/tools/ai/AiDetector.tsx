"use client";

import { useState } from "react";
import type { DetectResult } from "@/lib/ai-provider";
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

export function AiDetector() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectResult | null>(null);

  const handleDetect = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const runClientDetection = () => {
      const lower = input.toLowerCase();
      const aiMarkers = [
        "furthermore", "moreover", "delve", "testament", "paramount",
        "in conclusion", "it is important to note", "landscape", "tapestry",
        "beacon", "pivotal", "seamlessly", "utilize", "imperative",
        "cutting-edge", "multifaceted", "meticulous", "in today's digital age"
      ];
      let score = 10;
      const matched: string[] = [];
      aiMarkers.forEach((m) => {
        if (lower.includes(m)) {
          score += 15;
          matched.push(m);
        }
      });
      const words = input.split(/\s+/).filter(Boolean);
      const avgWordLength = words.reduce((a, w) => a + w.length, 0) / (words.length || 1);
      if (avgWordLength > 5.6) score += 15;
      const aiProbability = Math.min(98, Math.max(8, score));
      return {
        aiProbability,
        humanScore: 100 - aiProbability,
        status: aiProbability > 50 ? "High AI Probability Detected" : "Likely Human Written",
        matchedMarkers: matched,
      };
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch("/api/tools/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const detData = data.data || data;
        if (detData.aiProbability !== undefined) {
          setResult({
            aiProbability: detData.aiProbability ?? 50,
            humanScore: detData.humanScore ?? 50,
            status: detData.status || (detData.aiProbability > 50 ? "High AI Probability Detected" : "Likely Human Written"),
            matchedMarkers: detData.matchedMarkers || [],
          });
          setLoading(false);
          return;
        }
      }
    } catch {}

    // Instant client-side fallback
    setResult(runClientDetection());
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Text Content to Analyze
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste essay, blog article, or passage to scan for AI signatures..."
          className="w-full h-56 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-white resize-none"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
          <span>{input.split(/\s+/).filter(Boolean).length} words</span>
          <button onClick={() => setInput("")} className="hover:text-rose-500">
            Clear
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleDetect}
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          Scan for AI Content
        </button>
      </div>

      {result && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase text-slate-400">Detection Result</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                {result.aiProbability > 50 ? (
                  <AlertTriangle className="w-6 h-6 text-rose-500" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                )}
                {result.status}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-w-[100px]">
                <div className="text-2xl font-black text-rose-500">{result.aiProbability}%</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">AI Score</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-w-[100px]">
                <div className="text-2xl font-black text-emerald-500">{result.humanScore}%</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Human Score</div>
              </div>
            </div>
          </div>

          {result.matchedMarkers && result.matchedMarkers.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Detected AI Phrasing Flags:
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedMarkers.map((marker, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  >
                    "{marker}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
