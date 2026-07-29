"use client";
import { useState } from "react";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [monthly, setMonthly] = useState(200);

  const calculate = () => {
    let total = principal;
    const r = rate / 100 / 12;
    const months = years * 12;

    for (let i = 0; i < months; i++) {
      total = (total + monthly) * (1 + r);
    }

    const totalInvested = principal + monthly * months;
    const totalInterest = Math.max(0, total - totalInvested);

    return {
      finalBalance: Math.round(total),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
    };
  };

  const res = calculate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Principal ($)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Contribution ($)</label>
          <input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Annual Return (%)</label>
          <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Investment Horizon (Years)</label>
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
          <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">Future Balance</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">${res.finalBalance.toLocaleString()}</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-xs font-semibold text-slate-500 mb-1">Total Deposited</div>
          <div className="text-xl font-bold text-slate-700 dark:text-slate-300">${res.totalInvested.toLocaleString()}</div>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Total Interest Earned</div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${res.totalInterest.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
