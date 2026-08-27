"use client";
import { useState } from "react";
export function SalesTaxCalculator(){
  const [price,setPrice]=useState(""); const [rate,setRate]=useState("10");
  const [mode,setMode]=useState<"excl"|"incl">("excl");
  const p=parseFloat(price)||0; const r=parseFloat(rate)||0;
  const tax=mode==="excl"?p*r/100:p-(p/(1+r/100));
  const total=mode==="excl"?p+tax:p;
  const pre=mode==="incl"?p/(1+r/100):p;
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="flex gap-2">{(["excl","incl"] as const).map(m=>(
        <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold ${mode===m?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
          {m==="excl"?"Price + Tax":"Price Includes Tax"}
        </button>
      ))}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">{mode==="excl"?"Pre-tax Price ($)":"Total Price ($)"}</label><input className={inp} type="number" value={price} onChange={e=>setPrice(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tax Rate (%)</label><input className={inp} type="number" value={rate} onChange={e=>setRate(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[["Pre-tax Price","$"+pre.toFixed(2)],["Tax Amount","$"+tax.toFixed(2)],["Total Price","$"+total.toFixed(2)]].map(([l,v])=>(
          <div key={l} className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
            <p className="text-xs font-semibold text-slate-500 mb-1">{l}</p>
            <p className="text-xl font-black text-brand-600 dark:text-brand-400">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
