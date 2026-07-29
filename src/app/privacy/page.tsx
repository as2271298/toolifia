import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ShieldCheck, Lock, Eye, FileText, Server, Clock } from "lucide-react";

export const metadata = constructMetadata({
  title: `Privacy Policy | ${siteConfig.name}`,
  description:
    "Learn how Toolifia protects your privacy, handles AI text data client-side, and guarantees secure, zero-tracking online utility execution.",
  canonicalUrl: `${siteConfig.url}/privacy`,
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: "Privacy Policy", url: "/privacy" }];
  const lastUpdated = "July 26, 2026";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
          <ShieldCheck className="w-4 h-4" /> Data Protection & Privacy First
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          At {siteConfig.name}, we believe privacy is a fundamental right. We build client-side first tools to ensure your input data stays under your control.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" /> Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Zero Text Storage</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Text pasted into our AI Humanizer, Detectors, JSON Formatters, or Word Counters is processed transiently and never saved to a database.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Client-Side First</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Image Resizing, Base64 Encoding, and Hash Generation run 100% inside your browser canvas without uploading files to our servers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Selling Data</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not sell, rent, or trade user data or prompt contents to any third-party brokers, advertisers, or AI training datasets.
          </p>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-500" /> 1. Information We Collect
          </h2>
          <p>
            {siteConfig.name} is designed as a free, friction-free utility platform. We do not require account registration to access 100% of our online tools.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Non-Personal Technical Logs:</strong> Standard web server access logs (IP address, browser type, referring pages, timestamp) are retained transiently for security rate limiting and DDoS prevention.
            </li>
            <li>
              <strong>Tool Input Data:</strong> Any text, code, or images processed through our online tools remain strictly ephemeral. Text processed via AI APIs (OpenRouter) is sent over encrypted TLS connections to fulfill requests and discarded immediately.
            </li>
            <li>
              <strong>Cookies & Local Storage:</strong> We use local browser storage exclusively to remember your visual theme preference (Light/Dark mode) and tool usage history stored locally in your browser.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. How We Use Information
          </h2>
          <p>
            We use collected technical statistics strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>Maintain platform operational uptime, server bandwidth, and prevent API abuse.</li>
            <li>Optimize page load speeds and overall site performance.</li>
            <li>Analyze aggregate usage trends (e.g. total runs across tool categories) without identifying individual users.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. AI Service Provider Data Handling
          </h2>
          <p>
            When utilizing AI-powered utilities (AI Text Humanizer, AI Content Detector, AI Prompt Generator), requests are routed through OpenRouter secure infrastructure.
          </p>
          <p>
            Your prompts and outputs are **not** used to train public machine learning models. Transmitted payloads are encrypted in transit using standard HTTPS/TLS protocols.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Third-Party Analytics & Advertising
          </h2>
          <p>
            To keep {siteConfig.name} 100% free for all users worldwide, we may display non-intrusive advertisements (Google AdSense) or use privacy-compliant web analytics. These partners may use cookies to serve relevant ads based on prior visits to our site. You may opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Contact Privacy Team
          </h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, please reach out to our team at{" "}
            <a href="mailto:privacy@toolifia.com" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              privacy@toolifia.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
