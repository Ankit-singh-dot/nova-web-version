"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Globe,
  FolderGit2,
  Activity,
  Layers,
  Wand2,
  CopyPlus,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import CreditsDropdown from "@/components/web/CreditsDropdown";
import BuyCreditsModal from "@/components/web/BuyCreditsModal";
import LiveStudioModal from "@/components/web/LiveStudioModal";
import SmoothScroll from "@/components/web/SmoothScroll";
import { ProjectData } from "@/types/project";
import { INITIAL_PROJECTS_DATA } from "@/data/initialProjects";

const MODELS = [
  { id: "NOVA Gliese 0.6×", name: "NOVA Gliese", cost: "0.13 credits" },
  { id: "NOVA Orion 1.0×", name: "NOVA Orion", cost: "0.25 credits" },
  { id: "NOVA Pulsar 1.5×", name: "NOVA Pulsar", cost: "0.40 credits" },
];

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS_DATA);
  const [activeProjectId, setActiveProjectId] = useState<string>("core-collective");
  const [studioOpen, setStudioOpen] = useState(false);
  const [credits, setCredits] = useState(40);
  const [creditsDropdownOpen, setCreditsDropdownOpen] = useState(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "draft">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"updated" | "name" | "status">("updated");
  const [activeNavTab, setActiveNavTab] = useState<"architectures" | "deployments" | "usage">("architectures");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Prompt Builder in Dashboard
  const [quickPrompt, setQuickPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (statusFilter === "live" && p.status !== "live") return false;
        if (statusFilter === "draft" && p.status !== "draft") return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchMsg = p.lastMessage.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchMsg || matchCategory || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0; // Default order (most recent first)
      });
  }, [projects, statusFilter, searchQuery, sortBy]);

  // Handler to open Studio with project
  const handleOpenStudio = (project: ProjectData) => {
    setActiveProjectId(project.id);
    setStudioOpen(true);
  };

  // Handler to start a fresh blank architecture
  const handleCreateNewBlank = () => {
    const newId = `arch-${Date.now()}`;
    const newProject: ProjectData = {
      id: newId,
      title: "New Architecture",
      category: "Blank Workspace",
      status: "draft",
      timestamp: "Just now",
      lastMessage: "Blank canvas ready for architecture prompt",
      tags: ["Next.js 16", "Tailwind CSS", "TypeScript"],
      url: `https://${newId}.nova.build`,
      previewType: "custom",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "nova",
          text: "Workspace initialized. Ready to synthesize your web application. Describe what you'd like to build below.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      files: [
        {
          name: "app/page.tsx",
          code: `// app/page.tsx - New Architecture\nimport React from 'react';\n\nexport default function Page() {\n  return (\n    <main className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">\n      <h1 className="text-3xl font-serif">Blank Workspace</h1>\n      <p className="text-neutral-400 text-sm mt-2">Enter a prompt in the left chat to synthesize components.</p>\n    </main>\n  );\n}`,
        },
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newId);
    setStudioOpen(true);
  };

  // Handler to synthesize from quick prompt bar
  const handleQuickSynthesize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;

    const trimmed = quickPrompt.trim();
    const title = trimmed.length > 28 ? trimmed.slice(0, 28) + "..." : trimmed;
    const newId = `arch-${Date.now()}`;

    const newProject: ProjectData = {
      id: newId,
      title: title,
      category: "Web Application",
      status: "live",
      timestamp: "Just now",
      lastMessage: trimmed,
      tags: ["Next.js 16", "Tailwind CSS", "TypeScript"],
      url: `https://${newId}.nova.build`,
      previewType: "custom",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: trimmed,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: `msg-${Date.now() + 1}`,
          sender: "nova",
          text: `Synthesized architecture for "${title}". Built responsive layout, modular components, and live interactive state.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          files: [
            { name: "app/page.tsx", lines: 112 },
            { name: "components/HeroSection.tsx", lines: 68 },
          ],
        },
      ],
      files: [
        {
          name: "app/page.tsx",
          code: `// app/page.tsx - ${title}\nimport React from 'react';\nimport HeroSection from '@/components/HeroSection';\n\nexport default function Home() {\n  return (\n    <main className="min-h-screen bg-[#0a0a0d] text-white flex flex-col items-center justify-center p-8">\n      <HeroSection title="${title}" />\n    </main>\n  );\n}`,
        },
        {
          name: "components/HeroSection.tsx",
          code: `// components/HeroSection.tsx\n'use client';\nimport React, { useState } from 'react';\n\nexport default function HeroSection({ title }: { title: string }) {\n  const [clicks, setClicks] = useState(0);\n  return (\n    <div className="max-w-3xl mx-auto text-center space-y-6">\n      <h1 className="text-4xl sm:text-6xl font-serif text-white">{title}</h1>\n      <p className="text-neutral-400 text-sm">Autonomous synthesis live preview</p>\n      <button onClick={() => setClicks(c => c + 1)} className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200">\n        Live Interactions ({clicks})\n      </button>\n    </div>\n  );\n}`,
        },
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newId);
    setCredits((prev) => Math.max(0, Number((prev - 0.13).toFixed(2))));
    setQuickPrompt("");
    setStudioOpen(true);
  };

  // Handler to duplicate architecture
  const handleDuplicateProject = (proj: ProjectData, e: React.MouseEvent) => {
    e.stopPropagation();
    const newId = `${proj.id}-copy-${Date.now().toString().slice(-4)}`;
    const duplicate: ProjectData = {
      ...proj,
      id: newId,
      title: `${proj.title} (Copy)`,
      status: "draft",
      timestamp: "Just now",
      url: `https://${newId}.nova.build`,
    };
    setProjects((prev) => [duplicate, ...prev]);
  };

  // Handler to delete architecture
  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this architecture?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (activeProjectId === id) {
        const remaining = projects.filter((p) => p.id !== id);
        if (remaining.length > 0) setActiveProjectId(remaining[0].id);
      }
    }
  };

  // Handler to copy URL
  const handleCopyUrl = (url: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Update project in state
  const handleUpdateProject = (id: string, updated: Partial<ProjectData>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const liveCount = projects.filter((p) => p.status === "live").length;
  const draftCount = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#1d1d1f] flex flex-col selection:bg-neutral-900 selection:text-white">
      <SmoothScroll />

      {/* ========================================================= */}
      {/* 1. TOP DASHBOARD NAVIGATION BAR */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 px-4 sm:px-8 py-3.5 select-none transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="px-3 py-1.5 rounded-full bg-white border border-neutral-300 shadow-2xs transition-all duration-200 group-hover:scale-105 flex items-center gap-2">
                <Image
                  src="/images/logo (1).png"
                  alt="NOVA"
                  width={72}
                  height={20}
                  priority
                  className="h-4.5 w-auto object-contain"
                />
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-semibold border border-neutral-200/80">
                  Dashboard
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-600">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => setActiveNavTab("architectures")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeNavTab === "architectures"
                    ? "bg-neutral-900 text-white font-semibold"
                    : "hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                Architectures
              </button>
              <button
                onClick={() => setActiveNavTab("deployments")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeNavTab === "deployments"
                    ? "bg-neutral-900 text-white font-semibold"
                    : "hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                Deployments
              </button>
              <button
                onClick={() => setActiveNavTab("usage")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeNavTab === "usage"
                    ? "bg-neutral-900 text-white font-semibold"
                    : "hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                Telemetry &amp; Usage
              </button>
            </nav>
          </div>

          {/* Right: Credits, New Project CTA, Avatar */}
          <div className="flex items-center gap-3">
            {/* Credits Pill */}
            <div className="relative">
              <button
                onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 shadow-2xs transition-all cursor-pointer text-xs"
              >
                <Sparkles className="w-3 h-3 text-neutral-500 fill-neutral-400" />
                <span className="font-bold text-neutral-900 font-mono">{credits}</span>
                <span className="text-[11px] text-neutral-400">credits</span>
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

            {/* Launch Studio CTA */}
            <button
              onClick={handleCreateNewBlank}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Architecture</span>
            </button>

            {/* User Avatar */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-semibold text-xs flex items-center justify-center shadow-2xs">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. DASHBOARD BODY */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* ========================================================= */}
        {/* SECTION A: HERO WELCOME & METRIC STRIP */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                <span>Personal Workspace</span>
                <span>·</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Edge Active
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#1d1d1f] tracking-tight">
                Architectures &amp; Workspaces
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                Synthesize, manage, inspect code, and deploy autonomous web applications.
              </p>
            </div>

            {/* Quick Metrics Strip (Vercel Style) */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-neutral-400 block text-[10px] uppercase">Architectures</span>
                <span className="text-base font-bold text-neutral-900">{projects.length} Total</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-neutral-400 block text-[10px] uppercase">Live Edge</span>
                <span className="text-base font-bold text-emerald-600">{liveCount} Deployed</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200/90 shadow-2xs">
                <span className="text-neutral-400 block text-[10px] uppercase">Daily Allowance</span>
                <span className="text-base font-bold text-neutral-900">{credits}/40 cr</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* QUICK PROMPT SYNTHESIZER BAR */}
          {/* ========================================================= */}
          <form
            onSubmit={handleQuickSynthesize}
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/60 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <Wand2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
                placeholder="Synthesize a new architecture (e.g., 'Modern crypto portfolio with telemetry charts')..."
                className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none py-1.5"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
              {/* Model Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 text-xs font-mono cursor-pointer transition-colors"
                >
                  <span className="font-medium">{selectedModel.name}</span>
                  <span className="text-[10px] text-neutral-400">0.6×</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {modelDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setModelDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-52 rounded-xl bg-white border border-neutral-200 p-1.5 shadow-xl z-40 text-xs">
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setSelectedModel(m);
                            setModelDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg font-medium transition-colors ${
                            selectedModel.id === m.id ? "bg-neutral-100 font-semibold" : "hover:bg-neutral-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{m.name}</span>
                            <span className="text-[10px] font-mono text-neutral-400">{m.cost}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <span>Synthesize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================= */}
        {/* SECTION B: MAIN TAB NAVIGATION & CONTROLS */}
        {/* ========================================================= */}
        {activeNavTab === "architectures" && (
          <section className="space-y-6">
            {/* Filter & View Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Left: Filter Pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 text-xs font-medium text-neutral-600">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-white text-neutral-950 font-semibold shadow-2xs"
                      : "hover:text-neutral-950"
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setStatusFilter("live")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    statusFilter === "live"
                      ? "bg-white text-neutral-950 font-semibold shadow-2xs"
                      : "hover:text-neutral-950"
                  }`}
                >
                  Live ({liveCount})
                </button>
                <button
                  onClick={() => setStatusFilter("draft")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    statusFilter === "draft"
                      ? "bg-white text-neutral-950 font-semibold shadow-2xs"
                      : "hover:text-neutral-950"
                  }`}
                >
                  Drafts ({draftCount})
                </button>
              </div>

              {/* Right: Search, Sort, View Toggle */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Box */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/90 text-xs text-neutral-700 shadow-2xs focus-within:border-neutral-400 transition-colors w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search architectures..."
                    className="w-full bg-transparent text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-neutral-400 hover:text-neutral-700 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "updated" | "name" | "status")}
                  className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200/90 text-xs text-neutral-700 font-medium shadow-2xs cursor-pointer focus:outline-none hover:border-neutral-300"
                >
                  <option value="updated">Sort: Recently Updated</option>
                  <option value="name">Sort: Alphabetical</option>
                  <option value="status">Sort: Status</option>
                </select>

                {/* View Switch: Grid vs List */}
                <div className="flex items-center p-0.5 rounded-xl bg-neutral-100 text-neutral-600">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-neutral-950 shadow-2xs" : "hover:text-neutral-950"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-white text-neutral-950 shadow-2xs" : "hover:text-neutral-950"
                    }`}
                    title="List View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* GRID VIEW */}
            {/* ========================================================= */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Start Fresh Blank Canvas */}
                <div
                  onClick={handleCreateNewBlank}
                  className="group relative rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/70 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-700 group-hover:text-black group-hover:border-neutral-400 transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2 py-0.5 rounded font-medium">
                      Blank Canvas
                    </span>
                  </div>

                  <div className="my-3">
                    <h3 className="text-xl font-serif text-neutral-900 group-hover:text-black transition-colors font-medium">
                      Start Fresh
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1.5 font-normal leading-relaxed">
                      Describe a new website or web application from scratch with autonomous AI synthesis.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-black">
                    <span>Launch Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Dynamic Project Cards */}
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleOpenStudio(proj)}
                    className="group relative rounded-2xl p-6 sm:p-7 border border-neutral-200/90 bg-white hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    {/* Header: Title + Status + Quick Actions */}
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-700 shrink-0">
                            <FolderGit2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base text-neutral-900 group-hover:text-black transition-colors truncate">
                              {proj.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono mt-0.5">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              <span>{proj.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {proj.status === "live" ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60 font-medium shrink-0">
                            Draft
                          </span>
                        )}
                      </div>

                      {/* Prompt Snippet */}
                      <div className="my-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                          &ldquo;{proj.lastMessage}&rdquo;
                        </p>
                      </div>

                      {/* Framework Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Category + Actions */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium text-[11px]">
                        {proj.category}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Copy URL */}
                        <button
                          onClick={(e) => handleCopyUrl(proj.url, proj.id, e)}
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                          title="Copy deployment URL"
                        >
                          {copiedId === proj.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={(e) => handleDuplicateProject(proj, e)}
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                          title="Duplicate Architecture"
                        >
                          <CopyPlus className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={(e) => handleDeleteProject(proj.id, e)}
                          className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                          title="Delete Architecture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Open Studio Link */}
                        <div className="flex items-center gap-1 text-neutral-900 font-semibold group-hover:text-black ml-1">
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ========================================================= */
              /* LIST / TABLE VIEW */
              /* ========================================================= */
              <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200/80 text-[11px] font-mono uppercase text-neutral-500">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Architecture</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Last Synthesis</th>
                      <th className="py-3 px-4 font-semibold">Updated</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredProjects.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => handleOpenStudio(p)}
                        className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-900 group-hover:text-black text-sm">
                            {p.title}
                          </div>
                          <div className="font-mono text-[11px] text-neutral-400">{p.url}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          {p.status === "live" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60 font-medium">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-neutral-600">{p.category}</td>
                        <td className="py-3.5 px-4 text-neutral-500 max-w-xs truncate">
                          &ldquo;{p.lastMessage}&rdquo;
                        </td>
                        <td className="py-3.5 px-4 font-mono text-neutral-400">{p.timestamp}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => handleCopyUrl(p.url, p.id, e)}
                              className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
                              title="Copy URL"
                            >
                              {copiedId === p.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={(e) => handleDuplicateProject(p, e)}
                              className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
                              title="Duplicate"
                            >
                              <CopyPlus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteProject(p.id, e)}
                              className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-neutral-100"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenStudio(p)}
                              className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white font-medium text-[11px] hover:bg-black transition-colors"
                            >
                              Open Studio
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION C: DEPLOYMENTS TAB */}
        {/* ========================================================= */}
        {activeNavTab === "deployments" && (
          <section className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-xl font-serif text-neutral-900">Cloud Edge Deployments</h2>
                <p className="text-xs text-neutral-500">Autonomous DNS routing, SSL certificates, and edge caching.</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                All Systems Operational
              </span>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs divide-y divide-neutral-100">
              {projects.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0 font-bold font-mono text-xs">
                      {p.title.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-900">{p.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                          {p.url.replace("https://", "")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono mt-1">
                        <span>Edge Region: iad1 (Global CDN)</span>
                        <span>·</span>
                        <span>Hot Reload: 210ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <span>Visit Live</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                    <button
                      onClick={() => handleOpenStudio(p)}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Inspect Source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION D: TELEMETRY & USAGE TAB */}
        {/* ========================================================= */}
        {activeNavTab === "usage" && (
          <section className="space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-serif text-neutral-900">Compute &amp; Token Telemetry</h2>
              <p className="text-xs text-neutral-500">Real-time daily usage, credit resets, and synthesis benchmarks.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Daily Allowance</span>
                <div className="text-3xl font-mono font-bold text-neutral-900">39.87 / 40.00</div>
                <p className="text-[11px] text-neutral-500">Resets daily at 00:00 UTC. Next reset in 4h 46m.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Synthesized Lines of Code</span>
                <div className="text-3xl font-mono font-bold text-neutral-900">4,820 LOC</div>
                <p className="text-[11px] text-emerald-600 font-medium">TypeScript + Next.js App Router</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Edge Build Speed</span>
                <div className="text-3xl font-mono font-bold text-neutral-900">240 ms</div>
                <p className="text-[11px] text-neutral-500">Turbopack incremental synthesis active.</p>
              </div>
            </div>

            {/* Recent Telemetry Logs */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-3">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 font-mono">
                Recent Synthesis Activity
              </h3>
              <div className="font-mono text-xs text-neutral-600 space-y-2 divide-y divide-neutral-100">
                <div className="pt-2 flex justify-between">
                  <span>[19:12:04] hot-reload: Core Collective app/page.tsx updated</span>
                  <span className="text-neutral-400">180ms</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>[18:45:10] edge-deploy: Clearwave Cloud synthesized to edge</span>
                  <span className="text-emerald-600">SUCCESS</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>[17:20:30] ast-parse: Glass Admin Console telemetry validator compiled</span>
                  <span className="text-neutral-400">240ms</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>[16:12:00] new-arch: Solitary Dune minimal editorial initialized</span>
                  <span className="text-neutral-400">320ms</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ========================================================= */}
      {/* 3. FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-neutral-200 bg-white py-6 px-4 sm:px-8 text-xs text-neutral-500 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800">NOVA Developer Platform</span>
            <span>·</span>
            <span>© 2026 Bridgeye Cloud Inc.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-neutral-950 transition-colors">
              Home
            </Link>
            <a
              href="https://nova.bridgeye.com/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://discord.gg/rBSWXgAmr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors"
            >
              Discord
            </a>
            <button
              onClick={() => setBuyCreditsOpen(true)}
              className="font-semibold text-neutral-900 hover:underline cursor-pointer"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 4. LIVE STUDIO MODAL */}
      {/* ========================================================= */}
      <LiveStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={(id) => setActiveProjectId(id)}
        onCreateProject={handleCreateNewBlank}
        onUpdateProject={handleUpdateProject}
      />

      {/* ========================================================= */}
      {/* 5. BUY CREDITS MODAL */}
      {/* ========================================================= */}
      <BuyCreditsModal
        isOpen={buyCreditsOpen}
        onClose={() => setBuyCreditsOpen(false)}
        onAddCredits={(amount) => setCredits((c) => c + amount)}
      />
    </div>
  );
}
