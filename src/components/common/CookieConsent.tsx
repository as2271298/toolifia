"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("toolifia_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("toolifia_cookie_consent", "accepted");
    } catch {
      // Ignore storage error
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("toolifia_cookie_consent", "rejected");
    } catch {
      // Ignore storage error
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/95 dark:bg-slate-900/95 border border-slate-800 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Cookie Preferences
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-[11px] text-slate-400">We value your privacy &amp; transparency</p>
            </div>
          </div>

          <button
            onClick={handleReject}
            aria-label="Close cookie banner"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-xs text-slate-300 leading-relaxed">
          We use essential cookies to keep our free tools working properly and optional analytics cookies to measure site performance. No personal information is ever sold. Read our{" "}
          <Link href="/cookie-policy" className="text-brand-400 hover:text-brand-300 font-semibold underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-400 hover:text-brand-300 font-semibold underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all active:scale-[0.98]"
          >
            Allow Cookies
          </button>
          <button
            onClick={handleReject}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-300 hover:text-white font-semibold text-xs transition-all active:scale-[0.98]"
          >
            Reject Optional
          </button>
        </div>
      </div>
    </aside>
  );
}