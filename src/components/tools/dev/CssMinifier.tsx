'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';

export function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let result = input;
    if (mode === 'minify') {
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      result = result.replace(/\s+/g, ' ');
      result = result.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
      result = result.replace(/\;+\}/g, '}');
      setOutput(result.trim());
    } else {
      // Basic beautifier
      result = result.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
      result = result.replace(/\{/g, ' {\n  ');
      result = result.replace(/\}/g, '\n}\n');
      result = result.replace(/\;/g, ';\n  ');
      result = result.replace(/\n  \n\}/g, '\n}');
      setOutput(result.trim());
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReduction = () => {
    if (!input || !output) return 0;
    const reduction = ((input.length - output.length) / input.length) * 100;
    return Math.max(0, reduction).toFixed(2);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-white">CSS Minifier & Formatter</h2>
        <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setMode('minify')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'minify' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Minify
          </button>
          <button
            onClick={() => setMode('beautify')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'beautify' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Beautify
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Input CSS</label>
            <button onClick={() => setInput('')} className="text-slate-500 hover:text-red-400 transition-colors" title="Clear">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            placeholder="Paste your CSS here..."
          />
          <div className="text-xs text-slate-500">{input.length} characters</div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Output CSS</label>
            <button onClick={handleCopy} className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center space-x-1" title="Copy to clipboard">
              <Copy size={16} />
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm text-slate-300"
            placeholder="Result will appear here..."
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{output.length} characters</span>
            {mode === 'minify' && input.length > 0 && (
              <span className="text-emerald-400 font-medium">Saved {getReduction()}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

