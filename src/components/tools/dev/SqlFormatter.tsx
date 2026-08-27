'use client';
import React, { useState } from 'react';

export function SqlFormatter() {
  const [input, setInput] = useState("select id, name, email from users where status = 'active' group by status order by created_at desc limit 10;");
  const [output, setOutput] = useState('');

  const formatSql = (sql: string) => {
    let formatted = sql.replace(/\s+/g, ' ');
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE FROM', 'AND', 'OR'
    ];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword);
    });

    const mainClauses = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
    mainClauses.forEach(clause => {
      const regex = new RegExp(`\\b${clause}\\b`, 'g');
      formatted = formatted.replace(regex, `\n${clause}\n  `);
    });
    
    formatted = formatted.replace(/\b(JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)\b/g, '\n  $1');
    formatted = formatted.split('\n').filter(line => line.trim().length > 0).join('\n');
    formatted = formatted.replace(/\n  \n/g, '\n');

    return formatted.trim();
  };

  const handleFormat = () => {
    setOutput(formatSql(input));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-200">
      <h2 className="text-2xl font-bold text-white mb-6">SQL Beautifier & Formatter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-slate-400">Raw SQL</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOutput('');
            }}
            className="w-full h-[400px] p-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-mono text-sm resize-none"
            placeholder="select * from users..."
          />
          <button
            onClick={handleFormat}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors w-full"
          >
            Format SQL
          </button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400">Formatted SQL</label>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Copy Code
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-[400px] p-4 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none font-mono text-sm resize-none text-indigo-300"
            placeholder="Formatted output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}

