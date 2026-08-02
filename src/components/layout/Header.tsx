"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "../common/SearchBar";
import { Logo } from "../common/Logo";
import { TrustpilotBadge } from "../trustpilot/TrustpilotBadge";
import { ProductHuntBadge } from "../producthunt/ProductHuntBadge";
import { Grid, Menu, ChevronDown, Lock } from "lucide-react";

export function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />

          {/* Mega Menu Desktop Trigger */}
          <button
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Grid className="w-4 h-4 text-brand-500" />
            <span>Categories</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Quick Search */}
        <div className="hidden lg:block flex-1 max-w-md">
          <SearchBar placeholder="Search tools (e.g. AI Humanizer, JSON Formatter)..." />
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-3">
          <ProductHuntBadge variant="header" />
          <TrustpilotBadge variant="header" />
          <Link
            href="/blog"
            className="hidden sm:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/privacy"
            className="hidden md:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Privacy
          </Link>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800"
          >
            <Lock className="w-3 h-3 text-brand-500" /> Admin
          </Link>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}

      {/* Mobile Drawer */}
      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
}
