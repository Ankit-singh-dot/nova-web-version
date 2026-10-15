"use client";

import React, { useState } from "react";
import LiveStudioModal from "@/components/web/LiveStudioModal";

export default function WorkspacePage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <LiveStudioModal
        isOpen={isOpen}
        onClose={() => {
          window.location.href = "/";
        }}
        initialPrompt="hello there"
        initialModel="NOVA Gliese 0.6×"
        templateTitle="New Project"
      />
    </div>
  );
}
