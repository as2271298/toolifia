'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function countSyllables(word: string) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const match = word.match(/[aeiouy]{1,2}/g);
  return match ? match.length : 1;
}

export function ReadabilityChecker() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const sentenceCount = text.trim() ? (text.match(/[.!?]+/g) || []).length || 1 : 0;
  
  let syllableCount = 0;
  let complexWords = 0;
  words.forEach(word => {
    const syl = countSyllables(word);
    syllableCount += syl;
    if (syl >= 3) complexWords++;
  });

  const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

  // Flesch Reading Ease
  let fleschReadingEase = 0;
  if (wordCount > 0 && sentenceCount > 0) {
    fleschReadingEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  }

  // Flesch-Kincaid Grade
  let fleschKincaidGrade = 0;
  if (wordCount > 0 && sentenceCount > 0) {
    fleschKincaidGrade = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  }

  // Gunning Fog
  let gunningFog = 0;
  if (wordCount > 0 && sentenceCount > 0) {
    const percentComplexWords = (complexWords / wordCount) * 100;
    gunningFog = 0.4 * (avgWordsPerSentence + percentComplexWords);
  }

  const interpretFlesch = (score: number) => {
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Confusing';
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl max-w-4xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">Readability Checker</h2>
      <div className="mb-6 relative">
        <textarea
          className="w-full h-48 bg-slate-800 text-slate-100 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-600 transition-colors resize-none"
          placeholder="Paste text here to check its readability..."
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ScoreCard 
          title="Flesch Reading Ease" 
          score={fleschReadingEase.toFixed(1)} 
          interpretation={wordCount ? interpretFlesch(fleschReadingEase) : '-'} 
        />
        <ScoreCard 
          title="Flesch-Kincaid Grade" 
          score={fleschKincaidGrade.toFixed(1)} 
          interpretation={wordCount ? `Grade ${Math.round(fleschKincaidGrade)}` : '-'} 
        />
        <ScoreCard 
          title="Gunning Fog Index" 
          score={gunningFog.toFixed(1)} 
          interpretation={wordCount ? `Grade ${Math.round(gunningFog)}` : '-'} 
        />
      </div>

      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap justify-around gap-4 text-sm text-slate-300">
        <div><span className="font-semibold text-slate-100">Avg Words/Sentence:</span> {avgWordsPerSentence.toFixed(2)}</div>
        <div><span className="font-semibold text-slate-100">Avg Syllables/Word:</span> {avgSyllablesPerWord.toFixed(2)}</div>
        <div><span className="font-semibold text-slate-100">Syllable Count:</span> {syllableCount}</div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score, interpretation }: { title: string, score: string, interpretation: string }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center flex flex-col justify-center items-center">
      <div className="text-sm text-slate-400 mb-2">{title}</div>
      <div className="text-3xl font-bold text-brand-600 mb-1">{score}</div>
      <div className="text-sm font-medium text-slate-300">{interpretation}</div>
    </div>
  );
}

