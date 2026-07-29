import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/common/ContactForm";
import { Mail, MessageSquare, ShieldCheck, Zap } from "lucide-react";

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Mail className="w-6 h-6 text-brand-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fast Response</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">We aim to review all inquiries within 24 hours.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Zap className="w-6 h-6 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Feature Requests</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Tell us what tools or APIs you want built next.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bug Tracking</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Report edge cases or unexpected tool behaviors.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <ContactForm endpoint="https://formspree.io/f/xqerwaog" />
      </div>
    </div>
  );
}
