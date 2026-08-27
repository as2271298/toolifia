"use client";
import { useState } from "react";
export function MetaTitleLengthChecker(){
  const [title,setTitle]=useState(""); const [desc,setDesc]=useState(""); const [url,setUrl]=useState("https://example.com/page");
  const tLen=title.length; const dLen=desc.length;
  const tPx=Math.round(tLen*7.2); const dPx=Math.round(dLen*6.5);
  const tStatus=tLen===0?"empty":tLen<=60?"good":tLen<=70?"warning":"over";
  const dStatus=dLen===0?"empty":dLen<=155?"good":dLen<=165?"warning":"over";
  const colors={good:"emerald",warning:"amber",over:"red",empty:"slate"};
  const tc=colors[tStatus]; const dc=colors[dStatus];
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-1"><label className="text-xs font-bold text-slate-500 uppercase">Meta Title</label>
          <span className={`text-xs font-bold text-${tc}-600`}>{tLen} chars / ~{tPx}px {tStatus==="good"?"✓":tStatus==="warning"?"⚠️":"❌"}</span></div>
        <input className={inp} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Your page title here..." maxLength={100} />
        <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-1.5 rounded-full bg-${tc}-500 transition-all`} style={{width:Math.min(100,tLen/70*100)+"%"}}/></div>
      </div>
      <div>
        <div className="flex justify-between mb-1"><label className="text-xs font-bold text-slate-500 uppercase">Meta Description</label>
          <span className={`text-xs font-bold text-${dc}-600`}>{dLen} chars / ~{dPx}px {dStatus==="good"?"✓":dStatus==="warning"?"⚠️":"❌"}</span></div>
        <textarea className={inp} rows={3} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Your meta description here..." maxLength={200} />
        <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-1.5 rounded-full bg-${dc}-500 transition-all`} style={{width:Math.min(100,dLen/165*100)+"%"}}/></div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Page URL (for preview)</label>
        <input className={inp} value={url} onChange={e=>setUrl(e.target.value)} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Google SERP Preview</p>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 max-w-2xl shadow-sm">
          <p className="text-xs text-emerald-700 mb-1 truncate">{url||"https://example.com"}</p>
          <p className="text-xl text-blue-700 hover:underline cursor-pointer leading-tight mb-1 line-clamp-1">{title||"Page Title"}</p>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{desc||"Page description will appear here in search results."}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><strong>Title ideal:</strong> 50–60 chars / 580px</div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><strong>Description ideal:</strong> 120–155 chars</div>
      </div>
    </div>
  );
}
