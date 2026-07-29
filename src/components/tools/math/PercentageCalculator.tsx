"use client";

import { useState } from "react";

export function PercentageCalculator() {
  const [percent, setPercent] = useState(20);
  const [num, setNum] = useState(150);

  const result = (percent / 100) * num;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">What is</span>
        <input
          type="number"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-24 p-3 text-sm font-bold text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
        />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">% of</span>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(Number(e.target.value))}
          className="w-32 p-3 text-sm font-bold text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
        />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">?</span>
      </div>

      <div className="p-6 rounded-3xl bg-brand-500/10 border border-brand-500/20 text-center">
        <div className="text-xs font-bold uppercase text-slate-400">Calculated Result</div>
        <div className="text-4xl font-black text-brand-600 dark:text-brand-400 mt-1">{result}</div>
      </div>
    </div>
  );
}
