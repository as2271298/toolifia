"use client";
import { useState } from "react";
export function CalorieCalculator() {
  const [age,setAge]=useState("25"); const [gender,setGender]=useState("male");
  const [height,setHeight]=useState("170"); const [weight,setWeight]=useState("70");
  const [activity,setActivity]=useState("1.375");
  const actLevels=[["1.2","Sedentary (desk job, little exercise)"],["1.375","Lightly Active (light exercise 1-3d/wk)"],["1.55","Moderately Active (moderate exercise 3-5d/wk)"],["1.725","Very Active (hard exercise 6-7d/wk)"],["1.9","Extremely Active (physical job + training)"]];
  const w=parseFloat(weight)||70; const h=parseFloat(height)||170; const a=parseInt(age)||25; const act=parseFloat(activity);
  const bmr=gender==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
  const tdee=Math.round(bmr*act);
  const goals=[["Lose 1kg/week",tdee-1100],["Lose 0.5kg/week",tdee-550],["Maintain Weight",tdee],["Gain 0.5kg/week",tdee+550]];
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label><input className={inp} type="number" value={age} onChange={e=>setAge(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gender</label>
          <select className={inp} value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (cm)</label><input className={inp} type="number" value={height} onChange={e=>setHeight(e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight (kg)</label><input className={inp} type="number" value={weight} onChange={e=>setWeight(e.target.value)} /></div>
      </div>
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Activity Level</label>
        <select className={inp} value={activity} onChange={e=>setActivity(e.target.value)}>
          {actLevels.map(([v,l])=><option key={v} value={v}>{l}</option>)}
        </select></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-xs font-semibold text-slate-500 mb-1">BMR (Basal Metabolic Rate)</p>
          <p className="text-2xl font-black text-slate-700 dark:text-slate-200">{Math.round(bmr)} kcal</p>
        </div>
        <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
          <p className="text-xs font-semibold text-slate-500 mb-1">TDEE (Maintenance Calories)</p>
          <p className="text-2xl font-black text-brand-600 dark:text-brand-400">{tdee} kcal</p>
        </div>
      </div>
      <div><p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Calorie Goals</p>
        <div className="grid grid-cols-2 gap-3">{goals.map(([label,cal])=>(
          <div key={label} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{Math.max(1200,cal as number)} kcal</span>
          </div>
        ))}</div></div>
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-slate-600 dark:text-slate-400">
        <strong>Macros at TDEE:</strong> Protein: {Math.round(tdee*0.30/4)}g · Carbs: {Math.round(tdee*0.40/4)}g · Fat: {Math.round(tdee*0.30/9)}g
      </div>
    </div>
  );
}
