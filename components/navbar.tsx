import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/50 transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="inline-block font-extrabold text-xl tracking-tight text-white">
              ResumeAI<span className="text-indigo-400">.</span>
            </span>
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
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <Button
              variant="ghost"
              asChild
              className="text-slate-300 hover:text-white hover:bg-white/5 rounded-full px-5 hidden sm:flex"
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
      </div>
    </header>
  );
}
