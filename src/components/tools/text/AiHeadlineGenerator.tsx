"use client";
import { useState } from "react";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
export function AiHeadlineGenerator(){
  const [topic,setTopic]=useState(""); const [tone,setTone]=useState("professional");
  const [headlines,setHeadlines]=useState<string[]>([]); const [loading,setLoading]=useState(false); const [copied,setCopied]=useState<number|null>(null);
  const run=async()=>{if(!topic.trim())return;setLoading(true);setHeadlines([]);
    try{const r=await fetch("/api/tools/ai-headline-generator",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:topic,tone})});
    const d=await r.json();const text=d.result||d.data?.result||"";
    const lines=text.split("\n").map((l:string)=>l.replace(/^\d+[\.\)]\s*/,"").trim()).filter((l:string)=>l.length>10).slice(0,10);
    setHeadlines(lines);}catch{setHeadlines(["Error generating headlines. Please try again."]);}setLoading(false);};
  const copy=(i:number,t:string)=>{navigator.clipboard.writeText(t);setCopied(i);setTimeout(()=>setCopied(null),2000);};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Topic or Content</label>
        <textarea className={inp} rows={3} value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., 10 productivity tips for remote workers..." /></div>
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tone</label>
        <div className="flex gap-2 flex-wrap">{["professional","clickbait","question","how-to","list"].map(t=><button key={t} onClick={()=>setTone(t)} className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${tone===t?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{t}</button>)}</div></div>
      <button onClick={run} disabled={loading||!topic.trim()} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm transition">
        {loading?<Loader2 className="w-4 h-4 animate-spin"/>:<Sparkles className="w-4 h-4"/>}{loading?"Generating...":"Generate Headlines"}
      </button>
      {headlines.length>0&&(<div className="space-y-2">{headlines.map((h,i)=>(
        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500/50 transition">
          <span className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-600 text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
          <p className="text-sm text-slate-700 dark:text-slate-200 flex-1">{h}</p>
          <button onClick={()=>copy(i,h)} className="text-slate-400 hover:text-brand-600 shrink-0">{copied===i?<Check className="w-4 h-4 text-emerald-500"/>:<Copy className="w-4 h-4"/>}</button>
        </div>
      ))}</div>)}
    </div>
  );
}
