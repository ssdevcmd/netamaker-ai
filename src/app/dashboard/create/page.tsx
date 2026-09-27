"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { Download, Sparkles, Upload, Loader2, User as UserIcon, LogOut, LogIn, Save } from "lucide-react";
import { generateAIPosterTheme } from "@/lib/gemini";
import { PosterCanvas } from "@/components/poster/PosterCanvas";
import { posterService } from "@/services/posterService";
import { PosterData } from "@/types/poster";
import { toast } from "react-toastify";

// 1. Form and Page Content Component
function CreatePosterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const posterRef = useRef<HTMLDivElement>(null);

  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Default Poster State
  const [poster, setPoster] = useState<PosterData>({
    name: "আবুল মিয়া",
    designation: "যুগ্ম সাধারণ সম্পাদক",
    party: "কাঁঠাল জনতা পার্টি (কেজেপি)",
    location: "ফতুল্লা, নারায়ণগঞ্জ",
    headline: "মহান বিজয় দিবসের রক্তিম শুভেচ্ছা",
    occasion: "বিজয় দিবস",
    themeGradient: "from-emerald-950 via-slate-900 to-red-950",
    borderColor: "#f59e0b",
    bannerColor: "#064e3b",
    leaderPhoto1: null,
    leaderPhoto2: null,
    userPhoto: null,
  });

  // Check Auth User & Load Edit Data from History Page
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }
    }

    const editPosterData = localStorage.getItem("edit_poster");

    if (editPosterData) {
      try {
        setPoster(JSON.parse(editPosterData));
        setIsEditing(true);
        localStorage.removeItem("edit_poster");
      } catch (error) {
        console.error("Failed to load edit data:", error);
      }
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.refresh();
  };

  // AI Theme Generator Trigger
  const handleAIGenerate = async () => {
    setLoadingAI(true);
    try {
      const aiResult = await generateAIPosterTheme(poster.occasion || "", poster.headline);
      if (aiResult) {
        setPoster((prev) => ({
          ...prev,
          themeGradient: aiResult.themeGradient,
          borderColor: aiResult.borderColor,
          bannerColor: aiResult.bannerColor,
          headline: aiResult.refinedHeadline || prev.headline,
        }));
      }
    } catch (err) {
      console.error("AI Generation error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "leaderPhoto1" | "leaderPhoto2" | "userPhoto"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster((prev) => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Export as PNG & Auto Save
  const handleDownload = async () => {
    if (posterRef.current === null) return;

    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${poster.name}-poster.png`;
      link.href = dataUrl;
      link.click();

      // Save to history after download
      await posterService.savePoster(poster);
    } catch (err) {
      console.error("Export/Save failed:", err);
    }
  };

  // Save / Update Poster
  const handleSavePoster = async () => {
    setLoading(true);
    try {
      const posterId = (poster._id || poster.id || "") as string;

      if (isEditing && posterId) {
        await posterService.updatePoster(posterId, poster);
        alert("পোস্টার সফলভাবে আপডেট করা হয়েছে!");
      } else {
        await posterService.savePoster(poster);
        toast.success("পোস্টার সফলভাবে সেভ করা হয়েছে!");
      }

      router.push("/dashboard/history");
    } catch (error: any) {
      alert(error.message || "পোস্টার সেভ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* Navbar Header */}
      <header className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          AI Political Poster Maker
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300 flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-emerald-400" /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 border border-slate-700"
              >
                <LogIn className="w-4 h-4 text-emerald-400" /> Login
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Form Panel */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              {isEditing ? "পোস্টার সম্পাদনা করুন" : "পোস্টারের তথ্য পূরণ করুন"}
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

          {/* 3 Photos Upload Block */}
          <div className="border border-slate-800 p-4 rounded-xl bg-slate-950/50 space-y-2">
            <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
              📸 ছবি আপলোড (Up to 3 Photos)
            </label>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block">Top Left (Leader 1)</span>
                <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-emerald-500 bg-slate-900">
                  <Upload className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[9px] text-slate-300">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "leaderPhoto1")}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block">Top Center (Senior)</span>
                <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-emerald-500 bg-slate-900">
                  <Upload className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[9px] text-slate-300">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "leaderPhoto2")}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block">Top Right (Candidate)</span>
                <label className="flex flex-col items-center justify-center p-2 border border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-emerald-500 bg-slate-900">
                  <Upload className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[9px] text-slate-300">Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "userPhoto")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Text Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">উপলক্ষ (Occasion)</label>
              <select
                value={poster.occasion}
                onChange={(e) => setPoster({ ...poster, occasion: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white"
              >
                <option value="বিজয় দিবস">বিজয় দিবস</option>
                <option value="শোক সভা / শ্রদ্ধাঞ্জলি">শোক সভা / শ্রদ্ধাঞ্জলি</option>
                <option value="নির্বাচনী প্রচার">নির্বাচনী প্রচার</option>
                <option value="ঈদ শুভেচ্ছা">ঈদ শুভেচ্ছা</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">আপনার নাম (বাংলায়)</label>
              <input
                type="text"
                value={poster.name}
                onChange={(e) => setPoster({ ...poster, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">পদবি/কমিটি অবস্থান</label>
              <input
                type="text"
                value={poster.designation}
                onChange={(e) => setPoster({ ...poster, designation: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">রাজনৈতিক দল / সংগঠন</label>
              <input
                type="text"
                value={poster.party}
                onChange={(e) => setPoster({ ...poster, party: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">ইউনিয়ন/থানা/জেলা</label>
              <input
                type="text"
                value={poster.location}
                onChange={(e) => setPoster({ ...poster, location: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">প্রধান স্লোগান / শিরোনাম</label>
              <input
                type="text"
                value={poster.headline}
                onChange={(e) => setPoster({ ...poster, headline: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={handleSavePoster}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? "সেভ হচ্ছে..." : isEditing ? "পোস্টার আপডেট করুন" : "পোস্টার সেভ করুন"}
            </button>

            <button
              onClick={handleDownload}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-xl transition border border-slate-700 flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Download PNG
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Dynamic Canvas Preview */}
        <div className="lg:col-span-6 flex flex-col items-center sticky top-6">
          <div className="w-full flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-slate-400">AI Dynamic Canvas Preview</h2>
          </div>

          <PosterCanvas ref={posterRef} data={poster} />
        </div>
      </div>
    </main>
  );
}

// 2. Default Export wrapped with Suspense to resolve Next.js Prerender build errors
export default function CreatePosterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      }
    >
      <CreatePosterForm />
    </Suspense>
  );
}