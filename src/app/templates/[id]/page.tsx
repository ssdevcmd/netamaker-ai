"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Check, ArrowRight } from "lucide-react";
import { TEMPLATES } from "../page";

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-slate-300">টেমপ্লেটটি খুঁজে পাওয়া যায়নি!</h2>
        <Link
          href="/templates"
          className="mt-4 text-emerald-400 hover:underline text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> সব টেমপ্লেটে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white text-xs font-medium flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> পেছনে যান
        </button>

        {/* Template Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Template Preview Image */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-center shadow-2xl">
            <div className="w-full aspect-[3/4] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
              <img
                src={template.previewUrl}
                alt={template.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Template Details & Action */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 uppercase">
                {template.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold">{template.title}</h1>
              <p className="text-xs text-slate-400">
                এই টেমপ্লেটটি নির্বাচন করে সহজেই প্রার্থীর নাম, পদবী, ছবি এবং দলীয় স্লোগান পরিবর্তন করে প্রফেশনাল পোস্টার তৈরি করতে পারবেন।
              </p>
            </div>

            {/* Default Attributes Card */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-slate-300">ডিফল্ট ফিচারসমূহ:</h4>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ডিফল্ট শিরোনাম: &quot;{template.defaultData.headline}&quot;
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  এইচডি রেজোলিউশন ও প্রিন্ট ফ্রেন্ডলি কালার কম্বিনেশন
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ৩টি লিডার ছবি যুক্ত করার সুবিধা
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link
                href={`/dashboard/create?template=${template.id}`}
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-xl transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" /> এই টেমপ্লেটটি কাস্টমাইজ করুন <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}