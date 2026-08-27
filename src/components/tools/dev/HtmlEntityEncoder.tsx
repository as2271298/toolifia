'use client';

import React, { useState } from 'react';
import { Copy, Trash2, ArrowRightLeft } from 'lucide-react';

export function HtmlEntityEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    setMode('encode');
    let encoded = input.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#39;');
    setOutput(encoded);
  };

  const handleDecode = () => {
    setMode('decode');
    let decoded = input.replace(/&amp;/g, '&')
                       .replace(/&lt;/g, '<')
                       .replace(/&gt;/g, '>')
                       .replace(/&quot;/g, '"')
                       .replace(/&#39;/g, "'");
    setOutput(decoded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-200">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">HTML Entity Encoder / Decoder</h2>
          <p className="text-slate-400 text-sm mt-1">Safely encode or decode HTML characters.</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={handleEncode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Input</label>
            <button onClick={() => setInput('')} className="text-slate-500 hover:text-red-400 transition-colors" title="Clear">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            placeholder="Paste your text here..."
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Output ({mode === 'encode' ? 'Encoded' : 'Decoded'})</label>
            <button onClick={handleCopy} className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center space-x-1" title="Copy to clipboard">
              <Copy size={16} />
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm text-slate-300"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

