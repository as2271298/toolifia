"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw, ShieldCheck, ShieldAlert } from "lucide-react";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;

    let res = "";
    for (let i = 0; i < length; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  if (!password) generate();

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase && lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score <= 2) return { text: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (score <= 4) return { text: "Good", color: "text-amber-500", bg: "bg-amber-500" };
    return { text: "Strong", color: "text-emerald-500", bg: "bg-emerald-500" };
  };

  const strength = getStrength();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Generated Password</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${strength.color}`}>{strength.text}</span>
            <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className={`h-full ${strength.bg} transition-all`} style={{ width: strength.text === "Weak" ? "33%" : strength.text === "Good" ? "66%" : "100%" }} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input readOnly value={password} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono text-base text-emerald-400 tracking-wide outline-none select-all" />
          <button onClick={generate} title="Regenerate" className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={handleCopy} className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold flex items-center gap-2 transition-colors shrink-0">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span>Password Length</span>
            <span className="text-brand-600 dark:text-brand-400 font-mono">{length} characters</span>
          </div>
          <input type="range" min="8" max="64" value={length} onChange={e => { setLength(Number(e.target.value)); generate(); }} className="w-full accent-brand-600" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "ABC (Uppercase)", val: uppercase, set: setUppercase },
            { label: "abc (Lowercase)", val: lowercase, set: setLowercase },
            { label: "123 (Numbers)", val: numbers, set: setNumbers },
            { label: "#$% (Symbols)", val: symbols, set: setSymbols },
          ].map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
              <input type="checkbox" checked={opt.val} onChange={e => { opt.set(e.target.checked); generate(); }} className="rounded accent-brand-600" />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
