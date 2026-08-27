'use client';
import React, { useState } from 'react';

type Shadow = { id: number, x: number, y: number, blur: number, spread: number, color: string, inset: boolean };

export function CssBoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([{ id: 1, x: 10, y: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.5)', inset: false }]);
  const [copied, setCopied] = useState(false);

  const cssString = shadows.map(s => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ');

  const updateShadow = (id: number, key: keyof Shadow, value: any) => {
    setShadows(shadows.map(s => s.id === id ? { ...s, [key]: value } : s));
  };

  const addShadow = () => setShadows([...shadows, { id: Date.now(), x: 0, y: 0, blur: 10, spread: 0, color: 'rgba(0,0,0,0.5)', inset: false }]);
  const removeShadow = (id: number) => setShadows(shadows.filter(s => s.id !== id));

  const copyCss = () => {
    navigator.clipboard.writeText(`box-shadow: ${cssString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-brand-600">CSS Box Shadow Generator</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {shadows.map((s, index) => (
            <div key={s.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-brand-500">Layer {index + 1}</h3>
                {shadows.length > 1 && (
                  <button onClick={() => removeShadow(s.id)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block mb-1">X Offset: {s.x}px</label>
                  <input type="range" min="-50" max="50" value={s.x} onChange={e => updateShadow(s.id, 'x', Number(e.target.value))} className="w-full accent-brand-600" />
                </div>
                <div>
                  <label className="block mb-1">Y Offset: {s.y}px</label>
                  <input type="range" min="-50" max="50" value={s.y} onChange={e => updateShadow(s.id, 'y', Number(e.target.value))} className="w-full accent-brand-600" />
                </div>
                <div>
                  <label className="block mb-1">Blur: {s.blur}px</label>
                  <input type="range" min="0" max="100" value={s.blur} onChange={e => updateShadow(s.id, 'blur', Number(e.target.value))} className="w-full accent-brand-600" />
                </div>
                <div>
                  <label className="block mb-1">Spread: {s.spread}px</label>
                  <input type="range" min="-50" max="50" value={s.spread} onChange={e => updateShadow(s.id, 'spread', Number(e.target.value))} className="w-full accent-brand-600" />
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label>Color:</label>
                    <input type="color" value={s.color.startsWith('#') ? s.color : '#000000'} onChange={e => updateShadow(s.id, 'color', e.target.value)} className="rounded cursor-pointer" />
                    <input type="text" value={s.color} onChange={e => updateShadow(s.id, 'color', e.target.value)} className="bg-slate-700 border-none rounded px-2 py-1 w-32 outline-none" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={s.inset} onChange={e => updateShadow(s.id, 'inset', e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-brand-600 focus:ring-brand-600" />
                    Inset
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addShadow} className="w-full py-2 border-2 border-dashed border-slate-700 text-slate-400 rounded-xl hover:border-brand-600 hover:text-brand-500 transition">
            + Add Shadow Layer
          </button>
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-slate-800 rounded-xl flex items-center justify-center min-h-[300px] border border-slate-700">
            <div className="w-48 h-48 bg-slate-700 rounded-xl" style={{ boxShadow: cssString }}></div>
          </div>
          <div className="relative bg-slate-800 p-4 rounded-xl border border-slate-700 group">
            <pre className="text-sm font-mono text-brand-400 break-all whitespace-pre-wrap">box-shadow: {cssString};</pre>
            <button onClick={copyCss} className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md text-xs transition">
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

