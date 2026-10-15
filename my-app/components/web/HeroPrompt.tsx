"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  ChevronDown,
  Wand2,
  Send,
  FileCode,
  Globe,
  BarChart3,
  FileText,
  X,
} from "lucide-react";

interface HeroPromptProps {
  userName?: string;
  onTriggerBuild: (prompt: string, model: string, files: File[]) => void;
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

export default function HeroPrompt({
  userName = "Ankit-singh-dot",
  onTriggerBuild,
}: HeroPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <section
      id="creator-section"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center"
    >
      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 shadow-2xs mb-5">
        <span className="font-mono text-xs text-blue-600 font-bold">&gt;_</span>
        <span className="text-xs font-semibold text-neutral-800">
          Introducing NOVA
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Greeting & Headline */}
      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
        Hi {userName},{" "}
        <span className="font-serif italic font-normal text-neutral-600">
          what will you build today?
        </span>
      </h2>
      <p className="text-sm sm:text-base text-neutral-500 font-normal max-w-md mx-auto mb-8 leading-relaxed">
        Create stunning apps &amp; websites by chatting with AI.
      </p>

      {/* Interactive Command / Prompt Container (Screenshot 2 Match) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl sm:rounded-3xl border transition-all duration-200 text-left ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10"
            : "border-neutral-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-neutral-300 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
        }`}
      >
        {/* Attached files chips */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-0">
            {attachedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-xs text-neutral-800 border border-neutral-200"
              >
                <FileCode className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate max-w-[120px] font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Area */}
        <div className="p-4 sm:p-5 pb-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Tell Nova what you want to make — like you'd tell a person."
            className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-sm sm:text-base resize-none focus:outline-none leading-relaxed font-sans"
          />
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />

        {/* Inner Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 pb-3.5 pt-2 border-t border-neutral-100">
          {/* Left tools: Attachment, Model Selector, Credits */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach files or documentation"
              className="w-7 h-7 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-xs text-neutral-800 transition-all font-medium cursor-pointer"
              >
                <span>{selectedModel.name}</span>
                <span className="text-[10px] text-neutral-500 bg-neutral-200/60 px-1.5 py-0.5 rounded font-mono">
                  {selectedModel.badge}
                </span>
                <span className="text-blue-600 font-mono text-[11px] font-semibold">
                  {selectedModel.multiplier}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
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

            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
              {selectedModel.cost}
            </span>
          </div>

          {/* Right tools: Enhance & Build Now */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEnhance}
              disabled={isEnhancing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? "animate-spin" : ""}`} />
              <span>{isEnhancing ? "Enhancing..." : "Enhance"}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Build now</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper text row */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2.5 px-3 font-mono">
        <span>Enter to send · Shift + Enter for a new line</span>
        <span className="hidden sm:inline">Drop files here</span>
      </div>

      {/* Disclaimer */}
      <p className="text-[12px] text-neutral-500 mt-3 max-w-xl mx-auto leading-relaxed">
        Nova is AI and can make mistakes. Please double-check cited sources.{" "}
        <a
          href="https://nova.bridgeye.com/tnc"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-800 transition-colors"
        >
          Terms
        </a>{" "}
        ·{" "}
        <a
          href="https://nova.bridgeye.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-800 transition-colors"
        >
          Privacy
        </a>
      </p>

      {/* Quick Action Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
        {QUICK_ACTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(item.prompt)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-300 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5 text-blue-600" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
