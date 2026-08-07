import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { CATEGORIES } from "@/config/categories.registry";
import { Logo } from "../common/Logo";
import { TrustpilotBadge } from "../trustpilot/TrustpilotBadge";
import { ProductHuntBadge } from "../producthunt/ProductHuntBadge";
import { Github, Twitter, Linkedin, Heart, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#04050a] text-slate-400 border-t border-white/[0.06] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.description} Free, high-performance online utilities built for content creators, developers, technical SEOs, and students.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tool/ai-humanizer" className="hover:text-brand-400 transition-colors">
                  AI Text Humanizer
                </Link>
              </li>
              <li>
                <Link href="/tool/ai-detector" className="hover:text-brand-400 transition-colors">
                  AI Content Detector
                </Link>
              </li>
              <li>
                <Link href="/tool/meta-tag-generator" className="hover:text-brand-400 transition-colors">
                  Meta Tag Generator
                </Link>
              </li>
              <li>
                <Link href="/tool/json-formatter" className="hover:text-brand-400 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tool/word-counter" className="hover:text-brand-400 transition-colors">
                  Word Counter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog" className="hover:text-brand-400 transition-colors">
                  Blog & Tech Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors font-medium">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-400 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Review Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <ProductHuntBadge variant="footer" className="my-0" />
          <TrustpilotBadge variant="footer" className="my-0" />
        </div>

        {/* TrustBox widget - Review Collector */}
        <div className="my-4 flex justify-center w-full">
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6a69cf20aef288bb4acc52af"
            data-style-height="52px"
            data-style-width="100%"
            data-token="06235af7-3cc5-45b1-8dd8-efbd75f2bc61"
          >
            <a
              href="https://www.trustpilot.com/review/toolifia.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trustpilot
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with speed & precision for web creators worldwide</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
