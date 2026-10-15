"use client";

import React, { useState } from "react";
import CinematicHero from "@/components/web/CinematicHero";
import TemplatesSection, { Template } from "@/components/web/TemplatesSection";
import DashboardSection from "@/components/web/DashboardSection";
import Footer from "@/components/web/Footer";
import LiveStudioModal from "@/components/web/LiveStudioModal";
import SmoothScroll from "@/components/web/SmoothScroll";
import { ProjectData } from "@/types/project";
import { INITIAL_PROJECTS_DATA } from "@/data/initialProjects";

export default function Home() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [credits, setCredits] = useState(40);
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS_DATA);
  const [activeProjectId, setActiveProjectId] = useState<string>("core-collective");

  // Handler when user triggers build in top prompt box
  const handleTriggerBuild = (prompt: string, model: string, files: File[]) => {
    const trimmedPrompt = prompt.trim() || "Digital Agency Platform with dark glassmorphism";
    const title =
      trimmedPrompt.length > 28
        ? trimmedPrompt.slice(0, 28) + "..."
        : trimmedPrompt;
    const newId = `arch-${Date.now()}`;
    const newProject: ProjectData = {
      id: newId,
      title: title,
      category: "Web Application",
      status: "live",
      timestamp: "Just now",
      lastMessage: trimmedPrompt,
      tags: ["Next.js 16", "Tailwind CSS", "TypeScript"],
      url: `https://${newId}.nova.build`,
      previewType: "custom",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: trimmedPrompt,
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
          code: `// app/page.tsx - ${title}
import React from 'react';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0d] text-white flex flex-col items-center justify-center p-8">
      <HeroSection title="${title}" />
    </main>
  );
}`,
        },
        {
          name: "components/HeroSection.tsx",
          code: `// components/HeroSection.tsx
'use client';
import React, { useState } from 'react';

export default function HeroSection({ title }: { title: string }) {
  const [clicks, setClicks] = useState(0);
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono">
        NOVA Autonomous Build
      </div>
      <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-tight">
        {title}
      </h1>
      <p className="text-neutral-400 text-sm max-w-xl mx-auto">
        Live responsive application preview with synchronized hot-reloading state.
      </p>
      <button
        onClick={() => setClicks(c => c + 1)}
        className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer shadow-lg"
      >
        Live Interactions ({clicks})
      </button>
    </div>
  );
}`,
        },
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newId);
    setCredits((prev) => Math.max(0, Number((prev - 0.13).toFixed(2))));
    setStudioOpen(true);
  };

  // Handler when user selects a template from arch carousel
  const handleSelectTemplate = (template: Template) => {
    // Check if matching project already exists
    const existing = projects.find(
      (p) =>
        p.title.toLowerCase().includes(template.title.toLowerCase()) ||
        template.title.toLowerCase().includes(p.title.toLowerCase())
    );

    if (existing) {
      setActiveProjectId(existing.id);
      setStudioOpen(true);
      return;
    }

    // Otherwise create dedicated project for this template
    const newId = `template-${template.id}-${Date.now()}`;
    const newProject: ProjectData = {
      id: newId,
      title: template.title,
      category: template.category,
      status: "live",
      timestamp: "Just now",
      lastMessage: template.recommendedPrompt,
      tags: ["Next.js 16", "Tailwind CSS", "TypeScript"],
      url: `https://${template.id}.nova.build`,
      previewType:
        template.category.toLowerCase().includes("fintech") ||
        template.category.toLowerCase().includes("admin")
          ? "fintech"
          : template.category.toLowerCase().includes("saas") ||
            template.category.toLowerCase().includes("cloud")
          ? "saas"
          : template.category.toLowerCase().includes("editorial") ||
            template.category.toLowerCase().includes("minimal")
          ? "minimal"
          : "agency",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: template.recommendedPrompt,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: `msg-${Date.now() + 1}`,
          sender: "nova",
          text: `Initialized "${template.title}" template architecture. Configured typography, color tokens, and layout hierarchy.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          files: [
            { name: "app/page.tsx", lines: 120 },
            { name: "components/TemplateShowcase.tsx", lines: 85 },
          ],
        },
      ],
      files: [
        {
          name: "app/page.tsx",
          code: `// app/page.tsx - ${template.title}
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white p-8">
      <h1 className="text-4xl font-serif">${template.title}</h1>
      <p className="text-neutral-400 mt-2">${template.description}</p>
    </div>
  );
}`,
        },
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newId);
    setStudioOpen(true);
  };

  // Handler when user previews a template
  const handlePreviewTemplate = (template: Template) => {
    handleSelectTemplate(template);
  };

  // Handler when user opens a past project from Dashboard
  const handleOpenProject = (project: ProjectData) => {
    setActiveProjectId(project.id);
    setStudioOpen(true);
  };

  // Handler when user starts a fresh project from Dashboard or Studio
  const handleNewProject = () => {
    const newId = `blank-${Date.now()}`;
    const newBlankProject: ProjectData = {
      id: newId,
      title: "New Architecture",
      category: "Blank Workspace",
      status: "draft",
      timestamp: "Just now",
      lastMessage: "Blank canvas ready for architecture prompt",
      tags: ["Next.js 16", "Tailwind CSS"],
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
          code: `// app/page.tsx - New Blank Architecture
export default function Page() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-serif">Blank Workspace</h1>
      <p className="text-neutral-400 text-sm mt-2">Enter a prompt in the left chat to synthesize components.</p>
    </main>
  );
}`,
        },
      ],
    };

    setProjects((prev) => [newBlankProject, ...prev]);
    setActiveProjectId(newId);
    setStudioOpen(true);
  };

  // Handler to update project state across components
  const handleUpdateProject = (id: string, updated: Partial<ProjectData>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col overflow-x-hidden max-w-full w-full selection:bg-neutral-900 selection:text-white">
      {/* Lenis Smooth Scroll Engine */}
      <SmoothScroll />

      {/* ========================================================= */}
      {/* 1. TOP CINEMATIC HERO (hero-art-sketch3.png) */}
      {/* 3-island floating navbar, glowing monitor art, and top prompt creator */}
      {/* ========================================================= */}
      <CinematicHero
        credits={credits}
        userName="Ankit-singh-dot"
        onTriggerBuild={handleTriggerBuild}
        onOpenStudio={() => setStudioOpen(true)}
        onAddCredits={(amount) => setCredits((c) => c + amount)}
      />

      {/* ========================================================= */}
      {/* 2. UNDER-IMAGE WHITE PREMIUM SECTIONS */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col">
        {/* Arch Templates Showcase */}
        <TemplatesSection
          onSelectTemplate={handleSelectTemplate}
          onPreviewTemplate={handlePreviewTemplate}
        />

        {/* Dashboard Section: Recent Projects & Start Fresh */}
        <DashboardSection
          projects={projects}
          onOpenProject={handleOpenProject}
          onNewProject={handleNewProject}
        />
      </main>

      {/* ========================================================= */}
      {/* 3. PARALLAX FOOTER (Exact Screenshot 1 Match) */}
      {/* Sawtooth zig-zag top, footer.png, 4 columns, copyright */}
      {/* ========================================================= */}
      <Footer />

      {/* ========================================================= */}
      {/* 4. LIVE STUDIO MODAL WORKSPACE */}
      {/* ========================================================= */}
      <LiveStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={(id) => setActiveProjectId(id)}
        onCreateProject={handleNewProject}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  );
}
