'use client';
import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

export function UserAgentParser() {
  const [uaString, setUaString] = useState('');
  const [parsed, setParsed] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUaString(navigator.userAgent);
    }
  }, []);

  const parseUA = (ua: string) => {
    const isMobile = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(ua);
    
    let browser = 'Unknown';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    let os = 'Unknown OS';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('like Mac')) os = 'iOS';

    setParsed({
      browser,
      os,
      device: isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
      isBot: isBot ? 'Yes' : 'No'
    });
  };

  useEffect(() => {
    if (uaString) parseUA(uaString);
  }, [uaString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uaString);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">User Agent Parser</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-300">User Agent String</label>
          <div className="relative">
            <textarea 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 pr-10 font-mono text-sm h-24 focus:ring-2 focus:ring-brand-600 outline-none"
              value={uaString}
              onChange={(e) => setUaString(e.target.value)}
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
        {parsed && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-slate-400 text-xs">Browser</span>
              <span className="font-semibold">{parsed.browser}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Operating System</span>
              <span className="font-semibold">{parsed.os}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Device Type</span>
              <span className="font-semibold">{parsed.device}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Is Bot?</span>
              <span className="font-semibold">{parsed.isBot}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

