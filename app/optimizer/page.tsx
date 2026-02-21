"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { optimizeResume } from "./actions";
import { Loader2, Sparkles, Printer, Zap, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResumePreview } from "@/components/resume-preview";
import { createClient } from "@/utils/supabase/client";

export default function OptimizerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pendingResume = localStorage.getItem("pendingOptimizerResume");
    if (pendingResume) {
      try {
        setResult(JSON.parse(pendingResume));
        localStorage.removeItem("pendingOptimizerResume");
      } catch (e) {}
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await optimizeResume(formData);

    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.optimizedResume);
    }
    setLoading(false);
  }

  const handleDownloadAttempt = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      window.print();
    } else {
      localStorage.setItem("pendingOptimizerResume", JSON.stringify(result));
      router.push("/login?callbackUrl=/optimizer");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-50 relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container max-w-5xl px-6 py-16 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-300">
              Intelligent Rewrite Engine
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            AI Resume{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Optimizer
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Upload your existing resume and let our AI transform your bullet
            points into punchy, metric-driven achievements that recruiters love.
          </p>
        </div>

        {!result ? (
          <Card className="max-w-2xl mx-auto bg-white/5 border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-3xl animate-fade-in-up delay-100">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>

            <CardHeader className="pb-4 border-b border-white/5 relative z-10">
              <CardTitle className="text-2xl font-bold text-white">
                Upload Resume
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Ensure your resume is in a readable PDF format.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              {error && (
                <div className="border border-red-500/30 bg-red-950/20 text-red-300 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                  <div className="p-1 bg-red-500/20 rounded-full">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="resume"
                    className="text-sm font-medium text-slate-300"
                  >
                    Current Resume (PDF)
                  </Label>
                  <div className="relative group">
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf"
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center justify-center w-full h-24 px-4 transition bg-black/20 border-2 border-dashed border-white/20 rounded-xl group-hover:border-purple-500/50 group-hover:bg-purple-500/5 text-slate-400 group-hover:text-purple-300">
                      <div className="flex flex-col items-center space-y-2">
                        <UploadCloud className="w-6 h-6" />
                        <span className="text-sm font-medium text-center">
                          Click to upload or drag & drop
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="context"
                    className="text-sm font-medium text-slate-300"
                  >
                    Additional Context{" "}
                    <span className="text-white/30 text-xs font-normal">
                      (Optional)
                    </span>
                  </Label>
                  <Textarea
                    id="context"
                    name="context"
                    placeholder="e.g. Focus more on my leadership experience, or I'm targeting a Senior PM role..."
                    className="min-h-[120px] resize-none bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 rounded-xl p-4"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] transition-all border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Optimizing Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-5 w-5 text-purple-200" />
                        Optimize Now
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Optimization Complete!
                </h2>
                <p className="text-slate-400">
                  Your resume has been rewritten for maximum impact.
                </p>
              </div>
              <div className="flex gap-4 print:hidden">
                <Button
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="h-12 px-6 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-300 rounded-xl transition-all"
                >
                  Start Over
                </Button>
                <Button
                  onClick={handleDownloadAttempt}
                  className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all border-0"
                >
                  <Printer className="mr-2 w-5 h-5 opacity-80" />
                  Download PDF
                </Button>
              </div>
            </div>

            <div className="bg-white text-black p-8 sm:p-14 shadow-2xl rounded-xl mx-auto max-w-[850px] min-h-[1100px] border border-white/20 print:shadow-none print:border-none">
              <ResumePreview data={result} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
