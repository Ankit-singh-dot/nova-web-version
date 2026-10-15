import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "NOVA — Create stunning apps & websites by chatting with AI",
  description:
    "The autonomous developer for your terminal & browser. Create stunning apps & websites by chatting with AI. Backed by Bridgeye.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased overflow-x-hidden max-w-full w-full`}
    >
      <body className="min-h-screen bg-white text-[#1d1d1f] overflow-x-hidden max-w-full w-full selection:bg-blue-600/10 selection:text-blue-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
