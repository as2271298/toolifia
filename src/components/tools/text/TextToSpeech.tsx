"use client";
import { useState, useEffect } from "react";
export function TextToSpeech(){
  const [text,setText]=useState(""); const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
  const [voice,setVoice]=useState(0); const [rate,setRate]=useState(1); const [pitch,setPitch]=useState(1); const [speaking,setSpeaking]=useState(false);
  const supported=typeof window!=="undefined"&&"speechSynthesis" in window;
  useEffect(()=>{if(!supported)return;const load=()=>setVoices(window.speechSynthesis.getVoices());load();window.speechSynthesis.onvoiceschanged=load;},[supported]);
  const speak=()=>{if(!text.trim()||!supported)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.voice=voices[voice]||null;u.rate=rate;u.pitch=pitch;u.onstart=()=>setSpeaking(true);u.onend=()=>setSpeaking(false);window.speechSynthesis.speak(u);};
  const stop=()=>{window.speechSynthesis.cancel();setSpeaking(false);};
  const inp="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";
  if(!supported)return <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">Your browser does not support the Web Speech API. Please use Chrome or Edge.</div>;
  return (
    <div className="space-y-4">
      <textarea className={inp} rows={6} value={text} onChange={e=>setText(e.target.value)} placeholder="Enter text to convert to speech..." />
      {voices.length>0&&(<div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Voice ({voices.length} available)</label>
        <select className={inp} value={voice} onChange={e=>setVoice(parseInt(e.target.value))}>{voices.map((v,i)=><option key={i} value={i}>{v.name} ({v.lang})</option>)}</select></div>)}
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Speed: {rate}x</label><input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e=>setRate(parseFloat(e.target.value))} className="w-full accent-brand-600" /></div>
        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pitch: {pitch}</label><input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e=>setPitch(parseFloat(e.target.value))} className="w-full accent-brand-600" /></div>
      </div>
      <div className="flex gap-3">
        <button onClick={speak} disabled={!text.trim()||speaking} className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-sm transition">▶ Speak</button>
        <button onClick={stop} disabled={!speaking} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm transition">⏹ Stop</button>
      </div>
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">Note: Download not available via browser Web Speech API. Use a dedicated TTS service for audio file downloads.</div>
    </div>
  );
}
