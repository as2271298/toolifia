"use client";
import { useState } from "react";
const UNITS:{name:string,factor:number}[]=[
  {name:"Millimeters (mm)",factor:0.001},{name:"Centimeters (cm)",factor:0.01},
  {name:"Meters (m)",factor:1},{name:"Kilometers (km)",factor:1000},
  {name:"Inches (in)",factor:0.0254},{name:"Feet (ft)",factor:0.3048},
  {name:"Yards (yd)",factor:0.9144},{name:"Miles (mi)",factor:1609.344},
];
export function LengthConverter(){
  const [val,setVal]=useState(""); const [from,setFrom]=useState(2); const [to,setTo]=useState(4);
  const n=parseFloat(val);
  const result=isNaN(n)?"":((n*UNITS[from].factor)/UNITS[to].factor).toFixed(8).replace(/\.?0+$/,"");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Value</label><input className={inp} type="number" value={val} onChange={e=>setVal(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">From</label><select className={inp} value={from} onChange={e=>setFrom(parseInt(e.target.value))}>{UNITS.map((u,i)=><option key={i} value={i}>{u.name}</option>)}</select></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">To</label><select className={inp} value={to} onChange={e=>setTo(parseInt(e.target.value))}>{UNITS.map((u,i)=><option key={i} value={i}>{u.name}</option>)}</select></div>
      </div>
      <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
        <p className="text-sm text-slate-500 mb-1">{val||"?"} {UNITS[from].name} =</p>
        <p className="text-3xl font-black text-brand-600 dark:text-brand-400">{result||"—"} <span className="text-base font-semibold">{UNITS[to].name}</span></p>
      </div>
    </div>
  );
}
