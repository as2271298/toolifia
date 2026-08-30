"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Wand2, ShieldCheck, Zap, BookOpen, Flame, ArrowRight } from "lucide-react";
import { humanizeTextEngine, type HumanizeTone } from "@/lib/humanizer-engine";

const SAMPLE_TEXTS = [
  {
    label: "ChatGPT Essay",
    text: "Furthermore, it is imperative to acknowledge that the utilization of artificial intelligence facilitates paramount advancements across contemporary technological landscapes. In conclusion, the integration of cutting-edge machine learning serves as a testament to human ingenuity."
  },
  {
    label: "Business Pitch",
    text: "In today's fast-paced digital age, our platform seamlessly leverages synergistic paradigms to optimize user workflows. Moreover, it is important to note that our multifaceted ecosystem acts as a beacon of innovation."
  },
  {
    label: "Academic Draft",
    text: "This research delves into the meticulous examination of neural architectures. Additionally, the study utilizes empirical frameworks to revolutionize predictive accuracy in dynamic environments."
  }
];

export function AiHumanizer() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<HumanizeTone>("conversational");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{
    humanScore: number;
    aiProbability: number;
    wordsOriginal: number;
    wordsHumanized: number;
    changesCount: number;
    readabilityGrade: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHumanize = async (customText?: string) => {
    const textToProcess = customText !== undefined ? customText : input;
    if (!textToProcess.trim()) return;
    setLoading(true);
    setOutput("");

    // 1. Calculate local humanized version immediately as fail-safe
    const localResult = humanizeTextEngine({
      text: textToProcess,
      tone,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch("/api/tools/ai-humanizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: textToProcess, tone }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const resultData = data.data || data;
        const serverText = resultData.result || data.result;

        // If server text is valid, distinct and not empty, use it
        if (serverText && serverText.trim().length > 15 && serverText.trim() !== textToProcess.trim()) {
          setOutput(serverText);
          const origLen = textToProcess.split(/\s+/).filter(Boolean).length;
          const humLen = serverText.split(/\s+/).filter(Boolean).length;
          setStats({
            humanScore: resultData.humanScore ?? localResult.humanScore,
            aiProbability: resultData.aiProbability ?? localResult.aiProbability,
            wordsOriginal: origLen,
            wordsHumanized: humLen,
            changesCount: resultData.changesMade ?? localResult.changesCount,
            readabilityGrade: "8th Grade (Optimal Flow)",
          });
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fetch aborted or network failure — seamlessly use localResult
    }

    // Use guaranteed rich algorithmic humanization
    setOutput(localResult.text);
    setStats({
      humanScore: localResult.humanScore,
      aiProbability: localResult.aiProbability,
      wordsOriginal: localResult.wordsOriginal,
      wordsHumanized: localResult.wordsHumanized,
      changesCount: localResult.changesCount,
      readabilityGrade: localResult.readabilityGrade,
    });
    setLoading(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = (sampleText: string) => {
    setInput(sampleText);
    handleHumanize(sampleText);
  };

  return (
    <div className="space-y-6">
      {/* Tone & Style Selection Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">Rewriting Tone</span>
            <span className="text-[11px] text-slate-400">Select target voice to bypass AI detectors</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "conversational", label: "💬 Natural Human", desc: "Best for blogs & general text" },
            { id: "casual", label: "☕ Casual & Witty", desc: "Short punchy sentences" },
            { id: "professional", label: "💼 Executive", desc: "Business & workplace ready" },
            { id: "academic", label: "🎓 Academic", desc: "Formal essay structures" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id as HumanizeTone)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                tone === t.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30 scale-[1.02]"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input / Output Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> AI-Generated Text Input
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">
                {input.split(/\s+/).filter(Boolean).length} words
              </span>
              {input && (
                <button
                  onClick={() => { setInput(""); setOutput(""); setStats(null); }}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text generated by ChatGPT, Claude, Gemini, or any AI model here..."
            className="w-full h-80 p-4 text-sm bg-slate-900 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-100 placeholder-slate-500 resize-none leading-relaxed"
          />

          {/* Quick Sample Prompts */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1">
            <span className="font-medium text-slate-500">Quick Test:</span>
            {SAMPLE_TEXTS.map((sample) => (
              <button
                key={sample.label}
                onClick={() => loadSample(sample.text)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-purple-300 hover:text-purple-200 border border-purple-500/20 text-xs transition-colors"
              >
                + {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 100% Humanized Result
            </label>
            {output && (
              <button
                onClick={copyResult}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied to Clipboard!" : "Copy Text"}
              </button>
            )}
          </div>

          <div className="w-full h-80 p-4 text-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-y-auto text-slate-100 whitespace-pre-wrap leading-relaxed">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                <RefreshCw className="w-7 h-7 animate-spin text-purple-400" />
                <span className="text-sm font-semibold text-slate-300">Rewriting &amp; Humanizing Text...</span>
                <span className="text-xs text-slate-500">Removing AI markers and restructuring syntax</span>
              </div>
            ) : output ? (
              output
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center p-6 space-y-2">
                <ShieldCheck className="w-8 h-8 text-slate-700" />
                <p className="text-xs text-slate-400">
                  Paste AI text on the left and click <strong className="text-purple-400">Humanize Text</strong> to bypass GPTZero, Turnitin, and Originality.ai.
                </p>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div>
                <div className="text-xs text-emerald-400 font-bold">Human Score</div>
                <div className="text-lg font-black text-white">{stats.humanScore}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">AI Risk</div>
                <div className="text-lg font-black text-emerald-400">&lt; {stats.aiProbability}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Changes Made</div>
                <div className="text-lg font-black text-white">{stats.changesCount}+</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Bypasses GPTZero, Turnitin, CopyLeaks &amp; Originality.ai</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {output && (
            <button
              onClick={() => handleHumanize()}
              disabled={loading}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Another Variation
            </button>
          )}
          <button
            onClick={() => handleHumanize()}
            disabled={loading || !input.trim()}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-900/30 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Humanize Text Now
          </button>
        </div>
      </div>
    </div>
  );
}

