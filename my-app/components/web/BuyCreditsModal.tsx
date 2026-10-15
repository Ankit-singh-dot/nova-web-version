"use client";

import React, { useState } from "react";
import { X, Check, Zap, Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
  initialTab?: "credits" | "upgrade";
}

export default function BuyCreditsModal({
  isOpen,
  onClose,
  onAddCredits,
  initialTab = "credits",
}: BuyCreditsModalProps) {
  const [tab, setTab] = useState<"credits" | "upgrade">(initialTab);
  const [selectedPack, setSelectedPack] = useState<number>(100);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  if (!isOpen) return null;

  const handlePurchaseCredits = (amount: number) => {
    onAddCredits(amount);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0f0f13] border border-white/10 text-white shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl mb-6 max-w-xs">
          <button
            onClick={() => setTab("credits")}
            className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
              tab === "credits"
                ? "bg-blue-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Credit Packs
          </button>
          <button
            onClick={() => setTab("upgrade")}
            className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
              tab === "upgrade"
                ? "bg-blue-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Subscription Plans
          </button>
        </div>

        {tab === "credits" ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight">Buy Credit Packs</h2>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Purchased credits never expire. Use them anytime when daily limits are reached.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { amount: 50, price: "$5", per: "$0.10/credit", popular: false },
                { amount: 200, price: "$15", per: "$0.075/credit", popular: true },
                { amount: 500, price: "$30", per: "$0.06/credit", popular: false },
              ].map((pack) => (
                <div
                  key={pack.amount}
                  onClick={() => setSelectedPack(pack.amount)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedPack === pack.amount
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedPack === pack.amount
                          ? "border-blue-400 bg-blue-500 text-white"
                          : "border-zinc-500"
                      }`}
                    >
                      {selectedPack === pack.amount && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">+{pack.amount} Credits</span>
                        {pack.popular && (
                          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                            Best Value
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400">{pack.per}</span>
                    </div>
                  </div>
                  <div className="text-right font-bold text-base text-white">
                    {pack.price}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handlePurchaseCredits(selectedPack)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Add {selectedPack} Credits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold tracking-tight">Upgrade Your Plan</h2>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Unlock higher daily limits, faster model priority, and unlimited cloud deployments.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div
                onClick={() => setSelectedPlan("pro")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === "pro"
                    ? "border-blue-500 bg-blue-500/10 shadow-lg"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm">Pro Developer</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                </div>
                <div className="text-2xl font-black mb-2">$20<span className="text-xs font-normal text-zinc-400">/mo</span></div>
                <ul className="text-[11px] text-zinc-300 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>200 daily credits</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Access to NOVA Orion 1.0×</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Autonomous Self-Healing</span>
                  </li>
                </ul>
              </div>

              <div
                onClick={() => setSelectedPlan("team")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === "team"
                    ? "border-purple-500 bg-purple-500/10 shadow-lg"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm">Team Ultra</span>
                </div>
                <div className="text-2xl font-black mb-2">$50<span className="text-xs font-normal text-zinc-400">/mo</span></div>
                <ul className="text-[11px] text-zinc-300 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Unlimited daily allowance</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Full Pulsar 1.5× access</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Shared team workspaces</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handlePurchaseCredits(200)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Activate {selectedPlan === "pro" ? "Pro Plan ($20)" : "Team Plan ($50)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
