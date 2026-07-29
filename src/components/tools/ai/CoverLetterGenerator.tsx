"use client";
import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";

export function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!jobTitle.trim() || !company.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/tools/cover-letter-generator", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, skills, tone }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "Failed to generate.");
    } catch { setResult("Network error. Please try again."); }
    setLoading(false);
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Job Title *</label>
          <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Company Name *</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Google" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Key Skills & Experience</label>
        <textarea value={skills} onChange={e => setSkills(e.target.value)} rows={3} placeholder="5 years React experience, led a team of 4, built e-commerce platform with 200K users..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tone</label>
        <select value={tone} onChange={e => setTone(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white">
          {["Professional", "Enthusiastic", "Formal", "Creative", "Concise"].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <button onClick={generate} disabled={loading || !jobTitle.trim() || !company.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Writing cover letter..." : "Generate Cover Letter"}
      </button>
      {result && (
        <div className="relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button onClick={copy} className="absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
          </button>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 pr-8 leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
}
