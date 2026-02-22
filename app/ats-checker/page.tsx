"use client";

import { BackgroundAmbience } from "@/components/landing/background-ambience";
import { useState } from "react";
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
import { analyzeResume } from "./actions";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  UploadCloud,
  Target,
} from "lucide-react";

export default function AtsCheckerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await analyzeResume(formData);

    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.analysis);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="container max-w-5xl px-6 py-16 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200 backdrop-blur-md mb-6 shadow-xl">
            <Target className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">
              Precision Analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            ATS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Score Checker
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and paste the target job description. Our
            deep-learning engine will simulate an ATS scan and give you a
            granular compatibility report.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="bg-white/70 border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

            <CardHeader className="pb-4 border-b border-slate-200 relative z-10">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Input Details
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Provide your materials for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="resume"
                    className="text-sm font-medium text-slate-700"
                  >
                    Resume (PDF)
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
                    <div className="flex items-center justify-center w-full h-24 px-4 transition bg-white/50 border-2 border-dashed border-slate-200 rounded-none group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 text-slate-600 group-hover:text-emerald-600">
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
                    htmlFor="jobDescription"
                    className="text-sm font-medium text-slate-700"
                  >
                    Target Job Description
                  </Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the exact job requirements here..."
                    className="min-h-[200px] resize-none bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none p-4"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg transition-all border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Analyzing via AI Engine...
                      </>
                    ) : (
                      "Start Analysis"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {!result && !error && !loading && (
              <Card className="h-full min-h-[500px] bg-white/70 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center text-slate-500 rounded-none backdrop-blur-md">
                <div className="p-6 bg-white/70 rounded-full mb-6 ring-1 ring-white/10">
                  <Target className="h-12 w-12 text-slate-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-700 mb-2">
                  Awaiting Input
                </h3>
                <p className="max-w-xs leading-relaxed">
                  Your granular AI analysis report will appear here once
                  processed.
                </p>
              </Card>
            )}

            {loading && (
              <Card className="h-full min-h-[500px] p-12 flex flex-col items-center justify-center text-center space-y-6 bg-white/70 border-slate-200 rounded-none backdrop-blur-md">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                  <Loader2 className="h-14 w-14 animate-spin text-emerald-600 relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Simulating ATS Scan
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Extracting keywords, mapping contexts, and calculating match
                    probability...
                  </p>
                </div>
              </Card>
            )}

            {error && (
              <Card className="border border-red-500/30 bg-red-950/20 p-6 rounded-none backdrop-blur-md shadow-[0_0_30px_-5px_rgba(220,38,38,0.2)]">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <XCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-300 mb-1 text-lg">
                      Analysis Failed
                    </h3>
                    <p className="text-red-400/80 leading-relaxed">{error}</p>
                  </div>
                </div>
              </Card>
            )}

            {result && (
              <Card className="overflow-hidden border border-slate-200 bg-white/70 shadow-2xl rounded-none backdrop-blur-xl animate-fade-in-up">
                <div
                  className={`p-8 text-center relative overflow-hidden flex flex-col items-center justify-center ${result.score >= 80 ? "bg-gradient-to-br from-emerald-600/90 to-emerald-900/90" : result.score >= 60 ? "bg-gradient-to-br from-amber-500/90 to-amber-700/90" : "bg-gradient-to-br from-red-600/90 to-red-900/90"}`}
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  <h3 className="text-lg font-medium text-slate-900/90 tracking-wide uppercase mb-2 relative z-10">
                    Match Probability
                  </h3>
                  <div className="text-7xl font-extrabold tracking-tighter text-emerald-900 drop-shadow-md relative z-10">
                    {result.score}
                    <span className="text-4xl opacity-60 font-medium ml-1">
                      %
                    </span>
                  </div>
                </div>

                <CardContent className="p-8 space-y-8 relative z-10">
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">
                      Executive Summary
                    </h4>
                    <p className="text-slate-700 leading-relaxed bg-white/50 p-4 rounded-none border border-slate-200">
                      {result.feedback}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-emerald-950/20 p-5 rounded-none border border-emerald-500/20">
                      <h4 className="font-semibold text-base mb-4 flex items-center text-emerald-400">
                        <CheckCircle2 className="h-5 w-5 mr-2" /> Matching
                        Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchingKeywords?.map(
                          (kw: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {kw}
                            </span>
                          ),
                        ) || (
                          <span className="text-sm text-slate-500 italic">
                            None identified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-red-950/20 p-5 rounded-none border border-red-500/20">
                      <h4 className="font-semibold text-base mb-4 flex items-center text-red-400">
                        <XCircle className="h-5 w-5 mr-2" /> Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords?.map(
                          (kw: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/20"
                            >
                              {kw}
                            </span>
                          ),
                        ) || (
                          <span className="text-sm text-slate-500 italic">
                            None identified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
