import {
  HelpCircle,
  FileText,
  CheckCircle,
  CreditCard,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/landing/footer";

export default function HelpCenter() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      <main className="flex-1 relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              How can we help?
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about building your resume, ATS
              optimization, and managing your account.
            </p>
          </div>

          {/* Categories Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Resume Builder
              </h3>
              <p className="text-slate-600 mb-4">
                Learn how to create, edit, and export your industry-standard
                resume.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  How to generate a new resume?
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Can I import my existing LinkedIn profile?
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Exporting to PDF or Word formats
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                ATS Checker
              </h3>
              <p className="text-slate-600 mb-4">
                Understand how our deep-learning engine analyzes your resume.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  How is my ATS score calculated?
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  What keywords should I focus on?
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Fixing common formatting mistakes
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Billing & Plans
              </h3>
              <p className="text-slate-600 mb-4">
                Manage your subscription, payments, and account details.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Updating payment methods
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  How to cancel or upgrade my plan?
                </li>
                <li className="hover:text-emerald-600 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                  Requesting a refund
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white shadow-sm text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Still need help?
              </h3>
              <p className="text-slate-600 mb-6">
                Our support team is always ready to assist you with any
                questions.
              </p>
              <Link
                href="mailto:suprabhat.work@gmail.com"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
