"use client";
import { useState } from "react";
function gcd(a:number,b:number):number{return b===0?Math.abs(a):gcd(b,a%b);}
function simplify(n:number,d:number):{n:number,d:number}{const g=gcd(Math.abs(n),Math.abs(d));return{n:d<0?-n/g:n/g,d:Math.abs(d)/g};}
export function FractionCalculator(){
  const [n1,setN1]=useState("1"); const [d1,setD1]=useState("2");
  const [n2,setN2]=useState("1"); const [d2,setD2]=useState("3");
  const [op,setOp]=useState("+");
  const a=parseInt(n1)||0,b=parseInt(d1)||1,c=parseInt(n2)||0,d=parseInt(d2)||1;
  let rn=0,rd=1;
  if(op==="+"){rn=a*d+c*b;rd=b*d;}
  else if(op==="-"){rn=a*d-c*b;rd=b*d;}
  else if(op==="×"){rn=a*c;rd=b*d;}
  else if(op==="÷"){rn=a*d;rd=b*c;}
  const {n:sn,d:sd}=simplify(rn,rd);
  const inp="w-20 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-2 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  const Fraction=({top,bot,setT,setB}:{top:string,bot:string,setT:(v:string)=>void,setB:(v:string)=>void})=>(
    <div className="flex flex-col items-center gap-1">
      <input className={inp} value={top} onChange={e=>setT(e.target.value)} />
      <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-500"/>
      <input className={inp} value={bot} onChange={e=>setB(e.target.value)} />
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <Fraction top={n1} bot={d1} setT={setN1} setB={setD1}/>
        <select value={op} onChange={e=>setOp(e.target.value)} className="text-2xl font-bold bg-transparent text-brand-600 dark:text-brand-400 focus:outline-none">
          {["+","-","×","÷"].map(o=><option key={o}>{o}</option>)}
        </select>
        <Fraction top={n2} bot={d2} setT={setN2} setB={setD2}/>
        <span className="text-2xl font-bold text-slate-400">=</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{sn}</span>
          <div className="w-16 h-0.5 bg-brand-500"/>
          <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{sd}</span>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm space-y-1 text-slate-600 dark:text-slate-400">
        <p><strong>Decimal:</strong> {rd!==0?(rn/rd).toFixed(6):"undefined"}</p>
        <p><strong>Unsimplified:</strong> {rn}/{rd}</p>
        <p><strong>Simplified:</strong> {sn}/{sd}</p>
        {sn>sd&&<p><strong>Mixed:</strong> {Math.floor(Math.abs(sn/sd))}{" "}{Math.abs(sn%sd)}/{sd}</p>}
      </div>
    </div>
  );
}
