"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { generateAIPosterTheme } from "@/lib/gemini";

export default function Home() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "আবুল মিয়া",
    designation: "যুগ্ম সাধারণ সম্পাদক",
    party: "কাঁঠাল জনতা পার্টি (কেজেপি)",
    area: "ফতুল্লা, নারায়ণগঞ্জ",
    headline: "মহান বিজয় দিবসের রক্তিম শুভেচ্ছা",
    occasion: "বিজয় দিবস",
  });

  // Dynamic Theme State (Driven by Gemini)
  const [theme, setTheme] = useState({
    gradient: "from-emerald-950 via-slate-900 to-red-950",
    border: "border-amber-500/50",
    banner: "from-red-800 to-emerald-800",
  });

  const [photo, setPhoto] = useState<string | null>(null);

  // Magic AI Theme Generator Trigger
  const handleAIGenerate = async () => {
    setLoadingAI(true);
    const aiResult = await generateAIPosterTheme(formData.occasion, formData.headline);
    if (aiResult) {
      setTheme({
        gradient: aiResult.themeGradient,
        border: aiResult.borderColor,
        banner: aiResult.bannerColor,
      });
      setFormData((prev) => ({ ...prev, headline: aiResult.refinedHeadline }));
    }
    setLoadingAI(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (posterRef.current === null) return;
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${formData.name}-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-emerald-500 bg-clip-text text-transparent">
          AI Political Poster Maker
        </h1>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
          NetaMaker AI Engine
        </span>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> পোস্টারের তথ্য পূরণ করুন
            </h2>
            <button
              onClick={handleAIGenerate}
              disabled={loadingAI}
              className="bg-gradient-to-r from-amber-500 to-emerald-600 hover:opacity-90 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
            >
              {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loadingAI ? "AI ডিজাইনিং..." : "AI Magic Theme"}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400">উপলক্ষ (Occasion)</label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white"
              >
                <option value="বিজয় দিবস">বিজয় দিবস</option>
                <option value="শোক সভা / শ্রদ্ধাঞ্জলি">শোক সভা / শ্রদ্ধাঞ্জলি</option>
                <option value="নির্বাচনী প্রচার">নির্বাচনী প্রচার</option>
                <option value="ঈদ শুভেচ্ছা">ঈদ শুভেচ্ছা</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400">আপনার নাম (বাংলায়)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">পদবি/কমিটি অবস্থান</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">রাজনৈতিক দল / সংগঠন</label>
              <input
                type="text"
                value={formData.party}
                onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">ইউনিয়ন/থানা/জেলা</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">প্রধান স্লোগান / শিরোনাম</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">আপনার ছবি আপলোড করুন</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Dynamic Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-slate-400">AI Dynamic Canvas Preview</h2>
            <button
              onClick={handleDownload}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>

          {/* Dynamic AI Styled Canvas */}
          <div
            ref={posterRef}
            className={`w-[380px] h-[520px] bg-gradient-to-b ${theme.gradient} rounded-xl overflow-hidden shadow-2xl border-4 ${theme.border} relative flex flex-col justify-between p-4 transition-all duration-500`}
          >
            <div className="text-center space-y-1">
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-3 py-0.5 rounded-full tracking-wider">
                {formData.occasion}
              </span>
              <h1 className="text-xl font-black text-amber-300 drop-shadow-md leading-tight mt-1">
                {formData.headline}
              </h1>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-40 h-48 border-2 border-amber-400/80 rounded-lg overflow-hidden bg-slate-900/80 shadow-inner flex items-center justify-center relative">
                {photo ? (
                  <img src={photo} alt="Leader" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">ছবি যোগ করুন</span>
                  </div>
                )}
              </div>
            </div>

            <div className={`bg-gradient-to-r ${theme.banner} border-t-2 border-amber-400 p-2.5 text-center rounded-lg space-y-0.5`}>
              <p className="text-[10px] text-amber-200 uppercase font-semibold">শুভেচ্ছান্তে</p>
              <h3 className="text-base font-bold text-white tracking-wide">{formData.name}</h3>
              <p className="text-[11px] text-slate-200 font-medium">{formData.designation}</p>
              <p className="text-[9px] text-amber-300">{formData.party} — {formData.area}</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
