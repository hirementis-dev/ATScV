import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Sparkles,
  CheckCircle,
  Target,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <main className="flex-1 relative z-10">
        {/* HERO SECTION */}
        <section className="relative px-6 py-32 md:py-48 flex flex-col items-center text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-2xl animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">
              The Next-Gen AI Resume Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Get Hired Faster with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 drop-shadow-sm">
              AI-Powered Precision
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Craft an industry-standard, ATS-optimized resume in minutes. Revamp
            your old resume or let our deep-learning engine analyze your ATS
            score instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] group"
              asChild
            >
              <Link href="/builder">
                Create New Resume
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-full"
              asChild
            >
              <Link href="/ats-checker">
                <Target className="mr-2 w-5 h-5 text-indigo-400" />
                Analyze ATS Score
              </Link>
            </Button>
          </div>
        </section>

        {/* STATS / TRUST BANNER */}
        <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">98%</span>
              <span className="text-sm text-slate-400 font-medium">
                ATS Pass Rate
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">10x</span>
              <span className="text-sm text-slate-400 font-medium">
                Faster Creation
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">50k+</span>
              <span className="text-sm text-slate-400 font-medium">
                Resumes Built
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-2">Top 1%</span>
              <span className="text-sm text-slate-400 font-medium">
                Industry Standards
              </span>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="px-6 py-32 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Powerful Tools for Your{" "}
              <span className="text-indigo-400">Career</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to stand out from the crowd and secure
              interviews at top companies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-start gap-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30 mb-2 relative z-10">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-white relative z-10">
                AI Resume Builder
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-1 relative z-10">
                Start from scratch. Answer a few questions and our AI perfectly
                structures, formats, and generates impactful bullet points
                tailored for you.
              </p>
              <Button
                asChild
                variant="link"
                className="p-0 h-auto text-indigo-400 hover:text-indigo-300 font-semibold relative z-10"
              >
                <Link href="/builder" className="inline-flex items-center">
                  Start Building{" "}
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-start gap-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-32 h-32 text-purple-400" />
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30 mb-2 relative z-10">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-white relative z-10">
                Smart Optimizer
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-1 relative z-10">
                Upload your clunky, old resume. We'll reconstruct sentences for
                maximum impact, action-verb usage, and keyword density.
              </p>
              <Button
                asChild
                variant="link"
                className="p-0 h-auto text-purple-400 hover:text-purple-300 font-semibold relative z-10"
              >
                <Link href="/optimizer" className="inline-flex items-center">
                  Optimize Now{" "}
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col items-start gap-4 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-blue-400" />
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30 mb-2 relative z-10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-white relative z-10">
                ATS Score Checker
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-1 relative z-10">
                Stop guessing. Upload your resume and job description to get a
                granular compatibility report and actionable fixes before you
                apply.
              </p>
              <Button
                asChild
                variant="link"
                className="p-0 h-auto text-blue-400 hover:text-blue-300 font-semibold relative z-10"
              >
                <Link href="/ats-checker" className="inline-flex items-center">
                  Check Score{" "}
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 py-24 mb-20">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-white/10 p-12 md:p-20 text-center relative overflow-hidden backdrop-blur-lg">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/30 blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/30 blur-[80px]"></div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to Upgrade Your Career?
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of job seekers who have successfully landed their
              dream roles using our AI platform.
            </p>
            <Button
              size="lg"
              className="h-14 px-10 text-base font-semibold bg-white text-indigo-950 hover:bg-slate-100 transition-all rounded-full shadow-xl relative z-10"
              asChild
            >
              <Link href="/builder">Start For Free Today</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 relative z-10 backdrop-blur-md">
        <p>© {new Date().getFullYear()} ResumeAI. Built for excellence.</p>
      </footer>
    </div>
  );
}
