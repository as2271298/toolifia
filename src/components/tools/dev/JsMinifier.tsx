'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';

export function JsMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let result = input;
    // Remove single line comments
    result = result.replace(/\/\/.*$/gm, '');
    // Remove multi line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    // Collapse whitespace
    result = result.replace(/\s+/g, ' ');
    // Remove whitespace around punctuation
    result = result.replace(/\s*([=+\-*/<>!&|{}()[\];:,])\s*/g, '$1');
    setOutput(result.trim());
  }, [input]);

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">JavaScript Minifier</h2>
        <p className="text-slate-400 text-sm mt-1">Basic JS minification (removes comments and extra whitespace).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Input JavaScript</label>
            <button onClick={() => setInput('')} className="text-slate-500 hover:text-red-400 transition-colors" title="Clear">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            placeholder="Paste your JS here..."
          />
          <div className="text-xs text-slate-500">{input.length} characters</div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Minified Output</label>
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
            {input.length > 0 && (
              <span className="text-emerald-400 font-medium">Saved {getReduction()}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

