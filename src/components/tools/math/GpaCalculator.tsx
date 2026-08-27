"use client";
import { useState } from "react";
const GRADE_POINTS: Record<string,number> = {"A+":4.0,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"F":0.0};
export function GpaCalculator() {
  const [courses,setCourses]=useState([{name:"",grade:"A",credits:"3"}]);
  const add=()=>setCourses(c=>[...c,{name:"",grade:"A",credits:"3"}]);
  const rem=(i:number)=>setCourses(c=>c.filter((_,j)=>j!==i));
  const upd=(i:number,k:string,v:string)=>setCourses(c=>c.map((r,j)=>j===i?{...r,[k]:v}:r));
  const totalCredits=courses.reduce((s,c)=>s+(parseFloat(c.credits)||0),0);
  const totalPoints=courses.reduce((s,c)=>s+(GRADE_POINTS[c.grade]||0)*(parseFloat(c.credits)||0),0);
  const gpa=totalCredits>0?(totalPoints/totalCredits).toFixed(2):"0.00";
  const inp="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div className="space-y-2">{courses.map((c,i)=>(
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <input className={`${inp} col-span-5`} placeholder="Course name" value={c.name} onChange={e=>upd(i,"name",e.target.value)} />
          <select className={`${inp} col-span-3`} value={c.grade} onChange={e=>upd(i,"grade",e.target.value)}>
            {Object.keys(GRADE_POINTS).map(g=><option key={g}>{g}</option>)}
          </select>
          <input className={`${inp} col-span-3`} type="number" min="0" max="6" placeholder="Credits" value={c.credits} onChange={e=>upd(i,"credits",e.target.value)} />
          <button onClick={()=>rem(i)} className="col-span-1 text-red-500 hover:text-red-700 text-lg font-bold">×</button>
        </div>
      ))}</div>
      <button onClick={add} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900 transition">+ Add Course</button>
      <div className="grid grid-cols-3 gap-4 pt-4">
        {[["GPA",gpa,"brand"],["Total Credits",totalCredits.toString(),"slate"],["Quality Points",totalPoints.toFixed(2),"emerald"]].map(([l,v,c])=>(
          <div key={l} className={`p-4 rounded-2xl bg-${c}-500/10 border border-${c}-500/20 text-center`}>
            <p className="text-xs font-semibold text-slate-500 mb-1">{l}</p>
            <p className={`text-2xl font-black text-${c}-600 dark:text-${c}-400`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
        <strong>GPA Scale:</strong> A=4.0 | B=3.0 | C=2.0 | D=1.0 | F=0.0
      </div>
    </div>
  );
}
