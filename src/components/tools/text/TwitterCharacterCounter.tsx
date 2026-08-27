"use client";
import { useState } from "react";
export function TwitterCharacterCounter(){
  const [text,setText]=useState("");
  const LIMIT=280;
  const countChars=(t:string)=>{const urlRegex=/(https?:\/\/[^\s]+)/g;return t.replace(urlRegex,(_)=>" ".repeat(23)).length;};
  const count=countChars(text); const pct=Math.min(100,count/LIMIT*100); const over=count>LIMIT;
  const circum=2*Math.PI*40; const stroke=circum*(1-Math.min(1,count/LIMIT));
  return (
    <div className="space-y-4">
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Tweet/Post</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} placeholder="What's happening?" className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none bg-slate-50 dark:bg-slate-800 ${over?"border-red-500":"border-slate-200 dark:border-slate-700"}`} /></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {[["Characters",count.toString()],["Remaining",(LIMIT-count).toString()],["Words",text.trim()?text.trim().split(/\s+/).length.toString():"0"]].map(([l,v])=>(
            <div key={l} className="text-center"><p className={`text-2xl font-black ${over?"text-red-500":"text-slate-700 dark:text-slate-200"}`}>{v}</p><p className="text-xs text-slate-400">{l}</p></div>
          ))}
        </div>
        <svg width="100" height="100" className="-rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke={over?"#ef4444":pct>80?"#f59e0b":"#6d28d9"} strokeWidth="8" strokeDasharray={circum} strokeDashoffset={stroke} strokeLinecap="round"/>
          <text x="50" y="55" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200" fontSize="18" fontWeight="bold" transform="rotate(90 50 50)">{LIMIT-count}</text>
        </svg>
      </div>
      {over&&<div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-semibold">⚠️ Over limit by {count-LIMIT} characters. Twitter/X will truncate your post.</div>}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">💡 URLs are counted as 23 characters regardless of length (Twitter t.co shortening)</div>
    </div>
  );
}
