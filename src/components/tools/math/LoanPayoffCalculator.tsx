"use client";
import { useState } from "react";
export function LoanPayoffCalculator(){
  const [balance,setBalance]=useState(""); const [apr,setApr]=useState(""); const [payment,setPayment]=useState("");
  const b=parseFloat(balance)||0; const r=parseFloat(apr)/100/12; const p=parseFloat(payment)||0;
  let months=0,totalInterest=0,remaining=b;
  if(b>0&&p>0&&(r===0||p>b*r)){
    while(remaining>0&&months<600){
      const interest=remaining*r;
      totalInterest+=interest;
      remaining=remaining+interest-p;
      months++;
      if(remaining<0)remaining=0;
    }
  }
  const years=Math.floor(months/12); const mos=months%12;
  const payoff=new Date(); payoff.setMonth(payoff.getMonth()+months);
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loan Balance ($)</label><input className={inp} type="number" value={balance} onChange={e=>setBalance(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Annual Interest Rate (%)</label><input className={inp} type="number" value={apr} onChange={e=>setApr(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Monthly Payment ($)</label><input className={inp} type="number" value={payment} onChange={e=>setPayment(e.target.value)} /></div>
      </div>
      {months>0&&(
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[["Payoff Time",`${years}y ${mos}m`],["Total Interest","$"+totalInterest.toFixed(2)],["Total Cost","$"+(b+totalInterest).toFixed(2)]].map(([l,v])=>(
            <div key={l} className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
              <p className="text-xs font-semibold text-slate-500 mb-1">{l}</p>
              <p className="text-xl font-black text-brand-600 dark:text-brand-400">{v}</p>
            </div>
          ))}
        </div>
      )}
      {months>0&&<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-700 dark:text-emerald-400 font-semibold">Debt-free by: {payoff.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</div>}
      {months===0&&b>0&&<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600">Payment too low to cover interest. Increase monthly payment.</div>}
    </div>
  );
}
