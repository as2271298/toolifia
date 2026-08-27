"use client";
import { useState } from "react";
export function StringUtilities(){
  const [input,setInput]=useState(""); const [result,setResult]=useState("");
  const ops:[string,()=>void][]=[
    ["Reverse",()=>setResult(input.split("").reverse().join(""))],
    ["UPPERCASE",()=>setResult(input.toUpperCase())],
    ["lowercase",()=>setResult(input.toLowerCase())],
    ["Title Case",()=>setResult(input.replace(/\w\S*/g,t=>t[0].toUpperCase()+t.slice(1).toLowerCase()))],
    ["Remove Duplicates",()=>setResult(Array.from(new Set(input.split(""))).join(""))],
    ["Remove Whitespace",()=>setResult(input.replace(/\s+/g,""))],
    ["Remove Numbers",()=>setResult(input.replace(/\d/g,""))],
    ["Numbers Only",()=>setResult(input.replace(/\D/g,""))],
    ["Letters Only",()=>setResult(input.replace(/[^a-zA-Z]/g,""))],
    ["Count Vowels",()=>setResult(String((input.match(/[aeiouAEIOU]/g)||[]).length)+" vowels")],
    ["Slug/URL",()=>setResult(input.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))],
    ["Count Words",()=>setResult(String(input.trim().split(/\s+/).filter(Boolean).length)+" words")],
  ];
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-4">
      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Input Text</label><textarea className={inp} rows={5} value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter your text here..." /></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{ops.map(([label,fn])=>(
        <button key={label} onClick={fn} className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 transition">{label}</button>
      ))}</div>
      {result&&(<div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Result</label>
        <div className="relative"><textarea className={`${inp} min-h-[80px]`} readOnly value={result} />
          <button onClick={()=>navigator.clipboard.writeText(result)} className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-brand-600 text-white text-xs">Copy</button>
        </div></div>)}
    </div>
  );
}
