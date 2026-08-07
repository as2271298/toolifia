"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../common/Logo";
import { Grid, Menu, ChevronDown, Zap, BookOpen, Shield } from "lucide-react";

const NAV_LINKS = [
  { href: "/tools", label: "All Tools", highlight: true },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/privacy", label: "Privacy", icon: Shield },
];

export function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass-nav shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* ── Left: Logo + Nav ── */}
        <div className="flex items-center gap-5">
          <Logo size="md" />

          {/* Categories dropdown trigger */}
          <button
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            <Grid className="w-4 h-4 text-violet-400" />
            <span>Categories</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* All Tools pill */}
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-400/40 transition-all duration-200"
          >
            <Zap className="w-3.5 h-3.5" />
            All Tools (133+)
          </Link>
        </div>

        {/* ── Right: Nav Links + Mobile ── */}
        <div className="flex items-center gap-1">

          {NAV_LINKS.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hidden md:inline-flex px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-white/[0.1] mx-2" />

          {/* Get Started CTA */}
          <Link
            href="/tools"
            className="hidden sm:inline-flex btn-primary px-4 py-2 rounded-xl text-sm font-semibold text-white"
          >
            Try Free Tools
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-all ml-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}

      {/* Mobile Drawer */}
      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
}
