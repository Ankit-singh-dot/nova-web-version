"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Clock,
  ExternalLink,
  ArrowRight,
  FolderGit2,
} from "lucide-react";
import { ProjectData } from "@/types/project";
import { INITIAL_PROJECTS_DATA } from "@/data/initialProjects";

interface DashboardSectionProps {
  projects?: ProjectData[];
  onOpenProject: (project: ProjectData) => void;
  onNewProject: () => void;
}

export default function DashboardSection({
  projects = INITIAL_PROJECTS_DATA,
  onOpenProject,
  onNewProject,
}: DashboardSectionProps) {
  const [filter, setFilter] = useState<"all" | "live" | "draft">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "live") return p.status === "live";
    if (filter === "draft") return p.status === "draft";
    return true;
  });

  return (
    <section
      id="dashboard-section"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-neutral-100 bg-white select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            <span className="font-semibold text-neutral-800">Workspace History</span>
            <span>·</span>
            <span>Cloud Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1d1d1f] tracking-tight flex items-center gap-3">
            <span>Project History</span>
            <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/80">
              {projects.length} Architectures
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Iterate, inspect code, switch active workspaces, and deploy your autonomous web applications.
          </p>
        </div>

        {/* Top Controls: Filter Pills + New Project Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center p-0.5 rounded-xl bg-neutral-100 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter("live")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === "live"
                  ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === "draft"
                  ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Drafts
            </button>
          </div>

          {/* Full Dashboard Link */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <span>Full Dashboard</span>
            <ArrowRight className="w-3 h-3 text-neutral-400" />
          </Link>

          {/* New Architecture Primary CTA */}
          <button
            onClick={onNewProject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Architecture</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Start Fresh / Empty Canvas */}
        <div
          onClick={onNewProject}
          className="group relative rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/60 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[240px] shadow-2xs hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-center text-neutral-600 group-hover:text-black group-hover:border-neutral-400 transition-all">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2 py-0.5 rounded font-medium">
              Blank Canvas
            </span>
          </div>

          <div className="my-2">
            <h3 className="text-xl font-serif text-neutral-900 group-hover:text-black transition-colors font-medium">
              Start Fresh
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-normal leading-relaxed">
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
            onClick={() => onOpenProject(proj)}
            className="group relative rounded-2xl p-6 sm:p-7 border border-neutral-200/90 bg-white hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[240px] shadow-2xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Header: Title + Live Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-700 shrink-0">
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

            {/* Last Prompt Box */}
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

            {/* Card Footer: Category + Open Workspace */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium text-[11px]">
                {proj.category}
              </span>
              <div className="flex items-center gap-1 text-neutral-900 font-semibold group-hover:text-black">
                <span>Open Workspace</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
