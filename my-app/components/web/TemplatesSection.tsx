"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  recommendedPrompt: string;
}

// 16 Curated High-End Architecture & Design Cards (Zero AI Slop)
export const TEMPLATES_DATA: Template[] = [
  {
    id: "tree-dune",
    title: "Solitary Dune",
    category: "Minimalist / Editorial",
    image: "/images/cards/tree_dune.jpg",
    description: "Serene portfolio and editorial storytelling website with organic curves and warm sand palette.",
    recommendedPrompt:
      "Design an exquisite editorial architecture portfolio 'Solitary Dune' with minimalist typography, earth tone color palette, and fluid smooth scroll transitions.",
  },
  {
    id: "glass-ribbon",
    title: "Prism Ribbon",
    category: "Creative / 3D Studio",
    image: "/images/cards/glass_ribbon.jpg",
    description: "Interactive 3D glass physics showcase and digital design studio platform.",
    recommendedPrompt:
      "Architect a luxury digital studio website 'Prism Ribbon' with iridescent glassmorphic cards, WebGL physics preview, and high-fashion serif headers.",
  },
  {
    id: "coastal-van",
    title: "Pacific Ridge",
    category: "Travel / Lifestyle",
    image: "/images/cards/coastal_van.jpg",
    description: "Luxury coastal travel magazine and boutique camper van booking platform.",
    recommendedPrompt:
      "Build a coastal travel platform 'Pacific Ridge' featuring scenic route maps, luxury camper rental bookings, and sunset photography showcases.",
  },
  {
    id: "nyc-rain",
    title: "Metropolis Nocturne",
    category: "Urban / Data Platform",
    image: "/images/cards/nyc_rain.jpg",
    description: "High-frequency market analytics and real-time financial data visualization portal.",
    recommendedPrompt:
      "Generate a high-frequency fintech analytics dashboard 'Metropolis Nocturne' with live streaming telemetry, interactive charts, and midnight dark theme.",
  },
  {
    id: "pool-courtyard",
    title: "Villa Atrium",
    category: "Architecture / Luxury",
    image: "/images/cards/pool_courtyard.jpg",
    description: "Brutalist architectural firm portfolio with plunge pool imagery and clean modern typography.",
    recommendedPrompt:
      "Synthesize a brutalist architecture portfolio 'Villa Atrium' with concrete textures, serene water reflection effects, and blueprint project inspector.",
  },
  {
    id: "magenta-chrome",
    title: "Liquid Chroma",
    category: "Art / Modern Gallery",
    image: "/images/cards/magenta_chrome.jpg",
    description: "Contemporary museum exhibition and luxury kinetic sculpture gallery.",
    recommendedPrompt:
      "Create a modern kinetic sculpture exhibition website 'Liquid Chroma' with chrome fluid shaders, audio-reactive cursor trails, and exhibition passes.",
  },
  {
    id: "botanical-leaf",
    title: "Verdant Flora",
    category: "Botanical / Wellness",
    image: "/images/cards/botanical_leaf.jpg",
    description: "Organic luxury skincare and botanical wellness commerce experience.",
    recommendedPrompt:
      "Design an organic botanical skincare e-commerce website 'Verdant Flora' with dewy green aesthetic, clean product ingredient cards, and cart drawer.",
  },
  {
    id: "glass-pavilion",
    title: "Lakeside Pavilion",
    category: "Architecture / Retreat",
    image: "/images/cards/glass_pavilion.jpg",
    description: "Modernist glass architecture retreat and high-end residential booking suite.",
    recommendedPrompt:
      "Architect a luxury architectural retreat booking page 'Lakeside Pavilion' with full-screen twilight imagery, floorplan viewer, and dates selector.",
  },
  {
    id: "field-terminal",
    title: "Field Studio",
    category: "AI Platform / DevTools",
    image: "/images/nova_field_coder.jpg",
    description: "Autonomous AI developer platform with live browser workspace and self-healing debugger.",
    recommendedPrompt:
      "Build an autonomous AI coding studio workspace with live browser canvas preview, integrated terminal, and automated code healing.",
  },
  {
    id: "maison-doree",
    title: "Maison Dorée",
    category: "Luxury / Boutique",
    image: "/images/thumbnail6.webp",
    description: "Parisian luxury brand and haute couture boutique storefront with gold leaf accents.",
    recommendedPrompt:
      "Design a Parisian luxury boutique storefront 'Maison Dorée' with product grid, editorial storytelling, and gold foil accents.",
  },
  {
    id: "catalyst-saas",
    title: "Catalyst SaaS",
    category: "B2B SaaS / Tech",
    image: "/images/thumbnail3.webp",
    description: "High-velocity B2B software marketing page with live benchmark metrics.",
    recommendedPrompt:
      "Architect a B2B SaaS landing page 'Catalyst' with dynamic metrics counters, feature bento grid, and customer logo carousel.",
  },
  {
    id: "orbital-atelier",
    title: "Orbital Atelier",
    category: "Design / Editorial",
    image: "/images/thumbnail5.webp",
    description: "High-fashion & architectural design collective with editorial magazine layout.",
    recommendedPrompt:
      "Build a luxury architectural and creative design studio website 'Orbital' with editorial layout, serif typography, and visual project showcases.",
  },
  {
    id: "clearwave-studio",
    title: "Clearwave Cloud",
    category: "DevTools / Platform",
    image: "/images/thumbnail2.webp",
    description: "Cloud-native AI development suite with interactive code synthesis.",
    recommendedPrompt:
      "Generate an autonomous AI developer platform landing page named 'Clearwave' featuring CLI installation snippet and live model benchmarks.",
  },
  {
    id: "core-collective",
    title: "Core Collective",
    category: "Agency / Digital",
    image: "/images/thumbnail1.webp",
    description: "Ultra-sleek digital consultancy and interactive product design agency.",
    recommendedPrompt:
      "Build a modern high-end digital agency website called 'Core' with glassmorphic cards, client testimonials, and interactive project showcases.",
  },
  {
    id: "luminary-suite",
    title: "Luminary Suite",
    category: "Productivity / Minimal",
    image: "/images/thumbnail4.webp",
    description: "Minimalist cloud productivity suite with fluid micro-interactions.",
    recommendedPrompt:
      "Create a minimalist tech landing page 'Luminary' with fluid animations, glowing border effects, and interactive feature tour.",
  },
  {
    id: "glass-console",
    title: "Glass Console",
    category: "Dashboard / Analytics",
    image: "/images/thumbnail7.webp",
    description: "Real-time SaaS command center with telemetry charts and revenue feeds.",
    recommendedPrompt:
      "Synthesize a full dark glassmorphic admin dashboard called 'Glass Console' with realtime revenue charts and user activity feeds.",
  },
];

const TOTAL_CARDS = TEMPLATES_DATA.length; // 16
const ANGLE_PER_CARD = 360 / TOTAL_CARDS; // 22.5 degrees

interface TemplatesSectionProps {
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate?: (template: Template) => void;
}

export default function TemplatesSection({
  onSelectTemplate,
  onPreviewTemplate,
}: TemplatesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Disc rotation in degrees: continuous number with zero jumps
  const [discRotation, setDiscRotation] = useState(0);

  // Responsive dimensions
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Subtle scroll parallax sway
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // Scaled dimensions ensuring the entire section fits in 1 screen with ZERO overlap
  const radius =
    windowWidth > 1200
      ? 640
      : windowWidth > 840
      ? 520
      : 390;

  const cardWidth =
    windowWidth > 1200
      ? 165
      : windowWidth > 840
      ? 140
      : 110;

  const cardHeight =
    windowWidth > 1200
      ? 205
      : windowWidth > 840
      ? 175
      : 140;

  // Clockwise rotation on RIGHT button click:
  // Cards move from left to right across top arch; card exiting on right moves down,
  // card entering on left appears smoothly from the downward side!
  const handleRotateRight = () => {
    setDiscRotation((prev) => prev + ANGLE_PER_CARD);
  };

  // Counter-clockwise rotation on LEFT button click:
  // Cards move from right to left across top arch; card exiting on left moves down,
  // card entering on right appears smoothly from the downward side!
  const handleRotateLeft = () => {
    setDiscRotation((prev) => prev - ANGLE_PER_CARD);
  };

  // Find currently active template at apex (closest to 0° visual angle)
  let activeTemplate = TEMPLATES_DATA[0];
  let minVisualDiff = 999;

  TEMPLATES_DATA.forEach((card, idx) => {
    const rawAngle = idx * ANGLE_PER_CARD + discRotation;
    let visualAngle = ((rawAngle % 360) + 360) % 360;
    if (visualAngle > 180) visualAngle -= 360;
    if (Math.abs(visualAngle) < minVisualDiff) {
      minVisualDiff = Math.abs(visualAngle);
      activeTemplate = card;
    }
  });

  return (
    <section
      ref={sectionRef}
      id="templates-section"
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[880px] overflow-hidden bg-white select-none flex flex-col justify-between py-2 sm:py-3.5 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full h-full relative z-10 flex flex-col justify-between items-center">
        {/* ========================================================= */}
        {/* TOP ZONE: THE 360° CONTINUOUS ROTATING ARCH */}
        {/* Dedicated container so cards NEVER overlap the text below */}
        {/* ========================================================= */}
        <div className="relative w-full h-[240px] sm:h-[270px] md:h-[290px] flex justify-center items-start overflow-visible pt-1 shrink-0">
          {/* Left Arrow Button: Turns wheel counter-clockwise */}
          <button
            onClick={handleRotateLeft}
            aria-label="Previous template"
            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Arrow Button: Turns wheel clockwise */}
          <button
            onClick={handleRotateRight}
            aria-label="Next template"
            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-50 border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Disc Container with subtle scroll parallax */}
          <motion.div
            style={{ rotate: scrollRotate }}
            className="relative w-full h-full flex justify-center items-start"
          >
            {TEMPLATES_DATA.map((template, idx) => {
              // Raw continuous angle fed directly into animate={{ rotate }}
              const rawAngle = idx * ANGLE_PER_CARD + discRotation;

              // Normalized visual angle in range [-180, +180] for opacity and apex logic
              let visualAngle = ((rawAngle % 360) + 360) % 360;
              if (visualAngle > 180) visualAngle -= 360;

              const isApex = Math.abs(visualAngle) < 8;

              // Opacity logic:
              // - Within [-70°, +70°]: fully visible (opacity 1.0)
              // - Between 70° and 96°: smoothly fades from 1.0 down to 0.0 as it curves downward
              // - Outside [-96°, +96°]: opacity 0, pointer-events none
              const absAngle = Math.abs(visualAngle);
              const cardOpacity =
                absAngle > 96
                  ? 0
                  : absAngle > 70
                  ? Math.max(0, (96 - absAngle) / 26)
                  : 1;

              return (
                <motion.div
                  key={template.id}
                  animate={{
                    rotate: rawAngle,
                    opacity: cardOpacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 65,
                    damping: 17,
                    mass: 0.8,
                  }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "6px",
                    transformOrigin: `50% ${radius}px`,
                    x: "-50%",
                    zIndex: Math.round(30 - Math.min(absAngle, 30)),
                    pointerEvents: cardOpacity > 0.1 ? "auto" : "none",
                  }}
                  className="cursor-pointer"
                  onClick={() => {
                    if (isApex) {
                      onSelectTemplate(template);
                    } else {
                      // Smoothly glide clicked card directly to apex (0°)
                      setDiscRotation((prev) => prev - visualAngle);
                    }
                  }}
                >
                  {/* Gallery Card: Pure visual craftsmanship, zero AI slop */}
                  <motion.div
                    whileHover={{
                      scale: 1.06,
                      y: -5,
                      transition: { type: "spring", stiffness: 350, damping: 22 },
                    }}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                    }}
                    className={`group relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-100 border transition-all duration-300 ${
                      isApex
                        ? "border-neutral-900/20 shadow-[0_18px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
                        : "border-black/[0.07] shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] hover:border-black/15"
                    }`}
                  >
                    {/* Full-bleed curated architecture artwork */}
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      priority={isApex}
                      sizes="(max-width: 640px) 110px, (max-width: 1024px) 140px, 165px"
                      className="object-cover object-center"
                    />

                    {/* Subtle micro-pill on hover or apex */}
                    <div
                      className={`absolute bottom-2 left-2 right-2 z-10 transition-all duration-300 ${
                        isApex ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      }`}
                    >
                      <div className="px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md border border-black/[0.08] text-neutral-900 shadow-sm flex items-center justify-between">
                        <div className="flex flex-col truncate pr-1">
                          <span className="font-semibold text-[10px] sm:text-[11px] truncate leading-tight">
                            {template.title}
                          </span>
                          <span className="text-[7.5px] sm:text-[8.5px] text-neutral-500 truncate">
                            {template.category}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-neutral-500 shrink-0 ml-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* MIDDLE ZONE: EDITORIAL STORY & CALL TO ACTION */}
        {/* Strictly separated from the arch container above — ZERO overlap! */}
        {/* ========================================================= */}
        <div className="relative z-20 text-center max-w-xl mx-auto px-4 my-auto pt-1 sm:pt-2">
          {/* Editorial Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif text-[#1d1d1f] tracking-tight leading-[1.12]">
            Architect Fullstack Web Apps <br />
            <span className="italic font-normal text-neutral-600">
              by Chatting with AI
            </span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-[13px] text-neutral-500 font-normal max-w-md mx-auto leading-relaxed">
            Deploy codebase-aware intelligence that writes clean TypeScript, builds responsive components, and fixes bugs autonomously in real time.
          </p>

          {/* Primary Action Button */}
          <div className="mt-3 sm:mt-3.5 flex items-center justify-center gap-3">
            <button
              onClick={() => onSelectTemplate(activeTemplate)}
              className="group flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Build with Nova</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 3 Pillars describing NOVA capabilities */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 border-t border-neutral-200/70 text-center max-w-lg mx-auto">
            <div className="space-y-0.5">
              <h4 className="font-serif text-xs sm:text-[13px] text-neutral-900 font-medium truncate">
                Production Code
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug line-clamp-2">
                Clean Next.js, React, &amp; modular code.
              </p>
            </div>

            <div className="space-y-0.5 border-x border-neutral-200/70 px-2 sm:px-3">
              <h4 className="font-serif text-xs sm:text-[13px] text-neutral-900 font-medium truncate">
                Self-Healing
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug line-clamp-2">
                Autonomous runtime error debugging.
              </p>
            </div>

            <div className="space-y-0.5">
              <h4 className="font-serif text-xs sm:text-[13px] text-neutral-900 font-medium truncate">
                Curated Stacks
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-snug line-clamp-2">
                Production-vetted templates for SaaS.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM UTILITY ROW */}
        {/* Left: ↗ Open in Workspace | Center: Selected | Right: Browse architectures */}
        {/* ========================================================= */}
        <div className="w-full flex items-center justify-between pt-2 pb-1 border-t border-neutral-100 text-[11px] text-neutral-500 shrink-0">
          <button
            onClick={() => onPreviewTemplate?.(activeTemplate) || onSelectTemplate(activeTemplate)}
            className="flex items-center gap-1.5 font-medium hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Open in Workspace</span>
          </button>

          <div className="flex items-center gap-1.5 font-mono text-neutral-400">
            <span className="hidden sm:inline">Selected Architecture:</span>
            <span className="font-sans font-semibold text-neutral-800">
              {activeTemplate.title}
            </span>
          </div>

          <button
            onClick={() => onSelectTemplate(activeTemplate)}
            className="flex items-center gap-1.5 font-medium hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <span>Browse Architectures</span>
            <Search className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
