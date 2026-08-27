"use client";
import { useState } from "react";
export function AspectRatioCalculator() {
  const [w, setW] = useState("1920"); const [h, setH] = useState("1080");
  const [tw, setTw] = useState(""); const [th, setTh] = useState("");
  const gcd = (a:number,b:number):number => b===0?a:gcd(b,a%b);
  const wn=parseInt(w)||1; const hn=parseInt(h)||1;
  const d=gcd(wn,hn); const ratio=`${wn/d}:${hn/d}`;
  const calcH=()=>{ if(tw&&w&&h){setTh(String(Math.round(parseInt(tw)*hn/wn)));} };
  const calcW=()=>{ if(th&&w&&h){setTw(String(Math.round(parseInt(th)*wn/hn)));} };
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Width (px)</label><input className={inp} type="number" value={w} onChange={e=>setW(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (px)</label><input className={inp} type="number" value={h} onChange={e=>setH(e.target.value)} /></div>
      </div>
      <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
        <p className="text-xs font-semibold text-slate-500 mb-1">Aspect Ratio</p>
        <p className="text-4xl font-black text-brand-600 dark:text-brand-400">{ratio}</p>
        <p className="text-xs text-slate-400 mt-1">Decimal: {(wn/hn).toFixed(4)}</p>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Scale Calculator (using ratio {ratio})</p>
        <div className="grid grid-cols-2 gap-4 items-end">
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Known Width</label><input className={inp} type="number" value={tw} onChange={e=>setTw(e.target.value)} onBlur={calcH} /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Calculated Height</label><input className={inp} type="number" value={th} readOnly /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Known Height</label><input className={inp} type="number" value={th} onChange={e=>setTh(e.target.value)} onBlur={calcW} /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Calculated Width</label><input className={inp} type="number" value={tw} readOnly /></div>
        </div>
      </div>
    </div>
  );
}
