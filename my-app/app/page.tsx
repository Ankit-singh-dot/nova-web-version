"use client";

import React, { useState } from "react";
import CinematicHero from "@/components/web/CinematicHero";
import TemplatesSection, { Template } from "@/components/web/TemplatesSection";
import Footer from "@/components/web/Footer";
import LiveStudioModal from "@/components/web/LiveStudioModal";
import SmoothScroll from "@/components/web/SmoothScroll";

export default function Home() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [credits, setCredits] = useState(40);
  const [activePrompt, setActivePrompt] = useState(
    "Create a modern, sleek digital agency website called 'Core' with dark glassmorphism"
  );
  const [activeModel, setActiveModel] = useState("NOVA Gliese 0.6×");
  const [activeTemplateTitle, setActiveTemplateTitle] = useState("New Project");

  // Handler when user triggers build in top prompt box
  const handleTriggerBuild = (prompt: string, model: string, files: File[]) => {
    setActivePrompt(prompt);
    setActiveModel(model);
    setActiveTemplateTitle(
      prompt.length > 25 ? prompt.slice(0, 25) + "..." : prompt || "Custom Web App"
    );
    setStudioOpen(true);
  };

  // Handler when user selects a template
  const handleSelectTemplate = (template: Template) => {
    setActivePrompt(template.recommendedPrompt);
    setActiveModel("NOVA Gliese 0.6×");
    setActiveTemplateTitle(`${template.title} — ${template.category}`);
    setStudioOpen(true);
  };

  // Handler when user previews a template
  const handlePreviewTemplate = (template: Template) => {
    setActivePrompt(template.recommendedPrompt);
    setActiveModel("NOVA Gliese 0.6×");
    setActiveTemplateTitle(`${template.title} Preview`);
    setStudioOpen(true);
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
        {/* Start from a template Showcase */}
        <TemplatesSection
          onSelectTemplate={handleSelectTemplate}
          onPreviewTemplate={handlePreviewTemplate}
        />
      </main>

      {/* ========================================================= */}
      {/* 3. FOOTER (Exact Screenshot 1 Match) */}
      {/* Sawtooth zig-zag top, footer.png, 4 columns, copyright */}
      {/* ========================================================= */}
      <Footer />

      {/* ========================================================= */}
      {/* LIVE STUDIO MODAL WORKSPACE (Screenshot 2 Match) */}
      {/* ========================================================= */}
      <LiveStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        initialPrompt={activePrompt}
        initialModel={activeModel}
        templateTitle={activeTemplateTitle}
      />
    </div>
  );
}
