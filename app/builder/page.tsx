"use client";

import { BackgroundAmbience } from "@/components/landing/background-ambience";
import { LoadingScreen } from "@/components/loading-screen";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { generateResumeContent } from "./actions";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Sparkles,
  Printer,
  FileText,
  User,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ResumePreview } from "@/components/resume-preview";
import { createClient } from "@/utils/supabase/client";

export default function BuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      targetRole: "",
    },
    experience: "",
    education: "",
    skills: "",
  });

  const [generatedResume, setGeneratedResume] = useState<any>(null);

  useEffect(() => {
    const pendingResume = localStorage.getItem("pendingBuilderResume");
    if (pendingResume) {
      try {
        setGeneratedResume(JSON.parse(pendingResume));
        setStep(5);
        localStorage.removeItem("pendingBuilderResume");
      } catch (e) {}
    }
  }, []);

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleChange = (section: string, field: string, value: string) => {
    if (section === "personal") {
      setFormData((prev) => ({
        ...prev,
        personal: { ...prev.personal, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [section]: value }));
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    const res = await generateResumeContent(formData);
    if (res.error) {
      setError(res.error);
    } else {
      setGeneratedResume({ ...formData.personal, ...res.aiGeneratedResume });
      setStep(5);
    }
    setLoading(false);
  };

  const handleDownloadAttempt = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      window.print();
    } else {
      localStorage.setItem(
        "pendingBuilderResume",
        JSON.stringify(generatedResume),
      );
      router.push("/login?callbackUrl=/builder");
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 relative overflow-hidden font-sans selection:bg-emerald-500/30 print:bg-white print:text-black print:overflow-visible">
        {/* Background Ambience */}
        <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
          <div className="absolute top-0 right-1/4 w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        </div>

        <div className="container max-w-4xl px-4 py-16 mx-auto relative z-10 print:p-0 print:m-0 print:max-w-none">
          {step < 5 && (
            <div className="mb-12 text-center animate-fade-in-up print:hidden">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                AI Resume Builder
              </h1>

              <div className="flex items-center justify-center gap-3 mt-8 max-w-lg mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${step === i ? "bg-emerald-500 text-slate-900 shadow-[0_0_20px_rgba(79,70,229,0.5)] ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-50 flex-shrink-0" : step > i ? "bg-emerald-500/30 text-emerald-100 border border-emerald-500/50" : "bg-white/70 text-slate-500 border border-slate-200"}`}
                    >
                      {step > i ? (
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      ) : (
                        i
                      )}
                    </div>
                    {i < 4 && (
                      <div
                        className={`h-1 w-12 sm:w-20 mx-2 rounded-full ${step > i ? "bg-emerald-500/50" : "bg-white/70"}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="border border-red-500/30 bg-red-950/20 text-red-300 p-4 rounded-none mb-8 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {step === 1 && (
            <Card className="bg-white/70 border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-none animate-fade-in-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

              <CardHeader className="pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 rounded-none text-emerald-600 ring-1 ring-emerald-500/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Personal Details
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Let's start with your contact information.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-2 relative">
                  <Label className="text-sm font-medium text-slate-700 ml-1">
                    Full Name
                  </Label>
                  <Input
                    value={formData.personal.fullName}
                    onChange={(e) =>
                      handleChange("personal", "fullName", e.target.value)
                    }
                    placeholder="John Doe"
                    className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 relative">
                    <Label className="text-sm font-medium text-slate-700 ml-1">
                      Email
                    </Label>
                    <Input
                      value={formData.personal.email}
                      onChange={(e) =>
                        handleChange("personal", "email", e.target.value)
                      }
                      placeholder="john@example.com"
                      type="email"
                      className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label className="text-sm font-medium text-slate-700 ml-1">
                      Phone
                    </Label>
                    <Input
                      value={formData.personal.phone}
                      onChange={(e) =>
                        handleChange("personal", "phone", e.target.value)
                      }
                      placeholder="(555) 123-4567"
                      className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label className="text-sm font-medium text-slate-700 ml-1">
                      Location
                    </Label>
                    <Input
                      value={formData.personal.location}
                      onChange={(e) =>
                        handleChange("personal", "location", e.target.value)
                      }
                      placeholder="New York, NY"
                      className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label className="text-sm font-medium text-slate-700 ml-1">
                      Target Role
                    </Label>
                    <Input
                      value={formData.personal.targetRole}
                      onChange={(e) =>
                        handleChange("personal", "targetRole", e.target.value)
                      }
                      placeholder="Software Engineer"
                      className="h-12 bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t border-slate-200 pt-6 pb-6">
                <Button
                  onClick={handleNext}
                  disabled={!formData.personal.fullName}
                  className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg border-0 transition-all font-semibold"
                >
                  Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white/70 border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-none animate-fade-in-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

              <CardHeader className="pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 rounded-none text-emerald-600 ring-1 ring-emerald-500/30">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Experience Details
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Just drop your raw experience below. Our AI does the
                      formatting.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <Textarea
                  className="min-h-[300px] resize-none bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none p-6 text-base leading-relaxed"
                  placeholder="e.g. Worked at Google from 2020 to 2023 as a frontend dev. I built the checkout page using React which increased sales by 5% and reduced load times..."
                  value={formData.experience}
                  onChange={(e) =>
                    handleChange("experience", "", e.target.value)
                  }
                />
              </CardContent>
              <CardFooter className="justify-between border-t border-slate-200 pt-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="h-12 px-6 bg-white/70 border-slate-200 hover:bg-slate-100 hover:text-emerald-700 text-slate-600 rounded-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg border-0 font-semibold"
                >
                  Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-white/70 border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-none animate-fade-in-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

              <CardHeader className="pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 rounded-none text-emerald-600 ring-1 ring-emerald-500/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Education History
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Degrees, universities, bootcamps and certifications.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <Textarea
                  className="min-h-[200px] resize-none bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none p-6 text-base leading-relaxed"
                  placeholder="e.g. BS in Computer Science from MIT, graduated 2019 with a 3.8 GPA. Relevant coursework included Software Engineering and ML."
                  value={formData.education}
                  onChange={(e) =>
                    handleChange("education", "", e.target.value)
                  }
                />
              </CardContent>
              <CardFooter className="justify-between border-t border-slate-200 pt-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="h-12 px-6 bg-white/70 border-slate-200 hover:bg-slate-100 hover:text-emerald-700 text-slate-600 rounded-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg border-0 font-semibold"
                >
                  Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card className="bg-white/70 border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden rounded-none animate-fade-in-up border border-indigo-500/30 shadow-xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

              <CardHeader className="pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 rounded-none text-emerald-600 ring-1 ring-emerald-500/30">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Skills Matrix
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      List core skills separately by commas. (Last step!)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <Textarea
                  className="min-h-[150px] resize-none bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-emerald-500/50 rounded-none p-6 text-base leading-relaxed"
                  placeholder="e.g. JavaScript, React, Node.js, Project Management, Agile, AWS, Docker..."
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", "", e.target.value)}
                />
              </CardContent>
              <CardFooter className="justify-between border-t border-slate-200 pt-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={loading}
                  className="h-12 px-6 bg-white/70 border-slate-200 hover:bg-slate-100 hover:text-emerald-700 text-slate-600 rounded-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg border-0 font-bold transition-all hover:scale-[1.02]"
                >
                  {loading ? (
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="mr-3 h-5 w-5 text-emerald-100" />
                  )}
                  {loading ? "AI is Generating..." : "Generate Magic"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 5 && generatedResume && (
            <div className="space-y-8 animate-fade-in-up print:space-y-0 print:m-0 print:p-0">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white/70 border border-slate-200 p-6 rounded-none backdrop-blur-xl shadow-2xl print:hidden">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Your AI-Optimized Resume
                  </h2>
                  <p className="text-slate-600">
                    Ready to stand out? Review below or download directly.
                  </p>
                </div>
                <div className="flex gap-4 print:hidden">
                  <Button
                    variant="outline"
                    onClick={() => setStep(4)}
                    className="h-12 px-6 bg-white/70 border-slate-200 hover:bg-slate-100 hover:text-emerald-700 text-slate-600 rounded-none transition-all"
                  >
                    Edit Details
                  </Button>
                  <Button
                    onClick={handleDownloadAttempt}
                    className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none shadow-lg transition-all border-0"
                  >
                    <Printer className="mr-2 w-5 h-5 opacity-80" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Visual Document Preview */}
              <div className="bg-white text-black p-8 sm:p-14 shadow-2xl rounded-none mx-auto max-w-[850px] min-h-[1100px] border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full print:max-w-none print:min-h-0 print:rounded-none">
                <ResumePreview data={generatedResume} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
