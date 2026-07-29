"use client";
import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";

const GENRES = ["Fantasy", "Sci-Fi", "Romance", "Thriller", "Horror", "Adventure", "Mystery", "Historical"];
const LENGTHS = [{ label: "Flash (300 words)", value: "short" }, { label: "Short Story (800 words)", value: "medium" }, { label: "Long Story (1500 words)", value: "long" }];

export function AiStoryGenerator() {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [length, setLength] = useState("medium");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setStory("");
    try {
      const res = await fetch("/api/tools/ai-story-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, genre, length }),
      });
      const data = await res.json();
      setStory(data.result || data.error || "Failed to generate story.");
    } catch { setStory("Network error. Please try again."); }
    setLoading(false);
  };

  const copy = () => { navigator.clipboard.writeText(story); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Genre</label>
          <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white">
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Story Length</label>
          <select value={length} onChange={e => setLength(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white">
            {LENGTHS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Story Premise / Idea</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="A young wizard discovers a forbidden spell that could save their village but at a terrible cost..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <button onClick={generate} disabled={loading || !prompt.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Crafting your story..." : "Generate Story"}
      </button>
      {story && (
        <div className="relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button onClick={copy} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
          </button>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 pr-8 leading-relaxed">{story}</pre>
        </div>
      )}
    </div>
  );
}
