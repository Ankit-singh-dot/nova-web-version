"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "mailto:contact@bridgeye.com" },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "/pricing" },
      { name: "Releases", href: "https://nova.bridgeye.com/releases" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Docs", href: "/documentation" },
      { name: "Releases", href: "/releases" },
      { name: "Blog", href: "/blogs" },
      { name: "Community", href: "https://discord.gg/ppUA3CJf" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "https://nova.bridgeye.com/privacy" },
      { name: "Terms", href: "https://nova.bridgeye.com/tnc" },
      { name: "Security", href: "#" },
    ],
  },
];

const TornEdge = ({ isDark }: { isDark: boolean }) => (
  <svg
    viewBox="0 0 1000 20"
    preserveAspectRatio="none"
    className={`absolute top-0 left-0 right-0 w-full h-8 sm:h-12 lg:h-16 -mt-[1px] ${
      isDark ? "text-black fill-black" : "text-white fill-white"
    } z-20 pointer-events-none transition-colors duration-300`}
  >
    {/* Jagged sawtooth / zig-zag path simulating torn paper edge */}
    <path d="M0,0 L0,20 L12,14 L24,19 L35,11 L48,17 L59,10 L71,18 L85,9 L96,16 L108,12 L120,18 L133,10 L146,17 L158,11 L171,19 L184,13 L197,18 L209,11 L222,17 L235,9 L247,16 L260,11 L272,18 L285,12 L298,19 L310,14 L323,17 L335,9 L348,16 L361,12 L373,18 L386,10 L399,17 L411,11 L424,19 L437,13 L450,18 L462,11 L475,17 L488,9 L500,16 L513,11 L525,18 L538,12 L551,19 L563,14 L576,17 L588,9 L601,16 L614,12 L626,18 L639,10 L652,17 L664,11 L677,19 L690,13 L703,18 L715,11 L728,17 L741,9 L753,16 L766,11 L778,18 L791,12 L804,19 L816,14 L829,17 L841,9 L854,16 L867,12 L879,18 L892,10 L905,17 L917,11 L930,19 L943,13 L956,18 L968,11 L981,17 L994,9 L1000,16 L1000,0 Z" />
  </svg>
);

export default function AppleFooter() {
  const { isDark } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[550px] sm:min-h-[650px] flex flex-col justify-between overflow-hidden"
    >
      {/* Background Landscape Artwork with Parallax Motion */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/footer.png"
          alt="NOVA Developer in Field"
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* Subtle gradient overlay to ensure text readability against the grass */}
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      {/* Restored Zig-Zag Torn Paper Edge Transition from White Section */}
      <TornEdge isDark={isDark} />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full flex-grow pt-16 sm:pt-24 pb-8">
        {/* Top Section: Brand & Links with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8"
        >
          {/* Left Brand Area */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center mb-5 group">
              <div className="bg-white/95 hover:bg-white px-4 py-2 rounded-2xl border border-white/30 shadow-md backdrop-blur-md transition-all group-hover:scale-105 flex items-center">
                <Image
                  src="/images/logo (1).png"
                  alt="NOVA by Bridgeye"
                  width={130}
                  height={32}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              Deploy a codebase-aware AI that acts as a self-healing AI debugger
              to build, test, and fix your code directly from the CLI.
            </p>
          </div>

          {/* Right Links Area */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-10">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-white mb-4 text-sm">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Copyright - Overlaid at the bottom of the landscape */}
        <div className="flex justify-center items-end mt-28 sm:mt-36">
          <p className="text-white/60 text-xs sm:text-sm font-medium tracking-wide">
            © 2026 Bridgeye Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
