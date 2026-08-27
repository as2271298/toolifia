'use client';
import React, { useState, useMemo } from 'react';

export function CharacterFrequencyCounter() {
  const [text, setText] = useState('');
  const [includeSpaces, setIncludeSpaces] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortBy, setSortBy] = useState<'freq' | 'alpha'>('freq');

  const frequencies = useMemo(() => {
    const counts: Record<string, number> = {};
    let processedText = text;
    if (!includeSpaces) processedText = processedText.replace(/\s/g, '');
    if (!caseSensitive) processedText = processedText.toLowerCase();

    for (const char of processedText) {
      counts[char] = (counts[char] || 0) + 1;
    }

    let entries = Object.entries(counts).map(([char, count]) => ({ char, count }));
    if (sortBy === 'freq') {
      entries.sort((a, b) => b.count - a.count || a.char.localeCompare(b.char));
    } else {
      entries.sort((a, b) => a.char.localeCompare(b.char));
    }
    return entries;
  }, [text, includeSpaces, caseSensitive, sortBy]);

  const maxCount = frequencies.length > 0 ? Math.max(...frequencies.map(f => f.count)) : 0;

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl max-w-4xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">Character Frequency Counter</h2>
      
      <textarea
        className="w-full h-40 bg-slate-800 text-slate-100 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-600 transition-colors mb-4 resize-none"
        placeholder="Type or paste text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={includeSpaces} onChange={e => setIncludeSpaces(e.target.checked)} className="accent-brand-600 rounded" />
          Include Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="accent-brand-600 rounded" />
          Case Sensitive
        </label>
        <div className="ml-auto flex items-center gap-2">
          Sort by:
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="bg-slate-800 border border-slate-700 rounded-lg p-1 outline-none focus:border-brand-600 text-slate-100">
            <option value="freq">Frequency</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {frequencies.map(({ char, count }) => (
          <div key={char} className="flex items-center gap-3">
            <div className="w-8 text-center font-mono bg-slate-800 rounded px-1 text-slate-300">{char === ' ' ? 'SPC' : char}</div>
            <div className="flex-1 bg-slate-800 rounded-full h-4 overflow-hidden relative">
              <div className="bg-brand-600 h-full transition-all duration-300" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <div className="w-12 text-right text-slate-400 text-sm font-medium">{count}</div>
          </div>
        ))}
        {frequencies.length === 0 && <p className="text-slate-500 text-center py-4">No characters to display</p>}
      </div>
    </div>
  );
}

