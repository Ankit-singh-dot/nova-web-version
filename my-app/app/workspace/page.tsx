"use client";

import React, { useState } from "react";
import LiveStudioModal from "@/components/web/LiveStudioModal";
import { ProjectData } from "@/types/project";
import { INITIAL_PROJECTS_DATA } from "@/data/initialProjects";

export default function WorkspacePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS_DATA);
  const [activeProjectId, setActiveProjectId] = useState<string>("core-collective");

  const handleNewProject = () => {
    const newId = `arch-${Date.now()}`;
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
          code: `// app/page.tsx - New Blank Architecture\nexport default function Page() {\n  return (\n    <main className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">\n      <h1 className="text-3xl font-serif">Blank Workspace</h1>\n      <p className="text-neutral-400 text-sm mt-2">Enter a prompt in the left chat to synthesize components.</p>\n    </main>\n  );\n}`,
        },
      ],
    };

    setProjects((prev) => [newBlankProject, ...prev]);
    setActiveProjectId(newId);
  };

  const handleUpdateProject = (id: string, updated: Partial<ProjectData>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      <LiveStudioModal
        isOpen={isOpen}
        onClose={() => {
          window.location.href = "/";
        }}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={(id) => setActiveProjectId(id)}
        onCreateProject={handleNewProject}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  );
}
