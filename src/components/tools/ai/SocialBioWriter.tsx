"use client";
import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";

export function SocialBioWriter() {
  const [platform, setPlatform] = useState("Twitter / X");
  const [profession, setProfession] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!profession.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/tools/prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: `Generate 5 creative, high-converting social media bios for ${platform}. User role/profession: "${profession}". Key interests/keywords: "${keywords}". Include emojis and call to action.` }),
      });
      const data = await res.json();
      setResult(data.data?.result || data.error || "Failed to generate.");
    } catch {
      setResult("Network error. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white">
            {["Twitter / X", "Instagram", "LinkedIn", "TikTok", "GitHub"].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role / Profession *</label>
          <input value={profession} onChange={e => setProfession(e.target.value)} placeholder="e.g. Full-Stack Developer & Indie Hacker" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Skills, Achievements & Interests</label>
        <textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows={3} placeholder="Building AI tools, 10k MRR, React + Next.js, Coffee lover..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white resize-none" />
      </div>
      <button onClick={generate} disabled={loading || !profession.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Crafting bios..." : "Generate Bios"}
      </button>
      {result && (
        <div className="relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button onClick={copy} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
          </button>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 pr-8 leading-relaxed font-sans">{result}</pre>
        </div>
      )}
    </div>
  );
}
