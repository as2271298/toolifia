"use client";
import { useState } from "react";
export function OpenGraphValidator(){
  const [og,setOg]=useState({title:"",description:"",image:"",url:"",siteName:"",type:"website"});
  const upd=(k:string,v:string)=>setOg(f=>({...f,[k]:v}));
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  const issues:string[]=[];
  if(!og.title)issues.push("og:title is missing (required)");
  else if(og.title.length>95)issues.push("og:title too long (>95 chars)");
  if(!og.description)issues.push("og:description is missing");
  if(!og.image)issues.push("og:image is missing (required for social shares)");
  if(!og.url)issues.push("og:url is missing");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:title</label><input className={inp} value={og.title} onChange={e=>upd("title",e.target.value)} placeholder="Your page title" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:url</label><input className={inp} value={og.url} onChange={e=>upd("url",e.target.value)} placeholder="https://example.com/page" /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:description</label><textarea className={inp} rows={2} value={og.description} onChange={e=>upd("description",e.target.value)} placeholder="Description for social media (120-160 chars recommended)" /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:image URL</label><input className={inp} value={og.image} onChange={e=>upd("image",e.target.value)} placeholder="https://example.com/image.jpg (1200x630 recommended)" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:site_name</label><input className={inp} value={og.siteName} onChange={e=>upd("siteName",e.target.value)} /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">og:type</label><select className={inp} value={og.type} onChange={e=>upd("type",e.target.value)}><option>website</option><option>article</option><option>product</option><option>video.movie</option></select></div>
      </div>
      {issues.length>0&&<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">{issues.map((iss,i)=><p key={i} className="text-xs text-red-600 font-medium">❌ {iss}</p>)}</div>}
      {issues.length===0&&og.title&&<div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 font-semibold">✓ All required Open Graph tags are present!</div>}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Facebook Preview</p>
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-sm">
          {og.image&&<div className="h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden"><img src={og.image} alt="" className="w-full h-full object-cover" onError={e=>(e.currentTarget.style.display="none")} /></div>}
          {!og.image&&<div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">No image provided</div>}
          <div className="p-3 bg-white dark:bg-slate-900">
            <p className="text-xs text-slate-400 uppercase mb-1">{og.siteName||og.url||"example.com"}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{og.title||"Page Title"}</p>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1">{og.description||"Description"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
