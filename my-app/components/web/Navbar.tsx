"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
  Terminal,
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import CreditsDropdown from "./CreditsDropdown";
import BuyCreditsModal from "./BuyCreditsModal";

interface NavbarProps {
  credits: number;
  userName?: string;
  onOpenTemplates?: () => void;
  onOpenStudio?: () => void;
  onOpenDashboard?: () => void;
  onAddCredits?: (amount: number) => void;
}

export default function Navbar({
  credits = 40,
  userName = "Ankit-singh-dot",
  onOpenTemplates,
  onOpenStudio,
  onOpenDashboard,
  onAddCredits,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buyCreditsModal, setBuyCreditsModal] = useState(false);
  const [creditTab, setCreditTab] = useState<"credits" | "upgrade">("credits");

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const handleOpenBuyCredits = () => {
    setCreditTab("credits");
    setBuyCreditsModal(true);
  };

  const handleOpenUpgrade = () => {
    setCreditTab("upgrade");
    setBuyCreditsModal(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-xl bg-white/90 border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: NOVA by Bridgeye Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group-hover:scale-105 flex items-center gap-2">
              <Image
                src="/images/logo (1).png"
                alt="NOVA by Bridgeye"
                width={74}
                height={22}
                priority
                className="h-4.5 sm:h-5 w-auto object-contain"
                style={{ width: "auto" }}
              />
              <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold">
                Web
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Floating Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/95 border border-neutral-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-2xl text-neutral-800 text-xs font-medium">
          <a
            href="#cli-section"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-600" />
            <span>CLI</span>
          </a>

          <button
            onClick={onOpenTemplates}
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            Templates
          </button>

          <Link
            href="/dashboard"
            onClick={onOpenDashboard}
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            Dashboard
          </Link>

          <a
            href="https://nova.bridgeye.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            Pricing
          </a>

          <a
            href="https://nova.bridgeye.com/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            Releases
          </a>

          <a
            href="https://nova.bridgeye.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            Docs
          </a>

          <a
            href="https://github.com/bridgeyeai/nova-bridgeye"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all"
          >
            GitHub
          </a>
        </nav>

        {/* Right: Discord, Theme, Credits Pill (Screenshot 1 & 2), Launch Workspace */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Discord button */}
          <a
            href="https://discord.gg/rBSWXgAmr"
            target="_blank"
            rel="noopener noreferrer"
            title="Join Discord community"
            className="hidden sm:flex p-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-amber-600 transition-all shadow-xs"
            title="Toggle Theme"
          >
            {isDark ? <Moon className="w-4 h-4 text-neutral-800" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* ========================================================= */}
          {/* THE EXACT CREDITS PILL (Screenshot 1 & Screenshot 2) */}
          {/* ========================================================= */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-500 fill-current" />
              <span className="font-bold text-xs sm:text-sm text-neutral-900">
                {credits}
              </span>
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                A
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {/* Dropdown Menu - Exact Screenshot 1 specification */}
            <CreditsDropdown
              isOpen={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
              credits={credits}
              maxCredits={40}
              purchasedCredits={0}
              userEmail="ankitrajdihara123@gmail.com"
              onOpenBuyCredits={handleOpenBuyCredits}
              onOpenUpgrade={handleOpenUpgrade}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </div>

          {/* Launch Workspace CTA Button */}
          <button
            onClick={onOpenStudio}
            className="hidden md:flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-white shadow-md active:scale-95 transition-all"
          >
            <span>Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-2 px-2 border-t border-neutral-200 mt-3 flex flex-col gap-2 bg-white">
          <button
            onClick={() => {
              onOpenTemplates?.();
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
          >
            Templates
          </button>
          <Link
            href="/dashboard"
            onClick={() => {
              onOpenDashboard?.();
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
          >
            Dashboard &amp; Architectures
          </Link>
          <button
            onClick={() => {
              onOpenStudio?.();
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 text-sm text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
          >
            Open Live Workspace
          </button>
          <a
            href="https://nova.bridgeye.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
          >
            Pricing
          </a>
          <a
            href="https://nova.bridgeye.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
          >
            Documentation
          </a>
        </div>
      )}

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={buyCreditsModal}
        onClose={() => setBuyCreditsModal(false)}
        onAddCredits={(amount) => {
          onAddCredits?.(amount);
        }}
        initialTab={creditTab}
      />
    </header>
  );
}
