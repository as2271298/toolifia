"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
export function CitationGenerator(){
  const [type,setType]=useState<"website"|"book"|"journal">("website");
  const [fields,setFields]=useState({author:"",title:"",url:"",year:"",publisher:"",journal:"",volume:"",pages:"",accessed:new Date().toISOString().split("T")[0]});
  const [copied,setCopied]=useState<string|null>(null);
  const upd=(k:string,v:string)=>setFields(f=>({...f,[k]:v}));
  const a=fields.author||"Author, A."; const t=fields.title||"Title"; const y=fields.year||"2024";
  const apa=type==="website"?`${a} (${y}). ${t}. Retrieved from ${fields.url}`:type==="book"?`${a} (${y}). ${t}. ${fields.publisher}.`:`${a} (${y}). ${t}. ${fields.journal}, ${fields.volume}, ${fields.pages}.`;
  const mla=type==="website"?`${a} "${t}." ${fields.url}, ${fields.accessed}.`:type==="book"?`${a} ${t}. ${fields.publisher}, ${y}.`:`${a} "${t}." ${fields.journal} ${fields.volume} (${y}): ${fields.pages}.`;
  const chi=type==="website"?`${a} "${t}." Accessed ${fields.accessed}. ${fields.url}.`:type==="book"?`${a} ${t}. ${fields.publisher}, ${y}.`:`${a} "${t}." ${fields.journal} ${fields.volume} (${y}): ${fields.pages}.`;
  const copy=(label:string,text:string)=>{navigator.clipboard.writeText(text);setCopied(label);setTimeout(()=>setCopied(null),2000);};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  return (
    <div className="space-y-5">
      <div className="flex gap-2">{(["website","book","journal"] as const).map(t=><button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${type===t?"bg-brand-600 text-white":"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>{t}</button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Author (Last, First)</label><input className={inp} value={fields.author} onChange={e=>upd("author",e.target.value)} placeholder="Smith, John" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label><input className={inp} value={fields.title} onChange={e=>upd("title",e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label><input className={inp} type="number" value={fields.year} onChange={e=>upd("year",e.target.value)} /></div>
        {type==="website"&&<><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">URL</label><input className={inp} value={fields.url} onChange={e=>upd("url",e.target.value)} /></div><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date Accessed</label><input className={inp} type="date" value={fields.accessed} onChange={e=>upd("accessed",e.target.value)} /></div></>}
        {type==="book"&&<div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Publisher</label><input className={inp} value={fields.publisher} onChange={e=>upd("publisher",e.target.value)} /></div>}
        {type==="journal"&&<><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Journal Name</label><input className={inp} value={fields.journal} onChange={e=>upd("journal",e.target.value)} /></div><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Volume</label><input className={inp} value={fields.volume} onChange={e=>upd("volume",e.target.value)} /></div><div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pages</label><input className={inp} value={fields.pages} onChange={e=>upd("pages",e.target.value)} /></div></>}
      </div>
      <div className="space-y-3">{[["APA",apa],["MLA",mla],["Chicago",chi]].map(([style,text])=>(
        <div key={style} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase">{style}</span>
            <button onClick={()=>copy(style as string,text as string)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-600">{copied===style?<Check className="w-3 h-3 text-emerald-500"/>:<Copy className="w-3 h-3"/>}Copy</button></div>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">{text}</p>
        </div>
      ))}</div>
    </div>
  );
}
