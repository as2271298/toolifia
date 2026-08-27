"use client";
import { useState } from "react";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
export function AiSummarizer(){
  const [text,setText]=useState(""); const [length,setLength]=useState("standard");
  const [result,setResult]=useState(""); const [loading,setLoading]=useState(false); const [copied,setCopied]=useState(false);
  const run=async()=>{if(!text.trim())return;setLoading(true);setResult("");
    try{const r=await fetch("/api/tools/ai-summarizer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:text,length})});
    const d=await r.json();setResult(d.result||d.data?.result||"No result");}catch{setResult("Error. Please try again.");}setLoading(false);};
  const copy=()=>{navigator.clipboard.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{["brief","standard","detailed"].map(l=><button key={l} onClick={()=>setLength(l)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${length===l?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{l}</button>)}</div>
      <textarea className={inp} rows={8} value={text} onChange={e=>setText(e.target.value)} placeholder="Paste your long text here to summarize..." />
      <div className="flex justify-between items-center text-xs text-slate-400"><span>{text.split(/\s+/).filter(Boolean).length} words</span><span>AI-Powered Summary</span></div>
      <button onClick={run} disabled={loading||!text.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition">
        {loading?<Loader2 className="w-4 h-4 animate-spin"/>:<Sparkles className="w-4 h-4"/>}{loading?"Summarizing...":"Summarize Text"}
      </button>
      {result&&(<div className="relative p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium flex items-center gap-1">
          {copied?<Check className="w-3 h-3 text-emerald-400"/>:<Copy className="w-3 h-3"/>}{copied?"Copied!":"Copy"}
        </button>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
      </div>)}
    </div>
  );
}
