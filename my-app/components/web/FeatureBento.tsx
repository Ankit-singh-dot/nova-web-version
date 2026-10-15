"use client";

import React, { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  Layout,
  Search,
  Maximize,
  GitBranch,
  ArrowRight,
} from "lucide-react";

const CLI_COMMANDS = [
  {
    title: "CLI Login",
    cmd: "nova login",
    desc: "Authenticate securely directly from your terminal.",
    output: [
      "Authenticating with Bridgeye Cloud...",
      "Found active subscription: Free Plan (40 credits daily)",
      "✓ Token linked to ankitrajdihara123@gmail.com",
      "Ready to deploy neural autonomous sessions.",
    ],
  },
  {
    title: "Prompt Nova",
    cmd: 'nova "build a new feature"',
    desc: "Deploy codebase-aware AI to synthesize components.",
    output: [
      "Analyzing AST of 48 workspace files...",
      "Found matching routing convention (App Router)",
      "Generating components/HeroPrompt.tsx and styles/globals.css...",
      "Self-healing debugger: validating TypeScript types...",
      "✓ 0 lint errors. Build succeeded in 240ms.",
    ],
  },
  {
    title: "Repo Mapping",
    cmd: "nova map",
    desc: "Deep dependency graph & persistent codebase memory.",
    output: [
      "Traversing project hierarchy...",
      "Mapped 14 client components, 3 server actions, 8 static assets",
      "Identified critical state flows: [AuthContext, StudioState, CreditsStore]",
      "Graph cached into local persistent vector index.",
    ],
  },
  {
    title: "Help Centre",
    cmd: "nova help",
    desc: "Instant CLI reference and AI diagnostics.",
    output: [
      "NOVA CLI v2.4.0 — Autonomous Developer in Your Terminal",
      "Commands: nova [login|build|map|fix|test|deploy|chat]",
      "Run `nova fix` to trigger autonomous runtime healing",
      "Visit https://nova.bridgeye.com/documentation for full docs",
    ],
  },
];

export default function FeatureBento() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = CLI_COMMANDS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(`$ ${current.cmd}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="cli-section"
      className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full border-t border-neutral-200/80 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-medium mb-4">
          <Terminal className="w-3 h-3" />
          <span>TERMINAL + WEB HYBRID</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-neutral-900">
          The autonomous developer <br />
          <span className="font-serif italic font-normal text-neutral-500">
            for your terminal.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-500 font-normal leading-relaxed max-w-2xl mx-auto">
          Deploy a codebase-aware AI that acts as a{" "}
          <span className="text-neutral-900 font-medium">
            self-healing AI debugger
          </span>{" "}
          to build, test, and fix your code directly from the CLI or live in our web studio.
        </p>
      </div>

      {/* 4 Interactive Command Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-8">
        {CLI_COMMANDS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
              activeTab === idx
                ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border-neutral-200/80 hover:border-neutral-300"
            }`}
          >
            <div className="font-semibold text-sm sm:text-base tracking-tight">
              {item.title}
            </div>
            <div
              className={`font-mono text-xs mt-1 truncate ${
                activeTab === idx ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              $ {item.cmd}
            </div>
          </button>
        ))}
      </div>

      {/* Terminal Window Box (Matches Live Site) */}
      <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-neutral-300/80 bg-[#161618] shadow-2xl overflow-hidden mb-20">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#1c1c1e] px-4 sm:px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-neutral-400">
              nova — {current.cmd}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Content Body */}
        <div className="p-6 font-mono text-xs sm:text-sm text-neutral-300 space-y-2 leading-relaxed bg-[#101012]">
          <div className="text-blue-400 flex items-center gap-2">
            <span className="text-neutral-500">$</span>
            <span className="text-white font-semibold">{current.cmd}</span>
          </div>

          <div className="pt-2 space-y-1.5 text-neutral-400">
            {current.output.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith("✓")
                    ? "text-emerald-400 font-medium"
                    : line.startsWith("Found") || line.startsWith("Ready")
                    ? "text-blue-300"
                    : "text-neutral-400"
                }
              >
                {line}
              </div>
            ))}
          </div>

          <div className="pt-2 text-neutral-600 flex items-center gap-2">
            <span>$</span>
            <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Terminal Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-[#1c1c1e] px-5 sm:px-6 py-3.5 text-xs text-neutral-300">
          <span className="font-medium text-neutral-200">{current.desc}</span>
          <span className="font-mono text-xs text-neutral-400">
            $ {current.cmd}
          </span>
        </div>
      </div>

      {/* Comparison Section (Developers aren't slow. Workflows are.) */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
            Developers aren&apos;t slow.
            <br />
            <span className="font-serif italic font-medium pr-2 text-[#86868b]">
              Workflows are.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#86868b]">
            Modern development is fragmented. IDE → Browser → AI Chatbot → Terminal → Git. Every switch breaks momentum.
            <br />
            <strong className="font-semibold text-[#1d1d1f]">
              Nova keeps coding, debugging, execution, and deployment in one continuous workflow.
            </strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Card 1: Without Nova */}
          <div className="rounded-[2rem] p-8 sm:p-12 border flex flex-col justify-between shadow-xs bg-[#f5f5f7] border-black/5">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-[#1d1d1f]">
                Without Nova
              </h3>
              <p className="text-[#86868b] font-medium text-sm">
                Constant context-switching. Lost flow. Repeated prompts.
              </p>
            </div>

            <div className="my-10 relative h-48 sm:h-56 flex items-center justify-center">
              <div className="absolute top-2 left-2 p-2.5 rounded-xl shadow-xs border flex items-center gap-1.5 text-xs font-mono bg-white border-black/5 text-[#86868b]">
                <Layout className="w-3.5 h-3.5 text-blue-500" /> IDE
              </div>
              <div className="absolute top-1/4 right-2 p-2.5 rounded-xl shadow-xs border flex items-center gap-1.5 text-xs font-mono bg-white border-black/5 text-[#86868b]">
                <Search className="w-3.5 h-3.5 text-emerald-500" /> AI Chatbot
              </div>
              <div className="absolute bottom-1/4 left-6 p-2.5 rounded-xl shadow-xs border flex items-center gap-1.5 text-xs font-mono bg-white border-black/5 text-[#86868b]">
                <Maximize className="w-3.5 h-3.5 text-purple-500" /> Browser
              </div>
              <div className="absolute bottom-2 right-8 p-2.5 rounded-xl shadow-xs border flex items-center gap-1.5 text-xs font-mono bg-white border-black/5 text-[#86868b]">
                <GitBranch className="w-3.5 h-3.5 text-orange-500" /> Git
              </div>

              <div className="bg-red-500/10 text-red-500 rounded-full p-3 border border-red-500/20">
                <ArrowRight className="w-4 h-4 opacity-60" />
              </div>
            </div>

            <p className="text-xs text-[#86868b] font-mono">
              Multiple context switches degrade productivity.
            </p>
          </div>

          {/* Card 2: With Nova */}
          <div className="bg-[#121216] rounded-[2rem] p-8 sm:p-12 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white">
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-white mb-2">
                With Nova
              </h3>
              <p className="text-[#a1a1a6] font-medium text-sm">
                One terminal &amp; web studio. Persistent context. End-to-end execution.
              </p>
            </div>

            <div className="my-10 relative h-48 sm:h-56 flex items-center justify-center z-10">
              <div className="w-full max-w-sm bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[10px] font-mono text-[#a1a1a6]">
                    nova — unified workflow
                  </span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed text-blue-400">
                  <p>
                    <span className="text-emerald-400">✓</span> Nova handles everything
                  </p>
                  <p className="mt-2 text-white/50">
                    $ <span className="text-white">nova build &quot;fullstack app&quot;</span>
                  </p>
                  <p className="mt-1 text-white/30">Synthesizing... Deploying...</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#a1a1a6] font-mono z-10">
              One continuous motion from idea to production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
