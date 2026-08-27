'use client';
import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export function HtpasswdGenerator() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const generate = async () => {
    if (!username || !password) return;
    
    // Simulate APR1 MD5 (client side is limited, we just show a placeholder)
    // SHA-1 (base64)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const base64 = btoa(String.fromCharCode.apply(null, hashArray));
    
    const sha1Format = `${username}:{SHA}${base64}`;
    const md5Format = `${username}:$apr1$placeholder$md5hash`;
    const bcryptFormat = `${username}:$2y$10$placeholderBcryptHash`;

    setOutput(`Apache SHA-1: ${sha1Format}\nApache MD5 (placeholder): ${md5Format}\nNginx Bcrypt (placeholder): ${bcryptFormat}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">Htpasswd Generator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-300">Username</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-600 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Password</label>
          <input 
            type="password" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-600 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <button 
          onClick={generate}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
        >
          <RefreshCw size={18} /> Generate
        </button>
        {output && (
          <div className="mt-4">
            <label className="block text-sm mb-1 text-slate-300">Generated Entries (Note: MD5/Bcrypt require server-side for true hashes)</label>
            <div className="relative">
              <textarea 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 font-mono text-sm h-32 focus:ring-2 focus:ring-brand-600 outline-none"
                readOnly
                value={output}
              />
              <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-md transition text-slate-200"
                title="Copy"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

