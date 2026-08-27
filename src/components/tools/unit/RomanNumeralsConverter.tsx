"use client";
import { useState } from "react";
const R=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
const V=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
function toRoman(n:number):string{if(n<1||n>3999)return"Out of range (1-3999)";let r="";for(let i=0;i<R.length;i++)while(n>=V[i]){r+=R[i];n-=V[i];}return r;}
function fromRoman(s:string):number{const m:Record<string,number>={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let n=0;const u=s.toUpperCase();for(let i=0;i<u.length;i++){const a=m[u[i]]||0,b=m[u[i+1]]||0;n+=a<b?-a:a;}return n;}
export function RomanNumeralsConverter(){
  const [arabic,setArabic]=useState("2024"); const [roman,setRoman]=useState("MMXXIV");
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  const handleArabic=(v:string)=>{setArabic(v);setRoman(toRoman(parseInt(v)||0));};
  const handleRoman=(v:string)=>{setRoman(v);const n=fromRoman(v);setArabic(n>0?String(n):"");};
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Arabic Number (1–3999)</label>
          <input className={inp} type="number" min="1" max="3999" value={arabic} onChange={e=>handleArabic(e.target.value)} />
          <p className="text-xs text-slate-400 mt-1">Result: <strong className="text-brand-600 dark:text-brand-400">{toRoman(parseInt(arabic)||0)}</strong></p>
        </div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Roman Numeral</label>
          <input className={inp} type="text" value={roman} onChange={e=>handleRoman(e.target.value)} />
          <p className="text-xs text-slate-400 mt-1">Result: <strong className="text-brand-600 dark:text-brand-400">{fromRoman(roman)||"Invalid"}</strong></p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 grid grid-cols-4 gap-2">
        {[["M","1000"],["D","500"],["C","100"],["L","50"],["X","10"],["V","5"],["I","1"],["CM","900"],["CD","400"],["XC","90"],["XL","40"],["IX","9"],["IV","4"]].map(([r,v])=>(
          <span key={r}><strong>{r}</strong>={v}</span>
        ))}
      </div>
    </div>
  );
}
