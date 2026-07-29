"use client";

import { useState } from "react";
import { DollarSign, Calculator } from "lucide-react";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5); // % annual
  const [tenureYears, setTenureYears] = useState(5); // years

  const r = rate / 12 / 100;
  const n = tenureYears * 12;

  const emi = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Loan Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none text-slate-900 dark:text-white font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none text-slate-900 dark:text-white font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Loan Tenure (Years)</label>
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">${emi.toLocaleString()}</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Monthly EMI</div>
        </div>
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">${totalInterest.toLocaleString()}</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Total Interest</div>
        </div>
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">${totalPayment.toLocaleString()}</div>
          <div className="text-xs font-bold uppercase text-slate-400 mt-1">Total Payment</div>
        </div>
      </div>
    </div>
  );
}
