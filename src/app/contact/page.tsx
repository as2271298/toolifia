import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/common/ContactForm";
import { Mail, MessageSquare, ShieldCheck, Zap, Facebook, Instagram } from "lucide-react";

export const metadata = constructMetadata({
  title: `Contact Us & Support | ${siteConfig.name}`,
  description:
    "Get in touch with the Toolifia team. Send feature requests, bug reports, API inquiries, or feedback.",
  canonicalUrl: `${siteConfig.url}/contact`,
});

export default function ContactPage() {
  const breadcrumbs = [{ name: "Contact & Support", url: "/contact" }];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
          <MessageSquare className="w-4 h-4" /> Direct Communication Channel
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact & Support Hub
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have a question, feature request, or bug report? Fill out the form below to connect directly with the Toolifia engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Mail className="w-6 h-6 text-brand-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Direct Email</h3>
          <a
            href="mailto:toolifia.ai@gmail.com"
            className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline block break-all"
          >
            toolifia.ai@gmail.com
          </a>
          <p className="text-[11px] text-slate-400">Response within 24–48h</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <MessageSquare className="w-6 h-6 text-indigo-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Online Form</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit your inquiry directly using the form below.
          </p>
          <p className="text-[11px] text-slate-400">Instant submission</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Zap className="w-6 h-6 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Feature Requests</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Tell us what tools or algorithms you need next.</p>
          <p className="text-[11px] text-slate-400">Reviewed weekly</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bug Tracking &amp; Security</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Report calculation edge cases or security observations.</p>
          <p className="text-[11px] text-slate-400">High priority triage</p>
        </div>
      </div>

      {/* Direct Email Callout Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-500/10 via-purple-500/5 to-slate-900/10 border border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Prefer sending an email directly?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reach our team anytime for partnerships, API inquiries, or general support.</p>
          </div>
        </div>
        <a
          href="mailto:toolifia.ai@gmail.com"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all shrink-0"
        >
          toolifia.ai@gmail.com
        </a>
      </div>

      {/* Official Social Channels */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Connect on Social Media</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Follow us for real-time tool updates, new releases, and video tutorials.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {siteConfig.links.facebook && (
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-[#1877F2] transition-colors flex items-center gap-2 text-xs font-semibold border border-slate-700/60"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              <span>Facebook</span>
            </a>
          )}
          {siteConfig.links.instagram && (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-pink-400 transition-colors flex items-center gap-2 text-xs font-semibold border border-slate-700/60"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram</span>
            </a>
          )}
          {siteConfig.links.tiktok && (
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 transition-colors flex items-center gap-2 text-xs font-semibold border border-slate-700/60"
            >
              <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
              </svg>
              <span>TikTok</span>
            </a>
          )}
        </div>
      </div>

      {/* Structured Inquiries Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Before You Contact Us</h2>
        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li><strong>Direct Correspondence:</strong> You can write to our engineering and editorial team directly at <a href="mailto:toolifia.ai@gmail.com" className="text-brand-500 font-semibold hover:underline">toolifia.ai@gmail.com</a>.</li>
          <li><strong>API Integration:</strong> For questions about our tool REST endpoints, check the "REST API Docs" tab on individual tool pages for live cURL samples.</li>
          <li><strong>Data Inquiries &amp; Privacy:</strong> Most utilities operate entirely client-side. We do not store or retain user data. For full details, review our <a href="/privacy" className="text-brand-500 font-semibold hover:underline">Privacy Policy</a>.</li>
          <li><strong>Copyright &amp; DMCA:</strong> To submit an intellectual property inquiry, send documentation directly to <a href="mailto:toolifia.ai@gmail.com" className="text-brand-500 font-semibold hover:underline">toolifia.ai@gmail.com</a> or use the message form below.</li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto">
        <ContactForm endpoint="https://formspree.io/f/xaewraro" />
      </div>
    </div>
  );
}
