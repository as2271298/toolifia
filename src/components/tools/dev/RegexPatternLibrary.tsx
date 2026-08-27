'use client';
import React, { useState } from 'react';

const regexPatterns = [
  { name: 'Email Address', desc: 'Matches standard email addresses', regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
  { name: 'URL', desc: 'Matches HTTP/HTTPS URLs', regex: '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$' },
  { name: 'Phone Number', desc: 'Matches US phone numbers (various formats)', regex: '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$' },
  { name: 'Date (YYYY-MM-DD)', desc: 'Matches ISO 8601 date format', regex: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$' },
  { name: 'IPv4 Address', desc: 'Matches valid IPv4 addresses', regex: '^(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}$' },
  { name: 'Credit Card', desc: 'Matches major credit card formats', regex: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})$' },
  { name: 'Password Strength', desc: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$' },
  { name: 'US ZIP Code', desc: 'Matches 5-digit or 9-digit ZIP codes', regex: '^\\d{5}(?:[-\\s]\\d{4})?$' },
  { name: 'Username', desc: 'Alphanumeric and underscores, 3-16 chars', regex: '^[a-zA-Z0-9_]{3,16}$' },
  { name: 'HTML Tags', desc: 'Matches simple HTML tags', regex: '<\\/?\\w+((\\s+\\w+(\\s*=\\s*(?:".*?"|\'.*?\'|[^\'">\\s]+))?)+\\s*|\\s*)\\/?>' },
  { name: 'Hex Color', desc: 'Matches #RGB or #RRGGBB', regex: '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$' },
  { name: 'Slug', desc: 'URL-friendly slug (lowercase, hyphens, numbers)', regex: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
  { name: 'UUID/GUID', desc: 'Matches UUID v1-v5 format', regex: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' }
];

export function RegexPatternLibrary() {
  const [search, setSearch] = useState('');
  const [testStrings, setTestStrings] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPatterns = regexPatterns.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));

  const handleTestChange = (name: string, value: string) => {
    setTestStrings({ ...testStrings, [name]: value });
  };

  const copyRegex = (regex: string, name: string) => {
    navigator.clipboard.writeText(regex);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const testMatch = (regexStr: string, testStr: string) => {
    if (!testStr) return null;
    try {
      const regex = new RegExp(regexStr);
      return regex.test(testStr);
    } catch {
      return false;
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-brand-600">Regex Pattern Library</h2>
        <input 
          type="text" 
          placeholder="Search patterns..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-brand-600 min-w-[250px]"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredPatterns.map(pattern => {
          const testVal = testStrings[pattern.name] || '';
          const isMatch = testMatch(pattern.regex, testVal);
          
          return (
            <div key={pattern.name} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{pattern.name}</h3>
                <p className="text-sm text-slate-400">{pattern.desc}</p>
              </div>
              
              <div className="relative group">
                <pre className="p-3 bg-slate-900 rounded-lg text-brand-400 font-mono text-sm overflow-x-auto whitespace-pre">{pattern.regex}</pre>
                <button 
                  onClick={() => copyRegex(pattern.regex, pattern.name)}
                  className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-xs px-2 py-1 rounded transition opacity-0 group-hover:opacity-100"
                >
                  {copiedId === pattern.name ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="mt-2">
                <input 
                  type="text" 
                  placeholder="Test string..." 
                  value={testVal}
                  onChange={e => handleTestChange(pattern.name, e.target.value)}
                  className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm outline-none transition ${
                    testVal ? (isMatch ? 'border-green-500/50 focus:border-green-500' : 'border-red-500/50 focus:border-red-500') : 'border-slate-700 focus:border-brand-600'
                  }`}
                />
                {testVal && (
                  <div className={`text-xs mt-1 ${isMatch ? 'text-green-400' : 'text-red-400'}`}>
                    {isMatch ? 'âœ“ Matches' : 'âœ— No match'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filteredPatterns.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500">No patterns found matching "{search}"</div>
        )}
      </div>
    </div>
  );
}

