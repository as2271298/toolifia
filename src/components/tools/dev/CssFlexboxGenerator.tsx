'use client';
import React, { useState } from 'react';

export function CssFlexboxGenerator() {
  const [flexDir, setFlexDir] = useState('row');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [alignContent, setAlignContent] = useState('stretch');
  const [itemCount, setItemCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const css = `display: flex;\nflex-direction: ${flexDir};\nflex-wrap: ${flexWrap};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\nalign-content: ${alignContent};`;

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSelect = (label: string, value: string, setter: any, options: string[]) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-400">{label}</label>
      <select value={value} onChange={e => setter(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-brand-600">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-brand-600">CSS Flexbox Generator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4 col-span-1">
          {renderSelect('flex-direction', flexDir, setFlexDir, ['row', 'row-reverse', 'column', 'column-reverse'])}
          {renderSelect('flex-wrap', flexWrap, setFlexWrap, ['nowrap', 'wrap', 'wrap-reverse'])}
          {renderSelect('justify-content', justifyContent, setJustifyContent, ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'])}
          {renderSelect('align-items', alignItems, setAlignItems, ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'])}
          {renderSelect('align-content', alignContent, setAlignContent, ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'])}
          
          <div className="flex flex-col gap-1 pt-4 border-t border-slate-800">
            <label className="text-sm text-slate-400">Child Items ({itemCount})</label>
            <div className="flex gap-2">
              <button onClick={() => setItemCount(Math.max(1, itemCount - 1))} className="px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700">-</button>
              <button onClick={() => setItemCount(itemCount + 1)} className="px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700">+</button>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[300px]" style={{
            display: 'flex', flexDirection: flexDir as any, flexWrap: flexWrap as any, justifyContent, alignItems, alignContent
          }}>
            {Array.from({ length: itemCount }).map((_, i) => (
              <div key={i} className="bg-brand-600 text-white font-bold p-4 m-2 rounded-lg flex items-center justify-center shadow-lg min-w-[60px] min-h-[60px]">
                {i + 1}
              </div>
            ))}
          </div>
          
          <div className="relative bg-slate-800 p-4 rounded-xl border border-slate-700">
            <pre className="text-sm font-mono text-brand-400">{css}</pre>
            <button onClick={copyCss} className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md text-xs transition">
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

