"use client";
import { useState } from "react";

export function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);
  const presets = [5, 10, 15, 18, 20, 25];
  const billNum = parseFloat(bill) || 0;
  const tipAmt = billNum * (tipPct / 100);
  const total = billNum + tipAmt;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmt / people : tipAmt;
  const cls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Bill Amount ($)</label>
          <input type="number" min="0" step="0.01" value={bill} onChange={e=>setBill(e.target.value)} placeholder="0.00" className={cls} /></div>
        <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Number of People</label>
          <input type="number" min="1" value={people} onChange={e=>setPeople(Math.max(1,parseInt(e.target.value)||1))} className={cls} /></div>
      </div>
      <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-2">Tip Percentage: {tipPct}%</label>
        <div className="flex flex-wrap gap-2 mb-3">{presets.map(p=>(
          <button key={p} onClick={()=>setTipPct(p)} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${tipPct===p?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-100"}`}>{p}%</button>
        ))}</div>
        <input type="range" min="0" max="50" value={tipPct} onChange={e=>setTipPct(parseInt(e.target.value))} className="w-full accent-brand-600" /></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[["Tip Amount","$"+tipAmt.toFixed(2)],["Total Bill","$"+total.toFixed(2)],["Tip Per Person","$"+tipPerPerson.toFixed(2)],["Per Person","$"+perPerson.toFixed(2)]].map(([label,val])=>(
          <div key={label} className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-xl font-black text-brand-600 dark:text-brand-400">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
