import Link from "next/link";
import {
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  ArrowRight,
  LayoutTemplate,
  WandSparkles,
  Download,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-900/30">
              AI
            </div>

            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                AI Political Poster Maker
              </span>
              <p className="text-[10px] text-slate-500">
                Political Poster Maker
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-500"
            >
              Create Poster
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-6 pb-20 pt-36">
        <section className="mx-auto flex max-w-7xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Political Banner & Poster Maker
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-6xl lg:text-7xl">
            কয়েক ক্লিকেই তৈরি করুন
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              প্রফেশনাল রাজনৈতিক পোস্টার
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            নেতৃবৃন্দের ছবি, বাংলা হেডলাইন, পদবি, ইভেন্ট এবং কাস্টম থিম ব্যবহার
            করে সহজেই তৈরি করুন আকর্ষণীয় ডিজিটাল ব্যানার ও পোস্টার।
          </p>

          {/* CTA */}
          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/create"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-emerald-950/40 transition hover:bg-emerald-500"
            >
              <WandSparkles className="h-5 w-5" />
              পোস্টার তৈরি করুন
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Small Trust Line */}
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            সহজে তৈরি করুন • এডিট করুন • HD PNG ডাউনলোড করুন
          </div>

          {/* Feature Highlights */}
          <div className="mt-20 grid w-full grid-cols-1 gap-5 text-left md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <ImageIcon className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                ৩টি ছবি আপলোড
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                শীর্ষ দুই নেতা এবং আপনার নিজের ছবি আলাদাভাবে আপলোড করে
                পোস্টারে সুন্দরভাবে সাজিয়ে নিন।
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-amber-500/30 hover:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <LayoutTemplate className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                কাস্টম থিম ও ডিজাইন
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                ইভেন্ট ও প্রয়োজন অনুযায়ী থিম, গ্র্যাডিয়েন্ট, ব্যানার কালার এবং
                বর্ডার স্টাইল পরিবর্তন করুন।
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-teal-500/30 hover:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-400">
                <Download className="h-5 w-5" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                HD PNG ডাউনলোড
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                ডিজাইন সম্পন্ন হলে এক ক্লিকেই আপনার পোস্টার HD PNG ফরম্যাটে
                ডাউনলোড করুন এবং প্রয়োজন হলে সংরক্ষণ করুন।
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 w-full max-w-4xl overflow-hidden rounded-3xl border border-emerald-500/10 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/40 px-6 py-10 md:px-10">
            <div className="mx-auto max-w-2xl">
              <Sparkles className="mx-auto mb-4 h-7 w-7 text-emerald-400" />

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                আপনার পোস্টার ডিজাইন শুরু করুন
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">
                আপনার তথ্য, ছবি ও পছন্দের থিম নির্বাচন করুন এবং কয়েক মুহূর্তেই
                একটি সম্পূর্ণ পোস্টার তৈরি করুন।
              </p>

              <Link
                href="/dashboard/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
              >
                এখনই শুরু করুন
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
