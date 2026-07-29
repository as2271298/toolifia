"use client";

import { useState } from "react";
import { Calendar, Calculator } from "lucide-react";

export function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("1998-05-15");
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthdate) return;
    const birth = new Date(birthdate);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAgeResult({ years, months, days });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Date of Birth</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white font-bold"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={calculateAge}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" /> Calculate Exact Age
        </button>
      </div>

      {ageResult && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl font-black text-brand-600 dark:text-brand-400">{ageResult.years}</div>
            <div className="text-xs font-bold uppercase text-slate-400">Years</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl font-black text-slate-800 dark:text-slate-200">{ageResult.months}</div>
            <div className="text-xs font-bold uppercase text-slate-400">Months</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl font-black text-slate-800 dark:text-slate-200">{ageResult.days}</div>
            <div className="text-xs font-bold uppercase text-slate-400">Days</div>
          </div>
        </div>
      )}
    </div>
  );
}
