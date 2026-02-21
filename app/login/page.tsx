"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (
    formData: FormData,
    action: typeof login | typeof signup,
  ) => {
    setIsLoading(true);
    await action(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden p-4">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="inline-block font-extrabold text-2xl tracking-tight text-white">
            ResumeAI<span className="text-indigo-400">.</span>
          </span>
        </Link>

        {/* Card */}
        <div className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-400">
              Sign in or create an account to start building your future.
            </p>
          </div>

          <div className="relative z-10">
            {error && (
              <div className="text-sm font-medium text-red-300 mb-6 bg-red-950/40 border border-red-900/50 p-3 text-center rounded-xl">
                {error}
              </div>
            )}
            {message && (
              <div className="text-sm font-medium text-emerald-300 mb-6 bg-emerald-950/40 border border-emerald-900/50 p-3 text-center rounded-xl">
                {message}
              </div>
            )}

            <form className="space-y-5">
              <div className="space-y-2 relative">
                <Label htmlFor="email" className="text-sm text-slate-300 ml-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-12 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 rounded-xl"
                />
              </div>
              <div className="space-y-2 relative">
                <Label
                  htmlFor="password"
                  className="text-sm text-slate-300 ml-1"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  formAction={(fd) => handleAction(fd, login)}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all border-0"
                >
                  Log In
                </Button>
                <Button
                  formAction={(fd) => handleAction(fd, signup)}
                  type="submit"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-300 rounded-xl backdrop-blur-md transition-all"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
            <p className="text-sm text-slate-400">
              Just browsing?{" "}
              <Link
                href="/"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Return to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
