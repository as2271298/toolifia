import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Cookie, ShieldCheck, CheckCircle2, Info, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: `Cookie Policy | ${siteConfig.name}`,
  description:
    "Understand how Toolifia uses cookies and local storage to provide a seamless, secure, and privacy-first online tool experience.",
  canonicalUrl: `${siteConfig.url}/cookie-policy`,
});

export default function CookiePolicyPage() {
  const breadcrumbs = [{ name: "Cookie Policy", url: "/cookie-policy" }];
  const lastUpdated = "August 30, 2026";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Cookie className="w-4 h-4" /> Transparency & Control
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          This Cookie Policy explains what cookies are, how {siteConfig.name} uses cookies and browser storage, and how you can manage your preferences.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" /> Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-400" /> 1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply statistical information to the owners of the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. How We Use Cookies</h2>
          <p>
            {siteConfig.name} uses minimal cookies strictly to provide core website functionality and evaluate aggregate usage patterns. We categorize the cookies we use as follows:
          </p>
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Essential & Functional Cookies
              </div>
              <p className="text-xs text-slate-400">
                These are necessary for the website to function properly. They remember your visual theme preference (Dark Mode / Light Mode) and recent tool interactions stored directly in your local browser storage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Performance & Analytics Cookies
              </div>
              <p className="text-xs text-slate-400">
                We use privacy-compliant web analytics (such as Google Analytics 4) to monitor aggregate traffic trends, top visited tools, and device screen sizes. This information is anonymized and does not identify individual users.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-violet-400" /> Advertising & Third-Party Cookies
              </div>
              <p className="text-xs text-slate-400">
                Third-party vendors, including Google (AdSense), may use cookies (such as the DoubleClick DART cookie) to serve ads based on your prior visits to our website or other websites on the internet. You may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">google.com/settings/ads</a>) or <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">aboutads.info</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Managing Your Cookie Preferences</h2>
          <p>
            You have full control over cookies and can block or delete them at any time through your browser settings. Please note that disabling essential cookies may impact your ability to preserve custom tool settings or theme choices across sessions.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Google Chrome: Settings → Privacy and Security → Third-party cookies</li>
            <li>Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data</li>
            <li>Apple Safari: Preferences → Privacy → Manage Website Data</li>
            <li>Microsoft Edge: Settings → Cookies and site permissions</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy periodically to reflect changes in legal requirements or technology standards. We encourage you to review this page periodically.
          </p>
          <p>
            If you have any questions regarding our use of cookies, please visit our{" "}
            <Link href="/contact" className="text-violet-400 font-bold hover:underline">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
