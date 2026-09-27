"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { Template } from "@/types/template";

export const TEMPLATES: Template[] = [
  {
    id: "victory-day",
    title: "১৬ই ডিসেম্বর মহান বিজয় দিবস",
    category: "বিজয় দিবস",
    thumbnail: "/templates/victory.png",
    previewUrl: "/templates/victory.png",
    defaultData: {
      occasion: "বিজয় দিবস",
      headline: "মহান বিজয় দিবসের রক্তিম শুভেচ্ছা",
      themeGradient: "from-emerald-950 via-slate-900 to-red-950",
      borderColor: "border-red-500",
      bannerColor: "bg-emerald-900/90",
    },
  },
  {
    id: "condolence",
    title: "বিনম্র শ্রদ্ধাঞ্জলি ও শোক সভা",
    category: "শোক সভা",
    thumbnail: "/templates/condolence.png",
    previewUrl: "/templates/condolence.png",
    defaultData: {
      occasion: "শোক সভা / শ্রদ্ধাঞ্জলি",
      headline: "গভীর শোক ও বিনম্র শ্রদ্ধাঞ্জলি",
      themeGradient: "from-slate-950 via-gray-900 to-black",
      borderColor: "border-slate-600",
      bannerColor: "bg-slate-900/90",
    },
  },
  {
    id: "election-campaign",
    title: "আসন্ন নির্বাচনে বিপুল ভোটে জয়যুক্ত করুন",
    category: "নির্বাচনী প্রচার",
    thumbnail: "/templates/campaign.png",
    previewUrl: "/templates/campaign.png",
    defaultData: {
      occasion: "নির্বাচনী প্রচার",
      headline: "আসন্ন নির্বাচনে আপনার মূল্যবান ভোট দিন",
      themeGradient: "from-blue-950 via-slate-900 to-emerald-950",
      borderColor: "border-amber-400",
      bannerColor: "bg-emerald-900/90",
    },
  },
];

const CATEGORIES = ["সবগুলো", "বিজয় দিবস", "শোক সভা", "নির্বাচনী প্রচার"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("সবগুলো");

  const filteredTemplates =
    selectedCategory === "সবগুলো"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2.5 text-emerald-400">
              <Sparkles className="w-7 h-7" /> টেমপ্লেট লাইব্রেরি
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              আপনার পছন্দের ডিজাইনটি বেছে নিন এবং সরাসরি আপনার তথ্য দিয়ে কাস্টমাইজ করুন।
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-full object-cover rounded-lg transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback thumbnail UI if PNG is missing
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                
                {/* Action Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3 p-4">
                  <Link
                    href={`/templates/${template.id}`}
                    className="w-full max-w-[180px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium py-2 px-4 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> প্রিভিউ দেখুন
                  </Link>
                  <Link
                    href={`/dashboard/create?template=${template.id}`}
                    className="w-full max-w-[180px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-4 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    কাস্টমাইজ করুন <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {template.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> রেডি টু ইউজ
                  </span>
                </div>
                
                <h3 className="font-semibold text-base text-slate-100 line-clamp-1">
                  {template.title}
                </h3>

                <div className="pt-2 flex gap-2">
                  <Link
                    href={`/dashboard/create?template=${template.id}`}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 rounded-xl transition text-center"
                  >
                    ব্যবহার করুন
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}