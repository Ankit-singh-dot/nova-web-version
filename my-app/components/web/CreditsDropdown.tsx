"use client";

import React from "react";
import {
  Zap,
  User,
  Receipt,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

interface CreditsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  maxCredits?: number;
  purchasedCredits?: number;
  userEmail?: string;
  onOpenBuyCredits?: () => void;
  onOpenUpgrade?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function CreditsDropdown({
  isOpen,
  onClose,
  credits = 40,
  maxCredits = 40,
  purchasedCredits = 0,
  userEmail = "ankitrajdihara123@gmail.com",
  onOpenBuyCredits,
  onOpenUpgrade,
  isDark = false,
  onToggleTheme,
}: CreditsDropdownProps) {
  if (!isOpen) return null;

  const percentage = Math.min(100, Math.max(0, (credits / maxCredits) * 100));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dropdown Card - Styled exactly like Screenshot 1 */}
      <div className="absolute right-0 top-full mt-2 w-[340px] z-50 rounded-2xl bg-white text-[#1d1d1f] shadow-2xl border border-neutral-200/90 overflow-hidden text-sm transition-all duration-200 animate-in fade-in zoom-in-95 origin-top-right">
        {/* User Email Header */}
        <div className="px-5 pt-4 pb-3 border-b border-neutral-100">
          <p className="text-sm font-medium text-neutral-800 truncate" title={userEmail}>
            {userEmail}
          </p>
        </div>

        {/* Credits Section */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              CREDITS
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
              Free
            </span>
          </div>

          {/* Daily credits */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500 font-normal">Daily</span>
              <span className="font-semibold text-neutral-900">
                {credits} / {maxCredits}
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Purchased credits */}
          <div className="flex items-center justify-between text-sm pt-1">
            <span className="text-neutral-500 font-normal">Purchased</span>
            <span className="font-semibold text-neutral-900">{purchasedCredits}</span>
          </div>

          {/* Explanatory notes */}
          <div className="space-y-2 pt-1 text-[12px] leading-relaxed text-neutral-500">
            <p>
              Daily credits reset at 00:00 UTC. Purchased credits never expire.
            </p>
            <p>
              Credit packs are available on paid plans. Upgrade first — your
              daily allowance goes up straight away.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => {
                onOpenBuyCredits?.();
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#a5b4fc]/35 hover:bg-[#a5b4fc]/50 text-blue-700 font-semibold text-xs transition-colors"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy credits</span>
            </button>
            <button
              onClick={() => {
                onOpenUpgrade?.();
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-900 font-semibold text-xs shadow-sm transition-colors text-center"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="border-t border-neutral-100 py-2">
          <button
            onClick={() => {
              alert("Preferences modal opened");
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left"
          >
            <User className="w-4 h-4 text-neutral-400" />
            <span>Preferences</span>
          </button>
          <button
            onClick={() => {
              onOpenUpgrade?.();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left"
          >
            <Receipt className="w-4 h-4 text-neutral-400" />
            <span>Billing & invoices</span>
          </button>
          <a
            href="https://nova.bridgeye.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left"
          >
            <HelpCircle className="w-4 h-4 text-neutral-400" />
            <span>Product guide</span>
          </a>
        </div>

        {/* Footer with Logout and Dark/Light Mode switch */}
        <div className="border-t border-neutral-100 px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                window.location.href = "https://nova.bridgeye.com/login/init";
              }
              onClose();
            }}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
