"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface NewsletterFormProps {
  endpoint?: string;
  variant?: "banner" | "compact" | "card";
}

export function NewsletterForm({
  endpoint = "https://formspree.io/f/xqerwaog",
  variant = "banner",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          _subject: "New Toolifia Newsletter Subscription",
          source: "Toolifia Website",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(
          data.error || "Submission failed. Please try again later."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-white flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
        <div className="text-left">
          <div className="font-bold text-sm text-emerald-200">You&apos;re Subscribed! 🎉</div>
          <div className="text-xs text-emerald-100/90">
            Thank you for subscribing to Toolifia updates. We&apos;ll keep you posted on new free tools!
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/50">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            disabled={status === "submitting"}
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-brand-200 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/40 disabled:opacity-50 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting" || !email.trim()}
          className="px-6 py-3 rounded-xl bg-white text-brand-700 font-extrabold text-sm hover:bg-brand-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-200 bg-rose-500/20 px-3 py-1.5 rounded-lg max-w-md mx-auto border border-rose-500/30">
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
