"use client";
import { useState } from "react";
export function DiscountCalculator() {
  const [price, setPrice] = useState(""); const [disc, setDisc] = useState("");
  const [mode, setMode] = useState<"fwd"|"rev">("fwd");
  const p=parseFloat(price)||0; const d=parseFloat(disc)||0;
  const savings=mode==="fwd"?p*d/100:p-p/(1+d/100);
  const final=mode==="fwd"?p-savings:p/(1+d/100);
  const pct=mode==="fwd"?d:(p-final)/p*100;
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-2">{(["fwd","rev"] as const).map(m=>(
        <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold ${mode===m?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
          {m==="fwd"?"Price → Discounted":"Discounted → Original"}
        </button>
      ))}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">{mode==="fwd"?"Original Price ($)":"Discounted Price ($)"}</label><input className={inp} type="number" value={price} onChange={e=>setPrice(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Discount %</label><input className={inp} type="number" value={disc} onChange={e=>setDisc(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[["You Save","$"+savings.toFixed(2),"emerald"],["Final Price","$"+final.toFixed(2),"brand"],["Discount %",pct.toFixed(1)+"%","amber"]].map(([l,v,c])=>(
          <div key={l} className={`p-4 rounded-2xl bg-${c}-500/10 border border-${c}-500/20 text-center`}>
            <p className="text-xs font-semibold text-slate-500 mb-1">{l}</p>
            <p className={`text-xl font-black text-${c}-600 dark:text-${c}-400`}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
