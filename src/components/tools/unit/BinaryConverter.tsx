"use client";
import { useState } from "react";
export function BinaryConverter(){
  const [dec,setDec]=useState(""); const [bin,setBin]=useState(""); const [oct,setOct]=useState(""); const [hex,setHex]=useState("");
  const fromDec=(v:string)=>{const n=parseInt(v);if(isNaN(n)){setBin("");setOct("");setHex("");return;}setBin(n.toString(2));setOct(n.toString(8));setHex(n.toString(16).toUpperCase());};
  const fromBin=(v:string)=>{const n=parseInt(v,2);setDec(isNaN(n)?"":String(n));if(!isNaN(n)){setOct(n.toString(8));setHex(n.toString(16).toUpperCase());}};
  const fromOct=(v:string)=>{const n=parseInt(v,8);setDec(isNaN(n)?"":String(n));if(!isNaN(n)){setBin(n.toString(2));setHex(n.toString(16).toUpperCase());}};
  const fromHex=(v:string)=>{const n=parseInt(v,16);setDec(isNaN(n)?"":String(n));if(!isNaN(n)){setBin(n.toString(2));setOct(n.toString(8));}};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      {[["Decimal (Base 10)",dec,setDec,fromDec,"0-9"],["Binary (Base 2)",bin,setBin,fromBin,"0,1"],["Octal (Base 8)",oct,setOct,fromOct,"0-7"],["Hexadecimal (Base 16)",hex,setHex,fromHex,"0-9,A-F"]].map(([label,val,_setFn,fromFn,hint])=>(
        <div key={label as string}>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label as string} <span className="text-slate-400 normal-case font-normal">({hint as string})</span></label>
          <input className={inp} value={val as string} onChange={e=>{ (fromFn as (v:string)=>void)(e.target.value.replace(/\s/g,"")); }} />
        </div>
      ))}
    </div>
  );
}
