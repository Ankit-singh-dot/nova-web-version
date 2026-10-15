"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Layout,
  History,
  Code2,
  Globe,
  ChevronDown,
  Wand2,
  Send,
  X,
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  Copy,
  Check,
  FileCode,
  FolderGit2,
  Clock,
  ExternalLink,
  ChevronRight,
  Search,
} from "lucide-react";
import CreditsDropdown from "./CreditsDropdown";
import BuyCreditsModal from "./BuyCreditsModal";
import { ProjectData } from "@/types/project";
import { INITIAL_PROJECTS_DATA } from "@/data/initialProjects";

interface LiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects?: ProjectData[];
  activeProjectId?: string;
  onSelectProject?: (id: string) => void;
  onCreateProject?: (prompt?: string, title?: string) => void;
  onUpdateProject?: (id: string, updated: Partial<ProjectData>) => void;
  initialPrompt?: string;
  initialModel?: string;
  templateTitle?: string;
}

export default function LiveStudioModal({
  isOpen,
  onClose,
  projects = INITIAL_PROJECTS_DATA,
  activeProjectId = "core-collective",
  onSelectProject,
  onCreateProject,
  onUpdateProject,
  initialPrompt = "",
  initialModel = "NOVA Gliese 0.6×",
  templateTitle = "Core Collective",
}: LiveStudioModalProps) {
  // Local active project ID to allow immediate UI switching
  const [localProjectId, setLocalProjectId] = useState(activeProjectId);

  useEffect(() => {
    setLocalProjectId(activeProjectId);
  }, [activeProjectId]);

  const activeId = localProjectId || activeProjectId;
  const currentProject =
    projects.find((p) => p.id === activeId) ||
    projects.find((p) => p.id === activeProjectId) ||
    projects[0] ||
    INITIAL_PROJECTS_DATA[0];

  const handleSelectProject = (id: string) => {
    setLocalProjectId(id);
    onSelectProject?.(id);
    setHistoryDrawerOpen(false);
  };

  // Prevent background scrolling when modal is open + pause Lenis smooth scroll
  useEffect(() => {
    if (!isOpen) return;

    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyPosition = document.body.style.position;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const win = window as unknown as {
      lenis?: { stop: () => void; start: () => void };
    };
    if (win.lenis?.stop) {
      win.lenis.stop();
    }

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.position = origBodyPosition;
      if (win.lenis?.start) {
        win.lenis.start();
      }
    };
  }, [isOpen]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("NOVA Gliese");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "split" | "preview">("split");
  const [credits, setCredits] = useState(40);
  const [creditsDropdownOpen, setCreditsDropdownOpen] = useState(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
  const [activeCodeFile, setActiveCodeFile] = useState("app/page.tsx");
  const [isReloading, setIsReloading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [historySearch, setHistorySearch] = useState("");

  // Interactive Live App State
  const [interactiveTab, setInteractiveTab] = useState<"saas" | "fintech" | "studio">("saas");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [demoCounter, setDemoCounter] = useState(1420);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentProject?.messages, isBuilding]);

  // Set active file when project changes
  useEffect(() => {
    if (currentProject?.files?.[0]) {
      setActiveCodeFile(currentProject.files[0].name);
    }
  }, [currentProject?.id]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt.trim();
    setInputPrompt("");

    const newMsg = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...(currentProject.messages || []), newMsg];
    onUpdateProject?.(currentProject.id, {
      messages: updatedMessages,
      lastMessage: userText,
      timestamp: "Just now",
    });

    setIsBuilding(true);
    setCredits((prev) => Math.max(0, Number((prev - 0.13).toFixed(2))));

    // Simulate AI synthesis & hot-reload
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: "nova" as const,
        text: `Updated "${currentProject.title}" according to: "${userText}". Hot-reloaded new components directly into the canvas.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        files: [
          { name: "app/page.tsx", lines: 156 },
          { name: "components/LiveView.tsx", lines: 88 },
        ],
      };

      const finalMessages = [...updatedMessages, aiReply];
      onUpdateProject?.(currentProject.id, {
        messages: finalMessages,
      });

      setIsBuilding(false);
      setActiveView("split");
    }, 1000);
  };

  const handleEnhance = () => {
    if (!inputPrompt.trim()) {
      setInputPrompt("Add interactive filter tabs, a live search input, and responsive grid animations");
      return;
    }
    setIsEnhancing(true);
    setTimeout(() => {
      setInputPrompt(
        (prev) => `${prev.trim()} — with responsive Tailwind classes, dark glassmorphism, Framer Motion transitions, and TypeScript types.`
      );
      setIsEnhancing(false);
    }, 400);
  };

  const handleReloadPreview = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 600);
  };

  const handleCopyCode = () => {
    const fileObj = currentProject.files?.find((f) => f.name === activeCodeFile);
    const codeToCopy = fileObj?.code || currentProject.files?.[0]?.code || "// No code available";
    navigator.clipboard.writeText(codeToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeCodeContent =
    currentProject.files?.find((f) => f.name === activeCodeFile)?.code ||
    currentProject.files?.[0]?.code ||
    "// Select a file to inspect code";

  const codeLines = (activeCodeContent || "").split("\n");

  const filteredHistoryProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(historySearch.toLowerCase()) ||
    p.lastMessage.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden animate-in fade-in select-none"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{ overscrollBehavior: "contain" }}
    >
      <div
        data-lenis-prevent
        className="relative w-full h-full md:w-[98vw] md:h-[96vh] md:rounded-3xl bg-[#fbfbfb] text-neutral-900 flex overflow-hidden shadow-2xl border border-neutral-200/90"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: "contain" }}
      >
        {/* ========================================================= */}
        {/* LEFT DOCK BAR (Linear / VS Code Style) */}
        {/* ========================================================= */}
        <aside className="w-14 sm:w-16 bg-white border-r border-neutral-200/80 flex flex-col items-center justify-between py-3.5 shrink-0 z-30">
          {/* Top Icons */}
          <div className="flex flex-col items-center gap-3.5 w-full">
            {/* NOVA Circular Ring Logo */}
            <button
              onClick={() => setActiveView("split")}
              className="relative w-8 h-8 rounded-full overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              title="NOVA Studio"
            >
              <Image
                src="/images/logo-ring.png"
                alt="NOVA Ring"
                fill
                className="object-contain"
              />
            </button>

            {/* + New Project / Workspace */}
            <button
              onClick={() => {
                onCreateProject?.();
                setHistoryDrawerOpen(false);
              }}
              className="w-9 h-9 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
              title="New Project"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* View Layout Toggle */}
            <button
              onClick={() =>
                setActiveView(activeView === "chat" ? "split" : activeView === "split" ? "preview" : "chat")
              }
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeView === "split"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="Toggle Layout (Chat / Split / Preview)"
            >
              <Layout className="w-4 h-4" />
            </button>

            {/* History Button (Now Fully Functional!) */}
            <button
              onClick={() => setHistoryDrawerOpen(!historyDrawerOpen)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                historyDrawerOpen
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="Project History Drawer"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Code View Toggle */}
            <button
              onClick={() => {
                setActiveView("split");
                setPreviewTab(previewTab === "code" ? "preview" : "code");
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                previewTab === "code"
                  ? "bg-neutral-100 text-neutral-900 border border-neutral-200/80"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="Inspect Code"
            >
              <Code2 className="w-4 h-4" />
            </button>

            {/* Globe View Toggle */}
            <button
              onClick={() => setActiveView("preview")}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeView === "preview"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
              title="Full Preview"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Icons (User Avatar, Exit) */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* User Avatar with Green Presence Dot */}
            <div className="relative">
              <button
                onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-neutral-400 transition-all cursor-pointer"
                title="Account Settings"
              >
                A
              </button>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            {/* Close Studio Modal */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer"
              title="Exit Studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* SLIDE-OUT PROJECT HISTORY DRAWER (CONNECTED & FUNCTIONAL) */}
        {/* ========================================================= */}
        {historyDrawerOpen && (
          <div className="w-64 sm:w-72 bg-white border-r border-neutral-200/80 flex flex-col h-full shrink-0 z-20 animate-in slide-in-from-left-4 duration-200">
            {/* Drawer Header */}
            <div className="p-3.5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span className="font-semibold text-xs text-neutral-900">Project History</span>
              </div>
              <button
                onClick={() => setHistoryDrawerOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Filter Search */}
            <div className="p-2.5 border-b border-neutral-100">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200/70 text-xs text-neutral-600">
                <Search className="w-3 h-3 text-neutral-400" />
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Filter architectures..."
                  className="w-full bg-transparent text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Projects List */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-2 space-y-1 overscroll-contain"
              style={{ overscrollBehavior: "contain" }}
            >
              {filteredHistoryProjects.map((p) => {
                const isActive = p.id === currentProject.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProject(p.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                      isActive
                        ? "bg-neutral-100 border-neutral-300 shadow-2xs"
                        : "border-transparent hover:bg-neutral-50 hover:border-neutral-200/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />}
                        <span className={`text-xs truncate ${isActive ? "text-neutral-950 font-bold" : "text-neutral-700 font-semibold"}`}>
                          {p.title}
                        </span>
                      </div>
                      {p.status === "live" ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Live Deployment" />
                      ) : (
                        <span className="text-[9px] font-mono text-neutral-400 uppercase">draft</span>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-500 line-clamp-1 leading-snug">
                      {p.lastMessage}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
                      <span>{p.category}</span>
                      <span>{p.timestamp}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom New Project Trigger */}
            <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
              <button
                onClick={() => {
                  onCreateProject?.();
                  setHistoryDrawerOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-medium transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start New Project</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN WORKSPACE BODY */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          {/* Top Header Bar */}
          <header className="h-13 border-b border-neutral-200/80 bg-white px-5 flex items-center justify-between shrink-0 z-10">
            {/* Left: Project title & layout pills */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-neutral-100 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[180px]">{currentProject.title}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {projectDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProjectDropdownOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-white border border-neutral-200 shadow-xl p-1.5 z-40 text-xs">
                      <div className="px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase">
                        Switch Architecture
                      </div>
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleSelectProject(p.id);
                            setProjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium text-neutral-800 flex items-center justify-between transition-colors cursor-pointer ${
                            p.id === currentProject.id ? "bg-neutral-100 font-semibold" : "hover:bg-neutral-50"
                          }`}
                        >
                          <span className="truncate">{p.title}</span>
                          {p.id === currentProject.id && <Check className="w-3 h-3 text-neutral-600 shrink-0" />}
                        </button>
                      ))}
                      <div className="border-t border-neutral-100 my-1" />
                      <button
                        onClick={() => {
                          onCreateProject?.();
                          setProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-neutral-900 font-medium hover:bg-neutral-50 flex items-center gap-1.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Start New Project</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* View switch pills: Chat | Split | Preview */}
              <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg bg-neutral-100 text-[11px]">
                <button
                  onClick={() => setActiveView("chat")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeView === "chat"
                      ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveView("split")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeView === "split"
                      ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setActiveView("preview")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeView === "preview"
                      ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* Right: Credits pill & Close button */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <span className="font-mono font-semibold text-neutral-900 text-xs">
                    {credits}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-neutral-900 text-white font-bold text-[9px] flex items-center justify-center">
                    A
                  </div>
                  <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
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

              <button
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Close Studio"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Workspace Body: Left Chat + Right Live Canvas */}
          <div className="flex-1 flex overflow-hidden">
            {/* ========================================================= */}
            {/* LEFT CHAT PANE */}
            {/* ========================================================= */}
            <div
              className={`flex flex-col h-full bg-[#fafafa] border-r border-neutral-200/80 ${
                activeView === "chat"
                  ? "w-full"
                  : activeView === "split"
                  ? "w-full lg:w-[420px] xl:w-[460px] shrink-0"
                  : "hidden"
              }`}
            >
              {/* Messages list */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain"
                style={{ overscrollBehavior: "contain" }}
              >
                {(currentProject.messages || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.sender === "nova" && (
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        <span className="text-[11px] font-semibold tracking-wider text-neutral-600 uppercase font-mono">
                          NOVA
                        </span>
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-neutral-100 text-neutral-900 border border-neutral-200/80 rounded-br-xs"
                          : "bg-white text-neutral-800 border border-neutral-200/80 shadow-xs rounded-bl-xs space-y-3"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* File Modification Chips */}
                      {msg.files && msg.files.length > 0 && (
                        <div className="pt-2 border-t border-neutral-100 space-y-1">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                            Generated Components
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.files.map((file, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setActiveCodeFile(file.name);
                                  setPreviewTab("code");
                                  setActiveView("split");
                                }}
                                className="flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-[11px] font-mono text-neutral-700 transition-colors cursor-pointer"
                              >
                                <FileCode className="w-3 h-3 text-neutral-400" />
                                <span>{file.name}</span>
                                <span className="text-[9px] text-neutral-400">+{file.lines}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <span className="text-[9.5px] font-mono text-neutral-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isBuilding && (
                  <div className="flex flex-col items-start space-y-1.5">
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                      <span className="text-[11px] font-semibold tracking-wider text-neutral-600 uppercase font-mono">
                        NOVA
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-600 font-mono flex items-center gap-2.5 shadow-2xs">
                      <div className="w-3.5 h-3.5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing components &amp; hot-reloading canvas...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Bottom Prompt Card: Obsidian Clean */}
              <div className="p-3 sm:p-4 pt-1 shrink-0 bg-[#fafafa]">
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-3 text-left focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-200 transition-all">
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
                    placeholder={`Describe changes to ${currentProject.title}...`}
                    className="w-full bg-transparent text-xs sm:text-[13px] text-neutral-900 placeholder-neutral-400 resize-none focus:outline-none leading-relaxed"
                  />

                  {/* Toolbar */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-neutral-200 text-[11px] font-mono bg-neutral-50 text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                        >
                          <span className="font-semibold">{selectedModel}</span>
                          <span className="text-[9.5px] text-neutral-400">0.6×</span>
                          <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                        </button>

                        {modelDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setModelDropdownOpen(false)}
                            />
                            <div className="absolute left-0 bottom-full mb-1 w-56 rounded-xl bg-white border border-neutral-200 p-1.5 shadow-lg z-40 text-xs">
                              <button
                                onClick={() => {
                                  setSelectedModel("NOVA Gliese");
                                  setModelDropdownOpen(false);
                                }}
                                className="w-full text-left p-1.5 rounded-md hover:bg-neutral-50 font-medium"
                              >
                                NOVA Gliese 0.6× (Default)
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedModel("NOVA Orion");
                                  setModelDropdownOpen(false);
                                }}
                                className="w-full text-left p-1.5 rounded-md hover:bg-neutral-50 font-medium"
                              >
                                NOVA Orion 1.0× (Reasoning)
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                        0.13 credits
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleEnhance}
                        disabled={isEnhancing}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg font-medium transition-colors cursor-pointer"
                      >
                        <Wand2 className={`w-3 h-3 ${isEnhancing ? "animate-spin" : ""}`} />
                        <span>Enhance</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendMessage}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        <span>Build</span>
                        <Send className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-1.5 px-1">
                  <span>Enter to send · Shift + Enter for new line</span>
                  <span>Nova Studio v0.8.4</span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT PANE: REAL, INTERACTIVE WEB APPLICATION CANVAS */}
            {/* Distinct per project: Agency, SaaS, Fintech, Minimal */}
            {/* ========================================================= */}
            {(activeView === "split" || activeView === "preview") && (
              <div
                className={`flex-1 flex flex-col bg-[#0e0e11] overflow-hidden ${
                  activeView === "preview" ? "w-full" : "hidden lg:flex"
                }`}
              >
                {/* Simulated Browser URL bar & DevTools header */}
                <div className="h-11 bg-[#141418] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0">
                  {/* Traffic lights & URL bar */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <button
                      onClick={handleReloadPreview}
                      className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                      title="Hot reload preview"
                    >
                      <RotateCw className={`w-3 h-3 ${isReloading ? "animate-spin text-white" : ""}`} />
                    </button>

                    <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-1.5 max-w-[280px] truncate">
                      <span className="text-emerald-400 text-[10px]">https://</span>
                      <span className="truncate">{currentProject.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.nova.build</span>
                    </div>
                  </div>

                  {/* Canvas View Switcher (Preview vs Code) & Device Modes */}
                  <div className="flex items-center gap-3">
                    {/* Preview / Code Tab Toggle */}
                    <div className="flex items-center p-0.5 rounded-lg bg-white/10 text-xs font-mono">
                      <button
                        onClick={() => setPreviewTab("preview")}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                          previewTab === "preview"
                            ? "bg-white text-black font-semibold shadow-xs"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setPreviewTab("code")}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                          previewTab === "code"
                            ? "bg-white text-black font-semibold shadow-xs"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Code
                      </button>
                    </div>

                    {/* Device Viewport Switcher */}
                    <div className="flex items-center gap-0.5 border-l border-white/10 pl-3">
                      <button
                        onClick={() => setDeviceMode("desktop")}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          deviceMode === "desktop" ? "bg-white/15 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Desktop view (100%)"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeviceMode("tablet")}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          deviceMode === "tablet" ? "bg-white/15 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Tablet view (768px)"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeviceMode("mobile")}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          deviceMode === "mobile" ? "bg-white/15 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Mobile view (375px)"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Canvas Body: Live Application vs Syntax Code Editor */}
                <div
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-start justify-center bg-[#09090b] overscroll-contain"
                  style={{ overscrollBehavior: "contain" }}
                >
                  {previewTab === "preview" ? (
                    /* ========================================================= */
                    /* THE LIVE, RESPONSIVE, INTERACTIVE APPLICATION */
                    /* ========================================================= */
                    <div
                      className={`min-h-full transition-all duration-300 rounded-2xl bg-[#0d0d11] text-white shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
                        deviceMode === "mobile"
                          ? "w-[375px] max-w-[375px]"
                          : deviceMode === "tablet"
                          ? "w-[768px] max-w-[768px]"
                          : "w-full max-w-5xl"
                      }`}
                    >
                      {/* App Header */}
                      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0d0d11]/80 backdrop-blur-md">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-white text-black font-mono font-bold text-xs flex items-center justify-center">
                            {currentProject.title.charAt(0)}
                          </div>
                          <span className="font-semibold text-xs tracking-wider uppercase font-mono">
                            {currentProject.title}
                          </span>
                        </div>

                        <nav className="hidden sm:flex items-center gap-5 text-xs text-neutral-400">
                          <button className="text-white hover:text-white transition-colors cursor-pointer">
                            Overview
                          </button>
                          <button className="hover:text-white transition-colors cursor-pointer">
                            Showcase
                          </button>
                          <button className="hover:text-white transition-colors cursor-pointer">
                            Pricing
                          </button>
                          <button className="hover:text-white transition-colors cursor-pointer">
                            Docs
                          </button>
                        </nav>

                        <button className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer">
                          Get Started
                        </button>
                      </header>

                      {/* App Hero */}
                      <div className="p-6 sm:p-10 text-center space-y-4 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{currentProject.category} · Live Canvas</span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight leading-tight">
                          {currentProject.previewType === "saas"
                            ? "Autonomous Developer Intelligence for Cloud Platforms"
                            : currentProject.previewType === "fintech"
                            ? "Decentralized Telemetry & Institutional Asset Vault"
                            : currentProject.previewType === "minimal"
                            ? "An architectural study in silence and earth tones"
                            : "Architecting next-generation digital platforms"}
                        </h2>

                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
                          {currentProject.lastMessage}
                        </p>

                        <div className="pt-2 flex items-center justify-center gap-3">
                          <button
                            onClick={() => setDemoCounter((c) => c + 1)}
                            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer shadow-md"
                          >
                            Live Interactions ({demoCounter})
                          </button>

                          <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-all active:scale-95 cursor-pointer">
                            View Case Studies
                          </button>
                        </div>
                      </div>

                      {/* Interactive Tabs Showcase */}
                      <div className="p-6 sm:p-8 pt-0 max-w-3xl mx-auto w-full space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-1.5 text-xs font-mono">
                            <button
                              onClick={() => setInteractiveTab("saas")}
                              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                                interactiveTab === "saas"
                                  ? "bg-white text-black font-semibold"
                                  : "text-neutral-400 hover:text-white"
                              }`}
                            >
                              SaaS Telemetry
                            </button>
                            <button
                              onClick={() => setInteractiveTab("fintech")}
                              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                                interactiveTab === "fintech"
                                  ? "bg-white text-black font-semibold"
                                  : "text-neutral-400 hover:text-white"
                              }`}
                            >
                              Asset Vault
                            </button>
                            <button
                              onClick={() => setInteractiveTab("studio")}
                              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                                interactiveTab === "studio"
                                  ? "bg-white text-black font-semibold"
                                  : "text-neutral-400 hover:text-white"
                              }`}
                            >
                              Design Tokens
                            </button>
                          </div>

                          <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                            Live Component State
                          </span>
                        </div>

                        {/* Tab Content 1: SaaS Telemetry */}
                        {interactiveTab === "saas" && (
                          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">Global Throughput</span>
                              <div className="text-xl font-bold font-mono text-white">48,210 req/s</div>
                              <span className="text-[10px] text-emerald-400">+18.4% this week</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">P99 Edge Latency</span>
                              <div className="text-xl font-bold font-mono text-white">14.2 ms</div>
                              <span className="text-[10px] text-emerald-400">Optimal globally</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">System Availability</span>
                              <div className="text-xl font-bold font-mono text-emerald-400">99.99%</div>
                              <span className="text-[10px] text-neutral-400">Zero active alerts</span>
                            </div>
                          </div>
                        )}

                        {/* Tab Content 2: Asset Vault */}
                        {interactiveTab === "fintech" && (
                          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">Treasury Total</span>
                              <div className="text-xl font-bold font-mono text-white">$4,850,200</div>
                              <span className="text-[10px] text-neutral-400">Audited cold storage</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">Daily Volume</span>
                              <div className="text-xl font-bold font-mono text-white">$312,400</div>
                              <span className="text-[10px] text-emerald-400">+4.2% today</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-neutral-500">Active Nodes</span>
                              <div className="text-xl font-bold font-mono text-white">128 validator</div>
                              <span className="text-[10px] text-emerald-400">Consensus verified</span>
                            </div>
                          </div>
                        )}

                        {/* Tab Content 3: Design Tokens */}
                        {interactiveTab === "studio" && (
                          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 animate-in fade-in">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-neutral-400">Design System Palette</span>
                              <span className="text-neutral-500">Inter &amp; Newsreader</span>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                              <div className="h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[10px] font-mono text-neutral-400">#0d0d11</div>
                              <div className="h-10 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center text-[10px] font-mono text-neutral-400">#262626</div>
                              <div className="h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-[10px] font-mono text-white">#059669</div>
                              <div className="h-10 rounded-lg bg-teal-500 flex items-center justify-center text-[10px] font-mono text-black font-semibold">#14b8a6</div>
                              <div className="h-10 rounded-lg bg-white flex items-center justify-center text-[10px] font-mono text-black font-semibold">#ffffff</div>
                              <div className="h-10 rounded-lg bg-neutral-500 flex items-center justify-center text-[10px] font-mono text-white">#737373</div>
                            </div>
                          </div>
                        )}

                        {/* Interactive Pricing Toggle Card */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                              <h4 className="font-semibold text-sm text-white">{currentProject.title} Production License</h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Save 20%
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400">Full source code, unlimited seat licenses, and automated edge deployments.</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right font-mono">
                              <div className="text-xl font-bold text-white">
                                {billingPeriod === "monthly" ? "$4,500" : "$3,600"}
                                <span className="text-xs font-normal text-neutral-400">/mo</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                              className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                            >
                              {billingPeriod === "monthly" ? "Switch Annual" : "Switch Monthly"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ========================================================= */
                    /* REAL SYNTAX-HIGHLIGHTED CODE INSPECTOR */
                    /* ========================================================= */
                    <div className="w-full max-w-4xl h-full rounded-2xl bg-[#0d0d11] border border-white/10 overflow-hidden flex flex-col font-mono text-xs shadow-2xl">
                      {/* Code File Tabs */}
                      <div className="h-10 bg-[#141418] border-b border-white/10 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {(currentProject.files || []).map((file) => (
                            <button
                              key={file.name}
                              onClick={() => setActiveCodeFile(file.name)}
                              className={`px-3 py-1.5 rounded-md text-[11px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                                activeCodeFile === file.name
                                  ? "bg-white/10 text-white font-medium"
                                  : "text-neutral-400 hover:text-white"
                              }`}
                            >
                              <FileCode className="w-3 h-3 text-neutral-400" />
                              <span>{file.name}</span>
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors text-[11px] cursor-pointer"
                        >
                          {copiedCode ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Copied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="w-3 h-3" /> Copy
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Syntax Code Body with Dynamic Line Numbers */}
                      <div
                        data-lenis-prevent
                        className="flex-1 overflow-y-auto p-4 flex gap-4 text-[12px] leading-relaxed overscroll-contain"
                        style={{ overscrollBehavior: "contain" }}
                      >
                        <div className="select-none text-neutral-600 text-right font-mono space-y-0.5 shrink-0">
                          {codeLines.map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                        <pre className="text-neutral-300 font-mono overflow-x-auto whitespace-pre flex-1">
                          {activeCodeContent}
                        </pre>
                      </div>
                    </div>
                  )}
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
