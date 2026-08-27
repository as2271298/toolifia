"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
export function GradientGenerator(){
  const [c1,setC1]=useState("#6d28d9"); const [c2,setC2]=useState("#3b82f6");
  const [type,setType]=useState("linear"); const [angle,setAngle]=useState(135); const [copied,setCopied]=useState(false);
  const css=type==="linear"?`linear-gradient(${angle}deg, ${c1}, ${c2})`:type==="radial"?`radial-gradient(circle, ${c1}, ${c2})`:`conic-gradient(${c1}, ${c2})`;
  const copy=()=>{navigator.clipboard.writeText(`background: ${css};`);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  return (
    <div className="space-y-5">
      <div className="h-48 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all" style={{background:css}}/>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Color 1</label>
          <div className="flex gap-2"><input type="color" value={c1} onChange={e=>setC1(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer border border-slate-200"/><input className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none" value={c1} onChange={e=>setC1(e.target.value)} /></div>
        </div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Color 2</label>
          <div className="flex gap-2"><input type="color" value={c2} onChange={e=>setC2(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer border border-slate-200"/><input className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none" value={c2} onChange={e=>setC2(e.target.value)} /></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Type</label>
          <div className="flex gap-2">{["linear","radial","conic"].map(t=><button key={t} onClick={()=>setType(t)} className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${type===t?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{t}</button>)}</div>
        </div>
        {type==="linear"&&<div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Angle: {angle}°</label><input type="range" min="0" max="360" value={angle} onChange={e=>setAngle(parseInt(e.target.value))} className="w-full accent-brand-600 mt-2" /></div>}
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex justify-between items-center">
        <code className="text-sm text-emerald-400 font-mono overflow-auto">background: {css};</code>
        <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-medium ml-3 shrink-0">
          {copied?<Check className="w-3 h-3 text-emerald-400"/>:<Copy className="w-3 h-3"/>}{copied?"Copied!":"Copy"}
        </button>
      </div>
    </div>
  );
}
