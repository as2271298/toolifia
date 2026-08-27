"use client";
import { useState } from "react";
const RATES:Record<string,number>={USD:1,EUR:0.92,GBP:0.79,PKR:278.5,INR:83.5,CAD:1.36,AUD:1.53,JPY:149.8,SAR:3.75,AED:3.67,CNY:7.24,CHF:0.89,MXN:17.2,SGD:1.34,BRL:4.97,KWD:0.308,TRY:32.1,ZAR:18.9};
export function CurrencyConverter(){
  const [amt,setAmt]=useState("1"); const [from,setFrom]=useState("USD"); const [to,setTo]=useState("PKR");
  const currencies=Object.keys(RATES);
  const a=parseFloat(amt)||0;
  const result=(a/RATES[from]*RATES[to]).toFixed(4).replace(/\.?0+$/,"");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">⚠️ Approximate rates for reference only. For live rates, check a financial service.</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount</label><input className={inp} type="number" value={amt} onChange={e=>setAmt(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">From</label><select className={inp} value={from} onChange={e=>setFrom(e.target.value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">To</label><select className={inp} value={to} onChange={e=>setTo(e.target.value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
      </div>
      <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
        <p className="text-sm text-slate-500 mb-1">{amt} {from} =</p>
        <p className="text-4xl font-black text-brand-600 dark:text-brand-400">{result} {to}</p>
        <p className="text-xs text-slate-400 mt-2">1 {from} = {(RATES[to]/RATES[from]).toFixed(6)} {to}</p>
      </div>
    </div>
  );
}
