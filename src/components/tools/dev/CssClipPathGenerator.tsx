'use client';
import React, { useState } from 'react';

const presets: Record<string, string> = {
  Circle: 'circle(50% at 50% 50%)',
  Ellipse: 'ellipse(25% 40% at 50% 50%)',
  Triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  Diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  Hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  Arrow: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
  Star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  Custom: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)'
};

export function CssClipPathGenerator() {
  const [activeShape, setActiveShape] = useState('Triangle');
  const [customValue, setCustomValue] = useState(presets['Triangle']);
  const [copied, setCopied] = useState(false);

  const handlePreset = (shape: string) => {
    setActiveShape(shape);
    setCustomValue(presets[shape]);
  };

  const copyCss = () => {
    navigator.clipboard.writeText(`clip-path: ${customValue};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-brand-600">CSS Clip Path Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-3">Presets</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(presets).map(shape => (
              <button 
                key={shape} 
                onClick={() => handlePreset(shape)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${activeShape === shape ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {shape}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-slate-400 mb-2">Custom Clip Path Value</h3>
          <input 
            type="text" 
            value={customValue} 
            onChange={(e) => {
              setCustomValue(e.target.value);
              setActiveShape('Custom');
            }} 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-brand-600 font-mono"
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-slate-800 rounded-xl flex items-center justify-center p-8 border border-slate-700 min-h-[300px]">
            <div 
              className="w-48 h-48 bg-gradient-to-tr from-brand-700 to-brand-400 shadow-xl" 
              style={{ clipPath: customValue, WebkitClipPath: customValue, transition: 'clip-path 0.3s ease' }}
            ></div>
          </div>
          
          <div className="relative bg-slate-800 p-4 rounded-xl border border-slate-700">
            <pre className="text-sm font-mono text-brand-400 break-all">clip-path: {customValue};</pre>
            <button onClick={copyCss} className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md text-xs transition">
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

