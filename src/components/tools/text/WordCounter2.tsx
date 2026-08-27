'use client';
import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function WordCounter2() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(200);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCountWithSpaces = text.length;
  const charCountWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentenceCount = text.trim() ? (text.match(/[.!?]+/g) || []).length || 1 : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(p => p.trim() !== '').length : 0;
  
  const readingTime = wordCount / wpm;
  const speakingTime = wordCount / 130;

  const formatTime = (minutes: number) => {
    if (minutes === 0) return '0 min';
    const m = Math.floor(minutes);
    const s = Math.round((minutes - m) * 60);
    return `${m > 0 ? m + ' min ' : ''}${s} sec`;
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl max-w-4xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">Reading Time Calculator</h2>
      <div className="mb-4 relative">
        <textarea
          className="w-full h-48 bg-slate-800 text-slate-100 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-600 transition-colors resize-none"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          title="Copy text"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-slate-300">Adjust Reading Speed: {wpm} wpm</label>
        <input
          type="range"
          min="100"
          max="500"
          step="10"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard label="Words" value={wordCount} />
        <StatCard label="Characters (w/ spaces)" value={charCountWithSpaces} />
        <StatCard label="Characters (no spaces)" value={charCountWithoutSpaces} />
        <StatCard label="Sentences" value={sentenceCount} />
        <StatCard label="Paragraphs" value={paragraphCount} />
        <StatCard label="Reading Time" value={formatTime(readingTime)} />
        <StatCard label="Speaking Time" value={formatTime(speakingTime)} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="text-xl font-semibold text-slate-100">{value}</div>
    </div>
  );
}

