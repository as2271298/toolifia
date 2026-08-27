'use client';
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export function SubdomainFinder() {
  const [domain, setDomain] = useState('example.com');
  const commonSubdomains = ['www', 'mail', 'ftp', 'api', 'admin', 'dev', 'staging', 'blog', 'shop', 'cdn'];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">Subdomain Checker</h2>
      <p className="text-sm text-slate-300 mb-4">
        Note: Real subdomain enumeration requires server-side DNS queries. This tool generates links for common subdomains to check manually.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-300">Base Domain</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-600 outline-none"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {commonSubdomains.map(sub => {
            const fullDomain = `${sub}.${domain}`;
            return (
              <a 
                key={sub}
                href={`http://${fullDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
              >
                <span className="font-mono text-sm">{fullDomain}</span>
                <ExternalLink size={16} className="text-slate-400" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

