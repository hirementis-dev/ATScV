"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { BackgroundAmbience } from "@/components/landing/background-ambience";

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
    <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden p-4">
      <BackgroundAmbience />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 rounded-none group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="inline-block font-extrabold text-2xl tracking-tight text-slate-900">
            ResumeAI<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Card */}
        <div className="w-full bg-white/70 border border-slate-200 backdrop-blur-xl rounded-none p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-600">
              Sign in or create an account to start building your future.
            </p>
          </div>

          <div className="relative z-10">
            {error && (
              <div className="text-sm font-medium text-red-600 mb-6 bg-red-50 border border-red-200 p-3 text-center rounded-none">
                {error}
              </div>
            )}
            {message && (
              <div className="text-sm font-medium text-emerald-600 mb-6 bg-emerald-50 border border-emerald-200 p-3 text-center rounded-none">
                {message}
              </div>
            )}

            <form className="space-y-5">
              <div className="space-y-2 relative">
                <Label htmlFor="email" className="text-sm text-slate-700 ml-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 rounded-none"
                />
              </div>
              <div className="space-y-2 relative">
                <Label
                  htmlFor="password"
                  className="text-sm text-slate-700 ml-1"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 rounded-none"
                />
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  formAction={(fd) => handleAction(fd, login)}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg shadow-emerald-500/10 transition-all border-0"
                >
                  Log In
                </Button>
                <Button
                  formAction={(fd) => handleAction(fd, signup)}
                  type="submit"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-white/50 border-slate-200 hover:bg-slate-50 hover:text-emerald-700 text-slate-600 rounded-none backdrop-blur-md transition-all"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center relative z-10">
            <p className="text-sm text-slate-600">
              Just browsing?{" "}
              <Link
                href="/"
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
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
          <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
            Loading...
          </div>
        }
      >
      <LoginContent />
    </Suspense>
  );
}
