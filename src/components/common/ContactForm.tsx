"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Mail, User, Tag } from "lucide-react";

interface ContactFormProps {
  endpoint?: string;
}

export function ContactForm({ endpoint = "https://formspree.io/f/xaewraro" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Track when the form was rendered to detect instant bot submissions
  const formLoadTime = useRef(Date.now());

  // Reset load time when form becomes visible
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ── Honeypot check: if hidden field is filled, it's a bot ──────────────
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement)?.value;
    if (honeypot) {
      // Silently pretend success to confuse bots
      setStatus("success");
      return;
    }

    // ── Timing check: humans take > 3s to fill a form ─────────────────────
    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 3000) {
      setStatus("success"); // Silent fake success for bots
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // Message length guard
    if (formData.message.length > 5000) {
      setErrorMessage("Message is too long. Please keep it under 5000 characters.");
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
          name: formData.name.slice(0, 100),
          email: formData.email.slice(0, 200),
          category: formData.category,
          subject: (formData.subject || `Inquiry from ${formData.name}`).slice(0, 200),
          message: formData.message.slice(0, 5000),
          _subject: `[Toolifia Contact] ${formData.category}: ${formData.subject || formData.name}`,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          category: "General Inquiry",
          subject: "",
          message: "",
        });
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 max-w-lg mx-auto animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Message Sent Successfully!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Thank you for reaching out. We have received your inquiry and our support team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 transition shadow-lg shadow-brand-500/20"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition";
  const labelCls = "block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
      {/* ── Honeypot: hidden from humans, filled by bots ── */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label htmlFor="_gotcha">Leave this blank</label>
        <input type="text" name="_gotcha" id="_gotcha" autoComplete="off" tabIndex={-1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Your Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Connor"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Email Address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="sarah@example.com"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <div className="relative">
            <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputCls} pl-10 appearance-none`}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Business Partnership">Business Partnership</option>
              <option value="API Access">API Access Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief summary of your inquiry"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Message *</label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you? Describe your request or feedback in detail..."
            className={`${inputCls} pl-10 resize-none`}
          />
        </div>
      </div>

      {status === "error" && errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-xl shadow-brand-500/20 disabled:opacity-60 transition flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Message</span>
          </>
        )}
      </button>
    </form>
  );
}
