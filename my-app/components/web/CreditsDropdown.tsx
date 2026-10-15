"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/* ========================================================= */
/* CLEAN, STANDARD 1.5px STROKE OUTLINE ICONS (NO AI SLOP) */
/* ========================================================= */

function IconBolt({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconUser({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconReceipt({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h4" />
    </svg>
  );
}

function IconHelp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconLogout({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconSun({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14-1.41 1.41" />
    </svg>
  );
}

function IconMoon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
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
  const percentage = Math.min(100, Math.max(0, (credits / maxCredits) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Clean Editorial Dropdown Popover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-[340px] z-50 rounded-2xl bg-white text-[#1d1d1f] shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-neutral-200/90 overflow-hidden text-sm origin-top-right select-none"
          >
            {/* User Email Header */}
            <div className="px-5 pt-4 pb-3 border-b border-neutral-100">
              <p className="text-[13px] font-medium text-neutral-900 truncate" title={userEmail}>
                {userEmail}
              </p>
            </div>

            {/* Credits Section */}
            <div className="p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                  CREDITS
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60">
                  Free
                </span>
              </div>

              {/* Daily Allowance */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-neutral-500 font-normal">Daily</span>
                  <span className="font-semibold text-neutral-900 font-mono">
                    {credits} / {maxCredits}
                  </span>
                </div>

                {/* Sleek Minimal Progress Track (Obsidian Neutral) */}
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Purchased Reserve */}
              <div className="flex items-center justify-between text-[13px] pt-0.5">
                <span className="text-neutral-500 font-normal">Purchased</span>
                <span className="font-semibold text-neutral-900 font-mono">{purchasedCredits}</span>
              </div>

              {/* Explanatory Details */}
              <div className="space-y-1.5 pt-1 text-[11.5px] leading-relaxed text-neutral-500 font-normal">
                <p>
                  Daily credits reset at 00:00 UTC. Purchased credits never expire.
                </p>
                <p>
                  Credit packs are available on paid plans. Upgrade first — your
                  daily allowance goes up straight away.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1.5">
                <button
                  onClick={() => {
                    onOpenBuyCredits?.();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-medium text-xs transition-colors cursor-pointer active:scale-98"
                >
                  <IconBolt className="w-3 h-3 text-neutral-700" />
                  <span>Buy credits</span>
                </button>

                <button
                  onClick={() => {
                    onOpenUpgrade?.();
                    onClose();
                  }}
                  className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#1d1d1f] hover:bg-black text-white font-medium text-xs shadow-xs hover:shadow transition-all cursor-pointer active:scale-98"
                >
                  <span>Upgrade</span>
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="border-t border-neutral-100 py-1.5">
              <button
                onClick={() => {
                  alert("Preferences opened");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
              >
                <IconUser className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Preferences</span>
              </button>

              <button
                onClick={() => {
                  onOpenUpgrade?.();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
              >
                <IconReceipt className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Billing &amp; invoices</span>
              </button>

              <a
                href="https://nova.bridgeye.com/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
              >
                <IconHelp className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Product guide</span>
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 px-5 py-2.5 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to log out?")) {
                    window.location.href = "https://nova.bridgeye.com/login/init";
                  }
                  onClose();
                }}
                className="flex items-center gap-2 text-[13px] text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer"
              >
                <IconLogout className="w-4 h-4 text-red-500" />
                <span>Log out</span>
              </button>

              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <IconSun className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <IconMoon className="w-3.5 h-3.5 text-neutral-600" />
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
