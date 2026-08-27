"use client";
import { useState } from "react";
export function GstTaxCalculator(){
  const [amount,setAmount]=useState(""); const [rate,setRate]=useState("18"); const [mode,setMode]=useState<"excl"|"incl">("excl");
  const presets=["5","12","18","28"];
  const a=parseFloat(amount)||0; const r=parseFloat(rate)||0;
  const gstAmt=mode==="excl"?a*r/100:a-(a/(1+r/100));
  const total=mode==="excl"?a+gstAmt:a;
  const pre=mode==="incl"?a/(1+r/100):a;
  const cgst=gstAmt/2; const sgst=gstAmt/2;
  const halfRate=(r/2).toFixed(1).replace(/\.0$/,"");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">{(["excl","incl"] as const).map(m=>(
        <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold ${mode===m?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
          {m==="excl"?"GST Exclusive":"GST Inclusive"}
        </button>
      ))}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount (₹)</label><input className={inp} type="number" value={amount} onChange={e=>setAmount(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">GST Rate: {rate}%</label>
          <div className="flex gap-2 mb-2">{presets.map(p=><button key={p} onClick={()=>setRate(p)} className={`px-3 py-1 rounded-lg text-xs font-bold ${rate===p?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800"}`}>{p}%</button>)}</div>
          <input className={inp} type="number" value={rate} onChange={e=>setRate(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[["Pre-GST Amount","₹"+pre.toFixed(2)],["GST Amount","₹"+gstAmt.toFixed(2)],[`CGST (${halfRate}%)`,"₹"+cgst.toFixed(2)],[`SGST (${halfRate}%)`,"₹"+sgst.toFixed(2)]].map(([l,v])=>(
          <div key={l} className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
            <p className="text-xs font-semibold text-slate-500 mb-1">{l}</p>
            <p className="text-lg font-black text-brand-600 dark:text-brand-400">{v}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
        <span className="font-bold text-emerald-700 dark:text-emerald-400">Total Amount (with GST)</span>
        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
}
