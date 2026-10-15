"use client";

import React from "react";
import {
  FolderGit2,
  Plus,
  Clock,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  timestamp: string;
  lastMessage: string;
  category?: string;
  status?: "live" | "building" | "draft";
  url?: string;
}

interface DashboardSectionProps {
  onOpenProject: (project: ProjectItem) => void;
  onNewProject: () => void;
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "cf25dabd-384",
    title: "New Project",
    timestamp: "15 Oct 2026, 16:12",
    lastMessage: "hello there",
    category: "Web Application",
    status: "live",
    url: "https://runnova.ai/workspace/cf25dabd-384",
  },
  {
    id: "clearwave-prod",
    title: "Clearwave SaaS Engine",
    timestamp: "14 Oct 2026, 18:45",
    lastMessage: "Added dark glassmorphic pricing calculator & API test bench",
    category: "SaaS / Tech",
    status: "live",
    url: "https://clearwave.nova.app",
  },
  {
    id: "glass-admin-v2",
    title: "Glass Admin Console",
    timestamp: "13 Oct 2026, 21:30",
    lastMessage: "Synthesized multi-tenant dashboard with realtime KPI graphs",
    category: "Dashboard/Admin",
    status: "draft",
    url: "https://glass-admin.nova.app",
  },
];

export default function DashboardSection({
  onOpenProject,
  onNewProject,
}: DashboardSectionProps) {
  return (
    <section
      id="dashboard-section"
      className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full border-t border-neutral-200/80 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mb-2">
            <span className="font-bold">&gt;_</span>
            <span className="uppercase tracking-wider font-semibold">
              Dashboard
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            My Neural Apps.
          </h2>
          <p className="text-sm text-neutral-500 mt-1.5">
            Manage and iterate on your cloud-hosted projects.
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-md active:scale-95 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Architecture</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Start Fresh / Empty */}
        <div
          onClick={onNewProject}
          className="group relative rounded-2xl p-6 sm:p-7 border-2 border-dashed border-neutral-300 hover:border-blue-600 bg-neutral-50/70 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-400 group-hover:text-blue-600 group-hover:border-blue-300 transition-all">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2 py-0.5 rounded font-medium">
              Empty
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
              Start Fresh
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-serif italic text-neutral-600">
              A new idea taking shape
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <span>Launch Blank Canvas</span>
            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>

        {/* Dynamic Project Cards */}
        {INITIAL_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onOpenProject(proj)}
            className="group relative rounded-2xl p-6 sm:p-7 border border-neutral-200 bg-white hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{proj.timestamp}</span>
                  </div>
                </div>
              </div>

              {proj.status === "live" && (
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
            </div>

            {/* Last message preview */}
            <div className="my-4 p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-neutral-400 shrink-0" />
              <p className="text-xs text-neutral-700 font-mono truncate">
                {proj.lastMessage}
              </p>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">
                {proj.category || "Neural App"}
              </span>
              <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:text-blue-700">
                <span>Open Workspace</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
