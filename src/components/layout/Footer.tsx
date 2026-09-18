import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { CATEGORIES } from "@/config/categories.registry";
import { Logo } from "../common/Logo";
import { TrustpilotBadge } from "../trustpilot/TrustpilotBadge";
import { TrustBoxWidget } from "../trustpilot/TrustBoxWidget";
import { ProductHuntBadge } from "../producthunt/ProductHuntBadge";
import { Github, Twitter, Linkedin, Heart, ShieldCheck, Facebook, Instagram, Youtube, Mail } from "lucide-react";

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

            {/* Social icons — only rendered when the URL is set */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.links.github && (
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.twitter && (
                <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors" aria-label="X / Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.linkedin && (
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.facebook && (
                <a href={siteConfig.links.facebook} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.instagram && (
                <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-500 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.tiktok && (
                <a href={siteConfig.links.tiktok} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors" aria-label="TikTok">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
              )}
              {siteConfig.links.youtube && (
                <a href={siteConfig.links.youtube} target="_blank" rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-red-500 transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Top Categories
            </p>
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
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Featured Tools
            </p>
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
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company &amp; Legal
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors font-medium">
                  About Us
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
                <Link href="/cookie-policy" className="hover:text-brand-400 transition-colors font-medium">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-brand-400 transition-colors font-medium">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-400 transition-colors">
                  Blog & Tech Guides
                </Link>
              </li>
              <li>
                <a
                  href="mailto:toolifia.ai@gmail.com"
                  className="hover:text-brand-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 shrink-0" />
                  toolifia.ai@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Review Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <ProductHuntBadge variant="footer" className="my-0" />
          <TrustpilotBadge variant="footer" className="my-0" />
        </div>

        {/* TrustBox widget - Review Collector (lazy loaded on scroll) */}
        <TrustBoxWidget />

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
