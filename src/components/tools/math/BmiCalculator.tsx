"use client";

import { useState } from "react";
import { HeartPulse, Calculator } from "lucide-react";

export function BmiCalculator() {
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const meters = height / 100;
    const score = weight / (meters * meters);
    setBmi(Number(score.toFixed(1)));
  };

  const getCategory = (score: number) => {
    if (score < 18.5) return { label: "Underweight", color: "text-amber-500" };
    if (score < 24.9) return { label: "Normal Weight", color: "text-emerald-500" };
    if (score < 29.9) return { label: "Overweight", color: "text-orange-500" };
    return { label: "Obese", color: "text-rose-500" };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={calculateBmi}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all"
        >
          <Calculator className="w-4 h-4" /> Calculate BMI
        </button>
      </div>

      {bmi !== null && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-2 text-center">
          <div className="text-xs font-bold uppercase text-slate-400">Your Body Mass Index (BMI)</div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">{bmi}</div>
          <div className={`text-sm font-bold uppercase ${getCategory(bmi).color}`}>
            {getCategory(bmi).label}
          </div>
        </div>
      )}
    </div>
  );
}
