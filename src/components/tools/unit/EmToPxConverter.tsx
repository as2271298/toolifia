"use client";
import { useState } from "react";
export function EmToPxConverter(){
  const [val,setVal]=useState(""); const [base,setBase]=useState("16"); const [mode,setMode]=useState<"em"|"rem">("em");
  const n=parseFloat(val)||0; const b=parseFloat(base)||16;
  const px=(n*b).toFixed(4).replace(/\.?0+$/,"");
  const fromPx=(v:string)=>((parseFloat(v)||0)/b).toFixed(6).replace(/\.?0+$/,"");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  const table=[8,12,14,16,18,20,24,32,48,64];
  return (
    <div className="space-y-5">
      <div className="flex gap-2">{(["em","rem"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold ${mode===m?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{m}</button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Base Font Size (px)</label><input className={inp} type="number" value={base} onChange={e=>setBase(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Value in {mode}</label><input className={inp} type="number" value={val} onChange={e=>setVal(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Result in px</label><input className={inp} readOnly value={n?px:""} /></div>
      </div>
      <div><p className="text-xs font-bold text-slate-500 uppercase mb-2">Quick Reference Table (base: {base}px)</p>
        <div className="overflow-auto"><table className="w-full text-sm text-center border-collapse">
          <thead><tr className="bg-slate-100 dark:bg-slate-800">{["px","em","rem"].map(h=><th key={h} className="px-3 py-2 font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{h}</th>)}</tr></thead>
          <tbody>{table.map(px=><tr key={px}><td className="px-3 py-1.5 border border-slate-200 dark:border-slate-700">{px}px</td><td className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400">{(px/b).toFixed(4).replace(/\.?0+$/,"")}em</td><td className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400">{(px/b).toFixed(4).replace(/\.?0+$/,"")}rem</td></tr>)}</tbody>
        </table></div></div>
    </div>
  );
}
