import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AlertCircle, FileCheck, ShieldAlert, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: `Disclaimer | ${siteConfig.name}`,
  description:
    "Review the legal and informational disclaimer for Toolifia's online calculators, converters, and AI utility software.",
  canonicalUrl: `${siteConfig.url}/disclaimer`,
});

export default function DisclaimerPage() {
  const breadcrumbs = [{ name: "Disclaimer", url: "/disclaimer" }];
  const lastUpdated = "August 30, 2026";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
          <ShieldAlert className="w-4 h-4" /> Legal & Information Notice
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Disclaimer
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Please read this disclaimer carefully before using any calculators, converters, or tools on {siteConfig.name}.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" /> Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" /> 1. General Informational Use Only
          </h2>
          <p>
            The information and tools provided on {siteConfig.name} ({siteConfig.url}) are for general educational, productivity, and informational purposes only. While we strive to ensure that calculations and utility scripts are accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, tools, services, or related graphics contained on the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Financial, Health & Legal Disclaimer</h2>
          <p>
            <strong>Financial Calculators:</strong> Loan, mortgage, EMI, and compound interest calculators provide mathematical estimates only. They do not constitute professional financial advice, loan approvals, or binding quotes. Always consult a certified financial advisor or lending institution for official financial planning.
          </p>
          <p>
            <strong>Health & Fitness Calculators:</strong> BMI (Body Mass Index), calorie, and TDEE calculators are intended for general fitness awareness. They do not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider.
          </p>
          <p>
            <strong>Legal & Developer Utilities:</strong> Generated privacy policies, hashes, UUIDs, and terms templates are for reference purposes. Users are advised to seek legal counsel for compliance with applicable jurisdiction laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. AI Generated Content Notice</h2>
          <p>
            AI tools available on our platform (including AI Text Humanizer, AI Content Detector, and Prompt Generator) utilize advanced machine learning algorithms. Machine learning outputs may occasionally generate unexpected, inaccurate, or biased results. Users are solely responsible for reviewing, verifying, and validating all outputs before publication or use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. External Links & Third-Party Services</h2>
          <p>
            Through this website, you may be able to link to other websites that are not under the control of {siteConfig.name}. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contact Us</h2>
          <p>
            If you have questions or wish to report a mathematical or algorithmic error in any of our tools, please reach out via our{" "}
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
