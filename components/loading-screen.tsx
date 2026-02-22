import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  title?: string;
  texts?: string[];
}

const defaultTexts = [
  "Analyzing your experience...",
  "Mapping skills to industry standards...",
  "Crafting compelling bullet points...",
  "Optimizing for ATS systems...",
  "Adding final touches...",
];

export function LoadingScreen({
  title = "Crafting Your Resume",
  texts = defaultTexts,
}: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState(texts[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden font-sans">
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center animate-fade-in-up">
        {/* Center the Video Element seamlessly */}
        <div className="mb-4 relative flex items-center justify-center mix-blend-multiply">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-64 md:w-80 object-contain relative z-10"
          >
            <source src="/loading.mp4" type="video/mp4" />
          </video>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
          {title}
        </h2>

        <div className="h-8 mb-10 flex items-center justify-center">
          <p className="text-lg md:text-xl text-slate-600 font-medium animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Square loading dots indicating progress */}
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 bg-emerald-500 animate-bounce shadow-md"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-emerald-500 animate-bounce shadow-md"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-emerald-500 animate-bounce shadow-md"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
