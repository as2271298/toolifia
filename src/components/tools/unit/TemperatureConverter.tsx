"use client";
import { useState } from "react";
export function TemperatureConverter(){
  const [val,setVal]=useState(""); const [from,setFrom]=useState("C");
  const n=parseFloat(val); const units=["C","F","K"];
  const toC=(v:number,u:string)=>u==="C"?v:u==="F"?(v-32)*5/9:v-273.15;
  const fromC=(v:number,u:string)=>u==="C"?v:u==="F"?v*9/5+32:v+273.15;
  const celsius=toC(n,from);
  const convert=(to:string)=>isNaN(n)?"":fromC(celsius,to).toFixed(4).replace(/\.?0+$/,"");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Value</label><input className={inp} type="number" value={val} onChange={e=>setVal(e.target.value)} placeholder="Enter temperature" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">From</label>
          <select className={inp} value={from} onChange={e=>setFrom(e.target.value)}>{units.map(u=><option key={u}>{u}</option>)}</select></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {units.map(u=>(
          <div key={u} className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">°{u}</p>
            <p className="text-2xl font-black text-brand-600 dark:text-brand-400">{convert(u)||"—"}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 space-y-1">
        <p>°C to °F: (°C × 9/5) + 32</p><p>°F to °C: (°F − 32) × 5/9</p><p>°C to K: °C + 273.15</p>
      </div>
    </div>
  );
}
