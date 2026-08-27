'use client';
import React, { useState, useEffect } from 'react';

export function DnsLookupTool() {
  const [domain, setDomain] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname);
    }
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">DNS Lookup Guide</h2>
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Note: Real DNS lookups require server-side queries. Use command line tools like `dig` or online services.
        </p>
        <div>
          <label className="block text-sm mb-1 text-slate-300">Domain Name</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-600 outline-none"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3 mt-4">
          <h3 className="font-semibold text-lg text-slate-100 border-b border-slate-700 pb-2">Common Record Types</h3>
          <div><strong className="text-brand-500">A:</strong> IPv4 address record. Maps domain to an IPv4 address.</div>
          <div><strong className="text-brand-500">AAAA:</strong> IPv6 address record. Maps domain to an IPv6 address.</div>
          <div><strong className="text-brand-500">CNAME:</strong> Canonical Name. Alias of one name to another.</div>
          <div><strong className="text-brand-500">MX:</strong> Mail Exchange. Specifies mail servers.</div>
          <div><strong className="text-brand-500">TXT:</strong> Text Record. Often used for SPF/DKIM and verification.</div>
          <div><strong className="text-brand-500">NS:</strong> Name Server. Delegates DNS zone to a specific server.</div>
        </div>
      </div>
    </div>
  );
}

