"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
export function HashtagGenerator(){
  const [topic,setTopic]=useState(""); const [platform,setPlatform]=useState("instagram"); const [copied,setCopied]=useState(false);
  const generate=(t:string):string[]=>{
    if(!t.trim())return[];
    const base=t.toLowerCase().replace(/\s+/g,"");
    const words=t.toLowerCase().split(/\s+/);
    const tags=new Set<string>();
    tags.add("#"+base); tags.add("#"+base+"s"); tags.add("#"+base+"tips");
    tags.add("#"+base+"life"); tags.add("#"+base+"community"); tags.add("#"+base+"daily");
    tags.add("#"+base+"2024"); tags.add("#"+base+"goals"); tags.add("#"+base+"motivation");
    words.forEach(w=>{if(w.length>3){tags.add("#"+w);tags.add("#"+w+"tips");tags.add("#"+w+"daily");}});
    const popular=["#trending","#viral","#explore","#followme","#instagood","#photooftheday","#love","#inspiration","#motivation","#success"];
    const professional=["#business","#entrepreneur","#marketing","#digitalmarketing","#startup","#innovation","#leadership","#growth","#strategy","#branding"];
    (platform==="linkedin"?professional:popular).forEach(p=>tags.add(p));
    return Array.from(tags).slice(0,30);
  };
  const tags=generate(topic);
  const allTags=tags.join(" ");
  const copy=()=>{navigator.clipboard.writeText(allTags);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="flex gap-2">{["instagram","twitter","linkedin","tiktok"].map(p=><button key={p} onClick={()=>setPlatform(p)} className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${platform===p?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{p}</button>)}</div>
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Topic / Niche</label><input className={inp} value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., digital marketing, fitness, photography..." /></div>
      {tags.length>0&&(<>
        <div className="flex flex-wrap gap-2">{tags.map(t=><span key={t} className="px-2 py-1 rounded-lg bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-semibold">{t}</span>)}</div>
        <div className="flex gap-3 items-center">
          <span className="text-xs text-slate-500">{tags.length} hashtags generated</span>
          <button onClick={copy} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition">
            {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}{copied?"Copied!":"Copy All"}
          </button>
        </div>
      </>)}
    </div>
  );
}
