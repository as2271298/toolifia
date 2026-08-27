'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';

export function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Error processing input.');
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-200">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">URL Encoder / Decoder</h2>
          <p className="text-slate-400 text-sm mt-1">Encode or decode URL strings in real-time.</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Input String</label>
            <button onClick={() => setInput('')} className="text-slate-500 hover:text-red-400 transition-colors" title="Clear">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            placeholder={mode === 'encode' ? "Enter URL to encode..." : "Enter URL to decode..."}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">Result ({mode === 'encode' ? 'Encoded' : 'Decoded'})</label>
            <button onClick={handleCopy} className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center space-x-1" title="Copy to clipboard">
              <Copy size={16} />
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className={`w-full h-80 p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm ${output === 'Error processing input.' ? 'text-red-400' : 'text-slate-300'}`}
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

