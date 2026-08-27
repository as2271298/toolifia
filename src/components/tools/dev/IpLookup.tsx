'use client';
import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

export function IpLookup() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMyIp = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip);
      lookupIp(data.ip);
    } catch (err) {
      setError('Could not fetch IP');
    }
  };

  useEffect(() => {
    fetchMyIp();
  }, []);

  const lookupIp = async (queryIp: string) => {
    if (!queryIp) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://ip-api.com/json/${queryIp}`);
      const data = await res.json();
      if (data.status === 'success') {
        setInfo(data);
      } else {
        setError('Failed to get geolocation info');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">IP Lookup & Geolocation</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-600 outline-none"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="8.8.8.8"
          />
          <button 
            onClick={() => lookupIp(ip)}
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />} Lookup
          </button>
        </div>
        
        {error && <div className="text-red-400 text-sm">{error}</div>}
        
        {info && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="block text-slate-400 text-xs">IP Address</span>
              <span className="font-semibold text-lg">{info.query}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">ISP</span>
              <span className="font-semibold text-lg">{info.isp}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Country</span>
              <span className="font-semibold text-lg">{info.country}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">City</span>
              <span className="font-semibold text-lg">{info.city}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Timezone</span>
              <span className="font-semibold text-lg">{info.timezone}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Coordinates</span>
              <span className="font-semibold text-lg">{info.lat}, {info.lon}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

