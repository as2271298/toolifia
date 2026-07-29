"use client";
import { useState } from "react";
import { KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";

export function JwtDecoder() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  let header = "";
  let payload = "";
  let error = "";

  try {
    if (token.trim()) {
      const parts = token.trim().split(".");
      if (parts.length !== 3) {
        error = "Invalid JWT structure. JWT tokens must contain exactly 3 parts separated by dots.";
      } else {
        header = JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
        payload = JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
      }
    }
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Failed to decode JWT base64 payload.";
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Encoded JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste your JSON Web Token (jwt.io style)..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-xs font-mono text-slate-900 dark:text-white resize-none"
        />
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Header (Algorithm & Token Type)
            </h4>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 font-mono text-xs overflow-x-auto">
              {header || "{}"}
            </pre>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Payload (Claims & Data)
            </h4>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 font-mono text-xs overflow-x-auto">
              {payload || "{}"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
