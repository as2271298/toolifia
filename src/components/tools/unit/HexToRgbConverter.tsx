"use client";
import { useState } from "react";
export function HexToRgbConverter(){
  const [hex,setHex]=useState("#3b82f6"); const [r,setR]=useState("59"); const [g,setG]=useState("130"); const [b,setB]=useState("246");
  const fromHex=(v:string)=>{
    setHex(v);
    const h=v.replace("#","");
    if(h.length===6){setR(String(parseInt(h.slice(0,2),16)));setG(String(parseInt(h.slice(2,4),16)));setB(String(parseInt(h.slice(4,6),16)));}
  };
  const fromRgb=(rv:string,gv:string,bv:string)=>{
    const ri=parseInt(rv)||0,gi=parseInt(gv)||0,bi=parseInt(bv)||0;
    setHex("#"+[ri,gi,bi].map(x=>Math.min(255,Math.max(0,x)).toString(16).padStart(2,"0")).join(""));
  };
  const ri=parseInt(r)||0,gi=parseInt(g)||0,bi=parseInt(b)||0;
  const hsl=()=>{const r1=ri/255,g1=gi/255,b1=bi/255;const max=Math.max(r1,g1,b1),min=Math.min(r1,g1,b1);let h=0,s=0;const l=(max+min)/2;if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);h=max===r1?((g1-b1)/d+(g1<b1?6:0)):max===g1?(b1-r1)/d+2:(r1-g1)/d+4;h/=6;}return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shrink-0" style={{backgroundColor:hex}}/>
        <div className="flex-1"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">HEX Color</label>
          <input className={inp} value={hex} onChange={e=>fromHex(e.target.value)} />
        </div>
        <input type="color" value={hex} onChange={e=>fromHex(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer border-0" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[["R (Red)",r,setR],["G (Green)",g,setG],["B (Blue)",b,setB]].map(([l,v,sv])=>(
          <div key={l as string}><label className="block text-xs font-bold text-slate-500 uppercase mb-1">{l as string}</label>
            <input className={inp} type="number" min="0" max="255" value={v as string} onChange={e=>{(sv as (v:string)=>void)(e.target.value);fromRgb(l==="R (Red)"?e.target.value:r,l==="G (Green)"?e.target.value:g,l==="B (Blue)"?e.target.value:b);}} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[["HEX",hex],["RGB",`rgb(${ri}, ${gi}, ${bi})`],["HSL",hsl()]].map(([l,v])=>(
          <div key={l} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-500 mb-1">{l}</p>
            <p className="text-xs font-mono text-brand-600 dark:text-brand-400 break-all">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
