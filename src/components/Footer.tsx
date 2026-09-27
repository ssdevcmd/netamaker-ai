import Link from "next/link";
import {
  Sparkles,
  Image as ImageIcon,
  LayoutTemplate,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-900/20">
                AI
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  AI Political Poster Maker
                </h3>
                <p className="text-[10px] text-slate-500">
                  Political Poster Maker
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              AI-এর সাহায্যে সহজেই আকর্ষণীয় ডিজিটাল রাজনৈতিক ব্যানার ও পোস্টার
              তৈরি করুন। আপনার তথ্য, ছবি ও পছন্দের থিম দিয়ে তৈরি করুন নিজের
              ডিজাইন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              দ্রুত লিংক
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-slate-500 transition hover:text-emerald-400"
              >
                হোম
              </Link>

              <Link
                href="/dashboard/create"
                className="text-sm text-slate-500 transition hover:text-emerald-400"
              >
                পোস্টার তৈরি করুন
              </Link>

              <Link
                href="/login"
                className="text-sm text-slate-500 transition hover:text-emerald-400"
              >
                লগইন
              </Link>

              <Link
                href="/register"
                className="text-sm text-slate-500 transition hover:text-emerald-400"
              >
                রেজিস্ট্রেশন
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              প্রধান সুবিধা
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500">
                  ৩টি ছবি আপলোড
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <LayoutTemplate className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500">
                  কাস্টম থিম ও ডিজাইন
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                  <Download className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-500">
                  HD PNG ডাউনলোড
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} NetaMaker AI. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>ডিজাইন করুন • কাস্টমাইজ করুন • ডাউনলোড করুন</span>
          </div>
        </div>
      </div>
    </footer>
  );
}