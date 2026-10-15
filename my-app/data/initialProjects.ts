import { ProjectData } from "@/types/project";

export const INITIAL_PROJECTS_DATA: ProjectData[] = [
  {
    id: "core-collective",
    title: "Core Collective",
    category: "Agency / Studio",
    status: "live",
    timestamp: "12m ago",
    lastMessage: "Create a modern, sleek digital agency website called 'Core' with dark glassmorphism",
    tags: ["Next.js 16", "Tailwind CSS", "Framer Motion"],
    url: "https://core.nova.build",
    previewType: "agency",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        text: "Create a modern, sleek digital agency website called 'Core' with dark glassmorphism",
        timestamp: "16:12",
      },
      {
        id: "msg-2",
        sender: "nova",
        text: "I've synthesized the Core Collective digital agency platform. The architecture features dark glassmorphism, responsive service pillars, interactive project tabs, and modular Next.js components.",
        timestamp: "16:12",
        files: [
          { name: "app/page.tsx", lines: 142 },
          { name: "components/Hero.tsx", lines: 86 },
          { name: "components/ProjectShowcase.tsx", lines: 98 },
        ],
      },
    ],
    files: [
      {
        name: "app/page.tsx",
        code: `// app/page.tsx - Core Collective Agency Platform
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import PricingCalculator from '@/components/PricingCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-neutral-800">
      <Navbar brand="CORE COLLECTIVE" />
      <Hero
        badge="Digital Studio · 2026"
        headline="Architecting next-generation digital experiences"
        description="We partner with ambitious startups and enterprises to design, build, and scale world-class software platforms."
      />
      <ProjectShowcase />
      <PricingCalculator />
    </div>
  );
}`,
      },
      {
        name: "components/Hero.tsx",
        code: `// components/Hero.tsx
'use client';

import React from 'react';

export default function Hero({ badge, headline, description }: {
  badge: string;
  headline: string;
  description: string;
}) {
  return (
    <section className="relative px-6 pt-16 pb-20 max-w-5xl mx-auto text-center">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-400 mb-6">
        {badge}
      </span>
      <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-white leading-[1.12]">
        {headline}
      </h1>
      <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-xl mx-auto font-normal">
        {description}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors">
          Explore Projects
        </button>
        <button className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
          Book Consultation
        </button>
      </div>
    </section>
  );
}`,
      },
      {
        name: "components/ProjectShowcase.tsx",
        code: `// components/ProjectShowcase.tsx
'use client';

import React, { useState } from 'react';

const PROJECTS = [
  { id: 'saas', name: 'Clearwave Cloud', metric: '+142% Velocity', category: 'DevTools' },
  { id: 'fintech', name: 'Crypto Vault', metric: '$2.4B Managed', category: 'Fintech' },
  { id: 'studio', name: 'Maison Dorée', metric: '48ms Edge Latency', category: 'Luxury Retail' },
];

export default function ProjectShowcase() {
  const [active, setActive] = useState('saas');
  return (
    <section className="py-12 border-t border-white/5 max-w-5xl mx-auto px-6">
      <div className="flex gap-2 mb-8">
        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={\`px-4 py-2 rounded-xl text-xs font-medium \${active === p.id ? 'bg-white text-black' : 'text-neutral-400 bg-white/5'}\`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </section>
  );
}`,
      },
    ],
  },
  {
    id: "clearwave-prod",
    title: "Clearwave SaaS Engine",
    category: "SaaS / DevTools",
    status: "live",
    timestamp: "2h ago",
    lastMessage: "Added dark glassmorphic pricing calculator & API telemetry test bench",
    tags: ["Next.js 16", "Turbopack", "TypeScript"],
    url: "https://clearwave.nova.build",
    previewType: "saas",
    messages: [
      {
        id: "msg-c1",
        sender: "user",
        text: "Build an autonomous AI developer platform landing page named 'Clearwave' featuring CLI installation snippet and live model benchmarks.",
        timestamp: "14:45",
      },
      {
        id: "msg-c2",
        sender: "nova",
        text: "Clearwave SaaS Engine compiled with Turbopack. Integrated high-throughput streaming telemetry, edge benchmarks, and dark glassmorphic UI.",
        timestamp: "14:45",
        files: [
          { name: "app/page.tsx", lines: 110 },
          { name: "components/TelemetryGrid.tsx", lines: 95 },
        ],
      },
    ],
    files: [
      {
        name: "app/page.tsx",
        code: `// app/page.tsx - Clearwave SaaS Engine
import React from 'react';
import TelemetryGrid from '@/components/TelemetryGrid';

export default function ClearwavePage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="font-mono text-xl font-bold tracking-tight">CLEARWAVE // DEV ENGINE</h1>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
          48,210 req/s Active
        </span>
      </header>
      <TelemetryGrid />
    </div>
  );
}`,
      },
      {
        name: "components/TelemetryGrid.tsx",
        code: `// components/TelemetryGrid.tsx
export default function TelemetryGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <span className="text-xs text-neutral-400">P99 Latency</span>
        <div className="text-3xl font-mono font-bold mt-2">14.2ms</div>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <span className="text-xs text-neutral-400">Availability</span>
        <div className="text-3xl font-mono font-bold text-emerald-400 mt-2">99.99%</div>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <span className="text-xs text-neutral-400">Throughput</span>
        <div className="text-3xl font-mono font-bold mt-2">1.2 TB/day</div>
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "glass-admin-v2",
    title: "Glass Admin Console",
    category: "Dashboard / Admin",
    status: "draft",
    timestamp: "1d ago",
    lastMessage: "Synthesized multi-tenant dashboard with realtime telemetry and KPI graphs",
    tags: ["React 19", "Tailwind CSS", "Analytics"],
    url: "https://glass-admin.nova.build",
    previewType: "fintech",
    messages: [
      {
        id: "msg-g1",
        sender: "user",
        text: "Synthesize a full dark glassmorphic admin dashboard called 'Glass Admin' with realtime telemetry and validator balances.",
        timestamp: "Yesterday",
      },
      {
        id: "msg-g2",
        sender: "nova",
        text: "Built Glass Admin Console with multi-tenant validator telemetry, treasury asset monitoring, and audited cold storage indicators.",
        timestamp: "Yesterday",
        files: [
          { name: "app/page.tsx", lines: 135 },
          { name: "components/TreasuryVault.tsx", lines: 88 },
        ],
      },
    ],
    files: [
      {
        name: "app/page.tsx",
        code: `// app/page.tsx - Glass Admin Console
import React from 'react';
import TreasuryVault from '@/components/TreasuryVault';

export default function GlassAdmin() {
  return (
    <div className="min-h-screen bg-[#070709] text-white p-8">
      <h1 className="text-2xl font-bold font-mono">Glass Command Center</h1>
      <TreasuryVault />
    </div>
  );
}`,
      },
      {
        name: "components/TreasuryVault.tsx",
        code: `// components/TreasuryVault.tsx
export default function TreasuryVault() {
  return (
    <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
      <span className="text-xs text-neutral-400">Total Treasury</span>
      <div className="text-4xl font-mono font-bold text-white mt-1">$4,850,200</div>
      <p className="text-xs text-emerald-400 mt-2">+4.2% yield this cycle</p>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "solitary-dune-web",
    title: "Solitary Dune",
    category: "Editorial / Nature",
    status: "live",
    timestamp: "3d ago",
    lastMessage: "Minimalist architecture editorial portfolio with earth tone color palette",
    tags: ["Next.js 16", "Editorial", "CMS"],
    url: "https://dune.nova.build",
    previewType: "minimal",
    messages: [
      {
        id: "msg-d1",
        sender: "user",
        text: "Design an exquisite editorial architecture portfolio 'Solitary Dune' with minimalist typography and earth tone palette.",
        timestamp: "3d ago",
      },
      {
        id: "msg-d2",
        sender: "nova",
        text: "Solitary Dune architectural portfolio synthesized. Clean serif typography, panoramic imagery, and fluid scroll transitions.",
        timestamp: "3d ago",
        files: [{ name: "app/page.tsx", lines: 92 }],
      },
    ],
    files: [
      {
        name: "app/page.tsx",
        code: `// app/page.tsx - Solitary Dune
import React from 'react';

export default function DunePage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#1c1917] p-12">
      <h1 className="text-5xl font-serif">Solitary Dune</h1>
      <p className="text-neutral-600 mt-4 max-w-lg">
        An architectural study in silence, earth tones, and timeless geometries.
      </p>
    </main>
  );
}`,
      },
    ],
  },
];
