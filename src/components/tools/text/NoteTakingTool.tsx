"use client";
import { useState, useEffect } from "react";
interface Note { id:string; title:string; body:string; updated:number; }
export function NoteTakingTool(){
  const [notes,setNotes]=useState<Note[]>([]);
  const [active,setActive]=useState<string|null>(null);
  useEffect(()=>{const saved=localStorage.getItem("toolifia_notes");if(saved)setNotes(JSON.parse(saved));},[]);
  const save=(ns:Note[])=>{setNotes(ns);localStorage.setItem("toolifia_notes",JSON.stringify(ns));};
  const newNote=()=>{const id=Date.now().toString();const n={id,title:"Untitled Note",body:"",updated:Date.now()};save([n,...notes]);setActive(id);};
  const del=(id:string)=>{const ns=notes.filter(n=>n.id!==id);save(ns);setActive(ns[0]?.id||null);};
  const upd=(field:"title"|"body",val:string)=>{const ns=notes.map(n=>n.id===active?{...n,[field]:val,updated:Date.now()}:n);save(ns);};
  const current=notes.find(n=>n.id===active);
  const inp="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none";
  return (
    <div className="flex gap-4 min-h-[500px]">
      <div className="w-48 shrink-0 space-y-2">
        <button onClick={newNote} className="w-full py-2 rounded-xl bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition">+ New Note</button>
        <div className="space-y-1">{notes.map(n=>(
          <div key={n.id} onClick={()=>setActive(n.id)} className={`p-2 rounded-xl cursor-pointer border transition ${active===n.id?"bg-brand-500/10 border-brand-500/30":"border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{n.title}</p>
            <p className="text-xs text-slate-400">{new Date(n.updated).toLocaleDateString()}</p>
          </div>
        ))}</div>
      </div>
      <div className="flex-1 flex flex-col">
        {current?(<>
          <input className={`${inp} text-lg font-bold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3`} value={current.title} onChange={e=>upd("title",e.target.value)} />
          <textarea className={`${inp} flex-1 text-sm leading-relaxed resize-none`} value={current.body} onChange={e=>upd("body",e.target.value)} placeholder="Start writing your note..." />
          <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400">
            <span>{current.body.split(/\s+/).filter(Boolean).length} words</span>
            <button onClick={()=>del(current.id)} className="text-red-500 hover:text-red-700">Delete note</button>
          </div>
        </>):<div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Create a new note to get started</div>}
      </div>
    </div>
  );
}
