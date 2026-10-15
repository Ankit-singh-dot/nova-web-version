"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Layout,
  History,
  Code2,
  Globe,
  Settings,
  ChevronDown,
  Sparkles,
  Wand2,
  Send,
  X,
  CheckCircle2,
  Smartphone,
  Tablet,
  Monitor,
  PanelLeftClose,
} from "lucide-react";
import CreditsDropdown from "./CreditsDropdown";
import BuyCreditsModal from "./BuyCreditsModal";

interface Message {
  id: string;
  sender: "user" | "nova";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  steps?: { title: string; done: boolean }[];
  previewTemplate?: string;
  codeSnippet?: string;
}

interface LiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialModel?: string;
  templateTitle?: string;
}

export default function LiveStudioModal({
  isOpen,
  onClose,
  initialPrompt = "hello there",
  initialModel = "NOVA Gliese 0.6×",
  templateTitle = "New Project",
}: LiveStudioModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "hello there",
      timestamp: "16:12",
    },
    {
      id: "2",
      sender: "nova",
      text: "Hello! I'm NOVA, ready to help you build or refine your web app. What are we creating today?",
      timestamp: "16:12",
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("NOVA Gliese");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "split" | "preview">("chat");
  const [credits, setCredits] = useState(40);
  const [creditsDropdownOpen, setCreditsDropdownOpen] = useState(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [projectName, setProjectName] = useState(templateTitle || "New Project");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [activeLeftNav, setActiveLeftNav] = useState<string>("history");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // If a prompt was triggered from outside, add it to chat and simulate build
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt !== "hello there") {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: initialPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "nova",
        text: `Starting synthesis for: "${initialPrompt}". Our codebase-aware AI is scaffolding the project layout, styling with custom dark theme, and validating components with the self-healing AI debugger.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        steps: [
          { title: "Analyzing intent & AST requirements", done: true },
          { title: "Scaffolding modern responsive component tree", done: true },
          { title: "Synthesizing reactive state hooks & interactions", done: true },
          { title: "Running self-healing debugger validation", done: true },
        ],
        previewTemplate: templateTitle,
      };

      setMessages([
        {
          id: "1",
          sender: "user",
          text: "hello there",
          timestamp: "16:12",
        },
        {
          id: "2",
          sender: "nova",
          text: "Hello! I'm NOVA, ready to help you build or refine your web app. What are we creating today?",
          timestamp: "16:12",
        },
        userMsg,
        aiMsg,
      ]);

      setActiveView("split");
    }
  }, [isOpen, initialPrompt, templateTitle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt.trim();
    setInputPrompt("");

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsBuilding(true);
    setCredits((prev) => Math.max(0, Number((prev - 0.13).toFixed(2))));

    // Simulate AI synthesis with self-healing debugger
    setTimeout(() => {
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "nova",
        text: `I've updated the application according to: "${userText}". The layout has been compiled and hot-reloaded into your preview panel.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        steps: [
          { title: "Parsing prompt and mapping workspace tokens", done: true },
          { title: "Executing multi-file code modifications", done: true },
          { title: "Autonomous debugger passed with 0 errors", done: true },
        ],
        codeSnippet: `// Nova Generated Code for ${projectName}\nimport React, { useState } from 'react';\n\nexport default function NovaApp() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="p-8 bg-zinc-950 text-white rounded-3xl border border-white/10">\n      <h1 className="text-2xl font-bold tracking-tight">${userText.slice(0, 35)}</h1>\n      <p className="text-zinc-400 mt-2 text-sm">Interactive preview live in your workspace.</p>\n      <button onClick={() => setCount(c => c + 1)} className="mt-4 px-4 py-2 bg-blue-600 rounded-xl font-medium text-xs">\n        Interactions: {count}\n      </button>\n    </div>\n  );\n}`,
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsBuilding(false);
      setActiveView("split");
    }, 1200);
  };

  const handleEnhance = () => {
    if (!inputPrompt.trim()) {
      setInputPrompt("Add interactive filter tabs, a realtime search input, and responsive grid animations");
      return;
    }
    setIsEnhancing(true);
    setTimeout(() => {
      setInputPrompt(
        (prev) => `${prev.trim()} — with responsive Tailwind classes, dark glassmorphism, Framer Motion transitions, and TypeScript types.`
      );
      setIsEnhancing(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in">
      <div className="relative w-full h-full md:w-[98vw] md:h-[96vh] md:rounded-3xl bg-[#f8fafc] text-neutral-800 flex overflow-hidden shadow-2xl border border-neutral-200/80">
        {/* ========================================================= */}
        {/* LEFT DOCK / SIDEBAR (Matches Screenshot 2) */}
        {/* ========================================================= */}
        <aside className="w-16 sm:w-18 bg-white border-r border-neutral-200/80 flex flex-col items-center justify-between py-4 shrink-0 z-20">
          {/* Top Icons */}
          <div className="flex flex-col items-center gap-5 w-full">
            {/* NOVA Circular Ring Logo */}
            <button
              onClick={() => setActiveView("chat")}
              className="relative w-9 h-9 rounded-full overflow-hidden hover:scale-105 transition-transform"
              title="NOVA Web"
            >
              <Image
                src="/images/logo-ring.png"
                alt="NOVA Ring"
                fill
                className="object-contain"
              />
            </button>

            {/* + New Chat */}
            <button
              onClick={() => {
                setMessages([
                  {
                    id: Date.now().toString(),
                    sender: "nova",
                    text: "Hello! I'm NOVA, ready to help you build or refine your web app. What are we creating today?",
                    timestamp: "16:12",
                  },
                ]);
                setProjectName("New Project");
              }}
              className="w-10 h-10 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors"
              title="New Project"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Layout Toggle */}
            <button
              onClick={() =>
                setActiveView(activeView === "chat" ? "split" : activeView === "split" ? "preview" : "chat")
              }
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                activeView === "split"
                  ? "bg-blue-100 text-blue-600 font-bold"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="Toggle Layout (Chat / Split / Preview)"
            >
              <Layout className="w-4 h-4" />
            </button>

            {/* History Icon (Active pill in Screenshot 2!) */}
            <button
              onClick={() => setActiveLeftNav("history")}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                activeLeftNav === "history"
                  ? "bg-[#e0e7ff] text-[#4338ca] shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="History"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Code / Sparkle Icon */}
            <button
              onClick={() => setActiveView(activeView === "split" ? "chat" : "split")}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-all"
              title="AI Code Synthesizer"
            >
              <Code2 className="w-4 h-4" />
            </button>

            {/* Globe / Web Icon */}
            <button
              onClick={() => setActiveView("preview")}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-all"
              title="Web Preview"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Icons (Settings, Avatar with green dot, Exit) */}
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={() => alert("Settings panel")}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Avatar with Green Online Status Indicator */}
            <div className="relative">
              <button
                onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm hover:ring-2 hover:ring-blue-400 transition-all"
                title="Account: ankitrajdihara123@gmail.com"
              >
                A
              </button>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            {/* Close modal / exit */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all"
              title="Exit Studio"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN WORKSPACE BODY */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafafa]">
          {/* Top Header Bar */}
          <header className="h-14 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-10">
            {/* Left: Project title dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-neutral-100 text-sm font-semibold text-neutral-800 transition-colors"
                >
                  <span>{projectName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {projectDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProjectDropdownOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-1 w-56 rounded-2xl bg-white border border-neutral-200 shadow-xl p-2 z-40 text-xs">
                      <div className="px-3 py-1.5 text-[10px] font-mono text-neutral-400 uppercase">
                        Switch Architecture
                      </div>
                      <button
                        onClick={() => {
                          setProjectName("New Project");
                          setProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 font-medium"
                      >
                        New Project
                      </button>
                      <button
                        onClick={() => {
                          setProjectName("Clearwave SaaS Engine");
                          setProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 font-medium"
                      >
                        Clearwave SaaS Engine
                      </button>
                      <button
                        onClick={() => {
                          setProjectName("Glass Admin Console");
                          setProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 font-medium"
                      >
                        Glass Admin Console
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* View switch pills */}
              <div className="hidden sm:flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 text-xs">
                <button
                  onClick={() => setActiveView("chat")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeView === "chat"
                      ? "bg-white text-neutral-900 shadow-xs font-medium"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveView("split")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeView === "split"
                      ? "bg-white text-neutral-900 shadow-xs font-medium"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setActiveView("preview")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeView === "preview"
                      ? "bg-white text-neutral-900 shadow-xs font-medium"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* Right: Credits Pill & Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                  className="flex items-center gap-2 pl-3 pr-2 py-1 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 shadow-xs text-xs font-medium text-neutral-800 transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-bold text-neutral-900">{credits}</span>
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    A
                  </div>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                <CreditsDropdown
                  isOpen={creditsDropdownOpen}
                  onClose={() => setCreditsDropdownOpen(false)}
                  credits={credits}
                  maxCredits={40}
                  purchasedCredits={0}
                  userEmail="ankitrajdihara123@gmail.com"
                  onOpenBuyCredits={() => setBuyCreditsOpen(true)}
                  onOpenUpgrade={() => setBuyCreditsOpen(true)}
                />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Content Area: Chat + Split Preview */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat Stream (Matches Screenshot 2) */}
            <div
              className={`flex flex-col h-full overflow-hidden transition-all duration-300 ${
                activeView === "preview"
                  ? "hidden"
                  : activeView === "split"
                  ? "w-full lg:w-1/2 border-r border-neutral-200/80"
                  : "w-full max-w-4xl mx-auto"
              }`}
            >
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* NOVA Tag for AI bubble */}
                    {msg.sender === "nova" && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 mb-1.5 inline-block">
                        NOVA
                      </span>
                    )}

                    {/* Chat Bubble */}
                    <div
                      className={`text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#e2e8f0] text-neutral-900 px-4 py-2 rounded-2xl rounded-tr-xs font-normal shadow-xs max-w-lg"
                          : "bg-white text-neutral-800 p-4 rounded-2xl rounded-tl-xs border border-neutral-200/90 shadow-sm max-w-xl space-y-3"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Synthesis Steps (if any) */}
                      {msg.steps && (
                        <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600 font-mono">
                          {msg.steps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{step.title}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Code preview snippet */}
                      {msg.codeSnippet && (
                        <div className="mt-2 rounded-xl bg-neutral-900 text-zinc-300 p-3 text-xs font-mono overflow-x-auto">
                          <pre>{msg.codeSnippet}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isBuilding && (
                  <div className="flex flex-col items-start space-y-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 inline-block">
                      NOVA
                    </span>
                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 font-mono flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing neural AST &amp; running self-healing debugger...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Bottom Floating Prompt Card (Matches Screenshot 2 EXACTLY) */}
              <div className="p-4 sm:p-6 pt-2 shrink-0">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-3 sm:p-4 text-left transition-all focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                  <textarea
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={2}
                    placeholder="Tell Nova what you want to make — like you'd tell a person."
                    className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-400 resize-none focus:outline-none leading-relaxed"
                  />

                  {/* Toolbar */}
                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-neutral-100 gap-2">
                    {/* Left: + Button, Model Pill, Credits */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert("Drop files or click to upload")}
                        className="w-6 h-6 rounded-full border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-400"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-neutral-200 text-xs bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                        >
                          <span className="font-semibold">{selectedModel}</span>
                          <span className="text-[10px] text-neutral-400">default</span>
                          <span className="text-[10px] font-mono text-blue-600">0.6×</span>
                          <ChevronDown className="w-3 h-3 text-neutral-400" />
                        </button>

                        {modelDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setModelDropdownOpen(false)}
                            />
                            <div className="absolute left-0 bottom-full mb-1 w-64 rounded-2xl bg-white border border-neutral-200 p-2 shadow-xl z-40 text-xs">
                              <button
                                onClick={() => {
                                  setSelectedModel("NOVA Gliese");
                                  setModelDropdownOpen(false);
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 font-medium"
                              >
                                NOVA Gliese 0.6× (Default)
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedModel("NOVA Orion");
                                  setModelDropdownOpen(false);
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 font-medium"
                              >
                                NOVA Orion 1.0× (Reasoning)
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedModel("NOVA Pulsar");
                                  setModelDropdownOpen(false);
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 font-medium"
                              >
                                NOVA Pulsar 1.5× (Self-Healing Debugger)
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                        0.13 credits
                      </span>
                    </div>

                    {/* Right: Enhance & Build Now */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleEnhance}
                        disabled={isEnhancing}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>{isEnhancing ? "Enhancing..." : "Enhance"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendMessage}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 transition-all"
                      >
                        <span>Build now</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footnotes */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2 px-2 font-mono">
                  <span>Enter to send · Shift + Enter for a new line</span>
                  <span>Drop files here</span>
                </div>

                <div className="text-center text-[11px] text-neutral-400 mt-2">
                  Nova is AI and can make mistakes. Please double-check cited sources.{" "}
                  <a
                    href="https://nova.bridgeye.com/tnc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-600"
                  >
                    Terms
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://nova.bridgeye.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-600"
                  >
                    Privacy
                  </a>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview Panel (when Split or Preview is active) */}
            {(activeView === "split" || activeView === "preview") && (
              <div
                className={`flex-1 flex flex-col bg-neutral-900 border-l border-neutral-200/80 overflow-hidden ${
                  activeView === "preview" ? "w-full" : "hidden lg:flex"
                }`}
              >
                {/* Browser URL bar & device controls */}
                <div className="h-12 bg-neutral-950 border-b border-white/10 px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <div className="ml-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-2">
                      <span className="text-emerald-400">https://</span>
                      <span>{projectName.toLowerCase().replace(/\s+/g, "-")}.nova.build</span>
                    </div>
                  </div>

                  {/* Device sizing buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDeviceMode("desktop")}
                      className={`p-1.5 rounded-lg transition-colors ${
                        deviceMode === "desktop" ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                      title="Desktop view"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeviceMode("tablet")}
                      className={`p-1.5 rounded-lg transition-colors ${
                        deviceMode === "tablet" ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                      title="Tablet view"
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeviceMode("mobile")}
                      className={`p-1.5 rounded-lg transition-colors ${
                        deviceMode === "mobile" ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rendered Live Preview Frame */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-black/40">
                  <div
                    className={`h-full transition-all duration-300 rounded-2xl bg-white text-neutral-900 shadow-2xl overflow-y-auto p-6 sm:p-8 ${
                      deviceMode === "mobile"
                        ? "w-[375px]"
                        : deviceMode === "tablet"
                        ? "w-[768px]"
                        : "w-full max-w-5xl"
                    }`}
                  >
                    {/* Live interactive app demo inside preview */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                            N
                          </div>
                          <span className="font-bold text-sm tracking-tight">{projectName}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          Hot Reloaded
                        </span>
                      </div>

                      <div className="py-6 text-center space-y-3">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          Neural App Generated
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                          {projectName}
                        </h2>
                        <p className="text-sm text-neutral-500 max-w-md mx-auto">
                          Built with Next.js 16, Tailwind CSS, and NOVA Autonomous Developer engine.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50 space-y-1">
                          <span className="text-xs text-neutral-400 font-mono">Response Speed</span>
                          <div className="text-xl font-bold text-neutral-900">12ms</div>
                        </div>
                        <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50 space-y-1">
                          <span className="text-xs text-neutral-400 font-mono">Self-Healing</span>
                          <div className="text-xl font-bold text-emerald-600">Active (0 errors)</div>
                        </div>
                        <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50 space-y-1">
                          <span className="text-xs text-neutral-400 font-mono">Deployment</span>
                          <div className="text-xl font-bold text-blue-600">Global Edge</div>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-neutral-900 text-white flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">Deploy to Production</h4>
                          <p className="text-xs text-zinc-400">One-click deployment to Vercel or AWS.</p>
                        </div>
                        <button
                          onClick={() => alert("Deployed to production endpoint!")}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                        >
                          Ship Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={buyCreditsOpen}
        onClose={() => setBuyCreditsOpen(false)}
        onAddCredits={(amount) => setCredits((c) => c + amount)}
      />
    </div>
  );
}
