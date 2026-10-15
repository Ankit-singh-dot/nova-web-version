"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Plus,
  Wand2,
  Send,
  FileCode,
  Globe,
  BarChart3,
  FileText,
  X,
} from "lucide-react";
import CreditsDropdown from "./CreditsDropdown";
import BuyCreditsModal from "./BuyCreditsModal";

interface CinematicHeroProps {
  credits: number;
  userName?: string;
  onTriggerBuild: (prompt: string, model: string, files: File[]) => void;
  onOpenStudio?: () => void;
  onAddCredits?: (amount: number) => void;
}

const MODELS = [
  {
    id: "NOVA Gliese 0.6×",
    name: "NOVA Gliese",
    badge: "default",
    multiplier: "0.6×",
    cost: "0.13 credits",
    desc: "Lightning-fast generation for web apps and UI components",
  },
  {
    id: "NOVA Orion 1.0×",
    name: "NOVA Orion",
    badge: "reasoning",
    multiplier: "1.0×",
    cost: "0.25 credits",
    desc: "Deep architectural synthesis & multi-file fullstack apps",
  },
  {
    id: "NOVA Pulsar 1.5×",
    name: "NOVA Pulsar",
    badge: "ultra",
    multiplier: "1.5×",
    cost: "0.40 credits",
    desc: "Autonomous self-healing debugger and test execution",
  },
];

const QUICK_ACTIONS = [
  {
    icon: Globe,
    label: "Build a website",
    prompt:
      "Build a sleek SaaS landing page for an autonomous AI developer with dark glassmorphism, pricing cards, and live code playground",
  },
  {
    icon: BarChart3,
    label: "Analyze data",
    prompt:
      "Create an interactive financial analytics dashboard with realtime line charts, metric cards, and CSV export",
  },
  {
    icon: FileText,
    label: "Make a PPT/PDF",
    prompt:
      "Generate an executive slide presentation about AI terminal workflows with modern slide navigation and PDF export",
  },
];

export default function CinematicHero({
  credits = 40,
  userName = "Ankit-singh-dot",
  onTriggerBuild,
  onOpenStudio,
  onAddCredits,
}: CinematicHeroProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [buyCreditsModal, setBuyCreditsModal] = useState(false);
  const [creditTab, setCreditTab] = useState<"credits" | "upgrade">("credits");

  // Prompt Box States
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateParallax = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.08,
        y: prev.y + (targetMouse.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetMouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTargetMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setTargetMouse({ x: 0, y: 0 });
  };

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

  const handleEnhance = () => {
    if (!prompt.trim()) {
      setPrompt(
        "Build a modern, high-converting web application with responsive layout, fluid micro-interactions, dark glassmorphism design system, and full TypeScript support."
      );
      return;
    }

    setIsEnhancing(true);
    setTimeout(() => {
      setPrompt(
        (prev) =>
          `${prev.trim()} — Architected with modular React components, tailored HSL color palette, smooth Framer Motion animations, comprehensive responsive layouts, and zero-dependency production code.`
      );
      setIsEnhancing(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const finalPrompt =
      prompt.trim() ||
      "Create a modern, stunning web app with live interactive preview";
    onTriggerBuild(finalPrompt, selectedModel.id, attachedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto h-[100dvh] min-h-[560px] max-h-[1020px] p-2 sm:p-3 md:p-4 flex flex-col justify-center overflow-x-hidden">
      {/* ========================================================= */}
      {/* MAIN CINEMATIC WINDOW (Using hero-art-sketch3.png) */}
      {/* ========================================================= */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-black shadow-2xl border border-black/10 flex flex-col justify-between p-3 sm:p-4 md:p-6"
      >
        {/* Background Image: hero-art-sketch3.png with Parallax Multiplane Motion */}
        <div
          className="absolute inset-[-1%] w-[102%] h-[102%] z-0 pointer-events-none transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * -12}px, ${scrollY * 0.12 + mousePos.y * -8}px, 0) scale(1.0)`,
          }}
        >
          <Image
            src="/images/hero-art-sketch3.png"
            alt="NOVA Developer at Glowing Terminal in Field"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
          {/* Subtle cinematic gradient for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65 pointer-events-none" />

          {/* Clean ambient shadow behind prompt box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-black/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ========================================================= */}
        {/* TOP FLOATING NAVBAR */}
        {/* ========================================================= */}
        <div className="relative z-30 flex items-center justify-between w-full pt-0.5 sm:pt-1 px-1 sm:px-2 shrink-0">
          {/* Island 1 (Left): White pill with NOVA logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center group">
              <div className="px-3 sm:px-3.5 py-1.5 rounded-full backdrop-blur-xl border border-neutral-300 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
                <Image
                  src="/images/logo (1).png"
                  alt="NOVA by Bridgeye"
                  width={74}
                  height={22}
                  priority
                  className="h-4.5 sm:h-5 w-auto object-contain"
                  style={{ width: "auto" }}
                />
              </div>
            </Link>
          </div>

          {/* Island 3 (Right): Discord, Theme, Credits Pill, Sign In */}
          <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2.5">
            <div className="flex items-center gap-0.5 p-0.5 rounded-full border border-neutral-300 bg-white/90 backdrop-blur-2xl text-neutral-700 shadow-xs">
              <a
                href="https://discord.gg/rBSWXgAmr"
                target="_blank"
                rel="noopener noreferrer"
                title="Join our Discord community"
                className="p-1 sm:p-1.5 rounded-full transition-all hover:text-neutral-950 hover:bg-neutral-200/80 text-neutral-600"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>

              <button
                onClick={toggleTheme}
                className="p-1 sm:p-1.5 rounded-full transition-all hover:text-neutral-950 hover:bg-neutral-200/80 text-neutral-600 cursor-pointer"
                title="Toggle Theme"
              >
                {isDark ? <Moon className="w-3.5 h-3.5 text-neutral-800" /> : <Sun className="w-3.5 h-3.5 text-neutral-600" />}
              </button>
            </div>

            {/* Credits Pill (Screenshot 1 & 2) */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 sm:py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400 fill-neutral-400" />
                <span className="font-bold text-xs sm:text-sm text-neutral-900">
                  {credits}
                </span>
                <div className="w-4 h-4 rounded-full bg-neutral-900 flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                  A
                </div>
                <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
              </button>

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

            {/* Dashboard Link */}
            <Link
              href="/dashboard"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white/90 backdrop-blur-2xl text-neutral-800 hover:text-black hover:bg-neutral-100 text-xs font-medium transition-all shadow-xs"
              title="Dashboard & Project History"
            >
              <span>Dashboard</span>
            </Link>

            {/* Studio / Sign in Button */}
            <button
              onClick={onOpenStudio}
              className="hidden sm:flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all active:scale-95 shadow-md bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              <span>Workspace</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER STAGE: THE "SOMETHING CRAZY" HERO CREATOR SECTION */}
        {/* Dynamic vertical scaling so it never overflows smaller screens */}
        {/* ========================================================= */}
        <div
          className="relative z-20 my-auto py-1 sm:py-2 md:py-3 text-center max-w-4xl mx-auto w-full transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 14}px, ${scrollY * -0.06 + mousePos.y * 10}px, 0)`,
          }}
        >
          {/* Badge: >_ Introducing NOVA */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg mb-2 sm:mb-3 transition-transform hover:scale-105">
            <span className="font-mono text-xs text-white/90 font-bold">&gt;_</span>
            <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
              Introducing NOVA
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12] drop-shadow-2xl">
            Hi {userName},{" "}
            <span className="font-serif italic font-normal text-white/95">
              what will you build today?
            </span>
          </h1>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-lg mx-auto drop-shadow-lg">
            Create stunning apps &amp; websites by chatting with AI.
          </p>

          {/* ========================================================= */}
          {/* THE FLOATING PROMPT CARD (Screenshot 2 Match with Frosted Glass) */}
          {/* ========================================================= */}
          <div className="mt-3 sm:mt-4 md:mt-5 max-w-3xl mx-auto w-full">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onFocus={() => setIsGlowing(true)}
              onBlur={() => setIsGlowing(false)}
              className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-[0_20px_70px_rgba(0,0,0,0.5)] text-left ${
                isDragging
                  ? "border-neutral-400 bg-white shadow-2xl"
                  : "border-white/50 bg-white/95 backdrop-blur-3xl hover:border-white/70 focus-within:ring-2 focus-within:ring-black/15"
              }`}
            >
              {/* Attached file chips */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2.5 pb-0">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-xs text-neutral-800 border border-neutral-200"
                    >
                      <FileCode className="w-3 h-3 text-blue-600" />
                      <span className="truncate max-w-[120px] font-medium">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-neutral-400 hover:text-neutral-700"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <div className="p-3 sm:p-4 pb-1 sm:pb-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Tell Nova what you want to make — like you'd tell a person."
                  className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm md:text-base resize-none focus:outline-none leading-relaxed font-sans"
                />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
              />

              {/* Inner Toolbar */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 border-t border-neutral-100">
                {/* Left tools: + Button, Model Pill, Credits */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach files or design tokens"
                    className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-3 h-3" />
                  </button>

                  {/* Model Selector Pill */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-[11px] sm:text-xs text-neutral-800 transition-all font-medium cursor-pointer"
                    >
                      <span className="truncate max-w-[85px] sm:max-w-none">{selectedModel.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-500 bg-neutral-200/60 px-1 py-0.2 rounded font-mono hidden sm:inline">
                        {selectedModel.badge}
                      </span>
                      <span className="text-blue-600 font-mono text-[10px] sm:text-[11px] font-semibold">
                        {selectedModel.multiplier}
                      </span>
                      <ChevronDown className="w-2.5 h-2.5 text-neutral-400 shrink-0" />
                    </button>

                    {modelDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setModelDropdownOpen(false)}
                        />
                        <div className="absolute left-0 bottom-full mb-2 w-72 rounded-2xl bg-white border border-neutral-200 p-2 shadow-2xl z-40 text-left text-neutral-900">
                          <div className="px-3 py-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                            Select Neural Model
                          </div>
                          {MODELS.map((model) => (
                            <button
                              key={model.id}
                              type="button"
                              onClick={() => {
                                setSelectedModel(model);
                                setModelDropdownOpen(false);
                              }}
                              className={`w-full text-left p-2.5 rounded-xl transition-colors mb-1 cursor-pointer ${
                                selectedModel.id === model.id
                                  ? "bg-blue-50 border border-blue-200 text-blue-900 font-medium"
                                  : "hover:bg-neutral-50 text-neutral-700"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs">
                                  {model.name}
                                </span>
                                <span className="text-[10px] font-mono text-blue-600 font-bold">
                                  {model.multiplier}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                                {model.desc}
                              </p>
                              <div className="mt-1 text-[10px] font-mono text-neutral-400">
                                {model.cost}
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <span className="text-[11px] sm:text-xs text-neutral-400 font-mono hidden md:inline">
                    {selectedModel.cost}
                  </span>
                </div>

                {/* Right tools: Enhance & Build Now */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Wand2 className={`w-3 h-3 ${isEnhancing ? "animate-spin" : ""}`} />
                    <span>{isEnhancing ? "Enhancing..." : "Enhance"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold bg-[#1d1d1f] hover:bg-black text-white shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Build now</span>
                    <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Helper notes row */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/85 mt-1.5 sm:mt-2 px-2 sm:px-3 font-mono drop-shadow">
              <span>Enter to send · Shift + Enter for a new line</span>
              <span className="hidden sm:inline">Drop files here</span>
            </div>

            {/* Disclaimer row */}
            <p className="text-[10px] sm:text-[11px] text-white/75 mt-1 sm:mt-1.5 text-center drop-shadow">
              Nova is AI and can make mistakes. Please double-check cited sources.{" "}
              <a
                href="https://nova.bridgeye.com/tnc"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Terms
              </a>{" "}
              ·{" "}
              <a
                href="https://nova.bridgeye.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Privacy
              </a>
            </p>
          </div>

          {/* Quick Action Floating Suggestion Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-2.5 sm:mt-4 md:mt-5">
            {QUICK_ACTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(item.prompt)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-[11px] sm:text-xs font-semibold text-white shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM ACCENT: QUICK SECTION JUMP */}
        {/* ========================================================= */}
        <div className="relative z-10 w-full flex items-center justify-center sm:justify-end pt-1.5 sm:pt-2 border-t border-white/10 text-[11px] sm:text-xs text-white/70 shrink-0 font-medium">
          <a
            href="#templates-section"
            className="text-white hover:underline flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Templates</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={buyCreditsModal}
        onClose={() => setBuyCreditsModal(false)}
        onAddCredits={(amount) => {
          onAddCredits?.(amount);
        }}
        initialTab={creditTab}
      />
    </div>
  );
}
