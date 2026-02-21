"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/70 transition-all print:hidden">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="ResumeAI Logo"
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/builder"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white relative group"
            >
              Resume Builder
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/optimizer"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white relative group"
            >
              Optimizer
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/ats-checker"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white relative group"
            >
              ATS Checker
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <Button
              variant="ghost"
              asChild
              className="text-slate-300 hover:text-white hover:bg-white/5 rounded-full px-5"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-6 font-semibold shadow-lg shadow-white/10 transition-all"
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 shadow-2xl py-4 px-6 flex flex-col space-y-4">
          <Link
            href="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
          >
            Resume Builder
          </Link>
          <Link
            href="/optimizer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
          >
            Optimizer
          </Link>
          <Link
            href="/ats-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
          >
            ATS Checker
          </Link>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="outline"
              asChild
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-slate-300 border-white/10 hover:bg-white/5 hover:text-white"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all border-0"
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
